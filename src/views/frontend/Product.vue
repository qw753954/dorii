<template>
  <CustomLoading :active="isLoading" />

  <div class="product container-fluid position-relative" style="min-height: 100vh;">
    <!-- 麵包屑 -->
    <nav
      aria-label="breadcrumb"
      class="main-content breadcrumb-wrap container position-absolute start-0 end-0 py-3"
      style="z-index: 1020;"
    >
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <router-link to="/" class="d-inline-block">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/products" class="d-inline-block">商店</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link
            :to="{ name: '商店', params: {categoryTitle: product.category} }"
            class="d-inline-block"
          >
            {{ product.category }}
          </router-link>
        </li>
        <li class="breadcrumb-item active text-muted" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>

    <!-- 商品 Info -->
    <div
      data-aos="fade-right" data-aos-delay="600"
      class="product-info container position-absolute top-0 bottom-0 start-0 end-0"
    >
      <div class="row sticky-md-top" style="top: 40px; z-index: 1010;">
        <div class="col-md-7 col-lg-5 py-md-5">
          <!-- 行動版的圖片輪播 -->
          <swiper
            class="d-md-none mb-3"
            style="height: 350px"
            :style="swiper.thumbsStyle"
            :spaceBetween="10"
            :thumbs="{ swiper: swiper.thumbsSwiper }"
          >
            <swiper-slide>
              <img :src="product.image" class="w-100 h-100 img-cover" :alt="`${product.title}_主圖`">
            </swiper-slide>
            <swiper-slide
              v-for="(item, index) in product.imagesUrl"
              :key="`swiperLgImg_${index}`"
            >
              <img
                :src="item" class="w-100 h-100 img-cover"
                :alt="`${product.title}_副圖${index + 1}`"
              >
            </swiper-slide>
          </swiper>
          <swiper
            style="height: 100px"
            class="mySwiper d-md-none mb-5"
            @swiper="setThumbsSwiper"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesVisibility="true"
            :watchSlidesProgress="true"
          >
            <swiper-slide>
              <img :src="product.image" class="w-100 h-100 img-cover" :alt="`${product.title}_主圖`">
            </swiper-slide>
            <swiper-slide
              v-for="(item, index) in product.imagesUrl"
              :key="`swiperSmImg_${index}`"
            >
              <img
                :src="item" class="w-100 h-100 img-cover"
                :alt="`${product.title}_副圖${index + 1}`"
              >
            </swiper-slide>
          </swiper>

          <!-- 商品名稱、星級、說明 -->
          <div class="d-flex justify-content-between align-items-center pt-md-6 mb-3">
            <h2 class="h3 text-primary mb-0">{{ product.title }}</h2>
            <ul class="list-unstyled d-flex text-warning" v-if="product.options.rate">
              <li v-for="i in product.options.rate" :key="`starFull_${i}`">
                <i class="fas fa-star"></i>
              </li>
              <li v-for="i in (5 - product.options.rate)" :key="`starEmpty_${i}`">
                <i class="far fa-star"></i>
              </li>
            </ul>
          </div>
          <p class="h5 mb-4" v-if="product.price && product.origin_price">
            NT${{ $toCurrency(product.price) }}
            <del class="fs-6 text-muted ms-1" v-if="product.price !== product.origin_price">
              ${{ $toCurrency(product.origin_price) }}
            </del>
          </p>

          <p
            class="bg-light border-start border-priLight border-4 p-3 mb-3"
            v-if="product.description"
          >
            {{ product.description }}
          </p>
          <p class="mb-5 text-space-pre" style="line-height: 32px;">{{ product.content }}</p>

          <div class="mb-5">
            <template
              v-for="(item, index) in product.options.choose"
              :key="`${item}_${index}`"
            >
              <input
                type="radio" class="btn-check" name="specs" :id="`${item}_${index}`"
                autocomplete="off" :value="item" v-model="tempOption.spec"
              >
              <label
                class="btn btn-sm btn-outline-primary me-3" :for="`${item}_${index}`"
              >
                {{ item }}
              </label>
            </template>
          </div>
          <form class="d-flex mb-4" @submit.prevent="addToCart(product.id)">
            <input
              type="number"
              min="1"
              class="bg-light border-bottom w-50 px-3"
              v-model.number="qty"
              @input="validateQty"
            >
            <button
              type="submit"
              class="btn btn-primary text-nowrap"
              :class="{ disabled: loadingState }"
            >
              <template v-if="loadingState">
                <i class="fas fa-spinner fa-pulse me-2"></i>加入中
              </template>
              <template v-else>
                加入購物車
              </template>
            </button>
            <button
              type="button"
              class="add-to-favorite link-primary ms-auto py-1"
              :class="{ 'link-highlight': favList.includes(product.id) }"
              @click="updateFavorite(product.id)"
            >
              <i
                class="far fa-heart fa-fw fa-2x"
                :class="{ 'fw-bolder': favList.includes(product.id) }"
              ></i>
            </button>
          </form>

        </div>
      </div>
    </div>

    <!-- 多圖區 -->
    <div class="row d-none d-md-flex">
      <div class="col-md-5 col-lg-6 ms-auto pe-md-0">
        <img
          class="vh-100 w-100 img-cover"
          :src="product.image"
          :alt="`${product.title}_主圖`"
        >
        <img
          v-for="(item, index) in product.imagesUrl"
          :key="`scrollImg_${index}`"
          :src="item"
          class="vh-100 w-100 img-cover"
          :alt="`${product.title}_副圖 ${index}`"
        >
      </div>
    </div>
  </div>

  <!-- 購買及退換貨須知 -->
  <div class="container py-7 py-md-9">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          type="button" role="tab" class="nav-link active" id="nav-buy-tab"
          data-bs-toggle="tab" data-bs-target="#buy-needToKnow"
          aria-controls="buy-needToKnow" aria-selected="true"
        >
          購買須知
        </button>
        <button
          type="button" role="tab" class="nav-link" id="nav-return-tab"
          data-bs-toggle="tab" data-bs-target="#return-needToKnow"
          aria-controls="return-needToKnow" aria-selected="false"
        >
          退換貨須知
        </button>
      </div>
    </nav>
    <div class="tab-content px-2 py-4" id="nav-tabContent">
      <div
        class="tab-pane fade show active" id="buy-needToKnow" role="tabpanel"
        aria-labelledby="nav-buy-tab"
      >
        <ul class="list-style-circle ps-4">
          <li class="mb-2">
            組合包為整組販賣，不拆售
          </li>
          <li class="mb-2">
            如選取「改尺寸（請備註尺寸）」規格，請務必在訂單備註欄中註明商品名稱及對應的欲客製尺寸
          </li>
          <li class="mb-2">
            飾品圖檔顏色會因每台電腦設定差異而略有不同，以實際商品顏色為準，敬請見諒
          </li>
          <li class="mb-2">
            尺寸皆以公分（cm）為測量單位，因測量方式不同，正負 1-2 公分的誤差為合理範圍
          </li>
          <li>
            若有禮物包裝需求，請於訂單中備註，我們將會協助進行免費包裝
          </li>
        </ul>
      </div>
      <div
        class="tab-pane fade" id="return-needToKnow" role="tabpanel"
        aria-labelledby="nav-return-tab"
      >
        <p class="fw-bolder">
          感謝您購買 Dorii 的商品，Dorii 為保護消費者權益，大部分商品皆享有 10 天鑑賞期（含例假日）<br>
          如需辦理退換貨請詳閱以下事項：
        </p>
        <ul class="list-style-circle ps-4">
          <li class="mb-2">
            10 天鑑賞期時間判定基準：如 9/1 號收到商品，則請 9/10（含）前申請退換貨，依此類推
          </li>
          <li class="mb-2">
            商品鑑賞期不等於試用期，退回時請保持商品與包裝完整，如因外力撞擊等意外因素，造成了飾品刮傷受損，請恕無法接受退換貨
          </li>
          <li class="mb-2">
            如商品超過鑑賞期欲辦理退換貨者，恕不受理
          </li>
          <li>
            依台灣消費者保護法，耳環（耳針、穿刺型）屬個人貼身飾品，故無鑑賞期並基於個人衛生原則，恕不受理退換貨
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- 為您推薦 -->
  <div class="bg-light">
    <div class="container py-7 py-md-9">
      <h3 class="h4 text-center text-primary mb-4 mb-md-6">
        為您推薦...
      </h3>
      <swiper
        class="px-4"
        :slidesPerView="1"
        :spaceBetween="30"
        :navigation="true"
        :breakpoints="swiper.breakpoints"
      >
        <swiper-slide v-for="item in randomProducts" :key="item.id">
          <div class="recommend-item shadow-sm">
            <router-link
              :to="`/product/${item.id}`"
              class="stretched-link overflow-hidden"
            >
              <img :src="item.image" :alt="item.title" class="img-cover w-100 h-100">
              <p
                class="small text-white position-absolute top-0 end-0 px-2 py-1 mb-0"
                style="background: rgba(0, 0, 0, .3)"
              >
                NT${{ $toCurrency(item.price) }}
              </p>
            </router-link>
            <p class="bg-white text-center p-2">{{ item.title }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>

  <Notice/>
</template>

<script>
import favoriteMixins from '@/mixins/favoriteMixins';
import Notice from '@/components/frontend/Notice.vue';

export default {
  name: 'Product Info',
  data() {
    return {
      products: [],
      product: {
        imagesUrl: [],
        options: {
          choose: [],
        },
      },
      qty: 1,
      tempOption: {
        qty: 1,
        spec: '',
      },
      favList: [],
      randomProducts: [],
      carts: [],
      loadingState: '',
      isLoading: false,
      swiper: {
        thumbsSwiper: null,
        thumbsStyle: {
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        },
        breakpoints: {
          428: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        },
      },
    };
  },
  inject: ['emitter'],
  mixins: [favoriteMixins],
  components: {
    Notice,
  },
  methods: {
    getProducts() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(url)
        .then((res) => {
          const { success, products, message } = res.data;
          if (success) {
            this.products = products;
            this.getRandomProducts();
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    getProduct(id) {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.axios.get(url)
        .then((res) => {
          const { success, product, message } = res.data;
          if (success) {
            this.product = product;
            document.title = `${product.title} | Dorii`;
            this.getProducts();
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    getRandomProducts() {
      this.randomProducts = [];
      const arrSet = new Set([]); // 不能塞入重複內容

      const productAll = [...this.products];
      productAll.forEach((item, index) => {
        if (item.id === this.product.id) {
          productAll.splice(index, 1);
        }
      });

      for (let i = 0; arrSet.size < 8; i + 1) {
        const num = Math.floor(Math.random() * productAll.length);
        arrSet.add(num);
        // console.log(arrSet, num); 測試用
      }

      arrSet.forEach((i) => {
        this.randomProducts.push(productAll[i]);
      });
    },
    validateQty() {
      if (this.qty < 1) {
        this.$swal.fire({ icon: 'warning', title: '數量不能小於 1' });
        this.qty = 1;
      }
    },
    addToCart(id) {
      if (this.product.options.choose && !this.tempOption.spec) {
        this.$swal.fire({ icon: 'warning', title: '請選擇規格' });
        return;
      }

      this.tempOption.qty = this.qty;

      let optionArr = [];
      // 判斷購物車有沒有同規格的商品
      this.carts.forEach((cart) => {
        if (id === cart.product.id) {
          optionArr = [...cart.option];
          optionArr.forEach((item, index) => {
            if (item.spec === this.tempOption.spec) {
              // 規格有重複到，累加 qty
              optionArr.splice(index, 1);
              this.tempOption.qty = this.qty + item.qty;
            }
          });
        }
      });

      optionArr.unshift(this.tempOption);

      this.loadingState = 'adding';

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.post(url, {
        data: { product_id: id, option: optionArr, qty: this.qty },
      })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$swal.fire({ icon: 'success', title: '已加入到購物車 🛒' });
            this.qty = 1;
            this.tempOption = {
              qty: 1,
              spec: '',
            };
            this.loadingState = '';
            this.emitter.emit('emit-update-cart');
          } else {
            this.$swal.fire({ icon: 'error', title: message });
            this.loadingState = '';
          }
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    setThumbsSwiper(swiper) {
      this.swiper.thumbsSwiper = swiper;
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        if (this.$route.params.id) {
          this.getProduct(this.$route.params.id);
        }
      },
    },
  },
  mounted() {
    this.tempOption.qty = 1;
    this.getProduct(this.$route.params.id);
    this.emitter.on('emit-provide-product', (carts) => {
      this.carts = carts;
    });
  },
  unmounted() {
    this.emitter.off('emit-provide-product', (carts) => {
      this.carts = carts;
    });
  },
};
</script>
