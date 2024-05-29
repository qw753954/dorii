<template>
  <CustomLoading :active="isLoading" />

  <Banner
    title="願望清單"
    engTitle="Wishlist"
    imageUrl="https://images.unsplash.com/photo-1507138262977-663e8efcde9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  >
    <li class="breadcrumb-item active" aria-current="page">
      願望清單
    </li>
  </Banner>
  <div class="bg-light">
    <div class="container py-7 py-md-9">
      <div
        class="text-priLight d-flex flex-column justify-content-center align-items-center vh-50"
        v-if="favorites.length === 0"
      >
        <i class="far fa-frown fa-4x mb-3"></i>
        <h3 class="h5 mb-4">目前沒有收藏任何商品...</h3>
        <router-link to="/products" class="btn btn-primary opacity-50">
          來去選購
        </router-link>
      </div>
      <template v-else>
      <div class="text-end">
        <button
          type="button" class="btn btn-sm btn-outline-gray mb-5"
          @click="checkIfRemoveAll"
        >
          <i class="far fa-trash-alt"></i> 清空全部
        </button>
      </div>

      <ul class="row row-cols-1 row-cols-xs-2 row-cols-md-3 row-cols-lg-4 list-unstyled">
        <Card :filter-products="favProducts"/>
      </ul>
      </template>
    </div>
  </div>

  <Subscribe/>
</template>

<script>
import { mapState, mapActions } from 'pinia';

import favStore from '@/stores/favStore';
import Banner from '@/components/frontend/Banner.vue';
import Card from '@/components/frontend/Card.vue';
import Subscribe from '@/components/frontend/Subscribe.vue';

import { $get } from '@/assets/javascript/fetchAPI';

export default {
  name: 'Favorite',
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  components: {
    Banner,
    Card,
    Subscribe,
  },
  methods: {
    ...mapActions(favStore, ['getFavId', 'removeAllFav']),
    async getProducts() {
      try {
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`;
        const res = await $get(url);
        const { success, products } = res.data;
        if (success) this.products = products;
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: err });
      }
    },
    checkIfRemoveAll() {
      this.$swal.fire({
        toast: false,
        icon: 'warning',
        title: '確定要清空願望清單嗎？',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: '確定',
        customClass: {
          title: 'fs-5',
          confirmButton: 'py-2',
          cancelButton: 'py-2',
        },
        timer: false,
      }).then((result) => {
        if (result.isConfirmed) this.removeAllFav();
      });
    },
  },
  computed: {
    ...mapState(favStore, ['favorites', 'favQty']),
    favProducts() {
      return this.products.filter((i) => this.favorites.includes(i.id));
    },
  },
  async created() {
    try {
      this.isLoading = true;
      this.getFavId();
      await this.getProducts();
      this.isLoading = false;
    } catch (err) {
      this.$swal.fire({ icon: 'error', title: err.message });
    }
  },
};
</script>
