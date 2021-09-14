import React,{useEffect,useState} from "react";
import {count$} from "../store";
function InfoDetails(props){

    const [data,setData] = useState("");
    const [num,setNum] = useState(0);

    //接收传递过来的值
    useEffect(()=>{
        console.log("data:",props.location.query.data);
        setData(props.location.query.data);
        count$.subscribe(val=>{
            setNum(val);
        })
    },[])

    function goback(){
        //props.history.goBack();
        props.history.replace({pathname:"/home",state:{aaa:123}})
    }
    return(
        <div> 
            <div>Details</div>
            <div>query:{data}</div>
            <div>frer:{num}</div>
            <div> 
                <button onClick={goback}>
                    back
                </button>
            </div>
        </div>
    )
}
export default InfoDetails;