<template>
   <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="user_pwd"
        label="密码"
      >
      </el-table-column>
      <el-table-column
        prop="identity_text"
        label="身份">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
    name:'UserDataTable',
    props:['data']
}
</script>
