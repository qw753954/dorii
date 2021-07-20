<template>
  <div class="container-fluid">
    <!-- Banner -->
    <div class="content row bg-light" id="banner">
      <div
        class="col-2 d-none d-md-flex justify-content-center align-items-center
        border-secondary border-end"
      >
        <p class="opening-date fs-1 text-secondary">2021.6.15</p>
      </div>
      <div class="col h-100">
        <div class="row h-100 justify-content-between">
          <div class="col-md-8 d-none d-md-block">
            <div class="slogan text-center text-md-start d-flex flex-column justify-content-end
              h-50 ps-md-6">
              <h2 class="display-1 mb-2">Decorate</h2>
              <h2 class="display-3 ms-lg-10 mb-4">You As a Beauty.</h2>
            </div>
            <div
              class="h-50"
              style="background: url('https://images.unsplash.com/photo-1599357226640-272df7b6ef37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80') no-repeat fixed center/ contain;"
            >
            </div>
          </div>
          <h2 class="slogan display-1 d-flex justify-content-center align-items-end d-md-none
            text-spacing-l">
            Decorate
          </h2>
          <div
            class="col-md-4 pics-carousel"
            style="background: url('https://images.unsplash.com/photo-1599357230525-d34c4e3ee6cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80') no-repeat center/ cover;"
          >
          </div>
          <h2 class="slogan display-4 text-center d-md-none">
            You As a Beauty.
          </h2>
        </div>
      </div>
    </div>
    <!-- Scroll down -->
    <div class="row bg-light mt-0 pt-0" id="main">
      <div
      class="col-md-2 d-flex flex-column align-items-center border-secondary border-end pt-6"
      >
        <span class="text-dark">scroll down</span>
        <div class="scroll-drop mt-3"></div>
      </div>
    </div>
  </div>

  <!-- 歡慶開幕 | 優惠券 -->
  <div class="position-relative"
    style="height: 420px; background: url('https://images.unsplash.com/photo-1599357232141-ecb9acf34469?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1750&q=80') no-repeat fixed center bottom/ cover"
  >
    <div class="coupon-mask d-flex flex-column align-items-center justify-content-center">
      <small class="badge bg-light text-dark rounded-pill mb-3 mb-md-4">Discount</small>
      <h3 class="h1 px-1 mb-4">歡慶開幕</h3>
      <p class="mb-6 mb-md-9">
        即日起至 2021-09-12，全館消費不限金額，即享 <strong class="fs-5">88%</strong> 折扣
      </p>
      <div class="discount-code position-relative" @click="copyCode">
        <i class="far fa-cut fs-5 fa-beat"></i>
        <input
          type="text"
          class="text-white text-center bg-transparent w-100 py-3"
          value="88520"
          ref="couponInput"
          readonly
        >
      </div>
    </div>
  </div>

  <!-- 新品 -->
  <div class="new-arrival container mb-6 mb-md-0">
    <div class="row">
      <div
        class="title col-md-5 col-lg-4 d-flex align-items-center sticky-top py-8 mb-3 mb-md-0"
      >
        <h3 class="display-2 text-spacing-l fw-bold text-primary px-3 px-md-4">
          NEW <br class="d-none d-md-block">
          <span class="display-5 ps-lg-7">ARRIVAL</span>
        </h3>
      </div>
      <div class="col-md-7 col-lg-8 border-start-md mt-n6 mt-md-0 py-3 py-md-10">
        <div class="d-flex flex-column flex-sm-row justify-content-evenly">
          <ul class="w-75 w-sm-40 mx-auto mb-5 mb-md-9">
            <li class="mb-5 mb-md-9">
              <img src="https://images.unsplash.com/photo-1611653842967-39eb011b2ca3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" class="img-fluid" alt="新品1">
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1611653843274-4b1f4eb3f950?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" class="img-fluid" alt="新品2">
            </li>
          </ul>
          <ul class="w-75 w-sm-40 mb-5 mb-sm-9 mt-md-10 mx-auto">
            <li class="mb-5 mb-md-9">
              <img src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80" class="img-fluid" alt="新品3">
            </li>
            <li>
              <img src="https://images.unsplash.com/photo-1611653843092-db22a32f0d85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" class="img-fluid" alt="新品4">
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-center">
          <router-link to="/product/-MbqzSiAvWlRp4Nbui80" class="shopping-btn text-body">
            點我逛逛 <i class="fas fa-arrow-right"></i>
          </router-link>
          <!-- <button class="shoppp-btn btn w-50 py-3">點我逛逛</button> -->
        </div>
      </div>
    </div>
  </div>

  <!-- 商品分類 -->
  <div class="categories container-fluid">
    <div class="row vh-100">
      <div class="col-lg-6 px-0">
        <a
          href="#"
          class="text-white d-flex justify-content-center align-items-center h-100"
          style="background: url('https://images.unsplash.com/photo-1620291699655-d958150a3ff8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80') no-repeat center/ 190%"
          @click.prevent="goCategory('項鍊')"
        >
          <h3 class="fs-1 text-center overflow-hidden pb-1">
            <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">項鍊</small>
            Necklace
          </h3>
        </a>
      </div>
      <div class="col-lg-6 px-0">
        <div class="d-flex h-50">
          <a
            href="#"
            class="text-white d-flex justify-content-center align-items-center h-100 w-50"
            style="background: url('https://images.unsplash.com/photo-1620291699660-8271823aab1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80') no-repeat 30% center/ 190%"
            @click.prevent="goCategory('耳環')"
          >
            <h3 class="fs-1 text-center overflow-hidden pb-1">
              <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">耳環</small>
              Earring
            </h3>
          </a>
          <a
            href="#"
            class="text-white d-flex justify-content-center align-items-center h-100 w-50"
            style="background: url('https://images.unsplash.com/photo-1598472142296-b9e8f89bd9a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80') no-repeat 35% center/ 190%"
            @click.prevent="goCategory('手鍊')"
          >
            <h3 class="fs-1 text-center overflow-hidden pb-1">
              <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">手鍊</small>
              Bracelet
            </h3>
          </a>
        </div>
        <a
          href="#"
          class="text-white d-flex justify-content-center align-items-center h-50"
          style="background: url('https://images.unsplash.com/photo-1488846156747-f17f59c58e70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80') no-repeat center 32%/ 190%"
          @click.prevent="goCategory('戒指')"
        >
          <h3 class="fs-1 text-center overflow-hidden pb-1">
            <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">戒指</small>
            Ring</h3>
        </a>
      </div>
    </div>
  </div>
  <Notice></Notice>
</template>

<script>
import Notice from '@/components/frontend/Notice.vue';

export default {
  name: '首頁',
  components: {
    Notice,
  },
  methods: {
    copyCode() {
      console.log(this.$refs.couponInput);
      this.$refs.couponInput.select();
      document.execCommand('copy');

      this.$swal.fire({ icon: 'success', title: '88520 已複製到剪貼簿' });
    },
    goCategory(name) {
      // https://router.vuejs.org/zh/guide/essentials/navigation.html
      // https://ithelp.ithome.com.tw/articles/10239165?sc=iThomeR
      // route 傳值有分 params 和 query 兩種方式，跳轉頁面要用 name 來定義，因為 params 會被 path 忽略
      this.$router.push({
        name: '商店',
        params: {
          categoryTitle: name,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .content {
    height: calc(100vh - 97px);
    @media (max-width: 767.98px) {
      height: calc(100vh - 83px)
    }
  }
</style>
