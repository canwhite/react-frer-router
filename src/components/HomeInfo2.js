import React from "react";
function HomeInfo2(props){
    function goto(){
        // console.log("我点击了跳转");
        props.history.push({
            pathname:"/details",
            query:{
                data:"123"
            }
        })
    }
    return(
        <div> 
            <div>Info2</div>
            <div>
                <button onClick={goto}>
                    details 
                </button>
            </div>
        </div>
    )
}
export default HomeInfo2;