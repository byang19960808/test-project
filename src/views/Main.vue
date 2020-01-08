<template>
  <div class="main">
    <el-container>
      <el-header>
        <img src="../assets/bawei.png"
             class="logo" /> 
        <el-dropdown  class="nextperson">
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>我的班级</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="220px"
                  style=" background: #001529">
          <el-menu text-color="#ccc">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i><span>试题管理</span></template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link to="/main/addquestions">添加试题</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/main/questiontype">试题分类</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/main/watchquestions">查看试题</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i><span>用户管理</span> </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <router-link to="/main/adduser">添加用户</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link to="/main/showuser">用户展示</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i><span>考试管理</span> </template>
              <el-menu-item index="3-1">
                <router-link to="/main/addexam">添加考试</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/main/examlist">考试列表</router-link>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i><span>班级管理</span> </template>
              <el-menu-item index="3-1">
                <router-link to="/main/grade">班级管理</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/main/room">教室管理</router-link>
              </el-menu-item>
              <el-menu-item index="3-2">
                <router-link to="/main/student">学生管理</router-link>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-setting"></i><span>阅卷管理</span> </template>
              <el-menu-item index="3-1">
                <router-link to="/main/classlist">待批班级</router-link>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>
<style>
.main,
.el-container {
  width: 100%;
  height: 100%;
   overflow: none !important;
}

.el-header {
  height: 70px !important;
  line-height: 105px;
  border-bottom: 1px solid #eee;
  background: #fff;
}
.logo {
  width: 200px;
  height: 45px;
}
.el-aside {
  height: 100% !important;
  color: white;
  background: #001529;
}
.el-submenu {
  background: #001529;
}
.el-submenu__title {
  color: white;
}
.is-opened span {
  color: #ffffff;
}
.el-menu-item .router-link-active {
  color: #fff;
}
.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0;
  background-color: #001529;
  color: #fff !important;
}
.el-menu-item:hover {
  background: #909399;
  background: #000;
}
.el-menu-item {
  background: #022538;
}
.el-menu-item-group__title {
  padding: 0;
  line-height: normal;
  font-size: 12px;
  color: #909399;
}
.el-menu-item a {
  color: #ccc;
}
 .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.nextperson { 
  height: 40px;
  float: right;
  margin-top:-15px; 
  margin-right: 100px;
}
.el-main{
  background: #f0f2f5;
}

</style>
