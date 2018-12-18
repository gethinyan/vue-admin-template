<template>
  <div class="header">
    <ElMenu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <ElSubmenu index="1">
        <template slot="title">
          欢迎你，gethin
        </template>
        <ElMenuItem index="1-1">
          我的信息
        </ElMenuItem>
        <ElMenuItem index="1-3">
          修改密码
        </ElMenuItem>
        <ElMenuItem index="1-2">
          注销
        </ElMenuItem>
      </ElSubmenu>
    </ElMenu>
  </div>
</template>

<script>
export default {
  name: 'AdminHeader',
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
.header {
  flex: initial;
}

.el-menu--horizontal > .el-submenu {
  float: right;
}
</style>
