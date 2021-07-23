<template>
  <div
    class="cart offcanvas offcanvas-end bg-light py-3 px-4"
    tabindex="-1"
    ref="offcanvas"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h4 id="offcanvasRightLabel" class="h5 text-primary text-spacing-m mb-0">
        購物車
      </h4>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body me-2" :class="{ 'd-flex': !carts.length }">
      <div
        class="text-priLight opacity-75 text-center m-auto"
        v-if="!carts.length"
      >
        <template v-if="loadingState.get">
          <i class="display-3 far fa-grin-wink"></i>
          <p class="fs-3 text-spacing-m">
            Wait A Second ♥
          </p>
        </template>

        <template v-else>
          <i class="display-3 far fa-frown"></i>
          <p class="fs-3 text-spacing-m">Empty.</p>
          <router-link to="/products" class="btn btn-primary opacity-75" @click="hideOffcanvas">
            來去購物
          </router-link>
        </template>
      </div>
      <ul class="cart-main py-3" v-else>
        <li
          v-for="item in carts" :key="item.id"
          class="border-bottom border-secondary d-flex justify-content-between py-5"
        >
          <div class="d-flex">
            <a href="#" @click.prevent="changePage('product', item.product_id)">
              <img :src="item.product.image" class="cart-img img-cover">
            </a>
            <div class="d-flex flex-column ms-4">
              <h4 class="fs-6">
                {{ item.product.title }}
              </h4>
              <span
                class="text-gray border border-gray align-self-start px-1 mb-2"
                style="font-size: 12px;"
                v-if="item.choice"
              >
                {{ item.choice }}
              </span>
              <p class="mb-auto">NT$ {{ $toCurrency(item.total) }}</p>
              <CartChooseQty
                :cartItem="item"
                :loadingStatePut="loadingState.put"
                @update-cart="updateCart"
              >
              </CartChooseQty>
            </div>
          </div>
          <button
            type="button"
            class="delete btn text-primary"
            @click.prevent="delCart(item.id)"
          >
            <i class="fas fa-spinner fa-pulse" v-if="loadingState.del === item.id"></i>
            <i class="far fa-trash-alt" v-else></i>
          </button>
        </li>
      </ul>
    </div>
    <div class="p-3" v-if="carts.length">
      <p class="d-flex justify-content-end align-items-center mb-3">
        總計
        <span class="fs-5 ms-2">NT$ {{ $toCurrency(total) }}</span>
      </p>
      <div class="d-md-flex w-100">
        <button
          type="button"
          class="btn btn-outline-gray w-100 w-md-35 py-3 me-md-2 mb-2 mb-md-0"
          :class="{ disabled: loadingState.del === 'delete carts' }"
          @click="delCarts"
        >
          <!-- 若只是單純 <template>清空</template> 會無法顯示文字 -->
          <template v-if="loadingState.del === 'delete carts'">
            <i class="fas fa-spinner fa-pulse me-2"></i>清空中
          </template>
          <template v-else>
            清空購物車
          </template>
        </button>
        <button
          type="button"
          class="cart-btn btn btn-primary w-100 w-md-65 py-3 ms-md-2"
          @click="changePage('checkout')"
        >
          去結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Offcanvas from 'bootstrap/js/dist/offcanvas';

import CartChooseQty from './CartChooseQty.vue';

export default {
  data() {
    return {
      carts: [],
      total: 0,
      offcanvas: '',
      // isLoading: false,
      loadingState: {
        get: '',
        put: '',
        del: '',
      },
    };
  },
  inject: ['emitter'],
  components: {
    CartChooseQty,
  },
  methods: {
    getCarts() {
      this.loadingState.get = 'addING';

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(url)
        .then((res) => {
          const { success, data, message } = res.data;
          if (success) {
            this.carts = data.carts;
            this.total = data.total;

            // 避免時間差
            this.loadingState = {};

            // 更新 cart 圖示的數量
            this.emitter.emit('emit-update-qty', this.carts.length);

            // 更新結帳頁面
            this.emitter.emit('emit-update-checkout', this.carts);
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    delCarts() {
      this.$swal.fire({
        toast: false,
        icon: 'warning',
        title: '確定要清空購物車嗎？',
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
          this.loadingState.del = 'delete carts';

          const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/carts`;
          this.axios.delete(url)
            .then((res) => {
              if (res.data.success) {
                this.getCarts();
                this.$swal.fire({ icon: 'success', title: '已清空購物車' });
              } else {
                this.loadingState.del = '';
              }
            })
            .catch((err) => {
              console.dir(err);
            });
        }
      });
    },
    delCart(id) {
      this.loadingState.del = id;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.delete(url)
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.getCarts();
            this.$swal.fire({ icon: 'success', title: message });
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.loadingState.del = '';
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    updateCart(cart, outerQty = 1) {
      this.loadingState.put = cart.id;

      let qty = outerQty; // 因不能直接修改參數的值，所以另創一個變數去接

      // 若手動輸入值為 0 及 負值，就強迫讓原本的欄位 vaule 變成 1
      if (qty < 1) {
        this.carts.forEach((item, index) => {
          if (item.id === cart.id) {
            this.carts[index].qty = 1;
          }
          qty = 1;
        });
      }

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      this.axios.put(url, { data: { product_id: cart.product_id, qty } })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.getCarts();
            setTimeout(() => {
              this.$swal.fire({ icon: 'success', title: message });
            }, 500);
          } else {
            this.loadingState.put = '';
            this.$swal.fire({ icon: 'error', title: message });
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    changePage(target, id) {
      if (target === 'product') {
        this.$router.push(`/product/${id}`);
      } else if (target === 'checkout') {
        this.$router.push('/checkout');
      }
      this.hideOffcanvas();
    },
    openOffcanvas() {
      this.offcanvas.show();
    },
    hideOffcanvas() {
      this.offcanvas.hide();
    },
  },
  created() {
    this.getCarts();

    // 更新購物車列表（加入購物車、送出訂單）
    this.emitter.on('emit-update-cart', this.getCarts);

    // 在結帳頁面修改購物清單，開啟 offcanvas
    this.emitter.on('emit-open-offcanvas', this.openOffcanvas);

    // 在結帳頁面時若購物車空空回到商品頁面，關閉 offcanvas
    this.emitter.on('emit-hide-offcanvas', this.hideOffcanvas);
  },
  mounted() {
    this.offcanvas = new Offcanvas(this.$refs.offcanvas);
  },
};
</script>
