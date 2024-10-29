<template>
      <!-- 导航栏主体 -->
    <el-menu :default-openeds="['1', '3']"  style="min-height: 100%; overflow-x:hidden "
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
     >
     <div style="height:60px ; line-height:60px ; text-align:center">
       <img src="../assets/smileimg.jpg" alt="" style="width:30px;position: relative;top:8px">
           <b style="color:white" v-show="logoTextShow">后台管理系统</b>
     </div>
 
          <el-menu-item index="/">  <template slot="title"><i class="el-icon-house"></i>
             <span slot="title">首页</span>
          </template></el-menu-item>
    
      <el-submenu index="2">
         <template slot="title"><i class="el-icon-menu"></i><span slot="title">系统管理</span></template>
             <el-menu-item index="/user"> <template slot="title"><i class="el-icon-s-custom"></i>
             <span slot="title">用户管理</span>
             </template></el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name:"Aside",
    props:{
      isCollapse:Boolean,
      logoTextShow:Boolean
    }
}
</script>

<style scoped>

</style>