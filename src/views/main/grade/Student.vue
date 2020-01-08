<template>
  <div class="studentBox">
    <h2>学生管理</h2>
    <div>
      <el-input placeholder="请输入学生姓名"></el-input>
      <template>
        <el-select placeholder="请选择教室号">
          <el-option></el-option>
        </el-select>
        <el-select placeholder="班级名">
          <el-option></el-option>
        </el-select>
      </template>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary">重置</el-button>
    </div>
    <div>
      <el-table style="width: 100%">
        <el-table-column prop="grade_name"
                         label="姓名"
                         width="180">
        </el-table-column>

        <el-table-column prop="subject_text"
                         label="学号">
        </el-table-column>

        <el-table-column prop="state"
                         label="班级">
        </el-table-column>

        <el-table-column prop="room_text"
                         label="教室">
        </el-table-column>

        <el-table-column prop="room_text"
                         label="密码">
        </el-table-column>

        <el-table-column label="操作">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {};
</script>
<style scoped>
.studentBox {
  width: 100%;
  height: 100%;
  /* background: #eee; */
  border-radius: 8px;
  padding-left: 20px;
}
h2 {
  padding: 10px;
}
.el-input {
  width: 180px;
  height: 45px;
  margin: 0 10px;
}
.el-select {
  margin: 0 10px;
}
.el-button {
  background: linear-gradient(-90deg, #4e75ff, #0139fd) !important;
}
</style>
