<template>
  <el-container>
    <el-header>
      <h2>添加试题</h2>
    </el-header>
  </el-container>
</template>

<style scoped lang="scss">
el-container {
  width: 100%;
  height: 100%;  
}
 .box {
    width: 500px;
    height: 100%;
    background:#f4f4f4;
    position: absolute;
    top: 0;
    right:0;
    line-height: 30px;
  }
el-header {
  background-color: #eee;
  color: #333;
  text-align: left;
}
el-main {
  background-color: #fff;
  color: #333;
  // height: 400px;
  border-radius: 20px;
  flex: auto;
  min-height: 0;
  position: relative;
}
.style-edit {
  min-height: 980px;
  margin: 0 auto;
  padding: 40px;
  // text-align: center;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.style-edit > h3 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.style-edit > p {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
  width: 100%;
 background:#fff;
  border: 1px solid #ccc;
  margin-bottom: 2px;
  display: flex;
  padding: 10px;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  line-height: 30px;
}
.item > span {
  position: absolute;
  top: 20px;
  right: 30px;
  width: 50px;
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
  color: red;
}
.item > p {
  flex-wrap: wrap;
}
.item > p:last-child{
   background: #ccc;
}
.cv {
  text-align: center;
  margin-top: 50px;
  font-weight: 900;
}
</style>
