<template>
  <div class="user-list">
    <ElBreadcrumb
      separator="/"
      class="breadcrumb"
    >
      <ElBreadcrumbItem>用户管理</ElBreadcrumbItem>
      <ElBreadcrumbItem>编辑用户</ElBreadcrumbItem>
    </ElBreadcrumb>
    <div
      v-loading="loading"
      class="table"
    >
      <ElTable
        :data="userList"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <ElTableColumn
          type="selection"
          width="50"
        />
        <ElTableColumn
          prop="user_name"
          label="用户名"
        />
        <ElTableColumn
          label="性别"
        >
          <template slot-scope="scope">
            {{ scope.row.gender | getGender }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          prop="phone"
          label="手机号"
        />
        <ElTableColumn
          prop="email"
          label="邮箱"
        />
        <ElTableColumn
          label="状态"
        >
          <template slot-scope="scope">
            <ElTag
              size="small"
              :type="scope.row.status | getStatusType"
            >
              {{ scope.row.status | getStatus }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          label="操作"
        >
          <template slot-scope="scope">
            <ElRow>
              <ElButton
                icon="el-icon-edit"
                type="primary"
                size="mini"
                @click="editUser(scope.row.user_id)"
              >
                编辑
              </ElButton>
            </ElRow>
          </template>
        </ElTableColumn>
      </ElTable>
      <div class="table-footer">
        <ElButton
          size="medium"
          type="primary"
          @click="updateStatusBatch(2)"
        >
          置为失效
        </ElButton>
        <ElButton
          size="medium"
          type="primary"
          @click="updateStatusBatch(1)"
        >
          置为有效
        </ElButton>
        <ElPagination
          v-if="pageTotal"
          background
          :current-page="page"
          :total="pageTotal"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

const genderMap = {
  0: '未知',
  1: '男',
  2: '女'
}

const statusMap = {
  0: '未知',
  1: '有效',
  2: '无效'
}

const statusTypeMap = {
  0: 'primary',
  1: 'success',
  2: 'info'
}

export default {
  name: 'UserList',
  filters: {
    formatTime (time, format = 'YYYY-MM-DD') {
      if (time === '0') {
        return '-'
      }
      return moment(1000 * time).format(format)
    },
    getGender (gender) {
      return genderMap[gender]
    },
    getStatus (status) {
      return statusMap[status]
    },
    getStatusType (status) {
      return statusTypeMap[status]
    }
  },
  data () {
    return {
      userList: [],
      pageTotal: 0,
      loading: false,
      multipleSelection: []
    }
  },
  computed: {
    page () {
      return Number(this.$route.query.page) || 1
    },
    pageSize () {
      return Number(this.$route.query.pageSize) || 10
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      if (this.loading === true) return
      this.loading = true
      const params = {
        'pageNo': this.page,
        'pageSize': this.pageSize
      }
      this.$axios.get('/api/application/user/userList', { params })
        .then((response) => {
          this.userList = response.data.list
          this.pageTotal = Number(response.data.pageTotal)
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleCurrentChange (page) {
      const query = Object.assign({}, this.$route.query, { page })
      this.$router.push({ query })
      this.getUserList()
    },
    handleSizeChange (pageSize) {
      const query = Object.assign({}, this.$route.query, { pageSize })
      this.$router.push({ query })
      this.getUserList()
    },
    updateStatusBatch (status) {
      if (this.loading) return
      this.loading = true
      const params = {
        status,
        userIds: []
      }
      for (let index in this.multipleSelection) {
        params.userIds.push(this.multipleSelection[index].user_id)
      }
      if (params.userIds === []) {
        this.loading = false
        this.$message.error('请先选择用户再操作')
        return false
      }
      this.$axios.post('/api/application/user/updateStatus', params)
        .then((response) => {
          this.loading = false
          this.getUserList()
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    editUser (userId) {
      const query = { userId }
      this.$router.push({ path: '/userEdit', query })
    }
  }
}
</script>

<style scoped>
.breadcrumb {
  padding: 30px;
  background-color: #fff;
}

.table {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff;
}

.table-footer {
  padding: 20px 0 5px 0;
  display: flex;
}

.pagination {
  flex: auto;
  text-align: right;
}
</style>
