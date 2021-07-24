<template>
  <CustomLoading :active="isLoading"></CustomLoading>

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
            href="#" class="logo fw-bolder link-white text-spacing-l px-5 px-md-0"
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
            to="/favorite"
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
        class="burgerBtn col-auto navbar-toggler order-1 px-5"
        type="button"
        ref="burgerBtn"
        data-bs-toggle="collapse" data-bs-target="#navbarBurger"
        aria-controls="navbarBurger" aria-expanded="false" aria-label="Toggle navigation">
      </button>
      <div
        id="navbarBurger"
        class="col-7 collapse navbar-collapse align-self-stretch order-1 order-md-0"
        ref="burgerMenu"
      >
        <ul class="row text-center w-100 h-100 gx-0">
          <li class="col-md">
            <router-link to="/about"
              class="menu-link h-100 py-4 py-md-0"
              @click="closeMenu"
            >
              <span class="d-flex align-items-center justify-content-center h-100">關於</span>
            </router-link>
          </li>
          <li class="col-md">
            <router-link to="/products"
              class="menu-link h-100 py-4 py-md-0"
              @click="closeMenu"
            >
              <span class="d-flex align-items-center justify-content-center h-100">商店</span>
            </router-link>
          </li>
          <li class="col-md">
            <router-link to="/blog"
              class="menu-link h-100 py-4 py-md-0"
              @click="closeMenu"
            >
              <span class="d-flex align-items-center justify-content-center h-100">部落格</span>
            </router-link>
          </li>
          <li class="col-md">
            <a href="#"
              class="menu-link h-100 w-100 py-4 py-md-0"
              @click.prevent="openSearchModal"
            >
              <span class="d-flex align-items-center justify-content-center h-100">訂單查詢</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>

  <CartOffcanvas ref="offcanvas"></CartOffcanvas>
  <OrderSearch ref="orderSearchModal"></OrderSearch>

</template>

<script>
import OrderSearch from './OrderSearch.vue';
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
      isLoading: false,
    };
  },
  inject: ['emitter'],
  components: {
    CartOffcanvas,
    OrderSearch,
  },
  methods: {
    openCart() {
      this.$refs.offcanvas.openOffcanvas();
    },
    openSearchModal() {
      this.$refs.orderSearchModal.openModal();
    },
    closeMenu() {
      this.$refs.burgerBtn.ariaExpanded = false;
      this.$refs.burgerBtn.classList.add('show');
      this.$refs.burgerMenu.classList.remove('show');
    },
    navbarScroll() {
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
          navbarLogo: 'link-white',
        };
      }
    },
  },
  created() {
    this.isLoading = true;

    const myFavArr = JSON.parse(localStorage.getItem('myFav'));
    this.favoriteQty = myFavArr ? myFavArr.length : 0;

    // 更新 愛心圖示 的數量
    this.emitter.on('emit-update-favQty', (qty) => {
      this.favoriteQty = qty;
    });

    // 更新 購物車圖示 的數量
    this.emitter.on('emit-update-cartQty', (qty) => {
      this.cartQty = qty;
      this.isLoading = false;
    });
  },
  mounted() {
    window.addEventListener('scroll', this.navbarScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.navbarScroll);

    this.emitter.off('emit-update-favQty', (qty) => {
      this.favoriteQty = qty;
    });
    this.emitter.off('emit-update-cartQty', (qty) => {
      this.cartQty = qty;
    });
  },
};
</script>

<style lang="scss" scoped>
#navbar-top, .logo {
  transition: padding .4s; // 轉場順暢
}
</style>
