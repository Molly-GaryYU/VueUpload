<template>
    <el-card style="width:500px">
         <!-- action="" -->
        <el-form  label-width="80px" size="small">
            <el-upload
            style="text-align:center"
            class="avatar-uploader"
           
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
 <img v-if="form.avatar" :src="form.avatar" class="avatar">

  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         </el-upload>
    <el-form-item label="用户名" >
      <el-input v-model="form.username" disabled autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="昵称" >
      <el-input v-model="form.nickname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" >
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="电话" >
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="地址" >
      <el-input v-model="form.address" type="textarea" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item style="text-align:center">  
    <el-button type="primary" @click="save">确 定</el-button>
    </el-form-item>
  </el-form>
    </el-card >
</template>

<script>
import request from '@/utils/request';
export default{
    name:"Person",
    data(){
        return{
            form :{},
             user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        }
   
    },
    created(){
       this.request.get("/user/username/"+this.user.username).then(res=>{
          if(res.code=='200'){
              this.form=res.data
              console.log(res.data.avatar)
          }
       })
    },
    methods:{
          save(){
       request.post("/user",this.form ).then(res=>{
         if(res){
           this.$message.success("success")
         }else{
           this.$message.success("error")
         }
       })
     },
     handleAvatarSuccess(res){
         this.form.avatar=res
     }
    }
}

</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
