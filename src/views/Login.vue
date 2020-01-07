<!--  -->
<template>
  <div class="login">
    <div class="login-form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
        <el-form-item label="用户名" prop="UserName">
            <el-input type="text" v-model="ruleForm.UserName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="UserPwd">
            <el-input type="text" v-model="ruleForm.UserPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
      <!-- <el-button :plain="true" @click="open2">成功</el-button> -->
      <!-- <button @click="login">登陆</button> -->
    </div>
  </div>
</template>
  
<script>
import axios from '../util/axiosAgain';
import cookie from 'js-cookie';
//el-icon-user
export default {
    data() {
        let validateUser = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else { 
                callback();
            }
        };
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (!/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(value)) {
                    callback(new Error('密码包含大小写字母、数字、特殊符号'));
                }
                callback();
            }
        };
        return {
            ruleForm: {
                UserPwd: '',
                UserName: ''
            },
            rules: {
                UserPwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                UserName: [
                    { validator: validateUser, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            let _this = this;
            console.log(_this)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let {   UserPwd,  UserName } = this._data.ruleForm;
                    axios.post('/user/login', {'user_name':UserName, "user_pwd":UserPwd }).then((res)=>{
                        console.log(res)
                        if(res.data.code === 1){
                            cookie.set('token', res.data.token)
                            this.$message({
                                message: '恭喜你，登录成功！',
                                type: 'success', 
                                onClose:function(){ _this.$router.push('/main') }
                            });
                        }
                    })
                    // alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // }
    }
};
</script>
<style>
</style>
