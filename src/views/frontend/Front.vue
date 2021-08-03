<template>
  <div class="front">
    <Navbar/>
    <router-view/>
  </div>
  <Footer/>
  <transition name="fade">
    <button
      type="btn"
      class="go-top bg-whiteBlur text-center text-primary shadow rounded-circle position-fixed"
      v-if="isGoTopBtnShow"
      @click="goTop"
    >
      <i class="fas fa-angle-up"></i>
    </button>
  </transition>
</template>

<script>
import Navbar from '@/components/frontend/Navbar.vue';
import Footer from '@/components/frontend/Footer.vue';

export default {
  namr: 'Frontend',
  data() {
    return {
      isGoTopBtnShow: false,
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        this.isGoTopBtnShow = true;
      } else {
        this.isGoTopBtnShow = false;
      }
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/stylesheets/all-front";

.go-top {
  bottom: 25px;
  right: 25px;
  z-index: 1049;
  width: 50px;
  height: 50px;
  line-height: 50px;
  transition: .3s;
  &:hover i{
    animation: goTop 1s linear infinite;
  }
}

@keyframes goTop {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  85% {
    opacity: 0;
    transform: translateY(-5px);
  }
  100% {
    opacity: 0;
    transform: translateY(-5px);
  }
}

</style>
