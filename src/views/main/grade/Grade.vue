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
                  :FromFlag.sync="FromFlag" :AllClassRoom="AllClassRoom" :Allsubject="Allsubject"></FromMark>
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
              <span @click="handleEdit(scope.$index, scope.row)">编辑</span> |
              <span @click="handleDelete(scope.$index, scope.row)">删除</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
        </el-table>
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
export default {
    components: {
        FromMark
    },
    data() {
        return {
            FromFlag: false,
            AllClassRoom:[],
            Allsubject:[]
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
        }),
        //编辑事件
        handleEdit(index, row) {
            localStorage.setItem("grade_name", row.grade_name);
            localStorage.setItem("subject_text", row.subject_text);
            localStorage.setItem("room_text", row.room_text);
            localStorage.setItem("grade_id", row.grade_id);
            this.FromFlag = true;
        },
        //删除事件
        handleDelete(index, row) {
            this.deleteClass(row.grade_id).then(res=>{                
                console.log(res)
                this.getIfClassRoom()
            })
        },
        //添加弹出蒙层
        open() {
            this.FromFlag = true
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
