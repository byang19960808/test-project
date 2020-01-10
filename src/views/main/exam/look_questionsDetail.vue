<template>
  <div class="box_">
      <p class="management">试题详情</p>
      <div class="container">
        <div class="left">
          <p><span>出题人 ： </span><span>{{questionsList.user_name}}</span></p>
          <p>题目信息</p>
          <p><span>{{questionsList.questions_type_text}}</span><span>{{questionsList.subject_text}}</span><span>{{questionsList.exam_name}}</span></p>
          <p>{{questionsList.title}}</p>
           <Markdown v-model="questionsList.questions_stem"  style="width:98%; margin:auto; border:none;"  :isPreview="true"/>
        </div>
        
        <div class="right">
            <p>答案：</p>
         <Markdown v-model="questionsList.questions_answer"  style="width:98%; margin:auto; border:none;" :isPreview="true"/>
        </div>
      </div>

  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import Markdown from 'vue-meditor'

export default {
    data() {
        return {


        }
    },
    created() {
        this.getQuestions(this.$route.params.name.questions_id)
    },
    methods: {
        ...mapActions("Check", ["getQuestions"]),
      
        
    },
    computed: {
        ...mapState("Check", ["questionsList"])
    },
    components:{
        Markdown
    },

}

</script>
<style scoped lang="scss">
.box_ {
  width: 100%;
  height: 865px;
  overflow: auto;
}
.container{
  width: 97%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  .left{
    flex: 7;
    background: #fff;
    border-radius: 10px;
    font-size: 14px;
    p{
      margin-left: 20px;
      margin-top: 20px;
      &:nth-child(3){
               span{
                 margin-right: 20px;
                 border: 1px solid ;
                 padding: 1px 14px;
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
    }
  }
  .right{
    flex: 3;
    margin-left: 20px;
    background: #fff;
    border-radius: 10px;
    font-size: 14px;
    p{
      margin-left: 20px;
      margin-top: 20px;

    }
  }
}
.ondialog{
    width: 100%;
    height:70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 40px auto;
}
</style>
