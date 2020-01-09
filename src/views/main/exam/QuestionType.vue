<template>
  <div class="questionType">
    <h3 > 试题分类</h3>
      <div class="questionType_form">
          <el-button type="primary" icon="el-icon-plus" @click="centerDialogVisible = true">添加类型</el-button>
            <el-table
            :data="arr"
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
          <el-button type="primary" @click="affirm">确 定</el-button>
        </span>
      </el-dialog>
    <template>
	          <el-col :span="24" class="toolbar" style="text-align: center;">
	          	<el-pagination
              		  @size-change="handleSizeChange"
                  	@current-change="handleCurrentChange" 
                  	:current-page="currentPage"
                  	:page-sizes="[2, 3, 5]"
                  	:page-size="pagesize" 
                  	layout="total, sizes, prev, pager, next, jumper"
                  	:total="tableData.length">
              </el-pagination>
	</el-col>
</template>
  </div>
</template>

<script>
import axios from '../../../util/axiosAgain';
export default {
    data() {
        return {
            tableData: [], 
            centerDialogVisible: false, 
            input:'',
            total: 0, // 列表内所有数据的长度
      		  currentPage: 1, // 初始页
            pagesize: 2, // 当前页面内的列表行数
            arr:[]
        }
    }, 
    mounted(){
        this.getData()
    },
    beforeUpdate() {
        this.arr = this.tableData.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    }, 
    methods:{
        handleSizeChange: function(pagesize) {
            this.pagesize = pagesize;
            this.arr = this.tableData.slice((this.currentPage - 1) * pagesize, this.currentPage * pagesize)
            console.log(this.pagesize); // 每页下拉显示数据
        },
        // 换页：更新列表数据
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.arr = this.tableData.slice((currentPage - 1) * this.pagesize, currentPage * this.pagesize)
            console.log(this.currentPage); //点击第几页
        },
        affirm(){
            let { input, tableData } = this.$data ;
            if(input.trim() !== ""){
                axios.get('/exam/insertQuestionsType', {text:input, sort: tableData.length + 1}).then((res) =>{
                    if(res.data.code === 1){
                        this.$message({
                            message: '数据插入成功',
                            type: 'success',
                        });
                        this.$data.centerDialogVisible = false;
                        this.getData()
                    }  
                })
            }else{
                this.$message({
                    message: '输入内容为空！',
                    type: 'warning',
                });
                this.$data.centerDialogVisible = false;
            }
        },
        getData(){
            axios.get('/exam/getQuestionsType').then((res)=>{
                console.log(res)
                if(res.data.code === 1){
                    console.log(this)
                    this.$data.tableData = res.data.data
                }
            })
        }
    }
}
</script>

<style>

</style>
