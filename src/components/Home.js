import React, { useEffect,useState ,createRef} from "react";
import {Route} from "react-router-dom"
//状态管理
import {dispatch} from "frer";
import {count$,res$} from "../store";
import HomeSonComp from "./HomeSonComp";

function Home(props){

    const [count,setCount] = useState(0);
    const [data,setData] = useState("");
    const [message,setMessage] = useState("");
    let inputRef = createRef();


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
        if(props.location.state){
            if(props.location.state.flag=="detail"){
                info2();
            } 
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
    },[])
    //sync
    function getRes(){
        dispatch("res",{
            type:"async",
            payload:{a:"123"}
        })
    }

    function info1(){
        //这种是pushstate的方法，我们获取值
        props.history.push("/home/info1")
    }
    function info2(){
        props.history.push("/home/info2")
    }

    function cusFunc(params){
        console.log("Son调用了父类方法",params)
        //两种获取方法
        console.log("get inputValue from ref:",inputRef.current.value);
        console.log("get inputValue from state:",message);//message可以直接使用
        
        
    }

    //--------------------------------------------------------
    //受控组件和非受控组件的区别在于，输入受代码控制还是全凭用户自主
    const handleMessageChange = (e) => {
        //从event里拿实时值，这种就算受代码控制的受控组件
        setMessage(e.target.value);
    };

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


            {/* comps */}
            <div style={{marginTop:20}}>-- comps -- </div>
           
            {/* 输入框还是比较常用的 */}
            <div> 
                <div>
                    <input  ref={inputRef} type="text" onChange={handleMessageChange} />
                </div>
                <HomeSonComp style={{marginTop:3}} value={1} cusClick = {cusFunc} />
            </div>
            <div> {message}</div>


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