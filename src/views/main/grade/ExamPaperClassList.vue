<template>
    <div id="app">
            <div class="text">
                <h2>待批班级</h2>
            </div>
            <div class="form">
                <el-table
                    :data="arr"
                    style="width: 100%">
                    <el-table-column
                    label="班级名"
                    prop="grade_name">
                    </el-table-column>
                    <el-table-column
                    label="课程名称"
                    prop="subject_text">
                    </el-table-column>
                    <el-table-column
                    label="阅卷状态"
                    prop="name">
                    </el-table-column>
                    <el-table-column
                    label="课程名称"
                    prop="subject_text">
                    </el-table-column>
                    <el-table-column
                    label="成材率"
                    prop="room_text">
                    </el-table-column>
                    <el-table-column
                    align="center" label="操作">
                    <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleDelete(scope.$index, scope.row)">批卷</el-button>
                </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <template>
	          <el-col :span="24" class="toolbar" style="text-align: center;">
	          	<el-pagination
              		  @size-change="handleSizeChange"
                  	@current-change="handleCurrentChange" 
                  	:current-page="currentPage"
                  	:page-sizes="[5, 8, 10]"
                  	:page-size="pagesize" 
                  	layout="total, sizes, prev, pager, next, jumper"
                  	:total="allClass.length">
              </el-pagination>
	</el-col>
</template>
    </div>
    </div>
</template>

<script>
import axios from "../../../util/axiosAgain"
export default {
    data() {
    	return {
        	total: 0, // 列表内所有数据的长度
      		currentPage: 1, // 初始页
            pagesize: 5, // 当前页面内的列表行数
            allClass:[],
            arr:[]
        }
    },
	   // 初始页page、初始每页数据数pagesize和数据data
    // 更换每页列内不同的行数：更新列表数据
    methods:{
        handleSizeChange: function(pagesize) {
            this.pagesize = pagesize;
            this.arr = this.allClass.slice((this.currentPage - 1) * pagesize, this.currentPage * pagesize)
            console.log(this.pagesize); // 每页下拉显示数据
            this.getUsers();

        },
        // 换页：更新列表数据
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.arr = this.allClass.slice((currentPage - 1) * this.pagesize, currentPage * this.pagesize)
            console.log(this.currentPage); //点击第几页
            this.getUsers();
        }
    },
    created() {
        axios.get("/manger/grade").then(res=>{
            this.allClass = res.data.data;
            this.arr = this.allClass.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
            console.log(res)
        })
    },
}
</script>

<style lang="scss" scoped>
#app{
    background: #f0f2f5;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.text{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-indent: 2em;
    h2{
      font-weight:normal;  
    }
}
.form{
    width: 93%;
    .pagination{
        display: flex;
        // align-items:center;
    }
}
</style>
