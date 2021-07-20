<template>
  <CustomLoading :active="isLoading"></CustomLoading>

  <div class="product container-fluid position-relative mb-9" style="min-height: 100vh;">
    <!-- 麵包屑 -->
    <nav
      aria-label="breadcrumb"
      class="breadcrumb-wrap container position-absolute start-0 end-0 py-3"
      style="z-index: 1020;"
    >
      <ol class="breadcrumb">
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
    <div class="product-info container position-absolute top-0 bottom-0 start-0 end-0">
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
          <div class="d-flex justify-content-between align-items-center pt-md-5 mb-3">
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

          <p class="mb-3 text-space-pre">{{ product.description }}</p>
          <p class="mb-5" v-html="product.content"></p>

          <div class="mb-4">
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
              @change="validate"
              @keyup.enter="addToCart(product.id,1)"
            >
            <button
              type="button"
              class="btn btn-primary"
              :class="{ disabled: loadingState }"
              @click="addToCart(product.id,1)"
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
              :class="{ 'link-highlight': favList.includes(id) }"
              @click="updateFavorite(id)"
            >
              <i
                class="add-to-favorite far fa-heart fa-fw fa-2x"
                :class="{ 'fw-bolder': favList.includes(id) }"
              ></i>
            </button>
          </div>

          <div class="accordion accordion-flush mb-5" id="accordionNotice">
            <div class="accordion-item">
              <h3 class="h5 accordion-header" id="flush-headingOne">
                <button
                  class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#shopping-notice"
                  aria-expanded="false" aria-controls="flush-collapseOne"
                >
                  購買須知
                </button>
              </h3>
              <div
                id="shopping-notice" class="accordion-collapse collapse"
                aria-labelledby="flush-headingOne" data-bs-parent="#accordionNotice"
              >
                <div class="accordion-body">
                  <ul class="list-style-circle ps-3">
                    <li class="mb-2">
                      相同飾品若要訂購不同的規格，請分開結帳
                    </li>
                    <li class="mb-2">
                      組合包為整組販賣，不拆售
                    </li>
                    <li>
                      若有禮物包裝需求，請於訂單中備註，我們會協助進行免費包裝
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h3 class="accordion-header" id="flush-headingTwo">
                <button
                  class="accordion-button d-flex align-items-center collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target="#re-notice"
                  aria-expanded="false" aria-controls="flush-collapseTwo"
                >
                  退換貨須知
                </button>
              </h3>
              <div
                id="re-notice" class="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo" data-bs-parent="#accordionNotice"
              >
                <div class="accordion-body">
                  <ul class="ps-3" style="list-style-type: circle;">
                    <li class="mb-2">
                      商品享有十天鑑賞期，退回時請保持商品與包裝完整，如因外力撞擊等意外因素，造成了飾品刮傷受損，請恕無法接受退換貨
                    </li>
                    <li>
                      耳環（耳針、穿刺型）屬個人貼身飾品，故無鑑賞期並基於個人衛生原則，恕不受理退換貨
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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

  <div class="bg-light container py-5 mb-7 mb-md-9">
    <h3 class="h4 text-center">您可能會有興趣的飾品</h3>
    <ul>
      <Card></Card>
    </ul>
  </div>
  <Notice></Notice>
</template>

<script>
import favoriteMixins from '@/mixins/favoriteMixins';
import Card from '@/components/frontend/Card.vue';
import Notice from '@/components/frontend/Notice.vue';

export default {
  data() {
    return {
      product: {
        imagesUrl: [],
        options: {
          choose: [],
        },
      },
      id: '',
      qty: 0,
      choice: '',
      favList: [],
      thumbsSwiper: null,
      loadingState: '',
      isLoading: false,
    };
  },
  inject: ['emitter'],
  mixins: [favoriteMixins],
  components: {
    Card,
    Notice,
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.axios.get(url)
        .then((res) => {
          const { success, product, message } = res.data;
          if (success) {
            this.product = product;
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
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
            this.$swal.fire({ icon: 'success', title: message });
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
  created() {
    this.qty = 1;
    this.id = this.$route.params.id;
    this.getProduct(this.id);
    this.checkStorage();
  },
};
</script>
