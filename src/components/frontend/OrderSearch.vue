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
        <div class="modal-header">
          <h5 class="modal-title">查詢訂單</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">
          <form class="input-group mb-3" @submit.prevent="searchOrder">
            <input
              type="search" class="form-control" placeholder="請輸入訂單編號"
              aria-label="請輸入訂單編號" aria-describedby="search-button"
              v-model="inputOrderNum"
            >
            <button
              type="submit" class="btn btn-outline-primary" id="search-button"
              :disabled="!inputOrderNum"
            >
              <i class="far fa-search"></i>
            </button>
          </form>

          <template v-if="matchOrder.length > 0">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col" width="52%">訂單編號</th>
                  <th scope="col" width="20%">訂購人</th>
                  <th scope="col" width="20%">狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="position-relative"
                  v-for="(item) in matchOrder" :key="item"
                >
                  <td>
                    <a
                      href="#" class="stretched-link text-body text-break"
                      @click.prevent="changePage(item.id)"
                    >
                      {{ item.id }}
                    </a>
                  </td>
                  <td>{{ item.user.name }}</td>
                  <td class="text-highlight" v-if="item.is_paid">已付款</td>
                  <td class="text-gray" v-else>未付款</td>
                </tr>
              </tbody>
            </table>
          </template>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">關閉</button>
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
      orders: [],
      inputOrderNum: '',
      matchOrder: [],
    };
  },
  mixins: [modalMixins],
  inject: ['emitter'],
  methods: {
    getOrders() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/orders`;
      this.axios.get(url)
        .then((res) => {
          const { success, orders, message } = res.data;
          if (success) {
            this.orders = orders;
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    searchOrder() {
      this.matchOrder = this.orders.filter((item) => (
        item.id.toUpperCase().includes(this.inputOrderNum.toUpperCase().trim())
      ));

      if (this.matchOrder.length === 0) {
        this.$swal.fire({ icon: 'error', title: '找不到相關訂單' });
      }
    },
    changePage(id) {
      this.hideModal();
      this.$router.push(`/checkout/${id}`);
    },
    openModal() {
      this.inputOrderNum = '';
      this.matchOrder = [];
      this.modal.show();
    },
  },
  created() {
    this.getOrders();
    this.emitter.on('emit-update-orders', this.getOrders);
  },
  unmounted() {
    this.emitter.off('emit-update-orders', this.getOrders);
  },
};
</script>
