<template>

<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>

</template>
<script>

</script>
<style scoped>
/* 头部和底部样式 */
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/* 侧边栏样式 */
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/* 主内容区样式 */
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>