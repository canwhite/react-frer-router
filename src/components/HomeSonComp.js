import React,{useEffect} from "react";

function HomeSonComp(props){
    
    useEffect(()=>{
        console.log("----",props);

    },[])

    function doIt(){
        props.cusClick({a:"123"})
    }
    return(
        <div style={{paddingTop:4}}>
            <button  onClick={
                doIt
            }>父组件事件触发，获取inputValue</button>
        </div>
    )
}
export default HomeSonComp;