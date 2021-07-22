<template>
  <Banner
    title="關於我們"
    engTitle="ABOUT US"
    imageUrl="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791366586.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Wq6BGc5ShKoB4MRQpcd8wHdnW%2FabPUIzBUmnV2YThMkKQAUDmXsAC6TPNy1wm5FwGzDP2g4IYkntGwWBgDPkNdDH5h2w19N6s0kxKYnR4%2Fm2lfggDV%2FtPIIEhIt8rxV04uIL0B2YuBfK70%2BU5fXbZsOATpWY81hV7CLg0MxNGOvGAVo%2BS6sQ38Cllr5xdW3uR4kjvjL4smmP3KeFGM2wK%2FurXlIaqGdNelyIiMMbCE9JeTXhhknAM5QeAAw0JUvXIku9fhMzT0QC4Z0TeQSQ7UkhDT1ljvG%2BYKF4uOTN4zVrZdQuT%2F2slR8NlQC2n7xE4gjm6WTDtyOX%2FsPrHGl4zA%3D%3D"
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
              <a
                href="https://www.instagram.com/"
                class="d-inline-block link-white"
                target="_blank"
              >
                @dorii__store
              </a>
            </li>
            <li class="mb-3">
              <i class="fab fa-facebook-square fa-fw me-2"></i>Facebook：
              <a
                href="https://www.facebook.com/"
                class="d-inline-block link-white"
                target="_blank"
              >
                Dorii 朵粒 ✿ 飾品專賣店
              </a>
            </li>
            <li class="mb-3">
              <i class="fas fa-envelope fa-fw me-2"></i>E-mail：
              <a href="mailto:dorii_shop@mail.com" class="d-inline-block link-white">
                dorii_store@mail.com
              </a>
            </li>
            <li class="mb-3">
              <i class="fas fa-phone-alt fa-fw me-2"></i>Phone：
              <a href="tel:+0221234567" class="d-inline-block link-white">
                02-09120912
              </a>
            </li>
            <li>
              <i class="fas fa-clock fa-fw me-2"></i>Mon - Sat：
                <span class="text-white">AM 10:00 - PM 06:00</span>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';

export default {
  name: '關於我們',
  components: {
    Banner,
  },
};
</script>
