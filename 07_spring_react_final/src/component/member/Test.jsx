import createInstance from "../../axios/Interceptor";

export default function Test(){

    const axiosInstance = createInstance();
    const serverUrl = import.meta.env.VITE_BACK_SERVER;

    function testFunc(){
        let options = {};
        options.url = serverUrl + '/member/test';
        options.method = 'get';

        axiosInstance(options)
        .then(function(){

        })
        .catch(function(){
            
        })
    }

    return (
        <>
            <button onClick={testFunc}>요청 테스트</button>
        </>
    )
}