<template>
    <div class="box_">
       <h2 class="management">
           编辑试题
        </h2>
        <div class="item">
            <div class="item_look">
                <p>题目信息</p>
                <p>题干</p>
                <el-input v-model="input" placeholder="请输入题目标题，不超过20字" style="width:750px;"></el-input>
                <p>题目主题</p>
                <div class="markdown">
                    <Markdown @on-save="handleOnSave" v-model="markdata1" :height="400"/>
                </div>
                <div class="fromlist">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto">
                        <el-form-item label="考试类型" prop="type" >
                            <el-select v-model="ruleForm.type" placeholder="请选择考试类型">
                                <el-option
                                    v-for="item in addexamType"
                                    :key="item.exam_id"
                                    :label="item.exam_name"
                                    :value="item.exam_id">
                                    </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="选择课程" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择">
                                <el-option
                                v-for="item in management"
                                :key="item.subject_id"
                                :label="item.subject_text"
                                :value="item.subject_text">
                                </el-option>
                            </el-select>
                        </el-form-item>

                         <el-form-item label="题目类型" prop="quest" >
                            <el-select v-model="ruleForm.quest" placeholder="请选择题目类型">
                                <el-option
                                    v-for="item in questionData"
                                    :key="item.questions_type_id"
                                    :label="item.questions_type_text"
                                    :value="item.questions_type_id">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <p>答案信息</p>
                <div class="markdown">
                    <Markdown @on-save="handleOnSave" v-model="markdata2" :height="400"/>
                </div>
                <div class="ondialog">
                    <el-button type="primary" style="width:100px;" @click="submitFn">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Markdown from 'vue-meditor'
import http from '../../../util/axiosAgain'
import {mapActions, mapState} from 'vuex'

export default {
    data(){
        return {
            input: "",
            markdata1:'',
            markdata2:'',
            management:[],
            addexamType:[],
            questionData:[],
            ruleForm: {
                region: '',
                type:'',
                quest:''
            },
            rules: {
                region: [
                    { required: true, message: '请选择考试课程', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择考试类型', trigger: 'change' }
                ],
                quest: [
                    { required: true, message: '请选择试题类型', trigger: 'change' }
                ]
            }
        }
    },
    components:{
        Markdown
    },
    methods:{
        ...mapActions("Check", ["getQuestions"]),      
        handleOnSave({value, theme}){
            console.log(value, theme);
        },
        getoptions(){//配置项
            http.get('/exam/subject').then(res=>{//所有的课程
                if(res.data.code === 1){
                    this.management = res.data.data;
                }
            });
            http.get('/exam/examType').then(res=>{//考试类型
                if(res.data.code === 1){
                    this.addexamType = res.data.data;
                }
            });
            http.get('/exam/getQuestionsType').then(res=>{//试题类型
                this.questionData = res.data.data;
            })
        },
        submitFn(){//提交
            let id = Math.random().toString(16).slice(2, 6)
            this.$confirm('您要修改吗？, 确定要修改这道题吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                http.post('/exam/questions', {
                    questions_type_id:id,
                    questions_stem:this.markdata1,
                    subject_id:this.ruleForm.region,
                    exam_id:this.ruleForm.type,
                    user_id:this.userid,
                    questions_answer:this.markdata2,
                    title:this.input
                }).then(res=>{
                    if(res.data.code === 1){
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                        this.aligin()
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: res.data.msg
                        });
                    }
                }) 
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消提交'
                });          
            });
        },          
    },
    created(){
        this.getoptions()
        this.getQuestions(this.$route.params.id.questions_id)   
        console.log(this.questionsList)  
    },
    mounted() {
        let arr = this.questionsList
        if(this.questionsList){
            this.input = arr.title
            this.markdata1 = arr.questions_stem
            this.markdata2 = arr.questions_answer
            this.ruleForm = {
                region: arr.subject_text,
                type: arr.exam_name,
                quest: arr.questions_type_text
            }
        }          
        console.log(this.questionsList)
    },
    computed: {
        ...mapState("Check", ["questionsList"])
    },
}
</script>
<style lang="scss" scoped>
.box_ {
  width: 100%;
  height: 865px;
  overflow: auto;
}
.item{
    width: 97%;
    margin: 0 auto;
    border-radius:10px;
    background: #fff;
    overflow: hidden;
}
.item_look{
    width: 97%;
    margin: 0 auto;
}
p{
    width: 100%;
    height: 30px;
    line-height: 30px;
}
p:nth-child(1){
    margin-top: 30px
}
.markdown{
    width: 100%;
    height: 400px;
    margin: 0 auto;
}
.fromlist{
    width: 100%;
    margin-top: 30px;
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
