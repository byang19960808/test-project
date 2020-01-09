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
        <el-table :data="AllClassRoom"
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
    <!-- <Page :item="{total,currentPage,pagesize}" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></Page> -->

      </div>
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
//公共的分页器
// import Page from "../../../components/paingdevice/Page"
export default {
    components: {
        OneFrom,
        // Page
    },
    data() {
        return {
            FromFlag: false
        };
    },
    computed: {
        ...mapState({
            AllClassRoom: state => state.setClass.AllClassRoom
        })
    },
    methods: {
        ...mapActions({
            getAllClassRoom: "setClass/getAllClassRoom",
            deleteClassRoom: "setClass/deleteClassRoom"
        }),
        open() {
            this.FromFlag = true;
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
