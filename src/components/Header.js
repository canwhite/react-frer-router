import React from "react";
import {withRouter} from "react-router-dom"
function Header(props){
    function back(){
 
        const {backUrl}  = props;
        if(backUrl){
            console.log("backurl存在");
            props.history.push(backUrl,{aaa:"我是返回呀"});//这样直接推送的值实在history.location.state里边
            //push不会造成死锁
        }else{
            //或者根据自己的判断做一些返回操作
            props.history.go(-1);
        }
    }

    return(
        <div> 
            {/* 以value的方式嵌入方法 */}
            <button onClick={back}> back  </button> Header 
        </div>
    )
}

export default withRouter(Header);
