<template>
  <div class="studentBox">
    <h2>学生管理</h2>
    <div class="student_cont">
      <el-input placeholder="请输入学生姓名"></el-input>
      <el-input placeholder="请输入学生学号"></el-input>
      <template>
        <el-select placeholder="请选择教室号">
          <el-option></el-option>
        </el-select>
        <el-select placeholder="班级名">
          <el-option></el-option>
        </el-select>
      </template>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">重置</el-button>
    </div>
    <div>
      <el-table style="width: 100%" :data="Allstudent">
        <el-table-column prop="student_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="student_id" label="学号"></el-table-column>
        <el-table-column prop="state" label="班级"> </el-table-column>
        <el-table-column prop="room_text" label="教室"></el-table-column>
        <el-table-column prop="student_pwd"  label="密码"></el-table-column>
        <el-table-column label="操作">
           <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
import axios from "../../../util/axiosAgain"
export default {
    data(){
        return{
            Allstudent:[]
        }
    },
    mounted(){
        axios.get("/manger/student/new").then(res=>{
            this.Allstudent = res.data.data
        })
    },
    methods:{
        handleDelete(index, row) {
            axios.delete(`/manger/student/${row.student_id}`).then(res=>{
                console.log(index, row, res);
                if(res.data.code === 1){
                    alert(res.data.msg)
                    axios.get("/manger/student/new").then(res=>{
                        this.Allstudent = res.data.data
                    })
                }
                
            })
        }
    }
};
</script>
<style scoped>
.studentBox {
  width: 100%;
  height: 100%;
  /* background: #eee; */
  border-radius: 8px;
  padding-left: 20px;
}
h2 {
  padding: 10px;
}
.el-input {
  width: 180px;
  height: 45px;
  margin: 0 10px;
}
.el-select {
  margin: 0 10px;
}
.student_cont .el-button {
  background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
}
</style>
