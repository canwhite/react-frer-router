import React, { useEffect,useState } from "react";
import {Route} from "react-router-dom"
//状态管理
import {dispatch} from "frer";
import {count$,res$} from "../store";
function Home(props){

    const [count,setCount] = useState(0);
    const [data,setData] = useState("");

    //componentDidMount,加了[]
    useEffect(()=>{
        console.log("mount");
        console.log("props:",props);

        count$.subscribe(val=>{
            setCount(val);
        })
        res$.subscribe(val=>{ 
            setData(val.data);
        })

        console.log("state--",props.history.location);
        if(props.history.location.query){
            info2();
        }else{
            info1() //如果不想精确配置，也可以在这里做判断
        }

    },[]);

    //componentDidUpdate,不加后边的[]
    useEffect(()=>{
        console.log("update")
    })

    //componentWillUnmount,return ()=>{}
    useEffect(()=>{
        return ()=>{
            console.log("clean up");
        }
    })
    //sync
    function getRes(){
        dispatch("res",{
            type:"async",
            payload:{a:"123"}
        })
    }


    function info1(){
        props.history.push({
            pathname:"/home/info1",
        })
    }
    function info2(){
        props.history.push({
            pathname:"/home/info2",
        })
    }

    return(
        <div> 
            <div>-- frer -- </div>
            {/* 1.sync */}
            <div>{count} </div>
            <div>
                <button onClick={() => {
                    dispatch("count",{
                        type:"add"
                    })
                }}>add</button>
                <button onClick={() => {
                    dispatch("count",{
                        type:"sub"
                    })
                }}>sub</button>
            </div>

            {/* 2.async */}
            <div> 
                {/* 将func作为value传入或者写箭头函数 */}
                <button onClick={getRes}>async test</button>
            </div>
            <div>{data}</div>
            

            {/* router */}
            <div style={{marginTop:20}}>
                <div>-- routechilden --</div>
                <div style={{marginTop:10}}>                
                    <button onClick={info1}>info1</button>
                    <button onClick={info2}>info2</button> 
                </div>

                {/* 显示路由内容 */}
                {/* 如果是嵌套路由的话，内部将children路由展开 */}
                {
                    props.childroutes.map((route,index)=>{
                        if(route.exact){
                          return <Route exact key={index} path={route.path} component={route.component}/>
                        }else{
                          return <Route key={index} path={route.path} component={route.component}/>
                        }
                    }) 
                }

            </div>
        </div>
    )
}
export default Home;