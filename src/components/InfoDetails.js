import React,{useEffect,useState} from "react";
import {count$} from "../store";
import {Link} from "react-router-dom"
function InfoDetails(props){

    const [data,setData] = useState("");
    const [num,setNum] = useState(0);   
    const [list,setList] = useState(["1","2","3"]);

    //接收传递过来的值
    useEffect(()=>{
        console.log("data:",props.location.query.data);
        setData(props.location.query.data);
        count$.subscribe(val=>{
            setNum(val);
        })
    },[])
    //goback如果反向传值最好还是用link
    function goback(){
        //props.history.goBack();
        props.history.replace({pathname:"/home",state:{aaa:123}})
    }
    return(
        <div> 
            <div>Details</div>
            <div>query:{data}</div>
            <div>frer:{num}</div>
            {/* for循环添加标签注意用map和返回新标签 */}
            <div> 
                {list.map((item,index)=>{
                    return(<p>{item}</p>) 
                })}
            </div>

            <div> 
                
                    <Link to={{pathname:"/home",query:{
                        aaa:"123"
                    }}}>
                        <button> goback</button>
                    </Link>
            
            </div>
        </div>
    )
}
export default InfoDetails;