<template>
  <div class="ShowUser">
  <h2>  展示用户</h2>
    <div class="showUserMenu">
      <span v-for="(item,index) in viewList" :key='index' class="showUserMenu-item" @click="handleClick(item,index)" :class="{active:index === currentIndex}"> {{item.title}} </span>
    </div>
    <div v-if="currentIndex === 0"> <h1>用户数据</h1>  <UserDataTable :data='tableData'></UserDataTable></div>
    <div v-if="currentIndex === 1"> <h1>身份数据</h1>  <IdentityTable :data='tableData'></IdentityTable></div>
    <div v-if="currentIndex === 2"> <h1>api接口权限</h1>  <ApiAuthorityTable :data='tableData'></ApiAuthorityTable></div>
    <div v-if="currentIndex === 3"> <h1>身份和api接口关系</h1>  <UserIdentityTable :data='tableData'></UserIdentityTable></div>
    <div v-if="currentIndex === 4"> <h1>视图接口权限</h1>  <UserViewTable :data='tableData'></UserViewTable></div>
    <div v-if="currentIndex === 5"> <h1>身份和视图权限关系</h1>  <UserIdentityViewTable :data='tableData'></UserIdentityViewTable></div>  
  </div>
</template>

<script>
import axios from '../../../util/axiosAgain';
import UserDataTable from '../../../components/UserDataTable.vue';
import IdentityTable from '../../../components/IdentityTable.vue';
import ApiAuthorityTable from '../../../components/Api_AuthorityTable.vue';
import UserIdentityTable from '../../../components/UserIdentityTable.vue';
import UserViewTable from '../../../components/UserViewTable.vue';
import UserIdentityViewTable from '../../../components/UserIdentityViewTable.vue';
export default {
    data(){
        return {
            viewList:[
                {title:"用户数据", path:'/user/user'},
                {title:"身份数据", path:'/user/identity'},
                {title:"api接口权限", path:'/user/api_authority'},
                {title:"身份和api接口关系", path:'/user/identity_api_authority_relation'},
                {title:"视图接口权限", path:'/user/view_authority'},
                {title:"身份和视图权限关系", path:'/user/identity_view_authority_relation'}
            ],
            currentIndex:0,
            tableData:[]
        }
    },
    components:{
        UserDataTable,
        IdentityTable,
        ApiAuthorityTable,
        UserIdentityTable,
        UserViewTable,
        UserIdentityViewTable

    },
    mounted(){
        axios.get('/user/user').then((res)=>{
            this.$data.tableData = res.data.data
        })
    },
    methods: {
        handleClick(item, index) {
            console.log(item.path, index);
            this.$data.currentIndex = index;
            axios.get(item.path).then((res)=>{
                console.log(res)
                this.$data.tableData = res.data.data
            })
        }
    }
}
</script>

<style>
    .showUserMenu{
      margin: 25px;
    }
    .ShowUser h1{
      font-size: 35px;
      margin-bottom:15px;
    }
    .showUserMenu-item{
      padding: 5px 10px;
      border: 1px solid #ccc;
    }
    .active{
      color: blue;
      border: 1px solid blue;
    }
</style>
