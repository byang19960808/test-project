<template>
  <div class="addUser">
     <div> <h1>添加用户</h1></div>
     <div class="addUser-module">
        <!--  添加用户 修改  -->
        <div class="addUser-from">
          <p> <button   @click="ruleForm.ShowUser=true" :class="{active:ruleForm.ShowUser}">添加用户</button>
            <button @click="ruleForm.ShowUser=false" :class="{active:!ruleForm.ShowUser}">更新用户</button></p>
          <p>  <el-select v-model="ruleForm.userId" placeholder="请选择身份id" v-show="!ruleForm.ShowUser">
            <el-option v-for="(item, index) in user"  :key="index" :label='item.user_name' :value="item.user_id"></el-option>
          </el-select></p>
          <p>   <el-input v-model="ruleForm.text1" placeholder="请输入用户名"></el-input></p>
          <p>   <el-input v-model="ruleForm.text2" placeholder="请输入密码"></el-input></p>
          <p> <el-select v-model="ruleForm.IdentId" placeholder="请选择权限id">
            <el-option v-for="(item, index) in identity"  :key="index" :label='item.identity_text' :value="item.identity_id"></el-option>
          </el-select></p>
          <p>  <el-button type="primary" @click="submitUser">确定</el-button> <br/> <el-button @click="resetForm">重置</el-button> </p>
        </div>
        <!-- 添加身份 -->
         <div class="addUser-from">
          <p> <button  class="active">添加身份</button></p>   
          <p>   <el-input v-model="IdentityEdit.edit" placeholder="请输入身份名称"></el-input></p>
          <p>  <el-button type="primary" @click="IdentityEditBtn">确定</el-button> <br/> <el-button @click="IdentityEditreset">重置</el-button> </p>
        </div>
        <!-- 添加api接口权限 -->
         <div class="addUser-from">
          <p> <button  class="active">添加api接口权限</button></p>   
          <p>   <el-input v-model="authorityApi.text1" placeholder="请输入api接口权限名称"></el-input></p>
          <p>   <el-input v-model="authorityApi.text2" placeholder="请输入api接口权限url"></el-input></p>
          <p>   <el-input v-model="authorityApi.text3" placeholder="请输入api接口权限方法"></el-input></p>
          <p>  <el-button type="primary" @click="authorityApiBtn">确定</el-button> <br/> <el-button @click="authorityApireset">重置</el-button> </p>
        </div>
        <!-- 添加视图接口权限 -->
         <div class="addUser-from">
         <p> <button  class="active">添加视图接口权限</button></p>   
          <p>  <el-select v-model="ruleForm.viewAuthorit" placeholder="请选择已有视图">
            <el-option v-for="(item, index) in viewAuthorit"  :key="index" :label='item.view_authority_text' :value="item"></el-option>
          </el-select></p>
          <p>  <el-button type="primary" @click="viewAuthoritBtn">确定</el-button> <br/> <el-button @click="viewAuthoritreset">重置</el-button> </p>
        </div>
        <!-- 给身份设置api接口权限 -->
         <div class="addUser-from">
         <p> <button  class="active">给身份设置api接口权限</button></p>   
          <p>  <el-select v-model="ruleForm.apiAuthorityUser" placeholder="请选择身份id" >
            <el-option v-for="(item, index) in identity"  :key="index" :label='item.identity_text' :value="item.identity_id"></el-option>
          </el-select></p>
          <p> <el-select v-model="ruleForm.apiAuthorityIdent" placeholder="请选择api接口权限">
            <el-option v-for="(item, index) in apiAuthority"  :key="index" :label='item.api_authority_text' :value="item.api_authority_id"></el-option>
          </el-select></p>
          <p>  <el-button type="primary" @click="apiAuthorityBtn">确定</el-button> <br/> <el-button @click="apiAuthorityreset">重置</el-button> </p>
        </div>
        <!-- 给身份设置视图权限 -->
            <div class="addUser-from">
          <p> <button  class="active">给身份设置视图权限</button></p>   
          <p>  <el-select v-model="ruleForm.setIdentityId" placeholder="请选择身份id" >
            <el-option v-for="(item, index) in identity"  :key="index" :label='item.identity_text' :value="item.identity_id"></el-option>
          </el-select></p>
          <p> <el-select v-model="ruleForm.setViewId" placeholder="请选择视图权限">
            <el-option v-for="(item, index) in viewAuthorit"  :key="index" :label='item.view_authority_text' :value="item.view_id"></el-option>
          </el-select></p>
          <p>  <el-button type="primary" @click="setIdentityView">确定</el-button>  <el-button @click="setIdentityViewreset">重置</el-button> </p>
        </div>
     </div>
  </div>
</template>

