<template>
  <el-container>
    <el-main>
      <h2>班级管理</h2>
      <div class="class-contniner">
        <!-- 添加按钮 -->
        <el-button type="primary"
                   @click="open">+添加班级</el-button>
        <!-- 添加按钮 -->

        <!-- 表单弹层 -->
        <FromMark v-if="FromFlag"
                  :FromFlag.sync="FromFlag" :AllClassRoom="AllClassRoom" :Allsubject="Allsubject" :AddorSet.sync="AddorSet"></FromMark>
        <!-- 表单弹层 -->

        <!-- 表格 -->
        <el-table :data="classList"
                  style="width: 100%">
          <el-table-column prop="grade_name"
                           label="班级名"
                           width="180">
          </el-table-column>
          <el-table-column prop="subject_text"
                           label="课程名"
                           width="180">
          </el-table-column>
          <el-table-column prop="room_text"
                           label="教室号">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                  <el-button type="danger" size="mini" @click="opens(scope.$index, scope.row)">删除</el-button>
              </template>
          </el-table-column>
          <!-- 操作 -->
        </el-table>
        <!-- <Page :item="{total,currentPage,pagesize}" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></Page> -->
        <!-- 表格 -->
      </div>
    </el-main>
  </el-container>
</template>

<script>
//表单弹层
import FromMark from "../../../components/alerts/index";
import axios from "../../../util/axiosAgain"
import { mapActions, mapState } from 'vuex';
//公共的分页器
// import Page from "../../../components/paingdevice/Page"
export default {
    components: {
        FromMark,
        // Page
    },
    data() {
        return {
            FromFlag: false,
            AllClassRoom:[],
            Allsubject:[],
            AddorSet:null
        };
    },
    computed:{
        ...mapState({
            classList: state=>state.setClass.classList
        })
    },
    methods: {
        ...mapActions({
            getAllClassRoom:"setClass/getAllClassRoom",   
            getIfClassRoom: "setClass/getIfClassRoom",
            deleteClass:"setClass/deleteClass",
            updataClass:"setClass/updataClass"
        }),
        //编辑事件
        handleEdit(index, row) {//修改
            localStorage.setItem("grade_name", row.grade_name);
            localStorage.setItem("subject_text", row.subject_text);
            localStorage.setItem("room_text", row.room_text);
            localStorage.setItem("grade_id", row.grade_id);
            this.FromFlag = true;
            this.AddorSet = true;
        },
        //删除事件
        handleDelete(index, row) {
            this.deleteClass(row.grade_id).then(res=>{                
                console.log(res)
                if(res.data.code === 1){
                    this.getIfClassRoom();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }
                
            })
        },
        //添加弹出蒙层
        open() {//添加
            this.FromFlag = true;
            this.AddorSet = false;
            localStorage.removeItem("grade_name")
            localStorage.removeItem("room_text")
            localStorage.removeItem("subject_text")
            localStorage.removeItem("grade_id")
            this.getOptions()
        },
        getOptions(){
            axios.get("/manger/room").then(res=>{
                console.log(res, this.AllClassRoom)
                this.AllClassRoom = res.data.data
            }),
            axios.get("/manger/grade").then(res=>{
                console.log(res, this.Allsubject)
                this.Allsubject = res.data.data
            })
        },
        opens(index, item) {//index, item
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                console.log(item)
                this.deleteClass(item.grade_id)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.getIfClassRoom()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created() {
        this.getIfClassRoom()
        
    }
};
</script>
<style scoped>
*{
   overflow: none !important;
}
</style>
