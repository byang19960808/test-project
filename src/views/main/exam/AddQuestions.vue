<template>
  <div class="questionWrap">
    <h1>添加试题</h1>
    <div class="allList">
      <p>题目信息</p>
      <p>题干</p>
      <el-input v-model="inputs" maxlength="20" placeholder="请输入题目标题，不超过20个字"></el-input>
      <p>题目主题</p>
      <mark-down style="height:360px;" v-model="values"/>
      <p>请选择考试类型：</p>
      <el-select v-model="examType" placeholder="请选择" style='width:300px' >
        <el-option
          v-for="item in examTypeList"
        :key="item.exam_id"
        :label="item.exam_name"
        :value="item.exam_id"
        ></el-option>
      </el-select>
      
      <p>请选择课程类型：</p>
      <el-select v-model="course" placeholder="请选择" style='width:300px'>
        <el-option
        v-for="item in allcourse"
        :key="item.subject_id"
        :label="item.subject_text"
        :value="item.subject_id"
        ></el-option>
      </el-select>
      <p>请选择题目类型：</p>
      <el-select v-model="questiontypes" placeholder="请选择" style='width:300px'>
        <el-option
        v-for="item in questionTypesList"
        :key="item.questions_type_id"
        :label="item.questions_type_text"
        :value="item.questions_type_id"
        ></el-option>
      </el-select>
      <p>答案信息</p>
      <mark-down style="height:360px;" v-model="values2"/>
      <el-button type="primary" style='width:150px;' @click="subFn">提交</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="SureSubFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import MarkDown from 'vue-meditor';
import axios from "../../../util/axiosAgain"
export default {
    components: {
        MarkDown
    },
    data() {
        return {
            inputs: "",
            allcourse:[],
            course:"",
            examTypeList:[],
            examType:"",
            questionTypesList:[],
            questiontypes :"",
            values:"",
            values2:"",
            dialogVisible: false
        };
    },
    created() {
        // 考试课程
        axios.get("/exam/subject").then(res=>{
            if(res.data.code === 1){
                this.allcourse = res.data.data;
            }
        });
        // 考试类型
        axios.get("/exam/examType").then(res=>{
            if(res.data.code === 1){
                this.examTypeList = res.data.data;
            }
        });
        // 题目类型
        axios.get("/exam/getQuestionsType").then(res=>{
            if(res.data.code === 1){
                this.questionTypesList = res.data.data;
            }
        });
    },
    methods:{
        SureSubFn(){
            let {examType, course, questiontypes, values, values2, inputs } = this.$data
            if(examType.trim() !== '' && course.trim() !== '' && questiontypes.trim() !== '' && values.trim() !== '' && values2.trim() !== '' && inputs.trim() !== ''){
                axios.get("/user/userInfo").then(({data})=>{
                    // console.log(data.data.user_id)
                    axios.post("/exam/questions", {questions_type_id:questiontypes, subject_id:course, exam_id:examType, user_id:data.data.user_id, questions_stem:this.inputs, questions_answer:this.values2, title:this.values}).then(({data})=>{
                        this.$message({
                            message: data.msg,
                            type: data.code === 1 ? "success" : "warning"
                        });
                        this.$data.dialogVisible = false;
                    })
                })
            }else{
                this.$message({
                    message: '不能为空',
                    type:"warning"
                });
                this.$data.dialogVisible = false;
            }

        },
        handleClose(done) {
            console.log(123)
            this.$confirm('确认关闭？')
                .then(a => {
                    console.log(123, a)
                    done();
                })
                .catch(a => {
                    console.log(111, a)
                });
        },
        subFn(){
            this.$data.dialogVisible = true;
        }
    }
};
</script>
<style lang="scss" scoped>
.questionWrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.questionWrap h1 {
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 30px;
}
.allList p {
  margin-bottom: 20px;
}
.el-input {
  margin-bottom: 30px;
}
.markdown  {
  margin-bottom: 30px;
}
.el-select{
  margin-bottom: 30px;
}
.el-button{
  background: #093ffd;
}
</style>
