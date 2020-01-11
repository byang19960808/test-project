<template>
  <div class="wrtchQuestions">
      <div class="box">
          <div class="Tab">
         课程类型: <span v-for="(item,index) in subject" :key="index" @click="btn(index,item.subject_id)" :class="[count==index?'col':'']" >
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
                  :value="item.exam_id">
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
                  :value="item.questions_type_id">
                </el-option>
              </el-select>
          </div>
            <el-button type="primary" plain @click="query" ><i class="el-icon-search"></i> 查询</el-button>
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
import {mapActions, mapState} from 'vuex'
import http from '../../../util/axiosAgain';
export default {
    data(){
        return{
            subject:[],
            examTypes:"",
            examType:[],
            questions:[],
            getQuestionsTypes:"",
            getQuestionsType:[],
            count:-1,
            value: '',
            subjectId:''
        }
    },
    methods:{
        btn(index, id){
            console.log(index)
            this.count = index;
            this.subjectId = id;
        },
        query(){
            let { subjectId, examTypes, getQuestionsTypes } = this.$data;
            let obj = {};
            if(subjectId.trim() !== ''){
                obj['subject_id'] = subjectId
            }
            if(examTypes.trim() !== ''){
                obj['exam_id'] = examTypes
            }
            if(getQuestionsTypes.trim() !== ''){
                obj['questions_type_id'] = getQuestionsTypes
            }
            if(subjectId.trim() !== '' || examTypes.trim() !== '' || getQuestionsTypes.trim() !== ''){
                axios.get('/exam/questions/condition', {...obj}).then((res)=>{
                    this.questions = res.data.data
                })
            }
        }
    }
}
//http://127.0.0.1:7001/exam/questions/condition?subject_id=&exam_id=jpg8y9-zbzt7o-jpvuhf-fwnjvr&questions_type_id=fwf0t-wla1q
//http://localhost:8080/api/exam/questions/condition?exam_id=jpg8y9-zbzt7o-jpvuhf-fwnjvr&getQuestionsTypes=fwf0t-wla1q
</script>

<style lang="scss" scoped>
// .box_ {
//   width: 100%;
//   height: 865px;
//   overflow: auto;
  
// }
.box_top {
  width: 97%;
  height: 210px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  font-size: 14px;
  
  .box-con{
     width: 100%;
     height: 30px;
     margin: 40px 10px;
     display: flex;
      span{
          width: 100px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  }
  .box_con{
     width: 90%;
     height: 40px;
     margin: 20px 10px;
     display: flex;
     margin-top: 40px;
     .left_box{
      
       span{
         padding: 10px;
       }
     }
     .right_box{
       margin-left: 10px;
       span{
         padding: 10px;
      
       }
     }
     .select{
       margin-left: 20px;
       
     }
  }
  .btn{
    margin-left: 30px;
  }
}
.box_bottom{
  width: 97%;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  margin-top: 30px;
  font-size: 14px;
  .list{
    width: 100%;
    height: 100%;
    .newLi{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      /* color: #f2e7e5; */
      font-family: "华文新魏";
      border: 0;
    }
    .newLi:hover{
     background: #fff;
    }
    li:hover{
      background: #F7F8FF;
      cursor: pointer;
    }
    li{
      width: 97%;
      margin: 0 auto;
      height: 150px;
      display: flex;
      border-bottom: 1px solid #ccc;
      div{
        &:nth-child(1){
          flex: 9;
          display: flex;
          flex-direction: column;
          p{
            flex: 1;
            display: flex;
            align-items: center;
            &:nth-child(2){
               span{
                 margin-right: 20px;
                 border: 1px solid ;
                 padding: 4px 10px;
                 border-radius: 5px;
                 &:nth-child(1){
                    border-color:#91D5FF; 
                    background: #E6F7FF;
                    color: #1890FF;
                 }
                 &:nth-child(2){
                    border-color:#ADC6FF; 
                    background: #F0F5FF;
                    color: #2F54EB;
                 }
                 &:nth-child(3){
                   border-color:#FFD591; 
                    background: #FFF7E6;
                    color: #FA944C;

                 }
               }
            }
            &:nth-child(3){
              color: #0139FD;
              span{
                &:nth-child(2){
                  margin-left: 10px;

                 }
              }
            }
          }
        }
        &:nth-child(2){
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #0139FD;
        }
      }
    }
  }

}
</style>
<style>
.el-tabs__active-bar{
  background: #fff;
}
.el-tabs__nav-scroll{
  border: none;
}
.el-tabs__nav-wrap::after{
  background-color: #fff;
}
.el-tabs__item{
  padding: 0 15px;
}

</style>

