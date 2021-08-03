<template>
  <CustomLoading :active="isLoading" />

  <!-- 上方 BANNER -->
  <Banner
    title="結帳"
    engTitle="Checkout"
    imageUrl="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627553146437.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ss7BX5S9DzyBpLt4ijBgFHqMlVHSScW2%2B%2B%2BiVPG8RH2oO793fOoUe3PFpChuGs5ZS0nQT6dLAYY3XkkTue%2FhJuCbE5l5vrvmVOFuMG2j8sGLftEojWxu6BakqmO1e2mlNudVEGi%2FsGc94Um5T7336KclW77FHSdQJzwRIiUJJAHDzLnnw2wKbLmhaEwrxbe66Y9FzaZRN%2BYJ7oVQ1ovLoFp5VTSxGLmt0cGi1VqHDlpqXcKnzHp9oRMJt94GJtaCaE%2FH4b1cQSMKxPx%2FHgFUGluzeIZWXzBjFQTbj6iKSdD4xndLTv%2FIl%2F5gHNrpRtfSVXHPtHJ8L8VpIcVOi4pe9Q%3D%3D"
  >
    <li class="breadcrumb-item active" aria-current="page">
      結帳
    </li>
  </Banner>

  <div class="checkout bg-light">
    <div class="container py-7 py-md-9">
      <ul class="steps d-flex justify-content-between position-relative mx-auto mb-8">
        <li class="steps-item active w-33 d-flex flex-column align-items-center py-2 px-4">
          <p class="small rounded-circle text-center mb-2">
            1
          </p>
          資料填寫
        </li>
        <li class="steps-item w-33 d-flex flex-column align-items-center py-2 px-4">
          <p class="small rounded-circle text-center mb-2">
            2
          </p>
          訂單建立
        </li>
        <li class="steps-item w-33 d-flex flex-column align-items-center py-2 px-4">
          <p class="small rounded-circle text-center mb-2">
            3
          </p>
          付款完成
        </li>
      </ul>

      <div class="row gx-6">
        <div class="col-lg col-xl-5 mb-4">
          <div class="bg-white p-5">
            <h2 class="h5 text-primary text-center border-bottom position-relative pb-3 mb-0">
              購物清單
              <button
                type="button"
                class="btn btn-sm border-0 link-gray position-absolute end-0"
                @click="emitter.emit('emit-open-offcanvas')"
              >
                <i class="far fa-edit"></i> 修改
              </button>
            </h2>
            <ul class="product-list border-bottom py-4 mb-3">
              <template v-for="cart in carts" :key="cart.id">
                <li
                  class="d-flex justify-content-between mb-4"
                  v-for="specItem in cart.option" :key="specItem.spec"
                >
                  <div class="d-flex">
                    <img
                      :src="cart.product.image"
                      class="product-img img-cover"
                      :alt="cart.product.title"
                    >
                    <div class="d-flex flex-column ms-4">
                      <h4 class="fs-6 mb-1">
                        {{ cart.product.title }}
                      </h4>
                      <span class="small text-gray align-self-start rounded-pill mb-auto">
                        {{ specItem.spec }}
                      </span>
                      <p class="mb-0">
                        NT$ {{ $toCurrency(cart.product.price) }}
                      </p>
                    </div>
                  </div>
                  <p class="text-end align-self-center mb-0">
                    x {{ specItem.qty }}
                  </p>
                </li>
              </template>
            </ul>
            <div class="border-bottom pb-3 mb-3">
              <div class="input-group mb-3">
                <input
                  type="text" class="form-control" placeholder="輸入優惠券代碼"
                  v-model.trim="coupon.code"
                  :disabled="hasCoupon"
                  @keyup.enter="useCoupon"
                >
                <button
                  type="button"
                  class="btn btn-sm btn-outline-highlight"
                  @click="hasCoupon = false"
                  v-if="hasCoupon"
                >
                  修改優惠券
                </button>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-highlight"
                  :disabled="!coupon.code || loadingState === 'use coupon'"
                  @click="useCoupon"
                  v-else
                >
                  <template v-if="loadingState === 'use coupon'">
                    <i class="fas fa-spinner fa-pulse"></i>
                    套用中
                  </template>
                  <template v-else>
                    套用優惠券
                  </template>
                </button>
              </div>
              <p class="small text-gray fw-bold d-flex justify-content-between mb-1">
                運費
                <!-- https://www.ailoli.org/archives/100/ -->
                <!-- https://github.com/vuejs/eslint-plugin-vue/issues/370 -->
                <span>+ ${{`${finalTotal &lt; 1000 ? 120 : 0}`}}</span>
              </p>
              <p
                class="small text-info fw-bold d-flex justify-content-between mb-1"
                v-if="total !== finalTotal"
              >
                已折抵
                <span>- ${{ total - finalTotal }}</span>
              </p>
              <p
                class="fs-6 fw-bold d-flex justify-content-between mb-0"
              >
                總金額
                <span>
                  NT$
                  <template v-if="finalTotal < 1000">
                    {{ $toCurrency(finalTotal + 120) }}
                  </template>
                  <template v-else>
                    {{ $toCurrency(finalTotal) }}
                  </template>
                </span>
              </p>
            </div>
            <p class="fw-bold mb-2">已享用之優惠</p>
            <ul>
              <li v-if="!(finalTotal >= 1000) && !usedCoupon">
                暫無
              </li>
              <!-- 常駐優惠：滿額免運 -->
              <li
                class="small d-flex align-items-start align-items-xs-center mb-2"
                v-if="finalTotal >= 1000"
              >
                <span class="badge bg-highlight py-1 px-2 px-md-3 me-2">免運優惠</span>
                <span>消費滿 $1,000 免運費【系統自動套用】</span>
              </li>
              <!-- 優惠券套用 -->
              <li
                class="small d-flex align-items-start align-items-xs-center"
                v-if="usedCoupon"
              >
                <span class="badge bg-highlight py-1 px-2 px-md-3 me-2">優惠促銷</span>
                <span>{{ usedCoupon.content }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg col-xl-7">
          <div class="bg-white p-5">
            <h2 class="h5 text-primary text-center border-bottom pb-3 mb-4">訂購人資訊</h2>
            <Form ref="orderForm" @submit="onSubmit" v-slot="{ errors }">
              <div class="form-floating mb-3">
                <Field
                  type="email" class="form-control" id="email" placeholder="E-mail"
                  name="E-mail" rules="required|email" v-model="userInfo.user.email"
                  :class="{ 'is-invalid': errors['E-mail'] }"
                />
                <label for="email">E-mail <span class="text-highlight">*</span></label>
                <ErrorMessage class="invalid-feedback" name="E-mail"/>
              </div>
              <div class="form-floating mb-3">
                <Field
                  type="text" class="form-control" id="name" placeholder="姓名"
                  name="姓名" rules="required" v-model="userInfo.user.name"
                  :class="{ 'is-invalid': errors['姓名'] }"
                />
                <label for="name">姓名 <span class="text-highlight">*</span></label>
                <ErrorMessage class="invalid-feedback" name="姓名"/>
              </div>
              <div class="form-floating mb-3">
                <Field
                  type="tel" class="form-control" id="phone" placeholder="手機"
                  name="手機" :rules="isPhone" v-model="userInfo.user.tel"
                  :class="{ 'is-invalid': errors['手機'] }"
                />
                <label for="phone">手機 <span class="text-highlight">*</span></label>
                <ErrorMessage class="invalid-feedback" name="手機"/>
              </div>
              <div class="form-floating mb-3">
                <Field
                  class="form-select" id="payment" name="付款方式"
                  rules="required" v-model="userInfo.user.payment_method" as="select"
                  :class="{ 'is-invalid': errors['付款方式'] }"
                >
                  <option value="" selected disabled>請選擇...</option>
                  <option value="信用卡">信用卡</option>
                  <option value="ATM 轉帳">ATM 轉帳</option>
                  <option value="Apple pay">Apple pay</option>
                </Field>
                <label for="payment">付款方式 <span class="text-highlight">*</span></label>
                <ErrorMessage class="invalid-feedback" name="付款方式"></ErrorMessage>
              </div>
              <div class="form-floating mb-3">
                <Field
                  type="text" class="form-control" id="address" placeholder="收件地址"
                  name="收件地址" rules="required" v-model="userInfo.user.address"
                  :class="{ 'is-invalid': errors['收件地址'] }"
                />
                <label for="address">收件地址 <span class="text-highlight">*</span></label>
                <ErrorMessage class="invalid-feedback" name="收件地址"/>
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control" id="ps" placeholder="Leave a comment here"
                  style="height: 150px"
                  v-model="userInfo.message"
                ></textarea>
                <label for="ps">備註</label>
              </div>
              <button
                type="submit" class="btn btn-primary w-100 py-3"
                :disabled="loadingState === 'submit order'"
              >
                <template v-if="loadingState === 'submit order'">
                  <i class="fas fa-spinner fa-pulse me-1"></i> 送出中
                </template>
                <template v-else>
                  送出訂單
                </template>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';

export default {
  name: 'Checkout: Fill out the form',
  data() {
    return {
      carts: [],
      total: 0,
      finalTotal: 0,
      coupon: {
        code: '',
      },
      usedCoupon: '',
      hasCoupon: false,
      userInfo: {
        user: {},
      },
      loadingState: '',
      isLoading: true,
    };
  },
  inject: ['emitter'],
  components: {
    Banner,
  },
  methods: {
    getCarts() {
      // 如果沒用 if 判斷，訂單送出後會再次戳這支 API
      if (this.$route.path === '/checkout') {
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
        this.axios.get(url)
          .then((res) => {
            const { success, data, message } = res.data;
            if (success) {
              this.carts = data.carts;
              this.total = data.total;
              this.finalTotal = Math.floor(data.final_total);

              // 當購物車空空時就導回全部商品頁面
              if (this.carts.length === 0 && this.$route.path === '/checkout') {
                this.$swal.fire({ icon: 'warning', title: '購物車沒東西了～\n頁面即將跳轉回商店' });
                setTimeout(() => {
                  this.$router.replace('/products');
                  this.emitter.emit('emit-hide-offcanvas');
                }, 1500);
                return;
              }

              // 若有套用過優惠券，就顯示相對資訊
              // https://stackoverflow.com/questions/39282873/how-do-i-access-the-object-prototype-method-in-the-following-logic
              if (Object.prototype.hasOwnProperty.call(data.carts[0], 'coupon')) {
                this.usedCoupon = this.carts[0].coupon;
                this.coupon.code = this.usedCoupon.code;
                this.hasCoupon = true;
              }
            } else {
              this.$swal.fire({ icon: 'error', title: message });
            }
            this.isLoading = false;
          })
          .catch((err) => {
            this.$swal.fire({ icon: 'error', title: err.message });
          });
      }
    },
    useCoupon() {
      this.loadingState = 'use coupon';
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/coupon`;
      this.axios.post(url, { data: this.coupon })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            this.$swal.fire({ icon: 'success', title: '已套用優惠券' });
            this.getCarts();
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.loadingState = '';
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    isPhone(value) {
      if (!value) return '手機 為必填';
      const phoneNum = /^(09)[0-9]{8}$/;
      return phoneNum.test(value) ? true : '須為有效的手機號碼';
    },
    onSubmit() {
      this.loadingState = 'submit order';
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/order`;
      this.axios.post(url, { data: this.userInfo })
        .then((res) => {
          const { success, orderId, message } = res.data;
          if (success) {
            this.userInfo.message = '';
            this.$refs.orderForm.resetForm();

            this.$router.replace(`/checkout/${orderId}`);

            // 訂單送出後，購物車、搜尋訂單的資料也需更新
            this.emitter.emit('emit-update-cart');
            this.emitter.emit('emit-update-orders');
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.loadingState = '';
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
  },
  created() {
    this.getCarts();

    // 更新購物清單
    this.emitter.on('emit-update-checkout', this.getCarts);
  },
  unmounted() {
    this.emitter.on('emit-update-checkout', this.getCarts);
  },
};
</script>
