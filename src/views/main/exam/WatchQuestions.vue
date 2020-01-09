<template>
  <div class="wrtchQuestions">
      <div class="box">
          <div class="Tab">
         课程类型: <span v-for="(item,index) in subject" :key="index" @click="btn(index)" :class="[count==index?'col':'']" >
          {{item.subject_text}}
          </span>
          </div>
          <div class="check">
          <div>
            考试类型：
              <el-select v-model="examTypes" placeholder="请选择">
                <el-option
                  v-for="item in examType"
                  :key="item.exam_id"
                  :label="item.exam_name"
                  :value="item.exam_name">
                </el-option>
              </el-select>
          </div>
          <div>
           题目类型：
              <el-select v-model="getQuestionsTypes" placeholder="请选择">
                <el-option
                  v-for="item in getQuestionsType"
                  :key="item.questions_type_id"
                  :label="item.questions_type_text"
                  :value="item.questions_type_text">
                </el-option>
              </el-select>
          </div>
            <el-button type="primary" plain><i class="el-icon-search"></i> 查询</el-button>
          </div>
      </div>
      <div class="main">
      <div class="main-itmes" v-for="(item,index) in questions" :key="index">
       <div class="let">
        <p>
          {{item.title}}
        </p>
        <div>
          <span>{{item.questions_type_text}}</span>
          <span>{{item.subject_text}}</span>
          <span>{{item.exam_name}}</span>
        </div>
        <p>
        {{item.user_name}}&nbsp;发布
        </p>
       </div>
       <div class="rig">
        编辑
       </div>
      </div>
      </div>
  </div>
</template>

<script>
import axios from "../../../util/axiosAgain"
export default {

    created(){
        axios.get("/exam/subject").then(res=>{
            this.subject = res.data.data
        })
        axios.get("/exam/examType").then(res=>{
            this.examType = res.data.data
        })
        axios.get("/exam/getQuestionsType").then(res=>{
            this.getQuestionsType = res.data.data
        })
        axios.get("/exam/questions/new").then(res=>{
            this.questions = res.data.data
            console.log(this.questions)
        })
    },
    data(){
        return{
            subject:[],
            examTypes:"",
            examType:[],
            questions:[],
            getQuestionsTypes:"",
            getQuestionsType:[],
            count:-1,
            value: ''
        }
    },
    methods:{
        btn(index){
            console.log(index)
            this.count = index
        }
    }
}
</script>

<style lang="scss" scoped>
.wrtchQuestions{
  width: 100%;
  height: 96%;
}
.box{
  width: 100%;
  padding:20px;
  height: 150px;
  background: #fff;
  border-radius: 10px;
}
.Tab{
display: flex;
height: 40px;
line-height: 40px;
}
.Tab span{
  font-size: 12px;
  margin-left: 10px;
  display: inline-block;
  margin-top: 8px;
  height: 25px;
  line-height: 25px;
  padding:0 8px;
  border-radius: 5px;
}
.Tab span:hover{
  color: red;
}
.el-button{
    height: 40px;
}
.col{
  background: rgb(0, 128, 255);
  color:#fff;
}
.check{
  display: flex;
  height: 100%;
  margin-top: 25px;
}
.check>div{
height: 100%;
margin-right: 50px;
}
.main{
  width: 98%;
  border-radius: 10px;
  background: #fff;
  margin-top: 20px;
  padding: 1%;
}
.main-itmes{
  width: 90%;
  margin-top: 5px;
  margin-left: 20px;
  border-bottom:1px solid #ccc;
  display: flex;
  padding: 20px;
  justify-content: space-between;
}
.let p{
  line-height: 40px;
}
.let p:nth-child(3){
  color: cornflowerblue;
}
.let span{
  font-size: 10px;
  margin-left: 10px;
  padding: 3px 7px;
  border-radius: 5px;
}
.let span:nth-child(1){
  border:1px solid rgb(0, 208, 255);
  color: rgb(79, 98, 225);
}
.let span:nth-child(2){
  border:1px solid rgb(43, 43, 211);
  color: rgb(10, 28, 149);
}
.let span:nth-child(3){
  border:1px solid rgb(220, 173, 87);
  color: rgb(236, 142, 42);
}
.rig{
  line-height: 90px;
  color: blue;
}
</style>

