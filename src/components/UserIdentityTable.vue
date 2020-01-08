<template>
   <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="identity_text"
        label="身份名称"
      >
       </el-table-column>
      <el-table-column
        prop="api_authority_text"
        label="api权限名称"
      >
      </el-table-column>
      <el-table-column
        prop="api_authority_url"
        label="api权限url"
      >
      </el-table-column>
      <el-table-column
        prop="api_authority_method"
        label="api权限方法">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
    name:'UserDataTable',
    props:['data']
}
</script>
