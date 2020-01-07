<template>
  <div>
    <el-table :data="examList"
              style="width: 100%"
              :row-class-name="tableRowClassName">
      <el-table-column prop="grade_name"
                       label="班级名"
                       width="180">
      </el-table-column>

      <el-table-column prop="subject_text"
                       label="课程名称">
      </el-table-column>

      <el-table-column prop="state"
                       label="阅卷状态">
      </el-table-column>

      <el-table-column prop="room_text"
                       label="教室号">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <span size="mini"
                type="danger"
                class="read"
                @click="handleLook(scope.$index, scope.row)"><a href="#">批卷</a></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


