import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'vue-sweetalert2';
import Offcanvas from 'bootstrap/js/dist/offcanvas';

export default defineStore('cartStore', {
  // state, actions, getters
  state: () => ({
    carts: [],
    total: 0,
    finalTotal: 0,
    offcanvas: '',
  }),
  getters: {
    cartQty({ carts }) { // 更新 cart 圖示的數量
      return carts.length ? carts.map((i) => i.option.length).reduce((acc, cur) => acc + cur) : 0;
    },
  },
  actions: {
    getCarts() {
      return new Promise((resolve, reject) => {
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
        axios.get(url)
          .then((res) => {
            const { success, data, message } = res.data;
            if (success) {
              this.carts = data.carts;
              this.total = data.total;
              this.finalTotal = Math.floor(data.final_total);
              resolve();
            } else {
              Swal.fire({ icon: 'error', title: message });
              reject();
            }
          })
          .catch((err) => {
            Swal.fire({ icon: 'error', title: err.message });
          });
      });
    },
    openOffcanvas() {
      this.offcanvas.show();
    },
    hideOffcanvas() {
      this.offcanvas.hide();
    },
    initOffcanvas(dom) {
      this.offcanvas = new Offcanvas(dom);
    },
  },
});
