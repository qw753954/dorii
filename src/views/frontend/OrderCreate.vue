<template>
  <CustomLoading :active="isLoading" />

  <!-- 上方 BANNER -->
  <Banner
    title="訂單資訊"
    engTitle="Order Info"
    imageUrl="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1628002514350.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ehSobRbgds04rlX9mTawGk1diYVcyoJIlOliLOBPND%2FTZwWzvBMTebq1S4u6fEWoDu6bzU3F08xGDCs5cM99%2FjdFkHX3oEwBALPn%2B6kQDtBwhEW0ALQTa03DVWa%2BGDTcMTTHY1lOXVEBMJC20ldYITKZ%2B3qgsK48hqHkuM%2BL8CkTUv77TPM6k1C%2B89LOShTxGl3hgvtIddE8HEibxHJiqMX%2BeFgPbesRigISFGyQv5g8KjUBT0JkMgYWVx69rh1n8wQogT0tDqdwQE9M0mifOb5lyCSJzI%2F7s1f%2Fme6u45QHbXS2%2BQ2DB5W9e%2F5DqiSWDmWjANPt45ZwD1DXctKvSQ%3D%3D"
  >
    <li class="breadcrumb-item active" aria-current="page">
      訂單資訊
    </li>
  </Banner>

  <div class="checkout bg-light">
    <div class="container py-7 py-md-9">
      <ul class="steps d-flex justify-content-between position-relative mx-auto mb-8">
        <li class="steps-item success w-33 d-flex flex-column align-items-center py-2 px-4">
          <p class="small rounded-circle text-center mb-2">
            <i class="far fa-check"></i>
          </p>
          資料填寫
        </li>
        <li
          class="steps-item w-33 d-flex flex-column align-items-center py-2 px-4"
          :class="{ active: !isPaid, success: isPaid || order.is_paid }"
        >
          <p class="small rounded-circle text-center mb-2">
            <i class="far fa-check" v-if="isPaid || order.is_paid"></i>
            <template v-else>2</template>
          </p>
          訂單建立
        </li>
        <li
          class="steps-item w-33 d-flex flex-column align-items-center py-2 px-4"
          :class="{ active: isPaid, success: order.is_paid }"
        >
          <p class="small rounded-circle text-center mb-2">
            <i class="far fa-check" v-if="order.is_paid"></i>
            <template v-else>3</template>
          </p>
          付款完成
        </li>
      </ul>

      <div class="row">
        <!-- 付款完成（僅出現在當下結帳完成之後） -->
        <div class="col-md-9 col-xl-7 mx-auto" v-if="isPaid">
          <div class="card-body bg-white text-center py-6">
            <i class="fad fa-check-circle text-success fa-3x mb-3"></i>
            <h3 class="h3 mb-5">付款成功</h3>
            <h4 class="h5">感謝您的訂購～</h4>
            <p class="mb-7">
              商品預計於五個工作天內寄送（不含週休及國定例假日）<br>
              再請留意簡訊通知及配送人員的電話
            </p>
            <router-link to="/products" class="btn btn-outline-primary">繼續購物</router-link>
          </div>
        </div>

        <!-- 訂單資訊 -->
        <div class="col-md-9 col-xl-7 mx-auto" v-else>
          <div class="card-header">
            <h2 class="h4 text-center py-3 mb-0">訂單資訊</h2>
          </div>
          <div class="card-body bg-white p-5">
            <h3
              class="h6 alert alert-highlight text-center rounded-4 mb-4"
              v-if="order.is_paid"
            >
              <i class="display-4 fas fa-badge-check d-block fw-bolder mb-2"></i>
              <p class="h5" v-if="isPaid">付款完成</p>
              <p class="h5" v-else>已付款</p>
              <span class="small" v-if="!isPaid">
                於 {{ new Date(order.paid_date * 1000).toLocaleString() }} 完成付款
              </span>
            </h3>
            <p class="small text-end text-gray">
              訂單成立時間：{{ new Date(order.create_at * 1000).toLocaleString() }}
            </p>

            <div class="accordion mb-4" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                  <button type="button" class="accordion-button fw-bold collapsed"
                  data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                  aria-expanded="false" aria-controls="collapseTwo" style="font-size: 15px;">
                    訂購商品
                  </button>
                </h2>
                <div
                  id="collapseTwo" class="accordion-collapse collapse"
                  aria-labelledby="headingTwo" data-bs-parent="#accordionExample"
                >
                  <ul class="accordion-body">
                    <template v-for="order in order.products" :key="order.id">
                      <li
                        class="d-flex position-relative mb-3"
                        v-for="specItem in order.option" :key="specItem.spec"
                      >
                        <img
                          :src="order.product.image" :alt="order.name"
                          class="flex-shrink-0 product-img img-cover me-3"
                        >
                        <div class="d-flex flex-column py-1">
                          <h5 class="h6 mb-auto">
                            {{ order.product.title }}
                            <div class="d-block small mt-1 mb-0" v-if="specItem">
                              <p class="small text-primary opacity-75">{{ specItem.spec }}</p>
                            </div>
                          </h5>
                          <p class="small mb-0">
                            x {{ specItem.qty }}
                          </p>
                          <router-link
                            :to="`/product/${order.product_id}`"
                            class="stretched-link"
                          >
                          </router-link>
                        </div>
                        <p class="ms-auto align-self-center text-end mb-0">
                          NT$ {{ $toCurrency(specItem.qty * order.product.price) }}
                        </p>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </div>

            <table class="table table-hover">
              <tbody>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">訂單編號</td>
                  <td class="user-select-all text-break">
                    <div class="d-flex">
                      <input
                        type="text" class="w-100 bg-transparent"
                        :value="order.id"
                        ref="idInput"
                        readonly
                      >
                      <button class="link-gray" @click="copyOrderId(order.id)">
                        <i class="far fa-copy"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">付款方式</td>
                  <td>{{ order.user.payment_method }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">姓名</td>
                  <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">手機</td>
                  <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">E-mail</td>
                  <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">收件地址</td>
                  <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold" width="30%">備註</td>
                  <td>{{ order.message }}</td>
                </tr>
                <tr>
                  <td scope="row" class="fw-bold align-middle">訂單金額</td>
                  <td>
                    <button
                      type="button"
                      class="fs-6 fw-bolder text-highlight d-flex justify-content-between
                      align-items-center w-100 ps-0"
                      data-bs-toggle="collapse" data-bs-target="#collapseCoupon"
                      aria-expanded="false" aria-controls="collapseExample"
                      v-if="total >= 1000 || hasCoupon"
                    >
                      NT$ {{ total &lt; 1000 ? $toCurrency(total + 120) : $toCurrency(total) }}
                      <i class="far fa-arrow-alt-circle-down link-gray"></i>
                    </button>
                    <template v-else>
                      NT$ {{ total &lt; 1000 ? $toCurrency(total + 120) : $toCurrency(total) }}
                    </template>
                    <div
                      class="collapse" id="collapseCoupon"
                      v-if="total >= 1000 || hasCoupon"
                    >
                      <ul class="collapse small text-highlight d-flex mt-1">
                        <li class="small me-2" v-if="total >= 1000">
                          <i class="fad fa-ticket"></i> 滿額免運
                        </li>
                        <li class="small" v-if="hasCoupon">
                          <i class="fad fa-ticket"></i> {{ couponName }}
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="button" class="btn btn-primary w-100 py-2 py-sm-3 mt-2 mt-sm-4"
              :disabled="loadingState === 'payING' || isPaid"
              v-if="!order.is_paid"
              @click="pay(order.id)"
            >
              <template v-if="loadingState === 'payING'">
                <i class="fas fa-spinner fa-pulse me-1"></i> 付款中
              </template>
              <template v-else>
                確認付款
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';

export default {
  name: 'Checkout: Order Info & Payment',
  data() {
    return {
      test: false,
      order: {
        products: [],
        user: {},
      },
      total: 0,
      hasCoupon: false,
      couponName: '',
      isPaid: false,
      loadingState: '',
      isLoading: false,
    };
  },
  inject: ['emitter'],
  components: {
    Banner,
  },
  methods: {
    getOrder(id) {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.axios.get(url)
        .then((res) => {
          const { success, order, message } = res.data;
          if (success) {
            this.order = order;
            this.total = Math.floor(order.total);

            // 判斷有沒有套用優惠券
            if (order.products[Object.keys(order.products)[0]].coupon !== undefined) {
              this.hasCoupon = true;
              this.couponName = order.products[Object.keys(order.products)[0]].coupon.title;
            }
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    pay(id) {
      this.loadingState = 'payING';

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/pay/${id}`;
      this.axios.post(url)
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$swal.fire({ icon: 'success', title: '付款完成囉～' });
            this.emitter.emit('emit-update-orders');
            this.isPaid = true;
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.loadingState = '';
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    copyOrderId(id) {
      this.$refs.idInput.select();
      document.execCommand('copy');

      this.$swal.fire({ icon: 'success', title: `${id}\n已複製到剪貼簿` });
    },
  },
  watch: {
    // 參考：https://stackoverflow.com/questions/56131100/vuejs-router-link-same-route-but-different-parameter
    '$route.params.id': {
      handler() {
        if (this.$route.path.includes('/checkout')) {
          this.isPaid = false;
          this.getOrder(this.$route.params.id);
        }
      },
    },
  },
  created() {
    this.getOrder(this.$route.params.id);
  },
};
</script>
