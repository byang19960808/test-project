<template>
  <el-container>
    <el-main>
      <h2>教室管理</h2>
      <div class="class-contniner">
        <!-- 添加按钮 -->
        <el-button type="primary"
                   @click="open">+添加教室</el-button>
        <!-- 添加按钮 -->
        <!-- 表格 -->
        <el-table :data="arr"
                  style="width: 100%">
          <el-table-column prop="room_text"
                           label="教室号"
                           width="600">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="opens(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <!-- 操作 -->
        </el-table>
      </div>
      <template>
	          <el-col :span="24" class="toolbar" style="text-align: center;">
	          	<el-pagination
              		  @size-change="handleSizeChange"
                  	@current-change="handleCurrentChange" 
                  	:current-page="currentPage"
                  	:page-sizes="[5, 8, 15]"
                  	:page-size="pagesize" 
                  	layout="total, sizes, prev, pager, next, jumper"
                  	:total="AllClassRoom.length">
              </el-pagination>
	</el-col>
</template>
    </el-main>
    <!-- 添加弹框组件 --> 
    <OneFrom v-if="FromFlag"
             :FromFlag.sync="FromFlag"> </OneFrom>
    <!-- 添加弹框组件 -->
    
  </el-container>
  
</template>
<script>
import { mapActions, mapState } from "vuex";
import OneFrom from "../../../components/alerts/classset";
export default {
    components: {
        OneFrom
    },
    data() {
        return {
            FromFlag: false,
            total: 0, // 列表内所有数据的长度
      		  currentPage: 1, // 初始页
            pagesize: 5, // 当前页面内的列表行数
            allClass:[],
            arr:[]
        };
    },
    computed: {
        ...mapState({
            AllClassRoom: state => state.setClass.AllClassRoom
        })
    },
    beforeUpdate() {
        this.arr = this.AllClassRoom.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    },
    methods: {
        ...mapActions({
            getAllClassRoom: "setClass/getAllClassRoom",
            deleteClassRoom: "setClass/deleteClassRoom"
        }),
        open() {
            this.FromFlag = true;
        },
        handleSizeChange: function(pagesize) {
            this.pagesize = pagesize;
            this.arr = this.AllClassRoom.slice((this.currentPage - 1) * pagesize, this.currentPage * pagesize)
            console.log(this.pagesize); // 每页下拉显示数据
            this.getAllClassRoom();
        },
        // 换页：更新列表数据
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.arr = this.AllClassRoom.slice((currentPage - 1) * this.pagesize, currentPage * this.pagesize)
            console.log(this.currentPage); //点击第几页
            this.getAllClassRoom();
        },
        opens(index, item) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.deleteClassRoom(item.room_id),
                this.getAllClassRoom()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created() {
        this.getAllClassRoom();
    }
};
</script>
<style scoped  lang="scss">
.el-main {
  background-color: #f0f2f5;
}
.el-button {
  margin-bottom: 20px;
}
.class-contniner {
  padding: 24px;
}
</style>
