<template>
  <div class="questionType">
    <h3 > 试题分类</h3>
      <div class="questionType_form">
          <el-button type="primary" icon="el-icon-plus" @click="centerDialogVisible = true">添加类型</el-button>
            <el-table
            :data="tableData"
            :fit=true
            stripe
            style="width: 100%">
            <el-table-column
              prop="questions_type_id"
              label="类型ID"
            >
            </el-table-column>
            <el-table-column
              prop="questions_type_text"
              label="类型名称"
            >
            </el-table-column>
            <el-table-column
              prop="questions_type_sort"
              label="操作"
            >
            </el-table-column>
          </el-table>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span><el-input v-model="input" placeholder="请输入类型名称"></el-input></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
   
  </div>
</template>

<script>
import axios from '../../../util/axiosAgain';
export default {
    data() {
        return {
            tableData: [], 
            centerDialogVisible: false, 
            input:''
        }
    }, 
    mounted(){
        axios.get('/exam/getQuestionsType').then((res)=>{
            console.log(res)
            if(res.data.code === 1){
                console.log(this)
                this.$data.tableData = res.data.data
            }
        })
    }
}
</script>

<style>

</style>
