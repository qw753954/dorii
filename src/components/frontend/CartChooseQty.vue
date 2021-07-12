<template>
  <div class="square-form-group">
    <button
      class="square-btn reduce position-relative"
      :class="{ disabled: item.qty <= 1 || loadingState === item.id }"
      @click="$emit('update-cart', item, item.qty - 1)"
    ></button>
    <input
      type="number"
      class="square-input"
      :class="{ disabled: loadingState === item.id }"
      v-model.number="item.qty"
      @change="$emit('update-cart', item, item.qty)"
    >
    <button
      class="square-btn add position-relative"
      :class="{ disabled: loadingState === item.id }"
      @click="$emit('update-cart', item, item.qty + 1)"
    ></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: this.cartItem,
      loadingState: '',
    };
  },
  props: ['cartItem', 'loadingStatePut'],
  emits: ['update-cart'],
  watch: {
    // 這邊不知道怎麼改比較好，如果用 watch 會一次觸發購物車品項數目的次數 QoQ
    cartItem() {
      console.log('修改惹');
      this.item = this.cartItem;
    },

    loadingStatePut() {
      this.loadingState = this.loadingStatePut;
    },
  },
};
</script>
