<template>
  <div id="app">
    <AdminSidebar />
    <div class="main">
      <AdminHeader />
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/common/AdminSidebar.vue'
import AdminHeader from '@/components/common/AdminHeader.vue'

export default {
  name: 'App',
  components: {
    AdminSidebar,
    AdminHeader
  }
}
</script>

<style>
#app {
  display: flex;
}

.main {
  flex: auto;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  height: 100vh;
}

.content {
  padding: 15px;
  background-color: #fafafa;
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
