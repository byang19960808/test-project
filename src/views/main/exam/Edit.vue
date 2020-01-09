<template>
    <div class="edit">
           <h1>创建试卷</h1>
           <div>
                 <el-button plain>添加新题</el-button>
                 <div>
                        <p> {{examSucess}} </p>  
                        <p></p>
                        <div v-for="(item,index) in  examSucess.questions" :key="index">
                            <p>{{item}}</p>
                        </div>
                        <el-button plain @click="toExamList">创建试卷</el-button>
                 </div>
           </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    computed:{
        ...mapState({
            examSucess: state=>state.addExam.examSucess
        })
    },
    methods:{
        toExamList(){
            this.$router.push('/main/examlist')
        }
    }
}
</script>

<style>

</style>
