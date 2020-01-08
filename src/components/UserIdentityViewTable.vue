<template>
   <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        prop="identity_text"
        label="身份"
      >
      </el-table-column>
        <el-table-column
        prop="view_authority_text"
        label="视图名称">
      </el-table-column>
      <el-table-column
        prop="view_id"
        label="视图id"
      >
      </el-table-column>
     
    
    </el-table>
</template>

<script>
export default {
    name:'UserDataTable',
    props:['data']
}
</script>
