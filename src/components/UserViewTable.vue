<template>
   <div>
     <el-table
      :data="arr"
      style="width: 100%">
      <el-table-column
        prop="view_authority_text"
        label="视图权限名称"
      >
      </el-table-column>
      <el-table-column
        prop="view_id"
        label="视图id"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="identity_text"
        label="身份">
      </el-table-column> -->
    </el-table>
    <template>
	          <el-col :span="24" class="toolbar" style="text-align: center;">
	          	<el-pagination
              		  @size-change="handleSizeChange"
                  	@current-change="handleCurrentChange" 
                  	:current-page="currentPage"
                  	:page-sizes="[5,10,15]"
                  	:page-size="pagesize" 
                  	layout="total, sizes, prev, pager, next, jumper"
                  	:total="data.length">
              </el-pagination>
	</el-col>
</template>
   </div>
</template>

<script>
export default {
    name:'UserDataTable',
    props:['data'],
    data(){
        return{
            total: 0, // 列表内所有数据的长度
      		  currentPage: 1, // 初始页
            pagesize: 5, // 当前页面内的列表行数
            arr:[]
        }
    },
    methods:{
        handleSizeChange: function(pagesize) {
            this.pagesize = pagesize;
            this.arr = this.data.slice((this.currentPage - 1) * pagesize, this.currentPage * pagesize)
            console.log(this.pagesize); // 每页下拉显示数据
        },
        // 换页：更新列表数据
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.arr = this.data.slice((currentPage - 1) * this.pagesize, currentPage * this.pagesize)
            console.log(this.currentPage); //点击第几页
        }
    },
    beforeUpdate() {
        this.arr = this.data.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
        console.log(this.arr)
    }
}
</script>
