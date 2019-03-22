<template>
  <div class="user-add">
    <ElBreadcrumb
      separator="/"
      class="breadcrumb"
    >
      <ElBreadcrumbItem>用户管理</ElBreadcrumbItem>
      <ElBreadcrumbItem>添加用户</ElBreadcrumbItem>
    </ElBreadcrumb>
    <div
      v-loading="loading"
      class="user-form"
    >
      <ElForm
        :model="userForm"
        label-width="80px"
        status-icon
        style="width: 600px"
      >
        <ElFormItem label="用户名">
          <ElInput
            v-model="userForm.userName"
            placeholder="请填写用户名"
          />
        </ElFormItem>
        <ElFormItem label="电话号码">
          <ElInput
            v-model="userForm.phone"
            placeholder="请填写电话号码"
          />
        </ElFormItem>
        <ElFormItem label="邮箱">
          <ElInput
            v-model="userForm.email"
            placeholder="请填写邮箱"
          />
        </ElFormItem>
        <ElFormItem label="地址">
          <ElInput
            v-model="userForm.address"
            placeholder="请填写地址"
          />
        </ElFormItem>
        <ElFormItem label="性别">
          <ElRadioGroup v-model="userForm.gender">
            <ElRadio label="1">
              男
            </ElRadio>
            <ElRadio label="2">
              女
            </ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="头像">
          <ElUpload
            class="avatar-uploader"
            action="/api/application/image/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="userForm.avatarUrl"
              :src="userForm.avatarUrl"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </ElUpload>
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            @click="onSubmit"
          >
            立即创建
          </ElButton>
          <ElButton>取消</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        userName: '',
        phone: '',
        email: '',
        gender: 0,
        address: '',
        avatarUrl: ''
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      const params = Object.entries(this.userForm).reduce((obj, [key, value]) => Object.assign(obj, { [key.replace(/([A-Z])/g, l => `_${l.toLowerCase()}`)]: value }), {})
      this.$axios.post('/api/application/user/userAdd', params)
        .then((response) => {
          this.loading = false
          this.$router.push({ path: '/userList' })
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleAvatarSuccess (res, file) {
      this.userForm.avatarUrl = res.data.url
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.breadcrumb {
  padding: 30px;
  background-color: #fff;
}

.user-form {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
