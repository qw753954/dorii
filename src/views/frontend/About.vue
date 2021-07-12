<template>
  <div class="container py-5">
    <h2>關於我們</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      total: 0,
    };
  },
  methods: {
    getCarts() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(url)
        .then((res) => {
          const { success, data, message } = res.data;
          if (success) {
            this.carts = data.carts;
            this.total = data.total;
          } else {
            alert(message);
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    delCarts() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/carts`;
      this.axios.delete(url)
        .then((res) => {
          const { success, message } = res.data;
          if (!success) {
            alert(message);
            return;
          }
          alert(message);
          this.getCarts();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    delCart(id) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.delete(url)
        .then((res) => {
          const { success, message } = res.data;
          if (!success) {
            alert(message);
            return;
          }
          alert(message);
          this.getCarts();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    updateCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.axios.put(url, { data: { product_id: id, qty } })
        .then((res) => {
          const { success, message } = res.data;
          if (!success) {
            alert(message);
            return;
          }
          alert(message);
          this.getCarts();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  created() {
    this.getCarts();
  },
};
</script>