<script>
import axios from '../../../util/axiosAgain';
export default {
    data(){
        return {
            ruleForm:{
                userId:'',
                ShowUser:true,
                IdentId:'',
                text1:'',
                text2:'',
                viewAuthorit:'',
                apiAuthorityUser:'',
                apiAuthorityIdent:'',
                setIdentityId:'',
                setViewId:''


            },
            identity:[],
            user:[],
            viewAuthorit:[],
            apiAuthority:[],
            IdentityEdit:{
                edit:''
            },
            authorityApi:{
                text1:'',
                text2:'',
                text3:''
            }
        }
    },
    mounted(){
        axios.get('/user/identity').then((res)=>{
            this.$data.identity = res.data.data
        })
        axios.get('/user/user').then((res)=>{
            this.$data.user = res.data.data
        })
        axios.get('/user/view_authority').then((res)=>{
            this.$data.viewAuthorit = res.data.data
        })
        axios.get('/user/api_authority').then((res)=>{
            this.$data.apiAuthority = res.data.data
        })
        
    },
    methods:{
        submitUser(){
            let { userId, ShowUser, IdentId, text1, text2 } = this.$data.ruleForm;
            if(ShowUser){
                if(IdentId && text1.trim() !== '' && text2.trim() !== ''){
                    axios.post('/user', {user_name: text1, user_pwd:text2, identity_id:IdentId}).then((res)=>{
                        console.log(res)
                        if(res.data.code !== 1){
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }else if(res.data.code === 1){
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        }
                    })
                }else{
                    this.error()
                }
            }else{
                if(IdentId && userId){
                    axios.post('/user', {user_name: text1, user_pwd:text2, identity_id:IdentId, user_id:userId}).then((res)=>{
                        if(res.data.code !== 1){
                            this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }else if(res.data.code === 1){
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        }
                    })
                }else{
                    this.error()
                }
            }
        },
        resetForm(){
            this.$data.ruleForm.userId = '';
            this.$data.ruleForm.IdentId = '';
            this.$data.ruleForm.text1 = '';
            this.$data.ruleForm.text2 = '';
        },
        IdentityEditBtn(){
            let {edit} = this.$data.IdentityEdit;
            if( edit.trim() !== '' ){
                axios.get('/user/identity/edit', {identity_text:edit}).then((res)=>{
                    this.$message({
                        message: res.data.msg
                    });
                })
            }else{
                this.error()
            }
        },
        error(){
            this.$notify.error({
                title:"错误提示",
                message:'内容不能为空',
            });
        },
        authorityApiBtn(){
            let {text2, text1, text3} = this.$data.authorityApi;
            if( text1.trim() !== '' && text2.trim() !== '' && text3.trim() !== '' ){
                console.log(123)
                axios.get('/user/authorityApi/edit', {api_authority_text:text1, api_authority_url:text2, api_authority_method:text3}).then((res)=>{
                    this.$message({
                        message: res.data.msg
                    });
                })
            }else{
                this.error()
            }
        },
        viewAuthoritBtn(){
            let {viewAuthorit} = this.$data.ruleForm;
            console.log(viewAuthorit)
            if(viewAuthorit['view_authority_text'] !== ''){
                let {view_authority_text, view_id} = viewAuthorit;
                axios.get('/user/authorityView/edit', {view_authority_text, view_id}).then((res)=>{
                    this.$message({
                        message: res.data.msg
                    });
                })
            }else{
                this.error()
            }
        },
        apiAuthorityBtn(){
            let { apiAuthorityIdent, apiAuthorityUser } = this.$data.ruleForm;
            if(apiAuthorityIdent.trim() !== '' && apiAuthorityUser.trim() !== ''){
                axios.post('/user/setIdentityApi', {identity_id:apiAuthorityUser, api_authority_id:apiAuthorityIdent}).then((res)=>{
                    this.$message({
                        message: res.data.msg
                    });
                })
            }else{
                this.error()
            }
        },
        setIdentityView(){
            let { setIdentityId, setViewId} = this.$data.ruleForm;
            if(setIdentityId.trim() !== '' && setViewId.trim() !== ''){
                axios.post('/user/setIdentityView', {identity_id:setIdentityId, view_authority_id:setViewId}).then((res)=>{
                    this.$message({
                        message: res.data.msg
                    });
                })
            }else{
                this.error()
            }
        },
        IdentityEditreset(){
            this.$data.IdentityEdit.edit = '';
        },
        authorityApireset(){
            this.$data.authorityApi.text1 = '';
            this.$data.authorityApi.text2 = '';
            this.$data.authorityApi.text3 = '';


        },
        viewAuthoritreset(){
            this.$data.ruleForm.viewAuthorit = '';
        },
        apiAuthorityreset(){
            this.$data.ruleForm.apiAuthorityUser = '';
            this.$data.ruleForm.apiAuthorityIdent = '';

        },
        setIdentityViewreset(){
            this.$data.ruleForm.setIdentityId = '';
            this.$data.ruleForm.setViewId = '';
        }
    }

}

</script>

<style>
button{
  min-width: 100px;
  padding:0 8px;
  height: 30px;
  border: none;
  color: #000;
}
.active{
  border: 1px solid blue;
  color: blue;
}
.addUser{
  width: 100%;
  height: 100%;
}
.addUser-module{
  margin: 0px 24px 24px;
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.addUser-from{
  width: 33%;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.addUser-from p{
  margin:  13px 10px; 
}
.el-button {
  height: 35px;
  text-align: center;
}
</style>


