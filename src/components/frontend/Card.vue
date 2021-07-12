<template>
  <li
    class="product-item col mb-4"
    v-for="(item, index) in filterProducts"
    :key="item.id"
  >
    <a
      href="#"
      class="shadow-sm d-flex align-item-end position-relative"
      @click.prevent="$router.push(`/product/${item.id}`)"
    >
      <img
        :src="item.image" :alt="`${item.title}_${index}`"
        class="w-100 img-cover"
      >
      <span
        class="badge bg-highlight position-absolute p-2"
        style="top: -5px; right: -5px; z-index: 10;"
        v-if="item.options.rate == 5"
      >
        <i class="fad fa-crown me-1"></i>闆娘推薦
      </span>
    </a>
    <div class="bg-white shadow-sm p-2">
      <div class="d-flex flex-md-column justify-content-between
      align-items-center align-items-md-start">
        <h3 class="fs-5 pt-1">{{ item.title }}</h3>
        <span class="badge bg-secondary rounded-pill px-2 mb-2">
          {{ item.category }}
        </span>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-center">
          <p class="mb-0">NT${{ $toCurrency(item.price) }}</p>
          <del class="small text-muted ms-2" v-if="item.price !== item.origin_price">
            ${{ $toCurrency(item.origin_price) }}
          </del>
        </div>
        <ul class="d-flex">
          <li>
            <button
              type="button"
              class="link-priLight py-2"
              @click="addToCart(item.id)"
            >
              <template v-if="loadingState === item.id">
                <i class="fas fa-spinner fa-pulse"></i>
              </template>
              <template v-else>
                <i class="fas fa-shopping-cart fa-fw"></i>
              </template>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="link-priLight py-2"
              :class="{ 'text-highlight': favList.includes(item.id) }"
              @click="updateFavorite(item.id)"
            >
              <i class="fas fa-heart fa-fw"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
import favoriteMixins from '@/mixins/favoriteMixins';

export default {
  data() {
    return {
      products: [],
      loadingState: '',
    };
  },
  inject: ['emitter'],
  props: ['filterProducts'],
  mixins: [favoriteMixins],
  methods: {
    addToCart(id, qty = 1) {
      this.loadingState = id;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.post(url, { data: { product_id: id, qty } })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.emitter.emit('emit-update-cart');
          }

          this.loadingState = '';
          this.$swal.fire({ icon: 'success', title: message });
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  created() {
    this.checkStorage();
  },
};
</script>
