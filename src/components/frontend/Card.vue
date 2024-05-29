<template>
  <li
    data-aos="fade-up" data-aos-offset="0"
    class="product-card col overflow-hidden position-relative pb-1 mb-4"
    v-for="(item, index) in filterProducts"
    :key="item.id"
  >
    <div
      class="image shadow-sm stretched-link position-relative d-flex align-item-end"
      @click.prevent="$router.push(`/product/${item.id}`)"
    >
      <img
        :src="item.image" :alt="`${item.title}_${index}`"
        class="w-100 img-cover"
      >
      <span
        class="badge bg-highlight position-absolute top-0 end-0 p-2"
        style="z-index: 10;"
        v-if="item.options.rate == 5"
      >
        <i class="fad fa-crown me-1"></i>推薦
      </span>
    </div>
    <div class="bg-white shadow-sm" style="padding: 10px">
      <div class="d-flex flex-xs-column justify-content-between align-items-center
      align-items-xs-start mb-3 mb-xs-0">
        <h3 class="fs-5 pt-1 mb-0 mb-xs-2">
          <a
            href="#"
            class="stretched-link"
            @click.prevent="$router.push(`/product/${item.id}`)"
          >
          {{ item.title }}
          </a>
        </h3>
        <span class="badge bg-secondary rounded-pill mb-xs-3">
          {{ item.category }}
        </span>
      </div>
      <div class="d-flex">
        <div class="d-flex align-items-center me-auto">
          <p class="mb-0">NT${{ $toCurrency(item.price) }}</p>
          <del class="small text-muted ms-2" v-if="item.price !== item.origin_price">
            ${{ $toCurrency(item.origin_price) }}
          </del>
        </div>
        <button
          type="button"
          class="add-to-favorite link-priLight px-0"
          :class="{ 'text-highlight': favorites.includes(item.id) }"
          style="z-index: 10;"
          @click="updateFav(item.id, $swal)"
        >
          <i class="fas fa-heart fa-lg fa-fw"></i>
        </button>
      </div>
    </div>
  </li>

</template>

<script>
import { mapActions, mapState } from 'pinia';

import favStore from '@/stores/favStore';

export default {
  data() {
    return {
      products: [],
      loadingState: '',
    };
  },
  props: {
    filterProducts: Object,
  },
  computed: {
    ...mapState(favStore, ['favorites']),
  },
  methods: {
    ...mapActions(favStore, ['updateFav', 'getFavId']),
  },
  created() {
    this.getFavId();
  },
};
</script>
