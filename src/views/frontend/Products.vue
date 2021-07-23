<template>
  <CustomLoading :active="isLoading"/>

  <div class="products bg-light">
    <!-- 上方 BANNER -->
    <Banner
      title="商店"
      engTitle="STORE"
      imageUrl="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791407958.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Odrrt0tnOyl2GCrRjBh58SAICeMPn2POo5M%2BHH9NjNVMY5oMKoiLQFReAQspP%2BLtSL0YvMPCkxX%2BlMbnc9X3q2cQCWxcvXpOrXc9uGUcOMHDWsrtlFO8BjEjYWIDDKlmqxFzisKadez%2BR06j1ZM5%2FiQ4L5RvON2ky3hkQzIrbN4p1WHP%2Bye3xCiOcGuy8l52DYk1Ryx%2F19H3yRiAku8wNHskqgjIR3coh9t%2FJGx74ctJSKtSVc53jaLBbNbFPuHhIGcRzaiLsa3X53%2Bl%2FEtiISi18oFnqcaVW0lFoIDWqp4asTYoCGdAZE570yJ8749bT%2F5t4frsizvaKawV%2BikQ4Q%3D%3D"
    >
      <li class="breadcrumb-item active" aria-current="page">
        商店
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ nowCategory }}
      </li>
    </Banner>

    <!-- 主要內文 -->
    <div class="container py-7 px-4" id="main11">
      <div class="d-flex justify-content-end align-items-center mb-5 mb-md-3">
        <div class="search">
          <input
            type="search"
            class="border-bottom bg-transparent p-1"
            placeholder="搜尋飾品"
            v-model="search"
            @keyup.enter="searchProducts"
          >
          <span></span>
        </div>
        <button type="button" @click="searchProducts">
          <i class="far fa-search"></i>
        </button>
      </div>
      <div class="row gx-5">
        <!-- 分類 -->
        <div class="col-12 d-flex justify-content-between mb-4">
          <h3 class="fs-5 text-spacing-m border-start border-priLight border-5 ps-3">類別</h3>
        </div>
        <div class="col-md-4 col-lg-3">
          <ul
            class="sidebar d-flex flex-md-column flex-wrap border border-2 mb-5 sticky-md-top"
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
                @click="scrollMiddle(item.title)"
              >
                {{ item.title }}
                <small class="opacity-75 ps-2">{{ item.engTitle }}</small>
              </button>
            </li>
          </ul>
        </div>

        <!-- 商品們 -->
        <div class="col-md-8 col-lg-9">
          <ul class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mb-7">
            <p
              class="mx-auto text-center text-gray"
              v-if="filterProducts.length === 0"
            >
              <i class="fas fa-comment-alt-smile fa-3x d-block mb-3"></i>
              找不到相關的飾品<br>
              請嘗試輸入其他關鍵字
            </p>
            <Product :filter-products="filterProducts" v-else />
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Notice/>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';
import Product from '@/components/frontend/Card.vue';
import Notice from '@/components/frontend/Notice.vue';

export default {
  name: '商店',
  data() {
    return {
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
      search: '',
      chooseOption: '',
      isLoading: false,
    };
  },
  inject: ['emitter'],
  components: {
    Banner,
    Product,
    Notice,
  },
  methods: {
    getProductAll() {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;

            /* ------ 偶是分隔線 ------ */

            // 剛進來時
            if (this.categoryTitle) {
              this.categoryTitle = this.$route.params.categoryTitle;
              if (this.categoryTitle) {
                // 情況一：從首頁類別跟麵包屑進來的（選什麼類別就呈現那個類別的產品）
                this.scrollMiddle(this.categoryTitle);
              } else {
                // 情況二：點 navbar 連結跟麵包屑進來的（預設會呈現全部產品）
                this.scrollTop();
              }
              // 為了觸發分頁換頁時可以走下面 else 那條，點擊後不會切換到其他類別
              this.categoryTitle = '';

            // 已經進來一段時間了
            } else {
              this.scrollMiddle();
            }
          }

          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      this.filterNav();
    },
    scrollMiddle(title) {
      window.scrollTo({
        top: 330,
        behavior: 'smooth',
      });
      this.filterNav(title);
    },
    filterNav(title = '全部') {
      if (title === '全部') {
        this.filterProducts = this.products;
      } else {
        this.filterProducts = this.products.filter((item) => item.category === title);
      }
      this.nowCategory = title;
    },
    searchProducts() {
      this.nowCategory = '';
      this.filterProducts = this.products.filter((item) => (
        item.title.match(this.search.trim())
      ));
    },
  },
  created() {
    this.getProductAll();
  },
};
</script>
