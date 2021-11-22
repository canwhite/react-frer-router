
import React from "react";
//路由
import {BrowserRouter as Router, Route,Redirect} from "react-router-dom"
import Home from "./components/Home"
import HomeInfo1 from "./components/HomeInfo1";
import HomeInfo2 from "./components/HomeInfo2";
import InfoToDetails from "./components/InfoToDetails"
//routes
let routes = [
    //exact以为这path名要精准匹配，完全满足这样的情况才能显示
    //严格模式一般处理独立页面
    {
        path:"/home",
        component:Home,
        routechilden:[
            {
                //进来之后默认显示
                // path:"/home/", //需要exact为true，精准匹配，防止info2的时候也匹配到它
                path:"/home/info1",//进去之后在mount里自己做个更新
                component:HomeInfo1,
            },
            {
                path:"/home/info2",
                component:HomeInfo2,
            },
        ]
    },
    {
        path:"/details",
        component:InfoToDetails
    },
    {
        path:"/",
        redirect:"/home"
    }
]


function App() {
    return (
        <div className="App">
            {/* 在下边继续拼接些router的内容 */}
            <Router>
                    {/* 根目录进来之后重定向位置 */}
                    
                    {
                        routes.map((route,index)=>{
                            //开局重定向
                            if(route.redirect){
                                return  <Redirect  key={index} to={route.redirect} from={route.path} />
                            }
                            //严格模式
                            if(route.exact){
                                return <Route exact key={index} path={route.path} render={
                                    props=>(
                                        <route.component  {...props} childroutes={route.routechilden}/>
                                    )
                                } />
                            //非严格模式
                            }else{
                                return <Route  key={index} path={route.path} render={
                                    props=>(
                                        <route.component  {...props} childroutes={route.routechilden}/>
                                    )
                                }/>
                            }
                        })
                    }  
                   
            </Router>
        </div>
    );
  }
  
  export default App;