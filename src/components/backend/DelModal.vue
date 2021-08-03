<template>
  <div
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="exampleModalLabel">
            刪除
          </h5>
          <button type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
          </button>
        </div>
        <div class="modal-body">
          確定要刪除
          <template v-if="topic === 'product'">
            <span class="fw-bold text-danger">{{ tempData.title }}</span> 商品嗎？
          </template>
          <template v-else-if="isAll">
            <span class="fw-bold text-danger">所有訂單</span> ？
          </template>
          <template v-else-if="topic === 'order'">
            <span class="fw-bold text-danger">編號 {{ tempData.id }}</span> 訂單？
          </template>
          <template v-else-if="topic === 'article'">
            <span class="fw-bold text-danger">{{ tempData.title }}</span> 文章嗎？
          </template>
          <template v-else>
            <span class="fw-bold text-danger">{{ tempData.title }}</span> 優惠券嗎？
          </template>
          <span class="text-gray">( 刪除後無法恢復 )</span>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-gray btn-sm"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="delData"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixins from '@/mixins/modalMixins';

export default {
  data() {
    return {
      modal: null,
    };
  },
  mixins: [modalMixins],
  props: {
    tempData: Object,
    topic: String,
    isAll: Boolean,
  },
  emits: {
    'emit-change': (item) => {
      if (typeof item !== 'boolean') {
        console.warn('emit-change 事件的參數型別需為 boolean');
      }
      return typeof item !== 'boolean';
    },
    'emit-get': () => true,
  },
  methods: {
    // 刪除商品、文章、優惠券、全部及單一訂單
    delData() {
      // 讓頁面先顯示 loading & 關閉 Modal
      this.$emit('emit-change', true);
      this.hideModal();

      let url;
      if (this.isAll) {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/orders/all`;
      } else {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/${this.topic}/${this.tempData.id}`;
      }
      this.axios.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$emit('emit-get');
          }
          this.$httpMsgState(res.data, '刪除');
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
  },
};
</script>
