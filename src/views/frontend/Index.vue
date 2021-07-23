<template>
  <div class="container-fluid">
    <div class="content row bg-light" id="banner">
      <div
        class="col-2 d-none d-md-flex justify-content-center align-items-center
        border-secondary border-end"
      >
        <p class="opening-date fs-1 text-secondary">2021.6.15</p>
      </div>
      <div class="col h-100">
        <div class="row h-100 justify-content-between">
          <div class="col-md-8 d-none d-md-block">
            <div
              class="slogan text-center text-md-start d-flex flex-column justify-content-end
              h-50 ps-md-6"
              data-aos="zoom-in"
            >
              <h2 class="fst-italic display-2 mb-3">Stay Elegant,</h2>
              <h2 class="fst-italic display-4 text-center ms-10 mb-5">Stay Graceful.</h2>
            </div>
            <div
              class="h-50"
              style="background: url('https://images.unsplash.com/photo-1599357226640-272df7b6ef37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80') no-repeat fixed center/ contain;"
              data-aos="fade-up"
            >
            </div>
          </div>
          <h2
            class="slogan display-1 d-flex justify-content-center align-items-end d-md-none
            fst-italic text-spacing-l"
            data-aos="zoom-in"
          >
            Stay Elegant,
          </h2>
          <div
            data-aos="flip-down"
            class="col-md-4 pics-carousel"
            style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626790047375.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hH1qT1P%2F%2Fy%2FjJ96o5Wgv4U0Pqz%2BrKPUtkUF27AOWhgIXanz1DYI222%2FnuHhTIyAAfEb0YWdY2WmyLf4G1zvgNRZ9FTWAN7ni0%2BjwtTZX8uRoQQRPNgndmzYn%2FDjHjQiuWsYKtHYUy43ALScS1SZ2zEQHvAUd6b8NjxiiCGa5noOnBafpaL0RXwYIPugd%2F4VdpkyJ5BJ7ioFLw6i5t1bUvoCwmwre%2FYwpGMJxtkEoTIKWTMZP76OlvvbWCAn0%2BAIIce%2Fvq2aODfTrODYx%2BCwOI0QTzpLi6CH39T7vC2NdHANT1jA9Ga2KBXhZpcK%2FGymnSvnoifr%2FEn5uzRsVqhco8w%3D%3D') no-repeat center/ cover;"
          >
          </div>
          <h2 class="slogan fst-italic display-4 text-center d-md-none" data-aos="zoom-in">
            Stay Graceful.
          </h2>
        </div>
      </div>
    </div>
    <!-- Scroll down -->
    <div class="row bg-light mt-0 pt-0" id="main">
      <div
      class="col-md-2 d-flex flex-column align-items-center border-secondary border-end pt-6"
      >
        <span class="text-dark">scroll down</span>
        <div class="scroll-drop mt-3"></div>
      </div>
    </div>
  </div>

  <!-- 歡慶開幕 | 優惠券 -->
  <div class="position-relative" style="height: 420px; background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626790114789.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Wk72CytfD1QY7N8PPHLxE%2F8rBCH%2FayU4Ydv5yYDr2dMD3MY0AFB1cdfKre4eUJhbITsmgsA44fWtZCdEzLxqYA2KSgQGf5D%2FdlSXGo4BP29YhwXdN6pwUdg3WwVHtp8zIy0tHEStPJE6vMx9aLJZU4Xo0%2FeZcW9xtU%2FtM04uAxwCdKnSGvVDYStUjktqU1Y5inT35FzIW3UQv8b8QumcGDQ1yHfb37hkBQ1kCeW1cGTL7rzTiYbwhAj7aa%2BnA1%2FYLm6NH0OE3HBXVG1whJgBv7akJ%2BYa8BsPNUYFqM6%2BNCqxCcOSslfQd%2B34JCGxWU%2BNw4aaskC5JjJtnuNDAoMP0A%3D%3D') no-repeat fixed center bottom/ cover">
    <div class="index-mask text-white d-flex align-items-center justify-content-center">
      <div class="d-flex flex-column align-items-center justify-content-center" data-aos="zoom-in">
        <small class="badge bg-light text-dark rounded-pill mb-3 mb-md-4">Discount</small>
        <h3 class="h1 px-1 mb-4">歡慶開幕</h3>
        <p class="mb-6 mb-md-9">
          即日起至 2021-09-12，全館消費不限金額，即享 <strong class="fs-5">88%</strong> 折扣
        </p>
        <div class="discount-code position-relative" @click="copyCode">
          <i class="far fa-cut fs-5 fa-beat"></i>
          <input
            type="text"
            class="text-white text-center bg-transparent w-100 py-3"
            value="88520"
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
        class="title col-md-5 col-lg-4 d-flex align-items-center sticky-top py-8 mb-3 mb-md-0"
      >
        <h3 class="display-2 text-spacing-l fw-bold text-primary px-3 px-md-4">
          NEW <br class="d-none d-md-block">
          <span class="display-5 ps-lg-7">ARRIVAL</span>
        </h3>
      </div>
      <div class="col-md-7 col-lg-8 border-start-md mt-n6 mt-md-0 py-3 py-md-10">
        <div class="d-flex flex-column flex-sm-row justify-content-evenly">
          <ul class="w-75 w-sm-40 mx-auto mb-5 mb-md-9">
            <li class="mb-5 mb-md-9" data-aos="fade-up" data-aos-delay="300">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791191418.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=m8NI%2BsiMkGZMPiq25miQ8qHqUfMNyjNRoEo0pmAK89pRY53y0id9qVOgT%2F%2BZt0miBLv0TbWBZKneThPoR6LfoC%2Fi9EEy6H1hazu4XgxKPZfkE6vLiwC89Z2xr4l%2BLP%2Bi%2FV%2FGU63Kr5968YoFXu7ebEpEalspdTVxoM%2FnQFiF2ZKKViuO1cOsOW9s1%2FSxw8jmW9eAmJmbUzHl1Wx0wC7FtlvTYlqpUJ75HG5jkFzS%2B7qm6Xj%2FRbmT%2BAUJurrvY9E1fcqM8t%2BfROB9lcpEXmUjUTaUEmNCMt3VJl%2FBKT7rJVIqaObriz22Bw7TWB2E3Sqgb81ElBfB7wuXopCXwr06hw%3D%3D" class="img-fluid" alt="新品1">
            </li>
            <li data-aos="fade-up" data-aos-delay="300">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791229180.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=JMq184YlBv0BEVq5QMxcljL7IRZeia5w%2B6XY4qfPHI%2B%2FqQ%2BAjdh2uwVF1NeQLDyki0fpjvwLCRYjqD5J17J7Okb%2F33Hjgi413vce%2BcSwUgCsWNR7LjEP5VyZ88YTK%2FChDkkyeBsUwCXT4cM0WI5inC2Sp8AO2pcelo2%2B5BqonN3myyLs%2BRZsLCej3ovsE7jm0ogJ1EgUxZCQyOIAyEr5zU6Ga9iSRMhfLoyzIJUTKMF%2Bvct4T%2BF0Yo1vZTCOaPQCq%2Fke29OmB%2Bpcf3wU33fPQAtURPR7%2FXGooU%2F8h8TIj2g9%2FJlvXSeU7JlXWAdxwMYrmKDHZ14Azzy3cvVmVgE1pA%3D%3D" class="img-fluid" alt="新品2">
            </li>
          </ul>
          <ul class="w-75 w-sm-40 mb-5 mb-sm-9 mt-md-10 mx-auto">
            <li class="mb-5 mb-md-9" data-aos="fade-up" data-aos-delay="600">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791260271.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=RgvSTteMJ1LLG5gHHDzuc4b23X9SjX8Y2C4JLiTL5or5Gp8bsejurb%2BVKBwu7AK4%2F1Px7hyYKVWEKftjeIYIuPQZ%2F4uhVA5Wfx6rEB%2Fnw5IPmEUPGqjIMY4j1lVfeeAKQoR5ROt7JCYyIf2vDLHbMhEmebr5elmaw97MOYFL1WcWa1n4%2BRBEEEpTcew2N4Onife%2BTqqbabg9Mx8LVNFXPzHzE5P7mnsuujHaKPmMRs1OA94WY3wRmwXqdi3MUtxR%2FJKNPGzuIN9znA8iH6rjx8zs5OKWlmI%2BGp7j6RzOQ1afB1Oa6xS%2BLBN6Ks9qCzFGWI9wZLMvq1%2BidtMZ4lxAIg%3D%3D" class="img-fluid" alt="新品3">
            </li>
            <li data-aos="fade-up" data-aos-delay="600">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791205564.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pt%2F%2BC9DUVeKRkouZnPK5PMZCi%2FY95HcJstR2r6JX6Lf%2FN6gccNZPyT%2Ft8mPRR3Rw69XcyE%2FaAqtsL5SNI4zXg17XzRY1SGM%2FEtXKcANdU3ci%2FEzWBt4Vg6%2FA9gKCVmv6KzsdJ1krrhoxRuX0wU%2FseLki39QBgawvokrJt%2FqfAzISpEksGU5PTWSwlHzo6yvtLZN%2FEx06%2BTsRvxFASZp5ThSOE6hCvLsUw7bucNAeM7IdsnejhwgvJa%2B5i25arjtXVm255y75%2BtvWvShnAeuUOl06bYEVhfxYS7TOPtjTG0rIkQOp6Vy%2Ftr7uGqeUeaCcUfF%2F9gPpc6YsA3VSRxW6LQ%3D%3D" class="img-fluid" alt="新品4">
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
          style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626790271651.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=J6zbuPXJHhYlwyqDJUjqGOWWP4EtRxQ8w2HXguP4Rog8MB%2B8hdl0rXzTQ5TuJ%2B8lksaQAmcP%2B7LHs3KPAP4ZDge8RSVS5QLZ7SkXHm16hA4aW6lrlf6eNLrJh%2FhM4yDVxQszhvY6G%2Bsk4YtMGVI2bCSYM2%2FDwdiAuxQijDDPVfH8W32sBfp%2FQQH45HTwfTRIXC5WX81Qs%2F2v3LYrZaA6Il3%2BQh2Urufiz6ekw8W%2FSOE4b0sHdiDuBjdaLAnJE%2Fk48a3N4PRykbYO1sjNnYSqaMcksm2M2otyGF4Ko5sMstF%2BxvcY92gJkyeVh9KTW%2Bdd9jAJSzc2VNvXmYO%2BzcXVig%3D%3D') no-repeat center/ 140%"
          @click.prevent="goCategory('項鍊')"
        >
          <h3
            class="fs-1 text-center overflow-hidden pb-1"
            data-aos="flip-left"
          >
            <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">項鍊</small>
            Necklace
          </h3>
        </a>
      </div>
      <div class="col-lg-6 px-0">
        <div class="d-flex h-lg-50">
          <a
            href="#"
            class="item text-white d-flex justify-content-center align-items-center h-100 w-50"
            style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627045800945.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KEOKox%2BpvTFW5I1LNrdDhl7zXyYt6FYiKIfanQ76r4qGtB7wxki4SuYd8pY%2F2Atilc9%2BIeXclP2%2BMBpE%2Buk75L6j33T%2BmOKeuId92CdQODCJkIv0RbJiKFYm6Y4ohV9bHns1UgxZZzXqj9HtLdTxoty1GyE%2B2GoQArOnC69aK2REwaSQ6pjpX7s4aKuoT6Hy5B5cM1edz5fxJz0NJqvRrVESl1B%2B8RUKqv61Ti3vavGrSTI0YF5xAo7IcTGTkhy9orYtfjUjgrcmtPwymCwY0zcQO799KU76PzmX7plFNKF%2Fu2YjixK1NewanTOhCFI%2BQcUXP3Y9KvFO3znMo8PcXg%3D%3D') no-repeat 30% center/ 140%"
            @click.prevent="goCategory('耳環')"
          >
            <h3
              class="fs-1 text-center overflow-hidden pb-1"
              data-aos="flip-left"
            >
              <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">耳環</small>
              Earring
            </h3>
          </a>
          <a
            href="#"
            class="item text-white d-flex justify-content-center align-items-center h-100 w-50"
            style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627045828141.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dhkj4um5enF8xVwae0M8PjXPOtmsiHiDT2s4CKYhlzmXnY0shent%2Bo2tchsoDrtI7p3ETfNBqy8D0giBgnWc5w8DGwXSF2mGdi6RgGj4sAFmXG0AZH0R%2FuKQHOM4SPCb5WHZcbLT%2Bg7Ux6r2bUH7nR%2FOBjS9LCc4Vt3IENJGuS1UCOpelKj1Zv%2Fu2E1rWUGrmhURBTUo7g%2FPDSzt8ZVgl8S7%2BOARziEaE6qfMAtgTc%2FmHV%2F%2BQNxyv0JulRCsWmfL0R6eUYiv88G%2BBzvAUNOCx3l4fpRN05N8rft3YDLQJ01fGiRkQa3MDCm8yy0rm82rMUoDUw3ekXCn1EKpst3nYw%3D%3D') no-repeat 35% center/ 140%"
            @click.prevent="goCategory('手鍊')"
          >
            <h3
              class="fs-1 text-center overflow-hidden pb-1"
              data-aos="flip-left"
            >
              <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">手鍊</small>
              Bracelet
            </h3>
          </a>
        </div>
        <a
          href="#"
          class="item text-white d-flex justify-content-center align-items-center h-50"
          style="background: url('https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626790428602.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IjzM%2BT7tS5hO0EMSQYZ3wmzyEeZOBhqJIkQe4w96d4fJBqapRRgyEdwQ%2FopBo%2FknJuYMoqdney3xyQasXJ4%2Fb3v%2BaDiaduYY9IglGSl%2FfNQVpxnjUojxwSnaLaDejU3Nijnd%2B8YMjOa2%2F6T9qka9nrKanGKxVMMikVstIhIiRebKFE48skZoeMrLCp0X4huLfijgDksezCSB0%2ByoDVyi%2BvgWAPU6feni6gy01uR8zIyp0UnY4TVEOsNhn3x0I2iRs%2FK9c5t6Dz03lsEZLoAe3cgv1SqjEjjbCS2%2FAs5Kvm%2F8ckshSoc4IbReDOxQvc8uwSl5vUQzG6zvEl%2FRiLWykw%3D%3D') no-repeat center 32%/ 140%"
          @click.prevent="goCategory('戒指')"
        >
          <h3
            class="fs-1 text-center overflow-hidden pb-1"
            data-aos="flip-left"
          >
            <small class="fs-6 text-spacing-l d-block fw-lighter mb-1 mb-md-2">戒指</small>
            Ring</h3>
        </a>
      </div>
    </div>
  </div>

  <Recommend/>
  <Subscribe/>
  <Notice/>
</template>

<script>
import Recommend from '@/components/frontend/Recommend.vue';
import Subscribe from '@/components/frontend/Subscribe.vue';
import Notice from '@/components/frontend/Notice.vue';

export default {
  name: '電商首頁',
  components: {
    Notice,
    Subscribe,
    Recommend,
  },
  methods: {
    copyCode() {
      this.$refs.couponInput.select();
      document.execCommand('copy');

      this.$swal.fire({ icon: 'success', title: '88520 已複製到剪貼簿' });
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

<style lang="scss" scoped>
  .content {
    height: calc(100vh - 97px);
    @media (max-width: 767.98px) {
      height: calc(100vh - 83px)
    }
  }
</style>
