import axios from 'axios' //导入axios对象
import ElementUI from 'element-ui';

//通过axios去create一个叫request的对象
const request = axios.create({
	baseURL: 'http://localhost:9090', 
     // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {   //对发送的请求拦截作用
    config.headers['Content-Type'] = 'application/json;charset=utf-8'; 
    let user=localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null  //三目表达式，localStorage存在则返回user 假：返回空对象
// 设置请求头，作用：完成想要的验证
    if(user){
      config.headers['token'] = user.token;  //  作用：发送请求时设置请求头
    }
    
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data; //data是axios统一封装的 这个语句是写死的
        // 如果返回的是一个文件，直接return
        if (response.config.responseType === 'blob') {
            return res
        }
        // String类型，需要先强转为JSON对象才能接收
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 权限验证不通过，返回前端报错
        if(res.code==='401'){
            ElementUI.Message({
                message:res.msg,
                type:'error'
            })
        }
        return res;
    },
    error => {
        console.log('err' + error) // 报错，则输出报错类型
        return Promise.reject(error)
    }
)


export default request
