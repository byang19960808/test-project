<template>
  <el-col :span="24"
          class="toolbar"
          style="text-align: center;">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[5, 10, 25, 40]"
                   :page-size="pagesize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"></el-pagination>
  </el-col>
</template>
<script>
export default {
    data() {
        return {
            total: 0, // 列表内所有数据的长度
            currentPage: 1, // 初始页
            pagesize: 5 // 当前页面内的列表行数
        };
    },
    methods: {
    // 初始页page、初始每页数据数pagesize和数据data
    // 更换每页列内不同的行数：更新列表数据
        handleSizeChange: function(pagesize) {
            this.pagesize = pagesize;
            console.log(this.pagesize); // 每页下拉显示数据
            this.getUsers();
        },
        // 换页：更新列表数据
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage); //点击第几页
            this.getUsers();
        }
    }
};
</script>
