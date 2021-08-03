<template>
  <CustomLoading :active="isLoading"/>
  <div class="backend">
    <div class="container-fluid gx-0">
      <div class="row gx-0">
        <!-- 左側導覽列 -->
        <div
          class="sidebar col-md-3 col-lg-2 bg-primary text-white d-flex flex-column
          justify-content-between vh-100 position-sticky"
          :class="{ 'close-sidebar': isCollapse }"
        >
          <div class="sidebar-list">
            <h1 class="title fs-5 text-center d-none d-md-block my-4">
              Dashboard
            </h1>
            <ul class="list-unstyled text-nowrap">
              <li>
                <router-link to="/admin/products"
                  class="link text-white text-center text-md-start py-4 p-md-3 opacity-75"
                  @click="isCollapse = true"
                >
                  <i class="fas fa-list-alt fa-fw d-none d-md-inline-block"></i>
                  <span class="ps-md-3 fw-normal">商品管理</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders"
                  class="link text-white text-center text-md-start py-4 p-md-3 opacity-75"
                  @click="isCollapse = true"
                >
                  <i class="fas fa-list-ul fa-fw d-none d-md-inline-block"></i>
                  <span class="ps-md-3 fw-normal">訂單管理</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/articles"
                  class="link text-white text-center text-md-start py-4 p-md-3 opacity-75"
                  @click="isCollapse = true"
                >
                  <i class="fas fa-book-open fa-fw d-none d-md-inline-block"></i>
                  <span class="ps-md-3 fw-normal">文章管理</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/coupons"
                  class="link text-white text-center text-md-start py-4 p-md-3 opacity-75"
                  @click="isCollapse = true"
                >
                  <i class="fas fa-ticket-alt fa-fw d-none d-md-inline-block"></i>
                  <span class="ps-md-3 fw-normal">優惠券管理</span>
                </router-link>
              </li>
              <li class="d-md-none">
                <hr>
              </li>
              <li class="d-md-none">
                <a href="#" class="link text-white text-center py-4 opacity-75">
                  <i class="fas fa-ticket-alt d-none d-md-inline-block"></i>
                  <span class="fw-normal">切換到前台</span>
                </a>
              </li>
              <li class="d-md-none">
                <a
                  class="link text-white text-center py-4 opacity-75"
                  @click.prevent="logout"
                >
                  <i class="fas fa-ticket-alt d-none d-md-inline-block"></i>
                  <span class="fw-normal">登出</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右側-->
        <div class="col-md-9 col-lg-10">
          <div
            class="bg-whiteBlur d-flex justify-content-end shadow-sm sticky-top px-4 py-3"
          >
          <!-- 上方帳號管理 -->
            <button
              type="button"
              class="btn d-md-none position-relative me-auto"
              @click="isCollapse = !isCollapse"
            >
              <span class="burger" :class="{ 'active': !isCollapse }"></span>
            </button>
            <button
              type="button"
              class="text-gray d-none d-md-flex align-items-center dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img src="@/assets/images/backend/avatar-female.svg" width="35" alt="avatar">
              <small class="ms-2">{{ user }}</small>
            </button>
            <div class="d-flex align-items-center d-md-none">
              <img src="@/assets/images/backend/avatar-female.svg" width="35" alt="avatar">
              <small class="ms-2">{{ user }}</small>
            </div>
            <ul class="user-dropdown dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <a class="small dropdown-item" href="#">切換到前台</a>
              </li>
              <li>
                <a
                  href="#"
                  class="small dropdown-item"
                  @click.prevent="logout"
                >
                  登出
                </a>
              </li>
            </ul>
          </div>

          <!-- 下方主要內容 -->
          <div
            class="bg-lighter position-relative py-5 px-4"
            style="min-height: calc(100vh - 66px)"
          >
            <router-view :user="user" v-if="isLogin"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      user: '',
      isLoading: false,
      isLogin: false,
      isCollapse: false,
    };
  },
  methods: {
    checkLogin() {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/user/check`;
      this.axios.post(url)
        .then((res) => {
          if (res.data.success) {
            this.isLogin = true;
            this.$httpMsgState(res.data, '登入');
          } else {
            this.$httpMsgState(res.data, '登入');
            this.$router.push('/login');
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    logout() {
      document.cookie = 'token=; expires=; path=/';
      sessionStorage.removeItem('userId');
      this.$router.push('/');
    },
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.user = sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : 'User';
    this.axios.defaults.headers.common.Authorization = token;
    if (token) {
      this.checkLogin();
    } else {
      this.$router.push('/login');
    }
  },
};
</script>

<style lang="scss">
.backend {
  @import "@/assets/stylesheets/all-back";
}
</style>
