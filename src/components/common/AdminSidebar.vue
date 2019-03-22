<template>
  <div class="sidebar">
    <ElMenu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <ElSubmenu index="1">
        <template slot="title">
          <i class="el-icon-menu" />
          <span>用户管理</span>
        </template>
        <ElMenuItem
          index="1-1"
          @click="redirectTo('/userList')"
        >
          用户列表
        </ElMenuItem>
      </ElSubmenu>
    </ElMenu>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebar',
  methods: {
    redirectTo (url) {
      this.$router.push({ path: url })
    }
  }
}
</script>

<style scoped>
.sidebar {
  flex: none;
  width: 220px;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-menu-vertical-demo {
  height: 100vh;
}
</style>
