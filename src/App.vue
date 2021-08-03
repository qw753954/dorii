<template>
  <ToastMsg/>
  <router-view/>
</template>

<script>
import emitter from '@/assets/javascript/emitter';
import ToastMsg from './components/ToastMsg.vue';

export default {
  provide() {
    return {
      emitter,
    };
  },
  components: {
    ToastMsg,
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/init";
</style>
