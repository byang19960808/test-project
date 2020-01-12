<template>
  <div class="studentBox">
    <h2>学生管理</h2>
    <div class="student_cont">
      <el-input placeholder="请输入学生姓名" v-model="studentName"></el-input>
      <el-input placeholder="请输入学生学号" v-model="studentNum"></el-input>
      <template>
        <el-select placeholder="请选择教室号" v-model="room">
         <el-option v-for="(item, index) in roomArr"  :key="index" :label='item.room_text' :value="item.room_id"></el-option>
        </el-select>
        <el-select placeholder="班级名" v-model="grade">
         <el-option v-for="(item, index) in gradeArr"  :key="index" :label='item.grade_name' :value="item.grade_id"></el-option>
        </el-select>
      </template>
      <el-button type="primary" @click="searchBtn">搜索</el-button>
      <el-button type="primary" @click="resetBtn">重置</el-button>
    </div>
    <div>
      <el-table style="width: 100%" :data="arr">
        <el-table-column prop="student_name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="student_id" label="学号"></el-table-column>
        <el-table-column prop="grade_name" label="班级"> </el-table-column>
        <el-table-column prop="room_text" label="教室"></el-table-column>
        <el-table-column prop="student_pwd"  label="密码"></el-table-column>
        <el-table-column label="操作">
           <template slot-scope="scope">
              <!-- <el-button size="mini" type="danger" @click="DeleteBtn">删除</el-button> -->
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
      <template>
	          <el-col :span="24" class="toolbar" style="text-align: center;">
	          	<el-pagination
              		  @size-change="handleSizeChange"
                  	@current-change="handleCurrentChange" 
                  	:current-page="currentPage"
                  	:page-sizes="[8, 15, 20]"
                  	:page-size="pagesize" 
                  	layout="total, sizes, prev, pager, next, jumper"
                  	:total="Allstudent.length">
              </el-pagination>
	</el-col>
</template>
    </div>
      <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认删除吗？ 这将永久删除此条数据</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleClose">取 消</el-button>
    <el-button type="primary" @click="DeleteId">确 定</el-button>
  </span>
</el-dialog>
  </div>

</template>

<script>
import axios from "../../../util/axiosAgain"
export default {
    data(){
        return{
            Allstudent:[],
            total: 0, // 列表内所有数据的长度
      		  currentPage: 1, // 初始页
            pagesize: 8, // 当前页面内的列表行数
            arr:[],
            studentName:'', //学生姓名
            studentNum:'', //学生名字
            roomArr:[], //教室数据
            gradeArr:[], //班级数据
            room:'', //教室名
            grade:"", //班级好
            dialogVisible: false,
            student_id:"",
            cloneAllstudent:[]
        }
    },
    mounted(){
        axios.get("/manger/student").then(res=>{
            this.Allstudent = res.data.data;
            this.$data.cloneAllstudent = [...res.data.data]
        })
        axios.get('/manger/room').then(res=>{
            this.$data.roomArr = res.data.data
        })
        axios.get('/manger/grade').then(res=>{
            this.$data.gradeArr = res.data.data
        })
    },
    beforeUpdate() {
        this.arr = this.Allstudent.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    },
    methods:{
        handleDelete(index, row) {
            this.$data.dialogVisible = true;
            this.$data.student_id = row.student_id
            
        },
        dialogVisibleClose(){
            this.$data.dialogVisible = false;
            this.$data.student_id = ''
        },
        DeleteId(){
            let {student_id } = this.$data;
            axios.delete(`/manger/student/${student_id}`).then(res=>{
                if(res.data.code === 1){
                    axios.get("/manger/student").then(res=>{
                        this.Allstudent = res.data.data
                        this.$data.cloneAllstudent = [...res.data.data]
                        this.$data.dialogVisible = false;
                    })
                }               
            })
        },
        handleSizeChange: function(pagesize) {
            this.pagesize = pagesize;
            this.arr = this.Allstudent.slice((this.currentPage - 1) * pagesize, this.currentPage * pagesize)
            //console.log(this.pagesize); // 每页下拉显示数据
        },
        // 换页：更新列表数据
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.arr = this.Allstudent  .slice((currentPage - 1) * this.pagesize, currentPage * this.pagesize)
            //console.log(this.currentPage); //点击第几页
        },
        //搜索
        searchBtn(){
            let ArrStudent = [];
            let { room, grade, studentName, studentNum} = this.$data;
            this.$data.cloneAllstudent.forEach(item => {
                if(item.student_name === studentName){
                    ArrStudent.push(item)
                }
                if(item.grade_id === grade ){
                    ArrStudent.push(item)
                }
                if(item.room_id === room){
                    ArrStudent.push(item)
                }
                
                if(item.student_id === studentNum){
                    ArrStudent.push(item)
                }
            });
            this.Allstudent = ArrStudent;

        },
        //重置
        resetBtn(){
            this.$data.studentName = '';
            this.$data.studentNum = '';
            this.$data.room = '';
            this.$data.grade = '';
            axios.get("/manger/student").then(res=>{
                this.Allstudent = res.data.data;
                this.$data.cloneAllstudent = [...res.data.data]
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(a => {
                    console.log(a)
                    done();
                })
                .catch(a => {
                    console.log(a)
                });
                
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
