<template>
  <div class="container-fluid" style="z-index: 1030" :class="classList.navbarWrap">
    <nav
      id="navbar-top"
      class="row navbar navbar-expand-md bg-light py-0"
      :class="classList.navbarTop"
    >
      <div
        class="col-auto col-md-2 bg-priLight px-0 me-auto"
        :class="classList.navbarInner"
      >
        <h1 class="h3 text-center mb-0">
          <a
            href="#" class="logo fw-bolder text-spacing-l px-5"
            :class="classList.navbarLogo"
          >
            D<i class="fad fa-flower fa-fw"></i>rii
          </a>
        </h1>
      </div>
      <ul
        class="col-3 d-flex justify-content-end order-0 order-md-1 pe-2 pe-md-5"
      >
        <li class="me-4">
          <router-link
            to="/admin"
            class="menu-icon-btn position-relative"
          >
            <span
              class="bg-highlight rounded-pill px-2"
              style="right: -15px"
              v-if="favoriteQty != 0"
            >
              {{ favoriteQty }}
            </span>
            <i class="far fa-heart fa-fw"></i>
          </router-link>
        </li>
        <li class="me-4">
          <button
            type="button"
            class="menu-icon-btn text-primary position-relative"
            @click="openCart"
          >
            <span class="bg-highlight rounded-pill px-2" v-if="cartQty != 0">
              {{ cartQty }}
            </span>
            <i class="far fa-shopping-bag fa-fw"></i>
          </button>
        </li>
        <li>
          <router-link
            to="/admin"
            class="menu-icon-btn"
          >
            <i class="far fa-user fa-fw"></i>
          </router-link>
        </li>
      </ul>
      <button
        class="burgerBtn col-auto navbar-toggler link-success order-1 px-5"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarBurger"
        aria-controls="navbarBurger"
        aria-expanded="false"
        aria-label="Toggle navigation">
      </button>
      <div
        class="col-7 collapse navbar-collapse order-1 order-md-0"
        id="navbarBurger"
      >
        <ul class="row text-center w-100 gx-0">
          <li class="col-md">
            <router-link to="/about"
              class="menu-link py-4 py-md-0"
            >
              關於
            </router-link>
          </li>
          <li class="col-md">
            <router-link to="/products"
              class="menu-link py-4 py-md-0"
            >
              商店
            </router-link>
          </li>
          <li class="col-md">
            <router-link to="/blog"
              class="menu-link py-4 py-md-0"
            >
              部落格
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <CartOffcanvas ref="offcanvas"></CartOffcanvas>

</template>

<script>
import CartOffcanvas from './CartOffcanvas.vue';

export default {
  data() {
    return {
      cartQty: 0,
      favoriteQty: 0,
      classList: {
        navbarWrap: '',
        navbarTop: '',
        navbarInner: '',
        navbarLogo: '',
      },
    };
  },
  inject: ['emitter'],
  components: {
    CartOffcanvas,
  },
  methods: {
    openCart() {
      this.$refs.offcanvas.opanOffcanvas();
    },
  },
  created() {
    this.favoriteQty = JSON.parse(localStorage.getItem('myFav')).length;

    // 更新 cart 圖示的數量
    this.emitter.on('emit-update-qty', (qty) => {
      this.cartQty = qty;
    });

    // 更新 愛心圖示 的數量
    this.emitter.on('emit-update-favorite', (qty) => {
      this.favoriteQty = qty;
    });
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const windowY = window.scrollY;
      // const main = document.querySelector('#main');
      // console.dir(main.offsetTop);

      if (windowY > 0) {
        this.classList = {
          navbarWrap: 'sticky-top',
          navbarTop: 'bg-whiteBlur border-bottom',
          navbarInner: 'bg-transparent',
          navbarLogo: 'text-primary py-md-3',
        };
      } else {
        this.classList = {
          navbarWrap: '',
          navbarTop: '',
          navbarInner: '',
          navbarLogo: 'text-white',
        };
      }
    });
  },
};
</script>

<style lang="scss" scoped>
  #navbar-top, .logo {
    transition: padding .4s; // 轉場順暢
  }
</style>
