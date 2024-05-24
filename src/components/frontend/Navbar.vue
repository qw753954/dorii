<template>
  <CustomLoading :active="isLoading"/>

  <div class="fixed-top w-100">
    <nav
      id="navbar-top"
      class="navbar navbar-expand-md py-6 ps-3 px-md-6"
      :class="classList.navbarOuter"
    >
      <h1 class="h4 text-center me-auto mb-0">
        <a
          href="#" class="logo fw-bolder bg-primary text-spacing-m py-3"
          :class="classList.navbarLogo"
        >
          D<i class="small fad fa-flower fa-fw"></i>rii
        </a>
      </h1>
      <ul class="list-unstyled d-flex justify-content-end order-0 order-md-1">
        <li class="me-3 me-md-4">
          <router-link
            to="/favorite"
            class="menu-icon-btn position-relative"
            :class="classList.navbarBtn"
            :style="{ color: $route.path !== '/' && !$route.name.includes('單一') ? 'white' : '' }"
          >
            <span class="bg-highlight rounded-pill px-2" v-if="favoriteQty != 0">
              {{ favoriteQty }}
            </span>
            <i class="far fa-heart fa-fw"></i>
          </router-link>
        </li>
        <li class="me-3 me-md-4">
          <a
            href="#"
            class="menu-icon-btn position-relative"
            :class="classList.navbarBtn"
            :style="{ color: $route.path !== '/' && !$route.name.includes('單一') ? 'white' : '' }"
            @click.prevent="openCart"
          >
            <span class="bg-highlight rounded-pill px-2" v-if="cartQty != 0">
              {{ cartQty }}
            </span>
            <i class="far fa-shopping-bag fa-fw"></i>
          </a>
        </li>
      </ul>
      <button
        class="burgerBtn navbar-toggler order-1 px-5" type="button" ref="burgerBtn"
        data-bs-toggle="collapse" data-bs-target="#navbarBurger"
        aria-controls="navbarBurger" aria-expanded="false" aria-label="Toggle navigation"
        :class="classList.navbarBurger ||
        { white: $route.path !== '/' && !$route.name.includes('單一') }"
      >
      </button>
      <div
        id="navbarBurger" ref="burgerMenu"
        class="collapse navbar-collapse order-1 order-md-0"
      >
        <ul class="list-unstyled d-flex text-center ms-md-4 ms-lg-6">
          <li>
            <router-link to="/about"
              class="menu-link p-3 px-lg-4 mx-3"
              :class="classList.navbarLink"
              :style="{ color: $route.path !== '/' && !$route.name.includes('單一') ? 'white' : '' }"
              @click="closeMenu"
            >
              關於
            </router-link>
          </li>
          <li>
            <router-link to="/products"
              class="menu-link p-3 px-lg-4 me-3"
              :class="classList.navbarLink"
              :style="{ color: $route.path !== '/' && !$route.name.includes('單一') ? 'white' : '' }"
              @click="closeMenu"
            >
              商店
            </router-link>
          </li>
          <li>
            <router-link to="/blog"
              class="menu-link p-3 px-lg-4 me-3"
              :class="classList.navbarLink"
              :style="{ color: $route.path !== '/' && !$route.name.includes('單一') ? 'white' : '' }"
              @click="closeMenu"
            >
              部落格
            </router-link>
          </li>
          <li>
            <a href="#"
              class="menu-link p-3 px-lg-4"
              :class="classList.navbarLink"
              :style="{ color: $route.path !== '/' && !$route.name.includes('單一') ? 'white' : '' }"
              @click.prevent="openSearchModal"
            >
              訂單查詢
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
          navbarOuter: 'bg-whiteBlur border-bottom py-md-1 m-0',
          navbarLogo: 'text-primary bg-transparent px-0',
          navbarLink: 'text-primary py-3',
          navbarBtn: 'text-primary',
          navbarBurger: 'primary',
        };
      } else {
        this.classList = {
          navbarOuter: '',
          navbarLogo: 'link-white',
          navbarLink: '',
          navbarBtn: '',
          navbarBurger: '',
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
  transition: padding .4s, margin-top .4s; // 轉場順暢
}
</style>
