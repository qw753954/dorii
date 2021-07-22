<template>
  <div class="bg-light text-center d-flex flex-column justify-content-center align-items-center
    vh-100">
    <h1 class="text-primary display-1 mb-5">404 <br></h1>
    <h2 class="text-primary mb-5">Page not found</h2>
    五秒後會自動跳轉回商店首頁唷
  </div>
</template>

<script>
export default {
  name: '404 頁面',
  created() {
    setTimeout(() => {
      this.$router.push('/');
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
h1, h2 {
  font-family: 'Italiana';
}
</style>
