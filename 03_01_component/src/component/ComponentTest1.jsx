
//하단에 export default 를 작성해도 되고, 처음에 같이 작성해도 됨
export default function UseComponent1(){
    return (
        <>
            <div>
                <h1>UseComponent1 에서 반환한 JSX</h1>
            </div>
            <UseComponent4/>
        </>
    )
}

function UseComponent4(){
    return (
        <div>
            <h1>UseComponent4 에서 반환한 JSX</h1>
        </div>
    )
}