<template>
  <CustomLoading :active="isLoading"></CustomLoading>

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
        class="text-gray d-flex flex-column justify-content-center align-items-center vh-50"
        v-if="favorites.length === 0"
      >
        <i class="fal fa-frown fa-4x mb-3"></i>
        <h3 class="h5">目前沒有收藏任何商品...</h3>
      </div>
      <template v-else>
      <div class="text-end">
        <button
          type="button" class="btn btn-sm btn-outline-primary mb-5"
          @click="delAllFav"
        >
          <i class="far fa-trash-alt"></i> 清空全部
        </button>
      </div>

      <ul class="row row-cols-2 row-cols-md-4">
        <Card :filter-products="favorites"/>
      </ul>
      </template>
    </div>
  </div>

  <Subscribe/>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';
import Card from '@/components/frontend/Card.vue';
import Subscribe from '@/components/frontend/Subscribe.vue';

export default {
  name: '願望清單',
  data() {
    return {
      favorites: [],
      products: [],
      isLoading: false,
    };
  },
  components: {
    Banner,
    Card,
    Subscribe,
  },
  inject: ['emitter'],
  methods: {
    getProducts() {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.axios.get(url)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.getFavorites();
            this.isLoading = false;
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getFavorites() {
      this.favorites = [];
      const favIdArr = JSON.parse(localStorage.getItem('myFav')) || [];
      for (let i = 0; i < this.products.length; i += 1) {
        for (let j = 0; j < favIdArr.length; j += 1) {
          if (this.products[i].id === favIdArr[j]) {
            this.favorites.push(this.products[i]);
          }
        }
      }
    },
    delAllFav() {
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
        if (result.isConfirmed) {
          localStorage.setItem('myFav', JSON.stringify([]));
          this.getFavorites();
          this.$swal.fire({ icon: 'success', title: '已全數刪除' });
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.emitter.on('emit-update-favorite', this.getFavorites);
  },
};
</script>
