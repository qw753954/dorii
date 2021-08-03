<template>
  <!-- 訂閱 -->
  <div
    class="bg-cover bg-md-fixed position-relative"
    style="background-image: url('https://images.unsplash.com/photo-1570610183363-c7531f3eaa68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80'); height: 300px;"
  >
    <div class="index-mask text-white d-flex flex-column justify-content-center">
      <div class="container" data-aos="fade-up">
        <label for="subscribe" class="fs-2 fw-bolder mb-2">訂閱我們</label>
        <p class="fs-5">好康情報不錯過！</p>
        <Form
          ref="subscribeForm" @submit="subscribe" v-slot="{ errors }"
          class="input-group w-md-50 w-lg-40"
        >
          <Field
            type="email" class="form-control py-2" id="subscribe"
            rules="email" name="E-mail" placeholder="請輸入您的 E-mail"
            :class="{ 'is-invalid': errors['E-mail'] }"
            v-model="subscribeMail"
          />
          <button
            type="submit" class="btn btn-primary"
            :disabled="subscribeMail === '' || errors['E-mail']"
          >
            訂閱
          </button>
          <ErrorMessage class="invalid-feedback" name="E-mail"/>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subscribeMail: '',
    };
  },
  methods: {
    subscribe() {
      this.subscribeMail = '';
      this.$swal.fire({ icon: 'success', title: '訂閱成功！\n已發送一組折扣代碼至您的信箱\n可前往信箱查看唷～' });
    },
  },
};
</script>
