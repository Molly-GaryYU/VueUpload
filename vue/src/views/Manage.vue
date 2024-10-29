<template>
       <el-container style="min-height: 100vh">
  <el-aside width="sideWidth+'px'" style="background-color: rgb(238, 241, 246);box-shadow:2px 0 6px rgb(0, 21, 41 / 35%)" >
     <Aside  :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
  </el-aside>
  
  <el-container>
    <el-header style=" border-bottom:1px solid #ccc;" > 
      <Header :collapsetBtnClass="collapsetBtnClass" :collapse="collapse" />
    </el-header>
    <!-- 嵌套主体 -->
    <el-main>
      <!-- 表示当前页面子路由会在router-view内展示 -->
          <router-view  />
    </el-main>

  </el-container>
</el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
import Aside from "@/components/Aside";
import Header from '@/components/Header';


 export default {
  name: 'Manage',
   // 定义的一个变量data（）{}，msg是变量名
  data(){
    return {
      isCollapse:false,
      collapsetBtnClass:"el-icon-s-fold",
      sideWidth:200,
      logoTextShow:true,
    
    }
  },
 
  components:{
    Aside,
    Header
  },

   methods:{
     collapse(){  //点击收缩按钮触发
      this.isCollapse=! this.isCollapse //也就使每次点击后isCollapse值都取反
      if(this.isCollapse){  //导航栏收缩
        this.sideWidth=111
        this.collapsetBtnClass='el-icon-s-unfold'
        this.logoTextShow = false
      }else{  //导航栏展开
        this.sideWidth=200
        this.collapsetBtnClass="el-icon-s-fold"
        this.logoTextShow = true
      }
     },
 
   
     
   }
}
</script>

