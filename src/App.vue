<template>
  <ToastMsg></ToastMsg>
  <router-view/>
</template>

<script>
import emitter from '@/assets/javascript/emitter';
import ToastMsg from './components/ToastMsg.vue';

export default {
  data() {
    return {
      toast: '',
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastMsg,
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const windowY = window.scrollY;
      console.dir(document.querySelector('#main11'));
      console.log(windowY);
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/reset";
</style>
