<template>
  <div class="continer-fluid">
    <div class="d-flex vh-100">
      <div class="bg-light position-relative overflow-hidden w-100 w-md-65 m-3 py-5">
        <div class="main-content">
          <swiper
            :direction="'horizontal'" :slidesPerView="1"
            :autoplay='{
              "delay": 3000,
              "disableOnInteraction": false
            }'
            class="thisSwiper"
          >
            <swiper-slide v-for="(item, index) in carousel" :key="index">
              <img :src="item" class="img-cover w-100 mh-auto px-5">
            </swiper-slide>
          </swiper>

          <div
            class="slogan ff-special fst-italic text-center text-md-start fw-bold
            position-absolute start-0 bottom-0 end-0 mx-auto pb-5 ms-md-10"
            style="z-index: 11"
          >
            <h2 class="display-3 bg-white d-inline-block ps-2 pe-3 py-1">
              Stay Elegant ,
            </h2>
            <div class="w-100"></div>
            <h2 class="display-5 bg-white d-inline-block ps-2 pe-3 py-1 ms-4">
              Stay Graceful.
            </h2>
          </div>
        </div>
      </div>
      <div class="d-none d-md-flex flex-column align-items-center justify-content-center w-35">
        <div>
          <div class="fs-6 mb-3 mt-5">
            <h4 class="text-primary fw-bolder mb-3">
              D<i class="fad fa-flower fa-fw"></i>rii 專注於飾品上
            </h4>
            結合手作設計性<br>
            尋找並打造出具典雅質感的飾品
          </div>
          <router-link to="/products" class="btn btn-outline-secondary px-5">
            Shop Now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: [
        'https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627144498228.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pn87IEXXV1idTQiee6bQmyvELcP6p6e%2BsxsbuqoVqsVuKbBWIuNV%2BvHSdOJJF7ykAqAR3hLzw12kw6fiOSb4aWDqxlWoxnMfR0HaHYjBEA0fLDcV08ldPC%2FTNSDhdfzSekfKRdsUpuGQexYW6M2e2JWy8Ydog9RlyMSrSw%2B35PyKhU9GeVFtF3fECKgn%2FCHT0qw%2BsoI%2BZWJkT26%2FeH8zsPxCQdvUoAFkooH2yIRdSbN7xVfjTaHBLiY1YurfiHvbUwRmP6izSOCm4z4iK9ZxPg0HX0fAMrNgHt%2FOMgEWViZkzRjHaJ%2FmtxFhtYai9LLyIpSjVp4V7BcON7gD%2BPxDSA%3D%3D',
        'https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627147025196.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=B%2F2wmd08Ck2AMKWjgFSZ13NNPF%2Bv5NaFMGTdpfJC%2BtuLZ8nkSu73z7CgWkjDXikINh6ayQRh8eyLy70AGfMYkpUAxWVF9Pr%2BrI97wmEAoYo88FazA7VjqEsXYPHlLsvND82OVyGU5s%2FLugAdh0oK7tLqjB5Vr3YYAm6UFXql2lrB7ZoVW%2FgxpJFJxUUk1L00LrQpMXy8Lh9jS6v3mqer%2BOpCAdBYqpRV5Qc6Dsp9jFDqsQmaB1nH8KO2XT8lyNi21HQ0ecOhfqKzvqiXxiTeMb%2FBcGtrJe2UMHsgCh04jP2K9Y5bAhmVC69prILTZfBk4dOAtk9vMO%2BZ4Grfss%2B1wQ%3D%3D',
        'https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627146996707.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=YFk4EhQEuN%2BimoJTaCfCQ4evPboqMHK54QVACF33cFdsoFQAudxJVzGCAevjYFCFL8z%2F%2FkFJ3hQeTz2q3ozX0q%2F8lyR0F0HKkffV9nRD7ADaBExuo59XoYck5%2F0AhEKWNT3%2Br0JhHHCof%2BEuzECrlW0kIgYHCnLrcxrrjHHr5%2BW9YDniP3fTs8BDaVuvY2ViOjL09ZmF3bm4ynIuiG%2FHbMtWxxleUoIkUenVZX1MgFMlaKuGQIBb7RVzSIiv72%2FKXCXtt0Pe3dTBcJ3yNVvsQds0avhhSN89aL%2BU0kIB%2Bz6ok7UkAHjqyAM5QLR%2BwnMKp1n%2BZ3KgVMmgAbURLKNPaw%3D%3D',
        'https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1627146994082.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=k16zdL8I95vHUGKrpd78bq28nprX2j7xsIArHLRrEA2cr%2Fy3FYjoVMqUuMRjqyQVNKJIOFyBotf4tXzsoNAntexUxBpjfPgCCSHjA628EUptgo%2FPB3HfiR3GbizGx%2B6VS4MqMi2kfVSa3WMz%2FuiobIo1mJMCPLiiwdYCC4l31B7BgVw9eMlUA0E%2BmAZglFJlL4MATFw81wTgyyL30i3X91J30skHIicCdhVQ5wjoePSx%2FKOIOTpavRq50ldX%2B1t52KCed7UlGJQPf86bWDCqapyBdR6TUnsY9Tatoj%2Bq0LL6BA5EcYY3Lqa9qHjPGwIeq01LWkJ%2Btw%2Bz80IhJpa%2FNA%3D%3D',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.thisSwiper {
  max-width: 480px;
  &:hover {
    cursor: grab;
  }
}
</style>
