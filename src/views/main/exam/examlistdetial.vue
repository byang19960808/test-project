<template>
  <div class="box_">
      <p class="management">详情列表</p>
      <div class="container">
        <div class="left">
          <markDown v-for="(v,i) in examlist" :key="i" :item="v" :i="i"/>
        </div>
        <div class="right">
            <p></p>
        </div>
      </div>
  </div>
</template>
<script>
import axios from '../../../util/axiosAgain'
import markDown from '../../../components/editmarkdown'
export default {
    data(){
        return {
            id:this.$route.query.id,
            examlist:[]
        }
    },
    methods:{
        getdata(){
            axios.get(`/exam/exam/${this.id}`).then(res=>{
                this.examlist = res.data.data.questions;
                console.log(this.examlist)
            })
        }
    },
    created(){
        this.getdata()
    },
    components:{
        markDown
    }
}

</script>
<style scoped lang="scss">
.box_ {
  width: 100%;
  height: 865px;
}
.container{
  width: 97%;
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
</style>

