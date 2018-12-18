<template>
  <div class="user-list">
    <ElBreadcrumb
      separator="/"
      class="breadcrumb"
    >
      <ElBreadcrumbItem>用户管理</ElBreadcrumbItem>
      <ElBreadcrumbItem>用户列表</ElBreadcrumbItem>
    </ElBreadcrumb>
    <div class="table">
      <ElTable
        v-loading="loading"
        :data="userList"
        stripe
        style="width: 100%"
      >
        <ElTableColumn
          type="selection"
          width="55"
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
          prop="address"
          label="地址"
        />
        <ElTableColumn
          label="状态"
        >
          <template slot-scope="scope">
            <ElButton
              :type="scope.row.status | getStatusType"
              size="mini"
              plain
              round
            >
              {{ scope.row.status | getStatus }}
            </ElButton>
          </template>
        </ElTableColumn>
        <ElTableColumn
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </ElTableColumn>
      </ElTable>
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
      loading: false
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
      if (this.loading === true) {
        return
      }
      this.loading = true
      const params = {
        'page_no': this.page,
        'page_size': this.pageSize
      }
      this.$axios.get('/api/application/user/userList', { params })
        .then((response) => {
          this.loading = false
          this.userList = response.data.data.list
          this.pageTotal = Number(response.data.data.pageTotal)
        })
        .catch((error) => {
          console.log(error)
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

.pagination{
  padding: 20px 0 5px 0;
  text-align: center;
}
</style>
