<template>
  <div class="front">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
  <Footer></Footer>
  <!-- <Audio></Audio> -->
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';
// import Audio from '@/components/frontend/Audio.vue';

export default {
  components: {
    Navbar,
    Footer,
    // Audio,
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/all-front";
</style>
