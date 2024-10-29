
<template>

<!-- 导航收缩按钮 -->
    <div style=" line-height:60px ;display:flex;font-size:12px">
      <div style="flex:1 " >
            <span :class="collapsetBtnClass" style="cursor:pointer; font-size:18px" @click="collapse"></span>
<!-- 页签 -->
      
      <el-breadcrumb separator="/" style="display:inline-block;margin-left:10px;font-weight: bold;">
          <el-breadcrumb-item :to="'/'" >首页</el-breadcrumb-item>
          <el-breadcrumb-item >{{currentPathName}}</el-breadcrumb-item>
      </el-breadcrumb>
    
      </div>

      <div style="text-align"> 
        <el-dropdown style="cursor:pointer">
          <div style="display:inline-block">
               <img  :src="user.avatar" alt="" 
               style="width:30px ;border-radius:50% ;position:relative;top:10px">
                <span>{{user.nickname}}</span><i class="el-icon-arrow-down" style="magin-left:5px"> </i>
          </div>
      
        <el-dropdown-menu slot="dropdown"  style="width:100px;text-align:center;font-weight:900">
          <el-dropdown-item>
              <router-link to="/person">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item ><router-link to="/login">退出</router-link></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
    </div>
</template>

<script>

import request from '@/utils/request';
export default {
    name:"Header",
     props:{
      collapsetBtnClass:String,
      collapse:Function,
    },
    computed:{
      currentPathName(){
         return this.$store.state.currentPathName; //需要监听的数据
      }
    },
    data(){
      return{
      currentPathName:'',
      // JSON.parse将JSON字符串转为JSON对象
      user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {} ,
    
      }
    },
    watch:{
     '$route':function(){
       this.currentPathName=localStorage.getItem("currentPathName") //取出route中设置的当前路由信息
     }
    },
    methods:{
    
      toLogin(){
        this.$router.push("login")
      }
    },
    
    created(){
    
      console.log(this.$route)
        this.request.get("/user/username/"+this.user.username).then(res=>{
          if(res.code=='200'){
              this.user=res.data
              console.log(res.data.avatar)
          }
       })
    }
    
}
</script>

<style scoped>

</style>