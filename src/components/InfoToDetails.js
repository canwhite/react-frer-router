import React,{useEffect,useState} from "react";
import {count$} from "../store";
import Header  from "./Header";
import {Link} from "react-router-dom"
function InfoToDetails(props){

    const [data,setData] = useState("");
    const [num,setNum] = useState(0);   
    // eslint-disable-next-line
    const [list,setList] = useState(["1","2","3"]);

    //接收传递过来的值
    useEffect(()=>{
        console.log("data:",props.location.state.data);
        setData(props.location.state.data);
        count$.subscribe(val=>{
            setNum(val);
        })
    },[])
    //goback如果反向传值最好还是用link
    function goback(){
        //props.history.goBack();
        //props.history.replace({pathname:"/home",state:{aaa:123}})
        props.history.push("/home",{flag:"detail"})
    }
    return(
        <div> 
            <Header backUrl="/home"/>
            <div>Details</div>
            <div>query:{data}</div>
            <div>frer:{num}</div>
            {/* for循环添加标签注意用map和返回新标签 */}
            <div> 
                {list.map((item,index)=>{
                    return(<p key={index}>{item}</p>) 
                })}
            </div>

            <div> 
                    {/* <Link to={{pathname:"/home",query:{
                        aaa:"123"
                    }}}>
                        <button> goback</button>
                    </Link> */}
                    <button onClick={goback}> goback </button>
            
            </div>
        </div>
    )
}
export default InfoToDetails;