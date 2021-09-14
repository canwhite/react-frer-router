import {state} from "frer";

//sync
const count$ = state({
    name:"count",
    initValue:0,
    producer(next,value,action){
        //如果需要累计，可以使用value
        let num = value;
        switch(action.type){
            case "add":
                num++;
                next(num);
                break;
            case "sub":
                num--;
                next(num);
                break;
            default:
                break;
        }
    }
})

//request mock
const requestData = function(params){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({data:"hello world"})
        }, 2000);
    })
}


//async
const res$ = state({
    name:"res",
    initValue:"",
    producer(next,value,action){
        let params = action.payload;
        switch(action.type){
            case "async":
                requestData(params).then(data=>{
                    console.log(data);
                    next(data);
                })
                break;
            default:
                break;
        }
    }
})

export{
    count$,
    res$,
}
