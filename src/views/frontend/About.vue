<template>
  <CustomLoading :active="isLoading" />

  <Banner
    title="關於"
    engTitle="ABOUT"
    imageUrl="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791366586.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Wq6BGc5ShKoB4MRQpcd8wHdnW%2FabPUIzBUmnV2YThMkKQAUDmXsAC6TPNy1wm5FwGzDP2g4IYkntGwWBgDPkNdDH5h2w19N6s0kxKYnR4%2Fm2lfggDV%2FtPIIEhIt8rxV04uIL0B2YuBfK70%2BU5fXbZsOATpWY81hV7CLg0MxNGOvGAVo%2BS6sQ38Cllr5xdW3uR4kjvjL4smmP3KeFGM2wK%2FurXlIaqGdNelyIiMMbCE9JeTXhhknAM5QeAAw0JUvXIku9fhMzT0QC4Z0TeQSQ7UkhDT1ljvG%2BYKF4uOTN4zVrZdQuT%2F2slR8NlQC2n7xE4gjm6WTDtyOX%2FsPrHGl4zA%3D%3D"
  >
    <li class="breadcrumb-item active" aria-current="page">
      關於
    </li>
  </Banner>

  <div class="text-center py-5 py-md-10">
    <h2
      class="about-slogan fs-4 text-center text-highlight text-spacing-m d-inline-block
      px-5 pe-md-6 py-3"
      data-aos="zoom-in" data-aos-delay="500"
    >
      D<i class="fad fa-flower fa-fw"></i>rii 專注於飾品上<br>
      結合手作設計性<span class="d-none d-md-inline">，</span>
      <br class="d-md-none">尋找並打造出具典雅質感的飾品
    </h2>
  </div>

  <div class="about-block text-center" style="line-height: 28px;">
    <div
      class="about-title w-75 rounded-pill shadow-sm d-flex justify-content-center
      align-items-center mx-auto"
      style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627038076906.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=MD5PtF2GH6xqKWF6tPpdENWRkBx%2F%2Fqqp0mId8zk1ErYiBodIjtYcJseJKYD5wMIQpTtOwZ%2BrM3yE5%2FwW7xpfJWq3S%2FTxKpQ1KoLXbrkYD6I5aKJfDX6m6Po5rfOS881jpA%2BAEvPoO76z%2B9Y2ChTBVJ%2FPh5SiHA18W3A2bAiH0l7wXJWRUzbw5RGZ6np8yfCGlRCm4k%2FA60KDbGZcuyg9F6jE2n45HSKp8t8bVXDo9sSp25XMDDYAd%2BP0CpZZaQfLQTe4r%2BCs5fImFSD8G9%2Fjz9ldRhMtPF%2BnJUFDiIA3OZ6Nr%2FpbCDu0gcVaVYYYZWBJVYm2dJbgXtq3NQG2Lhr8jQ%3D%3D') no-repeat center 65%/ cover"
    >
      <h3 class="h5 text-white text-spacing-l d-inline-block ps-3 pe-2 ms-2 m-0">
        品牌理念
      </h3>
    </div>
    <div class="py-3 py-md-5 mb-8">
      <p data-aos="fade-up">
        飾品不是累贅，是點綴<br>
        更是永遠不可少的配件<br>
        一旦戴上飾品的那瞬間<br>
        就能前往心之所向
      </p>
      <p class="mb-2 mb-sm-3" data-aos="fade-up">
        儘管是平淡不過的日常<br>
        但只要配戴上自己喜歡的飾品<br>
        也能打造出不凡的價值<br>
      </p>
      <p class="fs-5 fw-bolder fw-bolder mb-0" data-aos="fade-up">
        這是 <span class="text-primary mx-1">D<i class="fas fa-flower fa-fw"></i>rii</span>
        一直秉持的理念
      </p>
    </div>

    <div
      class="about-title w-75 bg-cover rounded-pill shadow-sm d-flex justify-content-center
      align-items-center mx-auto"
      style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627038038441.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=GRH76WP8JEVNVC5Q02N5YTBYNO6IZHA0snN%2B3RWnYYnuL2tAeKzM99DoQpMW%2FeDsWhpNk7Ja2%2FMZ1nl%2FaJymGbfOKQr5ELS2l%2F4uHuGekfFPKciPpmRikAxz34qZhh9KW6Rcdopwkte%2Fm1VIzBjJPdyoc%2BmGR9Uy%2Bxc7an0AvlS3SMrRNJhhvm%2Fhz3GuF9%2FX%2Bto6vuyXjFmcQhdHy4RaVbrWUj8GM7VPXVR4TB1%2BmRSz1rPzbcGI68GlfmYrdKSoHWARrZ8VBin1ylHr1aQQueZdNU9mpSF%2FAl77kDJcLn1uSX2DhsOXumps49vr2Z1wiJe0TXqq0tAUfYKVBd11Vw%3D%3D');"
    >
      <h3 class="h5 text-white text-spacing-l d-inline-block ps-3 pe-2 ms-2 m-0">
        聯絡我們
      </h3>
    </div>
    <div class="container text-center py-3 py-md-5 mb-8">
      <div class="d-inline-block text-center mx-auto" data-aos="fade-up">
        <ul class="text-start">
          <li class="mb-1 mb-sm-2">
            <i class="fab fa-instagram fa-fw me-2"></i>Instagram：
            <a
              href="https://www.instagram.com/"
              class="d-inline-block"
              target="_blank"
            >
              @dorii__store
            </a>
          </li>
          <li class="mb-1 mb-sm-2">
            <i class="fab fa-facebook-square fa-fw me-2"></i>Facebook：
            <a
              href="https://www.facebook.com/"
              class="d-inline-block"
              target="_blank"
            >
              Dorii 朵粒 ✿ 飾品專賣店
            </a>
          </li>
          <li class="mb-1 mb-sm-2">
            <i class="fas fa-envelope fa-fw me-2"></i>E-mail：
            <a href="mailto:dorii_shop@mail.com" class="d-inline-block">
              dorii_store@mail.com
            </a>
          </li>
          <li>
            <i class="fas fa-phone-alt fa-fw me-2"></i>Phone：
            <a href="tel:+0209120912" class="d-inline-block">
              02-09120912
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <Subscribe/>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';
import Subscribe from '@/components/frontend/Subscribe.vue';

export default {
  name: 'About',
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    Banner,
    Subscribe,
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  },
};
</script>
