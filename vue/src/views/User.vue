<template>
    <div>
              
     
      <!-- 搜索框 -->
      <div  style="padding: 10px 0;">
           <el-input style="width:200px" suffix-icon="el-icon-search"   placeholder="请输入名称" v-model="username"> </el-input>
           <el-input style="width:200px" suffix-icon="el-icon-guide"   placeholder="请输入邮箱" class="ml-5" v-model="email"> </el-input>
           <el-input style="width:200px" suffix-icon="el-icon-office-building"   placeholder="请输入地址" class="ml-5" v-model="address"> </el-input>
           <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
            <el-button type="warming" @click="reset">重置</el-button>
      </div>
      <!-- 增删改查 -->
      <div  style="padding: 10px 0;">
        <el-button type="primary" @click="handelAdd">新增<i class="el-icon-smoking"></i> </el-button>
         <el-popconfirm
              class="ml-5"
               confirm-button-text='好的' 
               cancel-button-text='不用了' 
              icon="el-icon-info" 
              icon-color="red" 
              title="确认批量删除？"
              @confirm="delBatch"
              >
            <el-button type="danger" slot="reference">批量删除<i class="el-icon-no-smoking"></i> </el-button>
              </el-popconfirm>
       
        <el-button type="primary" class="ml-5">导入<i class="el-icon-upload2"></i> </el-button>
        <el-button type="primary">导出<i class="el-icon-download"></i> </el-button>
      </div>

      <!-- 表格 -->
      <el-table :data="tableData" border stripe header-cell-class-name="'headerBg'" @selection-change="handleSelectionChange"> 
        <el-table-column type="selection" width="55"></el-table-column>
         <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名" width="140"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
         <el-table-column prop="phone" label="电话号" ></el-table-column>
        <el-table-column prop="address" label="地址" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" @click="handleEdit(scope.row)">编辑<i class="el-icon-loading"></i></el-button>
              <el-popconfirm
              class="ml-5"
               confirm-button-text='好的' 
               cancel-button-text='不用了' 
              icon="el-icon-info" 
              icon-color="red" 
              title="这是一段内容确定删除吗？"
              @confirm="handleDelete(scope.row.id)"
              >
            <el-button type="dange" slot="reference"><i class="el-icon-no-smoking"></i> 删除</el-button>
              </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!--  分页组件 -->
      <div style="padding: 10px 0;">
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="pageSize"  
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
      </div>
      <!-- dialog弹窗
      dialogFormVisible这个boolean型变量控制弹窗是偶展示， -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >  
  <el-form  label-width="80px" size="small">
    <el-form-item label="用户名" >
      <el-input v-model="form.username" autocomplete="off"></el-input>
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
      <el-input v-model="form.address" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    name:"User",
    data(){
     return{
      tableData: [],
      multipleSelection :[],
      total:0,
      pageNum:1,    
      username:"",
      form:{},
      dialogFormVisible:false,
      email:"",
      address:"",
      pageSize:2,
          }
         } ,

    created(){
        this.load()
    },
    methods:{
            load(){
         request.get("/user/page" , {
         params:{
         pageNum:this.pageNum,
         pageSize:this.pageSize,
         username:this.username,
         email:this.email,
         address:this.address,
         }
       }).then(res=>{
         console.log(res)
         this.tableData=res.records
         this.total=res.total
       })
       // fetch方式请求后端接口
        //请求分页查询数据
  //  fetch("http://localhost:9090/user/page?pageNum="+this.pageNum+"&pageSize="+this.pageSize+"&username="+this.username)
  //  .then(res => res.json()) .then(res =>{
  //    console.log(res)
  //    this.tableData=res.data
  //    this.total=res.total
  //         }) 
     },
     handleSelectionChange(val){
      console.log(val)
      this.multipleSelection=val
     },
     delBatch(){
       let ids=this.multipleSelection.map(v => v.id) //扁平化处理 ，将获取到的val对象数组转变为id数组
        request.post("/user/del/batch",ids).then(res=>{
         if(res){
           this.$message.success("Batch delete success")
           this.load()
         }else{
           this.$message.success("Batch delete error")
         }
     })
     },
     handleDelete(id){
      request.delete("/user/"+id).then(res=>{
         if(res){
           this.$message.success("delete success")
           this.load()
         }else{
           this.$message.success("delete error")
         }
     })
     },
     handleEdit(row){
     this.form=row
     this.dialogFormVisible=true
     },
     handelAdd(){
       this.dialogFormVisible=true,
       this.form={}  
     },
     save(){
       this.dialogFormVisible=false,
       request.post("/user",this.form ).then(res=>{
         if(res){
           this.$message.success("success")
           this.load()
         }else{
           this.$message.success("error")
         }
       })
     },
     reset(){
        this.username="",
        this.email="",
         this.address="",
         this.load()
     },
       
     handleSizeChange(pageSize){
     console.log(pageSize)
     this.pageSize=pageSize
     this.load()
     },
     handleCurrentChange(pageNum){
      console.log(pageNum)
      this.pageNum=pageNum
      this.load()
     },

        }
    
}
</script>

<style scoped>

  .headerBg{
   background-color:rgb(240, 234, 234) !important; 
  }

</style>