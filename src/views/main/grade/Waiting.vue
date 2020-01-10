<template>
 <div class="container">
    <el-table
    :data="list"
    style="width: 97%;margin:20px auto;border-radius:3px;"
    fit:true
    :header-cell-style="{'background': '#F4F7F9'}"
     >
    <el-table-column
      label="班级"
      prop="grade_name">
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="subject_text">
    </el-table-column>
      <el-table-column
      label="阅卷状态"
      prop="">
    </el-table-column>
      <el-table-column
      label="课程名称"
      prop="subject_text">
    </el-table-column>
      <el-table-column
      label="教室号"
      prop="room_text">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">批卷</el-button>
      </template>
    </el-table-column>
    
  </el-table>
  <!-- 分页 -->
    <!-- <Page :total="total" :pageSize="pageSize" :currentPage="currentPage" :getPage="getPage"/> -->
 </div>
</template>

<script>
import { mapState, mapActions, mapMutations} from 'vuex'
// import Page from './Page'
export default {
    props:["approval"],
    computed:{
        ...mapState("Correction", ["total", "pageSize", "currentPage", "list"])        
    },
    data() {
        return {
            search: '',   
        }
    },
    methods: {
        ...mapActions("Correction", ["getAchieve"]),
        ...mapMutations("Correction", ["getPage"]),          
        handleClick(index) {
            this.getAchieve(index.grade_id)
            this.$router.push({name:"classmate", query:{name:index.grade_name}})
        },
       
        

    },
    mounted() {

    },
    components:{
        // Page
    }
}
</script>
<style lang="scss" scoped>
.container{
  width: 97%;
  height:100%;
  margin: 0 auto;
  border-radius:10px;
  background: #fff;
  overflow: hidden;
}

</style>

