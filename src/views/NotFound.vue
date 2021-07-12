<template>
  <div class="bg-light text-center d-flex flex-column justify-content-center align-items-center
    vh-100">
    <h1 class="text-primary display-1 mb-5">404 <br></h1>
    <h2 class="text-primary mb-5">Page not found</h2>
    三秒後會自動跳轉回商店首頁ㄛ
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      this.$router.push('/');
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
  h1, h2 {
    font-family: 'Italiana';
  }
</style>
