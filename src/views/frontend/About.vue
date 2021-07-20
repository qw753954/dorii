<template>
  <Banner
    title="關於我們"
    engTitle="ABOUT US"
    imageUrl="https://images.unsplash.com/photo-1462795532207-33cabf8c8175?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
  >
    <li class="breadcrumb-item active" aria-current="page">
      關於
    </li>
  </Banner>
  <div class="container text-center py-6">
    <h2
      class="about-title fs-5 text-center text-highlight text-spacing-m d-inline-block
      px-5 pe-md-6 py-2"
      style="line-height: 40px;"
    >
      D<i class="fad fa-flower fa-fw"></i>rii 專注於飾品上<br>
      結合手作設計性<span class="d-none d-md-inline">，</span>
      <br class="d-md-none">尋找並打造出具典雅質感的飾品
    </h2>
    <div class="position-relative p-4 mb-3 mb-md-5" style="line-height: 32px;">
      <p class="mb-3">
        飾品不是累贅，是點綴<br>
        更是永遠不可少的配件<br>
        一旦戴上飾品的那瞬間<br>
        就能前往心之所向
      </p>
      <p class="mb-3">
        儘管是平淡不過的日常<br>
        但只要配戴上自己喜歡的飾品<br>
        也能打造出不凡的價值<br>
      </p>
      <p class="fs-5 fw-bolder fw-bolder mb-0">
        這是 <span class="text-primary mx-1">D<i class="fas fa-flower fa-fw"></i>rii</span>
        一直所秉持的信念
      </p>
    </div>
  </div>

  <div class="contact bg-priLight py-6">
    <div class="container text-center">
        <div class="d-inline-block text-white text-center mx-auto">
          <h3 class="h5 text-spacing-l d-inline-block px-3 ms-2 mb-4">
            聯絡我們
          </h3>
          <ul class="text-start text-white">
            <li class="mb-3">
              <i class="fab fa-instagram fa-fw me-2"></i>Instagram：
              <a href="https://www.instagram.com/" class="d-inline-block link-white opacity-85">
                @dorii__store
              </a>
            </li>
            <li class="mb-3">
              <i class="fab fa-facebook-square fa-fw me-2"></i>Facebook：
              <a href="https://www.facebook.com/" class="d-inline-block link-white opacity-85">
                Dorii 朵粒 ✿ 飾品專賣店
              </a>
            </li>
            <li class="mb-3">
              <i class="fas fa-envelope fa-fw me-2"></i>E-mail：
              <a href="mailto:dorii_shop@mail.com" class="d-inline-block link-white opacity-85">
                dorii_store@mail.com
              </a>
            </li>
            <li class="mb-3">
              <i class="fas fa-phone-alt fa-fw me-2"></i>Phone：
              <a href="tel:+0221234567" class="d-inline-block link-white opacity-85">
                02-09120912
              </a>
            </li>
            <li>
              <i class="fas fa-clock fa-fw me-2"></i>Business Hour：
                <span class="text-white opacity-85">AM 10:00 - PM 06:00</span>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';

export default {
  components: {
    Banner,
  },
};
</script>
