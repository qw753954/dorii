<template>
  <CustomLoading :active="isLoading"></CustomLoading>
  <div class="products bg-light">
    <!-- 上方 BANNER -->
    <div
      class="banner bg-cover d-flex position-relative"
      style="background-image: url('https://images.unsplash.com/photo-1572438468702-6ef505497aa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80')"
    >
      <div class="container d-flex flex-column py-3">
        <!-- 麵包屑 -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/" class="link-white d-inline-block">首頁</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              商店
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ nowCategory }}
            </li>
          </ol>
        </nav>
        <!-- 標題 -->
        <h2 class="fs-1 text-white text-spacing-m mt-auto">商品列表</h2>
      </div>
    </div>

    <!-- 主要內文 -->
    <div class="container" id="main11">
      <div class="d-flex justify-content-end align-items-center pt-5">
        <input
          type="search"
          class="search border-bottom bg-transparent p-1"
          placeholder="Search"
        >
        <button>
          <i class="far fa-search"></i>
        </button>
      </div>
      <div class="row gx-5 py-7">
        <!-- 分類 -->
        <div class="col-md-4 col-lg-3">
          <h3 class="fs-5 text-spacing-m border-start border-priLight border-5 ps-3 mb-4">
            類別
          </h3>
          <ul
            class="sidebar d-flex flex-md-column flex-wrap border border-3 mb-5 sticky-md-top"
            style="top: 80px;"
          >
            <li
              class="border-bottom"
              v-for="item in categories"
              :key="item.title"
            >
              <button
                type="button"
                class="d-flex align-items-center w-100 py-3 px-4"
                :class="{ active: nowCategory === item.title }"
                @click="filterNav(item.title)"
              >
                {{ item.title }}
                <small class="opacity-75 ps-2">{{ item.engTitle }}</small>
              </button>
            </li>
          </ul>
        </div>

        <!-- 商品們 -->
        <div class="col-md-8 col-lg-9">
          <h3 class="fs-5 text-spacing-m d-inline-block border-start border-5 border-priLight
          text-center ps-3 mb-4">
            {{ nowCategory }}
          </h3>
          <ul class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mb-5">
            <Product :filter-products="filterProducts"></Product>
          </ul>

          <Pagination
            :pagination="pagination"
            @emit-page="getProducts"
            v-if="nowCategory === '全部'"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
  <Notice></Notice>
</template>

<script>
// import emitter from '@/assets/javascript/emitter';
import Product from '@/components/frontend/Card.vue';
import Notice from '@/components/frontend/Notice.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: '商店',
  data() {
    return {
      productAll: [],
      products: [],
      filterProducts: [],
      categories: [
        {
          title: '全部',
          engTitle: 'ALL',
        },
        {
          title: '戒指',
          engTitle: 'RING',
        },
        {
          title: '耳環',
          engTitle: 'EARRING',
        },
        {
          title: '項鍊',
          engTitle: 'NECKLACE',
        },
        {
          title: '手鍊',
          engTitle: 'BRACELET',
        },
        {
          title: '組合包',
          engTitle: 'BUNDLE',
        },
      ],
      categoryTitle: 'new coming',
      nowCategory: '',
      pagination: {},
      isLoading: false,
    };
  },
  inject: ['emitter'],
  components: {
    Product,
    Notice,
    Pagination,
  },
  methods: {
    getProductAll() {
      // 要取全部產品原因：避免從首頁及麵包屑點進來的無法看到全數產品，只會顯示 products 的第一頁產品
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.productAll = res.data.products;

            /* ------ 偶是分隔線 ------ */

            // 剛進來
            if (this.categoryTitle) {
              this.categoryTitle = this.$route.params.categoryTitle;
              if (this.categoryTitle) {
                // 情況一：從首頁類別跟麵包屑進來的（選什麼類別就呈現那個類別的產品）
                this.filterNav(this.categoryTitle);
              } else {
                // 情況二：點 navbar 連結跟麵包屑進來的（預設會呈現全部產品）
                this.filterNav();
              }
              this.categoryTitle = ''; // 為了觸發分頁換頁時可以走 else 那條，點擊後不會切換到其他類別
            } else {
              // 已經進來一段時間了
              this.filterNav();
            }
            /*
              ＃ 為什麼 categoryTitle 要在初始化完後被清掉？
              若是從首頁跟麵包屑過來的，路由參數 categoryTitle 會一直存在
              這樣切換到全部再點分頁列表換頁時
              會觸發到 getProduct 然後會無條件走 filterNav else 那條，反而會切換回那個參數的類別
              所以 categoryTitle 的功用就只有在網頁一開始進來而已（#

              ＃ 為什麼不把這部分的程式碼放在 created 就好？不也可以達成只執行一次的需求？
              因為 "非同步行為"
              雖然有執行 get 資料那兩個函式了，不過 AJAX 行為會是在 updated 階段被觸發
              所以 created 那階段還拿不到後端回傳的產品列表（可以下 console 觀察觸發時機及順序）
              也就是說，那時的 filterNav() 其實是在篩空白資料 XDD
            */
          }

          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.axios.get(url)
        .then((res) => {
          const {
            success,
            products,
            message,
            pagination,
          } = res.data;
          if (success) {
            this.products = products;
            this.pagination = pagination;

            this.getProductAll();
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    filterNav(title = '全部') {
      // 除了點 navbar 連結進來的，都要導
      window.scrollTo({
        top: 290,
        behavior: 'smooth',
      });

      if (title === '全部') {
        this.filterProducts = this.products;
      } else {
        this.filterProducts = this.productAll.filter((item) => item.category === title);
      }
      this.nowCategory = title;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
