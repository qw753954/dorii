<template>
  <div class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">

        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white" id="exampleModalLabel">
            {{ isNew ? '新增優惠券' : '編輯優惠券' }}
          </h5>
          <button type="button"
           class="btn-close btn-close-white"
           data-bs-dismiss="modal"
           aria-label="Close"
          >
          </button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">標題<span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="請輸入標題"
              v-model.trim="coupon.title"
            >
          </div>
          <div class="mb-3">
            <label for="code" class="form-label">優惠碼<span class="text-danger">*</span></label>
            <input
             type="text"
             class="form-control"
             id="code"
             placeholder="請輸入優惠碼"
             v-model.trim="coupon.code"
            >
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">到期日<span class="text-danger">*</span></label>
            <input
             type="date"
             class="form-control"
             id="date"
             v-model="dueDate"
            >
          </div>
          <div class="mb-3">
            <label for="percent" class="form-label">折扣百分比<span class="text-danger">*</span></label>
            <input
             type="number"
             class="form-control"
             id="percent"
             placeholder="請輸入百分比"
             min="1"
             max="100"
             v-model.number="coupon.percent"
            >
          </div>
        </div>

        <div class="modal-footer">
          <div class="form-check me-auto" v-if="isNew">
            <input
              class="form-check-input"
              type="checkbox"
              id="is_enabled"
              :true-value="1"
              :false-value="0"
              v-model="coupon.is_enabled"
            >
            <label
              for="is_enabled"
              class="form-check-label align-middle"
            >
              是否啟用
            </label>
          </div>
          <button type="button" class="btn btn-outline-gray btn-sm" data-bs-dismiss="modal">
            取消
          </button>

          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="trigger"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '../../mixins/modalMixins';

export default {
  data() {
    return {
      modal: '',
      coupon: {},
      dueDate: '',
    };
  },
  mixins: [modalMixins],
  props: {
    isNew: Boolean,
    tempCoupon: Object,
  },
  methods: {
    trigger() {
      if (!this.coupon.title || !this.coupon.due_date || this.coupon.percent === ''
      || !this.coupon.code) {
        const data = {
          success: false,
          message: '所有欄位都要填寫',
        };
        this.$httpMsgState(data, this.isNew ? '新增' : '更新');
        return;
      }
      if (this.coupon.percent > 100 || this.coupon.percent < 1) {
        const data = {
          success: false,
          message: '折扣百分比不能高於 100、低於 1',
        };
        this.$httpMsgState(data, this.isNew ? '新增' : '更新');
        return;
      }

      this.$emit('emit-update', this.isNew, this.coupon);
    },
  },
  watch: {
    tempCoupon() {
      this.coupon = { ...this.tempCoupon };

      if (this.isNew) {
        this.coupon.is_enabled = 0;
      }

      // 轉換成 type="date" 會吃的格式  ex: 2021-06-19
      this.dueDate = new Date(this.coupon.due_date * 1000).toISOString().split('T', 1).join();
    },
    dueDate() {
      // 後端是收 Timestamp
      this.coupon.due_date = Math.floor(new Date(this.dueDate) / 1000);
    },
  },
};
</script>
