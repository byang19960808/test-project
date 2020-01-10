<!--  -->
<template>
  <div class='addExam'>
    <h1>添加考试</h1>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="考试名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="考试类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择考试类型">
            <el-option v-for="(item, index) in examType"  :key="index" :label='item.exam_name' :value="item.exam_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择课程" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择课程">
             <el-option v-for="(item,index) in subject" :key='index' :label="item.subject_text" :value="item.subject_id"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="设置题量" prop="num">
         <el-input-number v-model="ruleForm.num" controls-position="right" @change="handleChange" :min="3" :max="40"></el-input-number>
        </el-form-item>
       
        <el-form-item label="选择开始时间" prop="date1">
        <div class="block">
        
            <el-date-picker
              v-model="ruleForm.date1"
              type="datetime"
              placeholder="开始时间">
            </el-date-picker>
          </div>
        </el-form-item>
         
          <el-form-item label="选择结束时间" prop="date2">
        <div class="block">
           
            <el-date-picker
              v-model="ruleForm.date2"
              type="datetime"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </el-form-item>
          
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
import axios from '../../../util/axiosAgain';
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
                type:'',
                num: 4,
                date1:'',
                date2:''
            },
            examType:[],
            subject:[],
            rules: {
                name: [
                    { required: true, message: '请输入试卷名称', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择考试课程', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择考试类型', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择考试开始时间', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择考试结束时间', trigger: 'change' }
                ],
                num: [
                    { required: true, message: '请选择题量', trigger: 'blur' },
                ]
            }
        };
    },
    mounted(){
        axios.get('/exam/examType').then((res)=>{
            this.$data.examType = res.data.data
        })
        axios.get('/exam/subject').then((res)=>{
            this.$data.subject = res.data.data
        })
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let { name, region, type, date1, date2, num } = this.$data.ruleForm;
                    console.log( name, region, type, date1 * 1, date2 * 1, num)
                    axios.post('/exam/exam', {subject_id:region, exam_id:type, title:name, number:num, start_time:date1 * 1, end_time:date2 * 1}).then((res)=>{
                        console.log(res.data)
                        if(res.data.code === 1){
                            this.$store.state.addExam.examSucess = res.data.data;
                            this.$router.push('/main/exam/edit')
                        }else{
                            alert('创建试卷失败')
                        }
                      
                    })
                  
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleChange(value) {
            console.log(value);
        }
    }
  
}
</script>

<style>
    .el-form-item__content{
      text-align: left;
    }
</style>
