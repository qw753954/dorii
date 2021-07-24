<template>
  <div class="container py-6 py-md-9">
    <h3 class="text-center text-primary mb-8">好評推薦</h3>
    <div class="d-flex align-items-start">
      <swiper
        data-aos="fade-up"
        :slidesPerView="1" :spaceBetween="10"
        :pagination="{ 'clickable': true }"
        :autoplay="{
          'delay': 3000,
          'disableOnInteraction': false
        }"
        :breakpoints='{
          "768": {
            "slidesPerView": 2,
            "spaceBetween": 30
          },
          "1024": {
            "slidesPerView": 3,
            "spaceBetween": 50
          }
        }'
        class="mySwiper pb-8"
      >
        <swiper-slide v-for="(item, index) in comments" :key="item.id">
          <div class="d-flex flex-column align-items-center flex-md-row align-items-md-start">
            <div class="w-25 px-1 mb-4 mb-md-0">
              <img
                class="rounded-circle" :alt="`avatar-${index}`"
                :src="require(`@/assets/images/frontend/avatar_${index}.jpg`)"
              >
              <!-- 路徑部分 https://stackoverflow.com/questions/66089248/dynamic-import-image-in-vue-3 -->
            </div>
            <div class="w-75 px-3">
              <h4 class="h5 text-center text-md-start">{{ item.id }}</h4>
              <p class="text-center text-md-justify" v-html="item.msg"></p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [
        {
          id: 'mua*****',
          msg: '服務很好的店家，效率快、包裝精緻，實品也不負眾望，超有質感超美的啦～～',
        },
        {
          id: 'qw7******',
          msg: '價格親民，出貨快速，回覆態度友善。',
        },
        {
          id: 'pip***',
          msg: '款式雖然大多都是基本款，不過都很值得全包！無論搭配什麼風格都 hen 適合呢 ‎(˶˘ㅂ˘˶)♡',
        },
        {
          id: '52o****',
          msg: '買了暖陽編織手環送給女友，她整個超愛XDD 而且還特地命令我一定要給這間好評www<br>所以我就乖乖來給好評了哈哈哈',
        },
        {
          id: 'm32****',
          msg: '圖片跟實體一樣美！<br>而且闆娘溫柔又可愛 TAT<br>偶還不推爆！！',
        },
      ],
    };
  },
};
</script>
