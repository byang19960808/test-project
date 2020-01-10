<template>
    <div class="box-con">
        <header>
           <div>
             <span>状态 ：</span>
             <el-select v-model="Values" placeholder="请选择" style="width:500px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
           </div>
           <div>
             <span>班级 ：</span>
             <el-select v-model="value" placeholder="请选择" style="width:500px">
              <el-option
                v-for="item in pageList"
                :key="item.grade_id"
                :value="item.grade_name">
              </el-option>
            </el-select>
           </div>
            <el-button type="primary" icon="el-icon-search" class="btn" >搜索</el-button>
        </header>
      <main>
          <div class="conent">
          <el-table
              :data="achievement"
              style="width: 100%">
            <el-table-column
                label="班级"
                >
                <span>{{Class}}</span>
            </el-table-column>
            <el-table-column
                label="姓名"
                prop="student_name">
              </el-table-column>
              <el-table-column
                label="阅卷状态"
                prop="status"
                >
                  <!-- <span v-if="achievement.status == 0">未阅</span>
                  <span v-else>已阅</span> -->
              </el-table-column>
              <el-table-column
                label="开始时间"
                prop="start_time">
              </el-table-column>
              <el-table-column
                label="结束时间"
                prop="end_time">
              </el-table-column>
              <el-table-column
                label="成材率"
                prop="score">
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
        </div>
      </main>
    </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
    data() {
        return {
            options: [],
            value: '',
            Values:"",
            Class:this.$route.query.name,
            search: '',

        }
    },
    methods: {
        ...mapActions("Correction", ["gitStudent"]),
        handleClick(index) {
            console.log(index);
            this.$router.push({name:"detail"})
            this.gitStudent(index.exam_student_id)
        }
    },
    async mounted() {
        
    },
    computed: {
        ...mapState("Correction", ['achievement', 'pageList'])
    },
}
</script>

<style lang="scss" scoped>
.box-con{
  background: #eee;
}
header{
    background: #ccc;
    padding: 24px;
    height: 80px;
    width: 90%;
    margin: 50px 70px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    div{
      margin-left: 40px;
      width: 400px;
      display: flex;
      span{
        display: flex;
        width: 100px;
        justify-content: center;
        align-items: center;
      }
    }
}
.btn{
  margin-left: 50px;
  width: 120px;
}
main{
  // width: ;
}
.conent{
  width: 90%;
  border-radius: 10px;
  background: #fff;
  margin: 50px 70px 20px;
  padding: 30px;
}
</style>
