<template>
  <CustomLoading :active="isLoading" />

  <!-- 上方 BANNER -->
  <Banner
    title="部落格"
    engTitle="BLOG"
    imageUrl="https://storage.googleapis.com/vue-course-api.appspot.com/peihan/1626791381926.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KvnQt6UHdQS2Kujodk6V8nDGuQfOw%2FxKL2VCyEzZJPrTFp1opWMXHb9eogkFCSjnMwa9kAifCfMf4IpR6hYVy564zqJWjuIux0zgW1U9kq4UkFNjFULXNKQZ26lceNJpY7fkagbY0xTkROwmLWPpt6oJHvW%2FOudNe4A9DuQccMQWP8tT3umDYvspj8Zr5%2Fsn3oh8B0SAU2PZDsLU4F5JR2waT9XrU6USXRRfbKcqZ10AoSmSoSSyeDuP5OGSmyc09w3uLu20k6i4Dc5u%2F1%2Fu%2BPgKu8yFPcph1BLnStRUSqLqdYsC1O8vA1yA%2FQiFo%2BcWt3OPVA4PI7GeXrHrwRK5Bg%3D%3D"
  >
    <li class="breadcrumb-item active" aria-current="page">
      部落格
    </li>
  </Banner>
  <div class="blog container py-5 py-md-9">
    <div class="row gx-0">
      <!-- TAGS -->
      <div class="col-md-3 border-start-md order-md-2">
        <ul class="list-unstyled d-flex justify-content-around flex-md-column flex-wrap
        ps-md-5 mx-3 mx-md-0 mb-4">
          <li
            class="w-50 w-md-100 d-flex align-items-center justify-content-center
            justify-content-md-start border-bottom border-md-0"
            v-for="item in tags"
            :key="item.title"
          >
            <button
              type="button"
              class="outer-tag text-primary d-flex align-items-center justify-content-center
              justify-content-md-start w-100 p-3 p-md-0 py-md-3"
              :class="{ 'active': tagChoose === item.title }"
              @click="addOrDel(item.title)"
            >
              <div
                class="decoration bg-priLight rounded-circle me-3"
                :class="{ 'active': tagChoose === item.title }"
              >
              </div>
              {{ item.title }}
              <span class="small text-primary opacity-50 ms-2">
                {{ item.engTitle }}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- 文章 -->
      <ul class="list-unstyled col-md-9 order-md-1">
        <li
          data-aos="fade-up"
          class="blog-article border-bottom position-relative px-3 pe-md-6 py-5"
          v-for="item in filterArticles" :key="item.id"
        >
          <template v-if="item.tag">
            <p class="small text-gray mb-3" v-if="item.tag.length === 1">
              #{{ item.tag.join() }}
            </p>
            <ul class="list-unstyled d-flex" v-else>
              <li class="small text-gray mb-3 me-2" v-for="(tag, i) in item.tag" :key="`tag_${i}`">
                #{{ tag }}
              </li>
            </ul>
          </template>

          <div class="d-flex flex-column-reverse flex-xs-row justify-content-between
          align-items-center mb-3">
            <h3 class="h4 fw-bolder mb-0">
              <router-link :to="`/article/${item.id}`" class="link-primary">
                {{ item.title }}
              </router-link>
            </h3>
            <p class="text-secondary mb-2 mb-xs-0">
              {{ $toLocalDate(item.create_at) }}
            </p>
          </div>

          <router-link :to="`/article/${item.id}`" class="d-md-none stretched-link">
            <img
              :src="item.image" :alt="item.title"
              class="img-cover w-100 mb-3" style="height: 200px"
            >
          </router-link>
          <img
            :src="item.image" :alt="item.title"
            class="img-cover w-100 d-none d-md-block mb-3" style="height: 300px"
          >

          <p class="small text-secondary border-start border-4 border-secondary ps-2">
            作者：{{ item.author }}
          </p>
          <p class="mb-0 mb-md-2">{{ item.description }}</p>
          <div class="text-end d-none d-md-block">
            <router-link
            class="watch-btn d-inline-block p-2"
            :to="`/article/${item.id}`"
            >
              <i class="fas fa-long-arrow-alt-right me-2"></i>Watch more
            </router-link>
          </div>
        </li>
      </ul>
      <p
        class="col-md-9 fs-5 text-gray text-center text-md-start order-md-1 py-3"
        v-if="filterArticles.length === 0"
      >
        尚無。
      </p>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';

import { $get } from '@/assets/javascript/fetchAPI';

export default {
  name: 'Blog',
  data() {
    return {
      articles: [],
      article: {},
      tags: [
        {
          title: '公告',
          engTitle: 'News',
        },
        {
          title: '活動',
          engTitle: 'Activity',
        },
        {
          title: '抽獎',
          engTitle: 'Raffle',
        },
        {
          title: '小知識',
          engTitle: 'Trivia',
        },
      ],
      tagChoose: '',
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    Banner,
  },
  methods: {
    async getArticles(page = 1) {
      this.isLoading = true;

      try {
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
        const res = await $get(url);
        const {
          success,
          articles,
          message,
          pagination,
        } = res.data;
        if (success) {
          this.articles = articles;
          this.pagination = pagination;
        } else {
          this.$swal.fire({ icon: 'error', title: message });
        }
        this.isLoading = false;
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: err });
      }
    },
    addOrDel(title) {
      if (this.tagChoose !== title) {
        this.tagChoose = title;
      } else {
        this.tagChoose = '';
      }
    },
  },
  computed: {
    filterArticles() {
      return this.articles.filter((item) => {
        if (this.tagChoose) {
          return item.tag.includes(this.tagChoose);
        }
        return this.articles; // 呈現全部貼文
      });
    },
  },
  async created() {
    await this.getArticles();
    this.addOrDel(this.$route.params.tag);
  },
};
</script>
