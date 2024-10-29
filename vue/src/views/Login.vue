<template>
    <div class="wrapper">
        <div class="title"> 
              <div style="margin:20px 0; text-align:center;font-size:24px">
                   <b>登录 </b></div>
               <el-form :model="user" :rules="rules" ref="userForm">
                    <!-- ref作用是获取整个 el-form表单数据 用userForm记录-->
                   <el-form-item prop="username">
                       <!-- prop必须与rules中的username一致 -->
                       <!-- model必须与接收表单的对象user一致 -->
                        <el-input size="medium" style="margin:10px 0" prefix-icon="el-icon-user" v-model="user.username"></el-input>
                   </el-form-item>
                   <el-form-item prop="password">
                        <el-input size="medium" style="margin:10px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
                   </el-form-item>
              <el-form-item class="button">
                    <el-button type="primary"  size="small" autocomplete="off" @click="login">登录</el-button>
                    <el-button type="warning" size="small" autocomplete="off">注册</el-button>
              </el-form-item>
               </el-form>    
        </div>
    </div>
</template>

<script>
export default {
    name:"Login",
    data(){
        return{
            user:{},
            // rules是element ui组件的规则变量
            rules:{
                  username:[
                       { required:true, message:"请输入用户名",trigger:'blur'},
                       { min:3 ,max:10 ,message:"长度少于5个字符",trigger:'blur'}
                     ],
                  password:[{required:true, message:"请输入密码",trigger:'blur'},
                       {min:1 ,max:20 ,message:"长度少于1个字符",trigger:'blur'}
                     ]
            },
        
        }
    },
    methods:{
        login(){
            this.$refs['userForm'].validate((valid)=>{
                // validate作用是:用户输入是否满足Vue表单规则rules，而valid是Boolean型变量指明表单数据是否合法
                if(valid){
                    // this.request默认是get接口，当后端为post接收json对象时会报错
            this.request.post("/user/login" , this.user).then(res=>{
                if(res.code=='200'){
                    // JSON.stringify 将JavaScript 对象转换为 JSON 字符串
                    localStorage.setItem("user",JSON.stringify(res.data)) //存储用户信息到浏览器
                     this.$router.push("/")
                     this.$message.success("登陆成功")
                }else{
                     this.$message.error(res.msg)
                }
                 })
                }
            });
          
        },
    }
}
</script>

<style >
       .wrapper{
           height: 100vh;
           background-image: linear-gradient(to bottom right, #FC4668 ,#3F5EFB);
           overflow: hidden;
       }
       .title{
           margin: 200px auto;
           background-color: #fff;
           width: 350px;
           height: 300px;
           padding: 20px;
           border-radius: 5px;
       }
       .button{
           margin: 10px 0;
           text-align: right;
       }
</style>