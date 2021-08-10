<template>
  <IndexBanner/>

  <!-- Scroll down -->
  <div class="bg-white pt-8" id="main">
    <div class="d-flex flex-column align-items-center mx-auto">
      <span class="text-dark">scroll down</span>
      <div class="scroll-drop mt-3"></div>
    </div>
  </div>

  <!-- 歡慶開幕 | 優惠券 -->
  <div
    class="bg-cover bg-md-fixed position-relative"
    style="background-image: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626790114789.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Wk72CytfD1QY7N8PPHLxE%2F8rBCH%2FayU4Ydv5yYDr2dMD3MY0AFB1cdfKre4eUJhbITsmgsA44fWtZCdEzLxqYA2KSgQGf5D%2FdlSXGo4BP29YhwXdN6pwUdg3WwVHtp8zIy0tHEStPJE6vMx9aLJZU4Xo0%2FeZcW9xtU%2FtM04uAxwCdKnSGvVDYStUjktqU1Y5inT35FzIW3UQv8b8QumcGDQ1yHfb37hkBQ1kCeW1cGTL7rzTiYbwhAj7aa%2BnA1%2FYLm6NH0OE3HBXVG1whJgBv7akJ%2BYa8BsPNUYFqM6%2BNCqxCcOSslfQd%2B34JCGxWU%2BNw4aaskC5JjJtnuNDAoMP0A%3D%3D'); height: 420px;"
  >
    <div class="index-mask text-white d-flex align-items-center justify-content-center">
      <div class="d-flex flex-column align-items-center justify-content-center" data-aos="zoom-in">
        <small class="badge bg-light text-dark rounded-pill mb-3 mb-md-4">Discount</small>
        <h3 class="h1 px-1 mb-4">歡慶開幕</h3>
        <p class="text-center text-md-start mb-5 mb-md-8 px-5">
          即日起至 2021-09-12，<br class="d-md-none">
          全館消費不限金額，即享 <strong class="fs-5">88%</strong> 折扣
        </p>
        <div class="discount-code position-relative" @click="copyCode($refs.couponInput.value)">
          <i class="far fa-cut fs-5 fa-beat"></i>
          <input
            type="text"
            class="text-white text-center bg-transparent w-100 py-3"
            value="OPEN615"
            ref="couponInput"
            readonly
          >
        </div>
      </div>
    </div>
  </div>

  <!-- 新品 -->
  <div class="new-arrival container mb-6 mb-md-0">
    <div class="row">
      <div
        class="title col-md-5 col-lg-4 d-flex align-items-center sticky-top py-7 mb-3 mb-md-0"
      >
        <h3
          class="display-3 ff-special text-spacing-l text-primary text-end text-md-start
          position-relative px-md-4"
        >
          <span class="ps-2 pe-1">NEW</span><br>
          <span class="display-5 ps-2 pe-1 ps-lg-7">ARRIVAL</span>
        </h3>
      </div>
      <div class="col-md-7 col-lg-8 border-start-md mt-n6 mt-md-0 py-3 py-md-10">
        <div class="d-flex flex-column flex-sm-row justify-content-evenly">
          <ul class="list-unstyled w-75 w-sm-40 mx-auto mb-5 mb-md-9">
            <li class="mb-5 mb-md-9" data-aos="fade-up">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791191418.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=m8NI%2BsiMkGZMPiq25miQ8qHqUfMNyjNRoEo0pmAK89pRY53y0id9qVOgT%2F%2BZt0miBLv0TbWBZKneThPoR6LfoC%2Fi9EEy6H1hazu4XgxKPZfkE6vLiwC89Z2xr4l%2BLP%2Bi%2FV%2FGU63Kr5968YoFXu7ebEpEalspdTVxoM%2FnQFiF2ZKKViuO1cOsOW9s1%2FSxw8jmW9eAmJmbUzHl1Wx0wC7FtlvTYlqpUJ75HG5jkFzS%2B7qm6Xj%2FRbmT%2BAUJurrvY9E1fcqM8t%2BfROB9lcpEXmUjUTaUEmNCMt3VJl%2FBKT7rJVIqaObriz22Bw7TWB2E3Sqgb81ElBfB7wuXopCXwr06hw%3D%3D" class="img-fluid" alt="新品1">
            </li>
            <li data-aos="fade-up">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791229180.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JMq184YlBv0BEVq5QMxcljL7IRZeia5w%2B6XY4qfPHI%2B%2FqQ%2BAjdh2uwVF1NeQLDyki0fpjvwLCRYjqD5J17J7Okb%2F33Hjgi413vce%2BcSwUgCsWNR7LjEP5VyZ88YTK%2FChDkkyeBsUwCXT4cM0WI5inC2Sp8AO2pcelo2%2B5BqonN3myyLs%2BRZsLCej3ovsE7jm0ogJ1EgUxZCQyOIAyEr5zU6Ga9iSRMhfLoyzIJUTKMF%2Bvct4T%2BF0Yo1vZTCOaPQCq%2Fke29OmB%2Bpcf3wU33fPQAtURPR7%2FXGooU%2F8h8TIj2g9%2FJlvXSeU7JlXWAdxwMYrmKDHZ14Azzy3cvVmVgE1pA%3D%3D" class="img-fluid" alt="新品2">
            </li>
          </ul>
          <ul class="list-unstyled w-75 w-sm-40 mb-5 mb-sm-9 mt-md-10 mx-auto">
            <li class="mb-5 mb-md-9" data-aos="fade-up">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1628605436633.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XSlL9K0sJ3a6wFKLQlxiXfrUn3gYu7OYXmOekGij82VwlgX7Jedq6j8ZZdznk7c1dfR3M%2F0p6Issw9ytuOBT2aLRo9wTUbw9xd4RXzLOevt1LqP%2BttuR97qfboz31WnzwHoBtHxv3P58ArKIzQbpPE%2BPfMpynq0NFG6Sc%2BaQlxyaEDu%2Bf2WgnZu50inEOFC5oqlrBLbm8Qd3dwnXI8hdPkZIy8TkQigF3jyE2VYJ32o3TTgwBZFW3x%2FwLNHajXwPrMXbkqG1DRqLJRLyNE1yJ%2FiYVMM%2BNIkN3kg51I9wt53JfGOmrQkrrJPW034BFpI%2Fq0EUW4Gu0JmGuViTMVXmxg%3D%3D" class="img-fluid" alt="新品3">
            </li>
            <li data-aos="fade-up">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1628605405777.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dDfyE1ktiQHoWsU1KusABOeukMmC034EvvWN1JKl0W6z7jQ5PIuL5LXHzrhuXwYoXXAeWBA62NKHVcB1dCVHUMU2ZLMcLhijBHasECqXWzH1OtyQ62ZkeZCr9Ffhrc5CsVdmDo44QPXNMYWL5wLipyJg%2B6NUKFE8NfXjfBojsXpbvpfAwViKWa%2BygfWHpF4rXKPTs1H3VrzixSy2FUu3Hzh77j9wQqK7w0gEid9oBZvYKKuheZvUWEY6HcraS3eMc3KKoUuqZHtHmZ4DuMoGCWIpz%2F%2B5iu8Azlw1LaWq511uiKCpjRK9E5pBxQXOUMDYeinAL2ruBaZvL5Qecbopuw%3D%3D" class="img-fluid" alt="新品4">
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-center">
          <router-link to="/product/-MfHourstCqkNee0rAYe" class="shopping-btn text-body">
            點我逛逛 <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- 商品分類 -->
  <div class="categories container-fluid">
    <div class="row">
      <div class="item col-lg-6 vh-100 px-0">
        <a
          href="#"
          class="text-white d-flex justify-content-center align-items-center h-100"
          style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626790271651.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=J6zbuPXJHhYlwyqDJUjqGOWWP4EtRxQ8w2HXguP4Rog8MB%2B8hdl0rXzTQ5TuJ%2B8lksaQAmcP%2B7LHs3KPAP4ZDge8RSVS5QLZ7SkXHm16hA4aW6lrlf6eNLrJh%2FhM4yDVxQszhvY6G%2Bsk4YtMGVI2bCSYM2%2FDwdiAuxQijDDPVfH8W32sBfp%2FQQH45HTwfTRIXC5WX81Qs%2F2v3LYrZaA6Il3%2BQh2Urufiz6ekw8W%2FSOE4b0sHdiDuBjdaLAnJE%2Fk48a3N4PRykbYO1sjNnYSqaMcksm2M2otyGF4Ko5sMstF%2BxvcY92gJkyeVh9KTW%2Bdd9jAJSzc2VNvXmYO%2BzcXVig%3D%3D') no-repeat center/ 180%"
          @click.prevent="goCategory('項鍊')"
        >
          <h3
            class="fs-1 text-center overflow-hidden pb-1"
            data-aos="fade-up" data-aos-offset="0"
          >
            <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">項鍊</small>
            Necklace
          </h3>
        </a>
      </div>
      <div class="col-lg-6 px-0">
        <div class="d-flex flex-column flex-md-row h-lg-50">
          <a
            href="#"
            class="item text-white d-flex justify-content-center align-items-center h-100 w-md-50"
            style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627045800945.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KEOKox%2BpvTFW5I1LNrdDhl7zXyYt6FYiKIfanQ76r4qGtB7wxki4SuYd8pY%2F2Atilc9%2BIeXclP2%2BMBpE%2Buk75L6j33T%2BmOKeuId92CdQODCJkIv0RbJiKFYm6Y4ohV9bHns1UgxZZzXqj9HtLdTxoty1GyE%2B2GoQArOnC69aK2REwaSQ6pjpX7s4aKuoT6Hy5B5cM1edz5fxJz0NJqvRrVESl1B%2B8RUKqv61Ti3vavGrSTI0YF5xAo7IcTGTkhy9orYtfjUjgrcmtPwymCwY0zcQO799KU76PzmX7plFNKF%2Fu2YjixK1NewanTOhCFI%2BQcUXP3Y9KvFO3znMo8PcXg%3D%3D') no-repeat 30% center/ 180%"
            @click.prevent="goCategory('耳環')"
          >
            <h3
              class="fs-1 text-center overflow-hidden pb-1"
              data-aos="fade-up" data-aos-offset="0"
            >
              <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">耳環</small>
              Earring
            </h3>
          </a>
          <a
            href="#"
            class="item text-white d-flex justify-content-center align-items-center h-100 w-md-50"
            style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627045828141.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dhkj4um5enF8xVwae0M8PjXPOtmsiHiDT2s4CKYhlzmXnY0shent%2Bo2tchsoDrtI7p3ETfNBqy8D0giBgnWc5w8DGwXSF2mGdi6RgGj4sAFmXG0AZH0R%2FuKQHOM4SPCb5WHZcbLT%2Bg7Ux6r2bUH7nR%2FOBjS9LCc4Vt3IENJGuS1UCOpelKj1Zv%2Fu2E1rWUGrmhURBTUo7g%2FPDSzt8ZVgl8S7%2BOARziEaE6qfMAtgTc%2FmHV%2F%2BQNxyv0JulRCsWmfL0R6eUYiv88G%2BBzvAUNOCx3l4fpRN05N8rft3YDLQJ01fGiRkQa3MDCm8yy0rm82rMUoDUw3ekXCn1EKpst3nYw%3D%3D') no-repeat 35% center/ 180%"
            @click.prevent="goCategory('手鍊')"
          >
            <h3
              class="fs-1 text-center overflow-hidden pb-1"
              data-aos="fade-up" data-aos-offset="0"
            >
              <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">手鍊</small>
              Bracelet
            </h3>
          </a>
        </div>
        <a
          href="#"
          class="item text-white d-flex justify-content-center align-items-center h-50"
          style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626790428602.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IjzM%2BT7tS5hO0EMSQYZ3wmzyEeZOBhqJIkQe4w96d4fJBqapRRgyEdwQ%2FopBo%2FknJuYMoqdney3xyQasXJ4%2Fb3v%2BaDiaduYY9IglGSl%2FfNQVpxnjUojxwSnaLaDejU3Nijnd%2B8YMjOa2%2F6T9qka9nrKanGKxVMMikVstIhIiRebKFE48skZoeMrLCp0X4huLfijgDksezCSB0%2ByoDVyi%2BvgWAPU6feni6gy01uR8zIyp0UnY4TVEOsNhn3x0I2iRs%2FK9c5t6Dz03lsEZLoAe3cgv1SqjEjjbCS2%2FAs5Kvm%2F8ckshSoc4IbReDOxQvc8uwSl5vUQzG6zvEl%2FRiLWykw%3D%3D') no-repeat center 32%/ 180%"
          @click.prevent="goCategory('戒指')"
        >
          <h3
            class="fs-1 text-center overflow-hidden pb-1"
            data-aos="fade-up" data-aos-offset="0"
          >
            <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">戒指</small>
            Ring
          </h3>
        </a>
      </div>
    </div>
  </div>

  <Recommend/>
  <Subscribe/>
  <Notice/>
</template>

<script>
import IndexBanner from '@/components/frontend/IndexBanner.vue';
import Recommend from '@/components/frontend/Recommend.vue';
import Subscribe from '@/components/frontend/Subscribe.vue';
import Notice from '@/components/frontend/Notice.vue';

export default {
  name: 'Frontend Home',
  components: {
    IndexBanner,
    Notice,
    Subscribe,
    Recommend,
  },
  methods: {
    copyCode(couponCode) {
      this.$refs.couponInput.select();
      document.execCommand('copy');

      this.$swal.fire({ icon: 'success', title: `${couponCode} 已複製到剪貼簿` });
    },
    goCategory(name) {
      // https://router.vuejs.org/zh/guide/essentials/navigation.html
      // https://ithelp.ithome.com.tw/articles/10239165?sc=iThomeR
      // route 傳值有分 params 和 query 兩種方式，跳轉頁面要用 name 來定義，因為 params 會被 path 忽略
      this.$router.push({
        name: '商店',
        params: {
          categoryTitle: name,
        },
      });
    },
  },
};
</script>
