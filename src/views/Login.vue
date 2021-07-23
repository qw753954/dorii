<template>
  <div class="login position-relative">
    <router-link to="/"
      class="btn link-white position-fixed top-0 start-0 opacity-75 p-4"
      style="z-index: 1"
    >
      <i class="fas fa-home"></i>
      <span class="ms-1">返回前台</span>
    </router-link>
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-md-6 bg-cover vh-100 position-absolute"
          style="background: url('https://images.unsplash.com/photo-1594995681168-aa541a744c92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80') no-repeat center 80%/ cover"
        >
        </div>
        <div class="col-10 col-md-6 align-items-center d-flex vh-100 py-5 me-auto me-md-0 ms-auto">
          <div class="mx-auto bg-whiteLightBlur w-100 p-5" style="max-width: 450px">
            <h1 class="title display-4 text-center text-primary mb-5">LOG IN</h1>
            <form @submit.prevent="login">
              <div class="form-floating mb-3">
                <input type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                autocomplete="username"
                v-model.trim="user.username"
                >
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating position-relative mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  ref="pwInput"
                  autocomplete="current-password"
                  v-model.trim="user.password"
                >
                <button
                  type="button"
                  class="btn watch-pw position-absolute"
                  @click.prevent="changeInputType"
                >
                  <i class="fas fa-eye-slash" v-if="!canSeePW"></i>
                  <i class="fas fa-eye" v-else></i>
                </button>
                <label for="floatingPassword">Password</label>
              </div>
              <button
                class="btn btn-primary w-100 py-3 mx-auto"
                :disabled="loadingState === 'logING'"
              >
                <i class="fas fa-spinner fa-pulse me-2" v-if="loadingState === 'logING'"></i>
                <template v-if="loadingState === 'logING'">登入中</template>
                <template v-else>登入</template>
              </button>
            </form>
        </div>
      </div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '登入',
  data() {
    return {
      user: {},
      canSeePW: false,
      loadingState: '',
    };
  },
  methods: {
    changeInputType() {
      if (!this.canSeePW) {
        this.$refs.pwInput.type = 'text';
      } else {
        this.$refs.pwInput.type = 'password';
      }
      this.canSeePW = !this.canSeePW;
    },
    login() {
      if (!this.user.username || !this.user.password) {
        this.$swal.fire({ icon: 'warning', title: '有欄位沒填寫到' });
        return;
      }
      this.loadingState = 'logING';
      const url = `${process.env.VUE_APP_URL}/admin/signin`;
      this.axios.post(url, this.user)
        .then((res) => {
          const {
            success,
            message,
            token,
            expired,
          } = res.data;
          if (success) {
            const name = this.user.username.split('@', 1).join();
            document.cookie = `token=${token}; expires=${new Date(expired)}; path=/`;
            document.cookie = `user=${name}; expires=${new Date(expired)}; path=/`;
            this.$router.push('/admin');
          } else {
            this.user.password = '';
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.loadingState = '';
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/all-front";
</style>
