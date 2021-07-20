<template>
  <CustomLoading :active="isLoading"></CustomLoading>

  <!-- 上方 BANNER -->
  <Banner
    title="部落格"
    engTitle="BLOG"
    imageUrl="https://images.unsplash.com/photo-1522199794616-8a62b541f762?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
  >
    <li class="breadcrumb-item active" aria-current="page">
      部落格
    </li>
  </Banner>
  <div class="blog container py-5 py-md-9">
    <div class="row gx-0">
      <!-- TAGS -->
      <div class="col-md-3 text-center text-md-start border-start-md order-md-2 pt-md-3">
        <ul class="row row-cols-2 row-cols-md-1 justify-content-around flex-md-column ps-md-5 gx-0">
          <li
            class="col d-flex align-items-center justify-content-center justify-content-md-start
            pb-5"
            v-for="item in tags"
            :key="item.title"
          >
            <button
              class="outer-tag text-primary d-flex align-items-center justify-content-center
              justify-content-md-start w-100 p-2 p-md-0"
              :class="{ 'active': tagChoose === item.title }"
              @click="addOrDel(item.title)"
            >
              <div
                class="bg-priLight rounded-circle me-3"
                :class="{ 'active': tagChoose === item.title }"
              ></div>
              {{ item.title }}
              <span class="small text-primary opacity-50 ms-2">
                {{ item.engTitle }}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <!-- 文章 -->
      <ul class="col-md-9 order-md-1">
        <li
          class="blog-article border-bottom position-relative px-3 pe-md-6 py-5"
          v-for="item in filterArticles" :key="item.id"
        >
          <template v-if="item.tag">
            <p class="small text-gray mb-3" v-if="item.tag.length === 1">
              #{{ item.tag.join() }}
            </p>
            <ul class="d-flex" v-else>
              <li class="small text-gray mb-3 me-2" v-for="(tag, i) in item.tag" :key="`tag_${i}`">
                #{{ tag }}
              </li>
            </ul>
          </template>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bolder text-primary mb-0">
              <router-link :to="`/article/${item.id}`">{{ item.title }}</router-link>
            </h4>
            <p class="text-secondary mb-0">
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
        class="col-md-9 text-gray text-center text-md-start order-md-1 px-3 pe-md-6"
        v-if="filterArticles.length === 0"
      >
        尚無。
      </p>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/frontend/Banner.vue';

export default {
  name: '部落格',
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
    getArticles(page = 1) {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/articles?page=${page}`;
      this.axios.get(url)
        .then((res) => {
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
        })
        .catch((err) => {
          console.dir(err);
        });
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
        return this.articles;
      });
    },
  },
  created() {
    this.getArticles();

    this.addOrDel(this.$route.params.tag);
  },
};
</script>
