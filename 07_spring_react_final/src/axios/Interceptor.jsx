import axios from "axios";
import useUserStore from "../store/useUserStore";
import Swal from "sweetalert2";
import { customHistory } from "../common/history";

//각 컴포넌트에서 axios 를 사용할 때 공통된 부분 작성을 하나로 합쳐 코딩을 수월하게 만들기 위한 함수 (컴포넌트가 아님)
//axios 의 기본값이 아닌 여기서 커스터마이징된 대로 axios 를 사용할 수 있도록 만듦

// 외부 컴포넌트에서 서버 요청 시 사용할 axios 인스턴스 생성 함수
export default function createInstance() {
	const instance = axios.create();
	return setInterceptors(instance);
}

// axios 인스턴스에 인터셉터 설정 (요청/응답 가로채기)
function setInterceptors(instance) {

    // 요청 인터셉터: 클라이언트 → 서버 요청 시 요청 객체를 가로채어 처리
    instance.interceptors.request.use(
        
        function(config) { // 요청이 정상적으로 구성된 경우
			//스토리지에 저장된 accessToken 추출
			const accessToken = useUserStore.getState().accessToken;	//함수이기 때문에 추출방식이 다름

			//스토리지에 저장된 accessToken 요청을 헤더에 포함시킴
			if(accessToken != null){
				config.headers['Authorization'] = accessToken;
			}

           return config;
		},
		function(error) { // 요청 구성 중 오류가 발생한 경우
			return Promise.reject(error);
		},
	);
    
    // 응답 인터셉터: 서버 → 클라이언트 응답 시 응답 객체를 가로채어 처리
	instance.interceptors.response.use(
        
		function(response) { // 서버 응답이 정상적으로 도착한 경우            

			//서버에서 HttpStaus.OK 로 응답된 경우 && 알림창에 띄워줄 메시지를 응답한 경우
			if(response.data.clientMsg != undefined && response.data.clientMsg != '');{
				Swal.fire({
					title : '알림',
					text : response.data.clientMsg,
					icon : response.data.alertIcon
				})
			}

			return response;
		},
		function(error) {   // 응답 처리 중 오류가 발생한 경우 (ResponseDTO.HttpStatus: 4xx, 5xx)

			const originalRequest = error.config;	//기존 요청 정보를 담고 있는 객체

			if(error.status == 403){	//토큰 유효시간 만료시 : accessToken, refreshToken 모두 포함해 403으로 응답됨 -> 구분 필요

				//403 오류 + 헤더에 refreshToken 포함되지 않은 경우 && 재요청이 아닌 경우, 즉 accessToken 이 만료된 경우
				if(error.config.headers.refreshToken === undefined && originalRequest._retry){

					//스토리지에 저장되어 있는 회원정보와 refreshToken 데이터 추출
					const loginMember = useUserStore.getState().loginMember;
					const refreshToken = useUserStore.getState().refreshToken;

					let options = {};
					options.url = import.meta.evn.VITE_BACK_SERVER + '/member/refresh';
					options.method = 'post';
					options.data = loginMember;
					options.headers = {};
					options.headers.refreshToken = refreshToken; //헤더에 refreshToken 포함시켜 재발급 요청

					return instance(options)
							.then(function(res){
								if(res.data.resData != null){
									const reAccessToken = res.data.resData;	//재발급된 accessToken

									//스토리지에 재발급된 accessToken 재할당
									useUserStore.getState().setAccessToken(reAccessToken);

									//기존 요청 헤더에 재발급된 accessToken 할당 후 재요청
									originalRequest.heders['Authorization'] = reAccessToken;
									originalRequest._retry = true;	//무한루프 방지 차원에서 재요청임을 저장

									//토큰 재발급 이후 기존 요청을 다시 서버에 보냄
									return instance(originalRequest);
								}
							})
							.catch(function(error){
								return Promise.reject(error);
							})
				}else{	//서버 응답 코드 403 (토큰 만료) : 헤더에 refreshToken 이 포함된 경우, 즉 refreshToken 이 만료된 경우
					Swal.fire({
						title : '알림',
						text : '로그인 기간이 만료되었습니다. 다시 로그인하세요',
						icon : 'warning',
						confirmButtonText : '확인'
					}).then(function(result){

						if(result.isConfirmed){
							//로그인 만료 -> 스토리지 정보 초기화 -> 로그인 컴포넌트로 전환
							useUserStore.getState().setIsLogined(false);
							useUserStore.getState().setAccessToken(null);
							useUserStore.getState().setRefreshToken(null);

							//인터셉터 == 컴포넌트 외부에 존재 == React Hook 사용 불가 (navigate 사용 불가)
							//외부에서 브라우저 주소창을 자바스크립트로 바꿀 수 있게 해주는 도구인 history를 사용해야 함
							//history 도구를 이용해 브라우저 주소창을 변경하면, 이를 라우터가 감지하고 등록된 컴포넌트 중 path 가 일치하는 컴포넌트로 전환(렌더링) 함

							customHistory.push('/login');
						}
					})
				}
			}else if(error.status == 401){	//발급 토큰과 헤더에 포함된 토큰이 다른 경우 (비인가 접근)

			}else {	//HttpStatus.INTERNAL_SERVER_ERROR : 500 오류, 서버 응답 오류
				const res = error.response.data;	//백엔드에서 응답한 ResponseDto 객체
				Swal.fire({
					title : '알림',
					text : res.clientMsg,
					icon : res.alertIcon
				});
			}

			return Promise.reject(error);
		},
	);

	return instance;
}