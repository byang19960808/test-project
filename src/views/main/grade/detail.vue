<template>
  <div>
     
    <p class="management">阅卷</p>
    <div class="box-top">
        <div class="right">
        <ol v-for="(item,index) in Classroom.questions" :key="index">
        <li>{{index+1}}. {{item.title}}<span>{{item.questions_type_text}}</span></li>
        <Markdown  v-model="item.questions_stem" :height="300"  style="width:98%; margin:auto; border:none;" :isPreview="true" theme="gitHub" />

        <li class="newLi">
          <div class="left_">
             <p>学生答案</p>
          </div>
          <div  class="right_">
            <p>标准答案</p>
            <Markdown  v-model="item.questions_answer" style="width:98%; margin:auto; border:none;" :isPreview="true" theme="gitHub" />
       
          </div>
        </li>
         </ol>
        </div>

    </div>
        <div class="left">
          <p>{{Classroom.student_name}}</p>
          <p>得分：<span class="span" >{{value}}</span></p>
            <div class="block">
               <el-slider
                v-model="value">
              </el-slider>
           </div>
           <el-button type="primary" class="ben" @click="hedOpen">确认</el-button>
        </div>
   
  </div>
</template>
<script>
import Markdown from 'vue-meditor'
import {mapState, mapActions} from 'vuex';
import http from '../../../util/axiosAgain';
export default {
    props:[],
    components:{
        Markdown
    },
    data(){
        return {
            value: 0
        }
    },
    computed:{
        ...mapState("Correction", ["Classroom"])
    },
    methods:{
        ...mapActions("Correction", ["getMarking"]),
        open() {
            this.$confirm(`确定提交阅卷结果？${this.value}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                http.put("/exam/student/t27znv-gu7azm-qpq9ai-laaf9m", {score:this.value}).then(res=>{
                    if(res.data.code === 1){
                        this.$message({
                            type: 'success',
                            message: '批卷成功!'
                        });
                    }else{
                        this.$message({
                            type: 'info',
                            message: '批卷失败!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '批卷失败'
                });
            });
        },
        hedOpen(){
            this.open()
        }
    },
    created(){
        console.log(this.Classroom.student_name)
    },
    mounted(){

    }
}
</script>
<style scoped lang="scss">
.box-top{
  width: 97%;

  margin:0 auto;
  display: flex;
  border-radius: 10px;
  .right{
    width: 80%;
    height: 100%;
    background: #fff;
    border-radius: 10px;
  }

}
  .left{
    width: 300px;
    height: 190px;
    background: #fff;
    margin-left: 25px;
    border-radius: 10px;
    position: fixed;
    right: 20px;
    top: 150px;
    p{
      margin-top: 10px;
      margin-left: 25px;
      .span{
      color: blue;
    }
    
    }
    .block{
      width: 80%;
      margin-left: 30px;
      margin-top: 10px;
    }
    .ben{
      margin-left: 30px;
      margin-top: 10px;
    }
  }
.box-bottom{
  width: 100%;
  height: 600px;
  background: #fff;
  margin-top: 20px;

}
ol{
  width:100%;
  margin-top: 50px;
  li{
    width: 97%;
    margin: 10PX auto;

    span{
        background: #E6F7FF;
        color: #1890FF;
        border:1px solid #91D5FF;
        padding: 1px 10px;
        border-radius: 3px;
        margin-left: 10px;

    }
  }
  .newLi{
      display: flex; 
      border-bottom: 1px solid #ccc;
       div{
         width: 50%;
       }
       p{
         display: flex;
         align-items: center;
         justify-content: center;
       }
  }
}
</style>
