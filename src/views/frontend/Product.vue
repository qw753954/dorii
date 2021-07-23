<template>
  <CustomLoading :active="isLoading"/>

  <div class="product container-fluid position-relative" style="min-height: 100vh;">
    <!-- 麵包屑 -->
    <nav
      aria-label="breadcrumb"
      class="breadcrumb-wrap container position-absolute start-0 end-0 py-3"
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
          <!-- 輪播 -->
          <swiper
            style="height: 350px"
            class="mySwiper2 d-md-none mb-3"
            :style="{'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}"
            :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }"
          >
            <swiper-slide>
              <img :src="product.image" class="w-100 h-100 img-cover">
            </swiper-slide>
            <swiper-slide
              v-for="(item, index) in product.imagesUrl"
              :key="`swiperLgImg_${index}`"
            >
              <img :src="item" class="w-100 h-100 img-cover" style="object-fit: cover">
            </swiper-slide>
          </swiper>
          <swiper
            style="height: 100px"
            class="mySwiper d-md-none mb-5"
            @swiper="setThumbsSwiper" :spaceBetween="10" :slidesPerView="4" :freeMode="true"
            :watchSlidesVisibility="true" :watchSlidesProgress="true"
          >
            <swiper-slide>
              <img :src="product.image" class="w-100 h-100 img-cover">
            </swiper-slide>
            <swiper-slide
              v-for="(item, index) in product.imagesUrl"
              :key="`swiperSmImg_${index}`"
            >
              <img :src="item" class="w-100 h-100 img-cover">
            </swiper-slide>
          </swiper>

          <!-- 商品名稱、星級、說明，購買及退換貨須知 -->
          <div class="d-flex justify-content-between align-items-center pt-md-6 mb-3">
            <h2 class="h3 text-primary mb-0">{{ product.title }}</h2>
            <ul class="d-flex text-warning" v-if="product.options.rate">
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

          <p class="mb-3 bg-light p-3" v-if="product.description">
            {{ product.description }}
          </p>
          <p class="mb-5 text-space-pre" style="line-height: 32px;">{{ product.content }}</p>

          <div class="mb-5">
            <template
              v-for="(item, index) in product.options.choose"
              :key="`${item}_${index}`"
            >
              <input
                type="radio" class="btn-check" name="options" :id="`${item}_${index}`"
                autocomplete="off" :value="item" v-model="choice"
              >
              <label
                class="btn btn-sm btn-outline-primary me-3" :for="`${item}_${index}`"
              >
                {{ item }}
              </label>
            </template>
            <p
              class="small border-start border-3 border-highlight text-highlight px-2 mt-3"
              v-if="product.options.choose && product.options.choose.length !== 1"
            >
              購物車會合併不同規格的同款飾品<br>
              如要購買不同的規格，請<u>分開下單</u>，謝謝您～
            </p>
          </div>
          <div class="d-flex mb-4">
            <input
              type="number"
              min="1"
              class="bg-light border-bottom w-50 px-3"
              v-model.number="qty"
              @input="validate"
              @keyup.enter="addToCart(product.id)"
            >
            <button
              type="button"
              class="btn btn-primary"
              :class="{ disabled: loadingState }"
              @click="addToCart(product.id)"
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
              class="link-primary ms-auto py-1"
              :class="{ 'link-highlight': favList.includes(product.id) }"
              @click="updateFavorite(product.id)"
            >
              <i
                class="add-to-favorite far fa-heart fa-fw fa-2x"
                :class="{ 'fw-bolder': favList.includes(product.id) }"
              ></i>
            </button>
          </div>

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

  <!-- 注意事項 -->
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
    <div class="tab-content px-2 py-4" id="nav-tabContent" style="font-size: 14px;">
      <div
        class="tab-pane fade show active" id="buy-needToKnow" role="tabpanel"
        aria-labelledby="nav-buy-tab"
      >
        <ul class="list-style-circle ps-4">
          <li class="mb-2">
            相同飾品若要訂購不同的規格，請分開結帳
          </li>
          <li class="mb-2">
            飾品圖檔顏色會因電腦螢幕設定差異而略有不同，以實際商品顏色為準，敬請見諒
          </li>
          <li class="mb-2">
            組合包為整組販賣，不拆售
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
        <ul class="ps-4" style="list-style-type: circle;">
          <li class="mb-2">
            10 天鑑賞期時間判定基準：如 9/1 號收到商品，則請 9/7（含）前申請退換貨，依此類推
          </li>
          <li class="mb-2">
            <u>商品鑑賞期不等於試用期</u>，退回時請保持商品與包裝完整，如因外力撞擊等意外因素，造成了飾品刮傷受損，請恕無法接受退換貨
          </li>
          <li class="mb-2">
            如商品超過鑑賞期欲辦理退換貨者，恕不受理
          </li>
          <li>
            依<u>台灣消費者保護法</u>，耳環（耳針、穿刺型）屬個人貼身飾品，故無鑑賞期並基於個人衛生原則，恕不受理退換貨
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
        :slidesPerView="1" :spaceBetween="10"
        :pagination="{ 'clickable': true }"
        :autoplay="{
          'delay': 3000,
          'disableOnInteraction': false
        }"
        :breakpoints='{
          "640": {
            "slidesPerView": 2,
            "spaceBetween": 20
          },
          "768": {
            "slidesPerView": 3,
            "spaceBetween": 40
          },
          "1024": {
            "slidesPerView": 4,
            "spaceBetween": 60
          }
        }'
        class="mySwiper pb-6"
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
  name: '單一商品',
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
      choice: '',
      favList: [],
      randomProducts: [],
      loadingState: '',
      isLoading: true,
      thumbsSwiper: null,
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
            this.getLookAlike();
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
        })
        .catch((err) => {
          console.dir(err);
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
          console.dir(err);
        });
    },
    getLookAlike() {
      this.randomProducts = [];
      const arrSet = new Set([]); // 不能塞入重複內容

      const productAll = [...this.products];
      productAll.forEach((item, index) => {
        if (item.id === this.product.id) {
          productAll.splice(index, 1);
        }
      });

      for (let i = 0; arrSet.size < 6; i + 1) {
        const num = Math.floor(Math.random() * productAll.length);
        arrSet.add(num);
        // console.log(arrSet, num);
      }

      console.log('arrSet', arrSet);
      arrSet.forEach((i) => {
        this.randomProducts.push(productAll[i]);
      });
    },
    validate() {
      if (this.qty < 1) {
        this.$swal.fire({ icon: 'warning', title: '數量不能小於 1' });
        this.qty = 1;
      }
    },
    addToCart(id) {
      if (this.product.options.choose && !this.choice) {
        this.$swal.fire({ icon: 'warning', title: '請選擇規格' });
        return;
      }

      this.loadingState = 'adding';
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.post(url, { data: { product_id: id, choice: this.choice, qty: this.qty } })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$swal.fire({ icon: 'success', title: '已加入到購物車 🛒' });
            this.loadingState = '';
            this.emitter.emit('emit-update-cart');
          } else {
            this.$swal.fire({ icon: 'error', title: message });
            this.loadingState = '';
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
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
    this.qty = 1;
    this.getProduct(this.$route.params.id);
    this.checkStorage();
  },
};
</script>

<style lang="scss" scoped>
.recommend-item {
  a {
    height: 200px;
  }
  img {
    transition: all .3s;
  }
  &:hover img{
    transform: scale(1.1);
  }
}
</style>
