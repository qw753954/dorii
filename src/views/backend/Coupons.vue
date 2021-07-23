<template>
  <Loading :active="isLoading" :z-index="1061" loader="bars"/>
  <button
    type="button"
    class="add-fixed btn btn-lg rounded-circle shadow d-md-none"
    @click="openModal('new')"
  >
    <i class="fas fa-plus"></i>
  </button>
  <div class="row">
    <div class="col-md-11 mx-auto">
      <div class="d-md-flex justify-content-between align-items-center mb-4">
        <h3 class="text-center fs-4 mb-0">優惠券管理</h3>
        <button
          type="button"
          class="btn btn-secondary text-white d-none d-md-block"
          @click="openModal('new')"
        >
          新增優惠券
        </button>
      </div>
      <div class="card shadow rounded-4">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr class="bg-white sticky-top">
                  <th width="150">名稱</th>
                  <th width="100">代碼</th>
                  <th width="100">折扣百分比</th>
                  <th width="100">到期日</th>
                  <th width="80" class="text-center">是否啟用</th>
                  <th width="100"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in coupons" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.code }}</td>
                  <td>{{ item.percent }}%</td>
                  <!-- 變日期格式，扣一天 ↓ -->
                  <td>{{ $toLocalDate(item.due_date - 86400) }}</td>
                  <td>
                    <div class="d-flex justify-content-center switch-container">
                      <input
                       type="checkbox"
                       class="scroll-input"
                       :id="item.id"
                       :checked="item.is_enabled"
                       :true-value="1"
                       :false-value="0"
                       v-model="item.is_enabled"
                       @change="updateCoupon(false, item)"
                      >
                      <label :for="item.id" class="scroll-label"></label>
                    </div>
                  </td>
                  <td class="text-end">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="operate-btn btn btn-outline-secondary btn-sm"
                        @click="openModal('edit', item)"
                      >
                        <i class="fas fa-edit fa-fw"></i>
                      </button>
                      <button
                        type="button"
                        class="operate-btn btn btn-outline-danger btn-sm"
                        @click="openModal('delete', item)"
                      >
                        <i class="fas fa-trash-alt fa-fw"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CouponModal
    ref="couponModal"
    :is-new="isNew"
    :temp-coupon="tempCoupon"
    @emit-update="updateCoupon"
  />

  <DelModal
    ref="delModal"
    topic="coupon"
    :tempData="tempCoupon"
    @emit-change="triggerLoading"
    @emit-get="getCoupons"
  />
</template>

<script>
import CouponModal from '@/components/backend/CouponModal.vue';
import DelModal from '@/components/backend/DelModal.vue';

export default {
  name: '優惠券管理',
  inheritAttrs: false,
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isNew: true,
      isLoading: true,
    };
  },
  components: {
    CouponModal,
    DelModal,
  },
  methods: {
    getCoupons(page = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.axios.get(url)
        .then((res) => {
          const { success, coupons, pagination } = res.data;
          if (success) {
            this.coupons = coupons;
            this.pagination = pagination;
          }
          this.triggerLoading(false);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    updateCoupon(isNew, item) {
      this.triggerLoading(true);

      let url;
      let httpsMethod;
      if (isNew) {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        httpsMethod = 'post';
      } else {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpsMethod = 'put';
      }
      this.axios[httpsMethod](url, { data: item })
        .then((res) => {
          if (res.data.success) {
            this.$refs.couponModal.hideModal();
            this.getCoupons();
          } else {
            this.triggerLoading(false);
          }
          this.$httpMsgState(res.data, this.isNew ? '新增' : '更新');
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          this.isNew = true;
          this.tempCoupon = {
            due_date: Math.floor(Date.now() / 1000), // 預設會是當天日期
          };
          this.$refs.couponModal.openModal();
          break;
        case 'edit':
          this.isNew = false;
          this.tempCoupon = JSON.parse(JSON.stringify(item));
          this.$refs.couponModal.openModal();
          break;
        case 'delete':
          this.tempCoupon = { ...item };
          this.$refs.delModal.openModal();
          break;
        default:
          break;
      }
    },
    triggerLoading(boolean) {
      this.isLoading = boolean;
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
