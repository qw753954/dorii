<template>
  <CustomLoading :active="isLoading"></CustomLoading>

  <div class="container py-5">
    <h3>LOG IN</h3>
    {{ isLoading }}
    <form @submit.prevent="login">
      <div class="form-floating mb-3">
        <input type="email"
         class="form-control"
         id="floatingInput"
         placeholder="name@example.com"
         v-model.trim="user.username"
        >
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
         type="password"
         class="form-control"
         id="floatingPassword"
         placeholder="Password"
         ref="pwInput"
         v-model.trim="user.password"
        >
        <button
         type="button"
         class="btn changeInputType"
         @click.prevent="changeInputType"
        >
          <i class="fas fa-eye-slash" v-if="!canSeePW"></i>
          <i class="fas fa-eye" v-else></i>
        </button>
        <label for="floatingPassword">Password</label>
      </div>
      <button class="btn btn-primary">登入</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: 'qw753954@gmail.com',
        password: 'cake8326839',
      },
      canSeePW: false,
      isLoading: false,
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
      this.isLoading = true;
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
            alert(message);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
};
</script>
