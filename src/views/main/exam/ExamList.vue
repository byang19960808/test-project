<template>
    <div class="exam_item box_">
        <h2 class="management">考试列表</h2>
         <header>
           <div >
            <span>考试类型:</span>
             <el-select v-model="type" placeholder="请选择" style="width:500px">
              <el-option
                v-for="item in addexamType"
                :key="item.exam_id"
                :label="item.exam_name"
                :value="item.exam_id"
                >
              </el-option>
            </el-select>
           </div>
           <div>
             <span>课程:</span>
             <el-select v-model="manga" placeholder="请选择" style="width:500px">
              <el-option
                v-for="item in management"
                :key="item.subject_id"
                :label="item.subject_text"
                :value="item.subject_id">
              </el-option>
            </el-select>
           </div>

            <el-button type="primary" icon="el-icon-search" class="btn" @click="search">搜索</el-button>

        </header>
        <div class="item">
            <p class="tab">
                <span>试卷列表</span>
                <el-button-group>
                    <el-button v-for="(v,i) in btn" :key="i" @click="tabtn(i)">{{v}}</el-button>
                </el-button-group>
            </p>
            <el-table
                :data="tableData"
                style="width: 97%;margin:0 auto;border-radius:3px;"
                :header-cell-style="{'background':'#F4F7F9'}"
                >
                <el-table-column
                label="试卷信息"
                prop="title"
                width="300px"
                >
                </el-table-column>
                <el-table-column
                label="班级"
                prop="grade_name">
                </el-table-column>
                <el-table-column
                label="创建人"
                prop="user_name">
                </el-table-column>
                <el-table-column
                label="开始时间"
                prop="start_time" 
                :formatter="timeFn"
                >
                </el-table-column>
                <el-table-column
                label="结束时间"
                prop="end_time"
                :formatter="timeFn"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                prop="name">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="text"
                    @click="handleEdit(scope.row)">详情</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from '../../../util/axiosAgain'
export default {
    data(){
        return {
            addexamType:[],
            management:[],
            type:'',
            manga:'',
            tableData:[],
            btn:['全部', '进行中', '已结束'],
            curindex:0,
            newdata:[]
        }
    },
    methods:{
        getoption(){
            axios.get('/exam/subject').then(res=>{
                if(res.data.code === 1){
                    this.management = res.data.data;
                }
            });
            axios.get('/exam/examType').then(res=>{
                if(res.data.code === 1){
                    this.addexamType = res.data.data;
                }
            });
        },
        getexamlist(){
            axios.get('/exam/exam').then(res=>{
                this.tableData = res.data.exam;
                this.newdata = res.data.exam;
            })
        },
        timeFn(row, column){
            const daterc = row[column.property]
            if(daterc !== null){
                const dateMat = new Date(parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10));
                const year = dateMat.getFullYear();
                const month = dateMat.getMonth() + 1;
                const day = dateMat.getDate();
                const hh = dateMat.getHours();
                const mm = dateMat.getMinutes();
                const ss = dateMat.getSeconds();
                const timeFormat = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
                return timeFormat;
            }
        },
        tabtn(index = 0){
            console.log(index)
            this.curindex = index;
        },
        search(){
            if(this.type && this.manga){//subject_id  exam_type            
                let searchdata = this.newdata.filter(v=>{
                    if(v.subject_id === this.manga && v.exam_type === this.type){
                        return v;
                    }
                })
                this.tableData = searchdata;
            }
        },
        handleEdit(row){
            this.$router.push({path:'/main/examlistdetial', query:{id:row.exam_exam_id}})
        }
    },
    created(){
        this.getoption();
        this.getexamlist();
    }
}
</script>

<style lang="scss" scoped>
.box_ {
  width: 100%;
  height: 865px;
  overflow: auto;
}

.box-con{
  background: #eee;
}
header{
    background: #fff;
    height: 120px;
    width: 97%;
    margin: auto;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    div{
      margin-left: 40px;
      width: 400px;
      display: flex;
      span{
        display: flex;
        width: 190px;
        justify-content: flex-end;
        align-items: center;
      }
    }
}
.btn{
  margin-left: 50px;
  width: 120px;
}
.item{
    width: 97%;
    margin: 0 auto;
    border-radius:10px;
    background: #fff;
    overflow: hidden;
}
.tab{
    width: 97%;
    height:70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
}

</style>
<style>
  .management {
  width: 97%;
  height: 85px;
  margin: 0 auto;
  line-height: 85px;
  font-size: 25px;
  font-weight:600; 
  font-family: "华文新魏";
}
</style>
