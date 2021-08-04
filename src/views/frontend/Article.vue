<template>
  <CustomLoading :active="isLoading" />

  <div class="main-content container">
    <nav aria-label="breadcrumb" class="article breadcrumb-wrap py-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/" class="d-inline-block">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/blog" class="d-inline-block">部落格</router-link>
        </li>
        <li class="breadcrumb-item active text-muted" aria-current="page">
          {{ article.title }}
        </li>
      </ol>
    </nav>

    <div class="small bg-light d-md-flex justify-content-between border border-bottom-0">
      <a
        href="#" class="d-flex align-items-center p-2"
        @click.prevent="switchArticle(nearbyArticle.pre.id)" v-if="nearbyArticle.pre"
      >
        <i class="fas fa-caret-left me-2"></i>上一篇：{{ nearbyArticle.pre.title }}
      </a>
      <a
        href="#" class="d-flex flex-md-row-reverse align-items-center p-2 ms-auto"
        @click.prevent="switchArticle(nearbyArticle.next.id)" v-if="nearbyArticle.next"
      >
        <i class="fas fa-caret-right me-2 ms-md-2"></i>下一篇：{{ nearbyArticle.next.title }}
      </a>
    </div>

    <div class="text-center border position-relative py-5 py-md-7 mb-5">
      <div class="sticky-top" style="top: 40px;">
        <!-- share 參考：https://www.minwt.com/webdesign-dev/23006.html -->
        <div class="d-none d-md-block position-absolute end-0 pt-7 px-4">
          <p class="small text-primary"><i class="fas fa-share-alt d-block mb-2"></i>Share</p>
          <ul class="list-unstyled share-links d-flex flex-column align-items-center">
            <li class="mb-3">
              <a
                :href="`https://www.facebook.com/sharer.php?u=${url}`" target="_blank"
                class="fb border d-flex justify-content-center align-items-center rounded-circle
                text-secondary p-3"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="mb-3">
              <a
                :href="`https://twitter.com/share?text=${article.title}&url=${url}`"
                target="_blank"
                class="twitter border d-flex justify-content-center align-items-center
                rounded-circle text-secondary p-3"
              >
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                :href="`http://line.naver.jp/R/msg/text/?${url}`" target="_blank"
                class="line border d-flex justify-content-center align-items-center rounded-circle
                text-secondary p-3"
              >
                <i class="fab fa-line fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p class="small text-gray text-spacing-m">{{ $toLocalDate(article.create_at) }}</p>
      <h2 class="h3 fw-bolder text-primary mb-3">{{ article.title }}</h2>
      <p class="small mb-4">作者 {{ article.author }}</p>
      <a
        href="#" class="inner-tag small bg-light d-inline-block border-bottom px-3 py-2 mx-2"
        v-for="item in article.tag" :key="item"
        @click.prevent="goToTag(item)"
      >
        {{ item }}
      </a>

      <div class="text-start w-md-75 mx-auto px-4 px-md-0 mt-5">
        <div class="text-center mb-5">
          <img :src="article.image" :alt="article.title" class="d-inline">
        </div>
        <div class="text-justify" v-html="article.content"></div>

        <div class="d-flex justify-content-between align-items-center d-md-none border-top
        pt-3 px-3 mt-7 mx-md-n4">
          <p class="text-primary mb-0"><i class="fas fa-share me-1"></i>Share</p>
          <ul class="list-unstyled share-links d-flex">
            <li class="me-3">
              <a
                :href="`https://www.facebook.com/sharer.php?u=${url}`" target="_blank"
                class="fb d-flex justify-content-center align-items-center text-primary
                rounded-circle p-3"
              >
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="me-3">
              <a
                :href="`https://twitter.com/share?text=${article.title}&url=${url}`"
                target="_blank"
                class="twitter d-flex justify-content-center align-items-center text-primary
                rounded-circle p-3"
              >
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                :href="`http://line.naver.jp/R/msg/text/?${url}`" target="_blank"
                class="line d-flex justify-content-center align-items-center text-primary
                rounded-circle p-3"
              >
                <i class="fab fa-line fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog's article",
  data() {
    return {
      article: {},
      nearbyArticle: {
        pre: '',
        next: '',
      },
      url: document.URL,
    };
  },
  methods: {
    getArticles(id) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/articles`;
      this.axios.get(url)
        .then((res) => {
          const { success, articles, message } = res.data;
          if (success) {
            articles.forEach((item, index, arr) => {
              if (item.id === id) {
                this.nearbyArticle.pre = arr[index - 1];
                this.nearbyArticle.next = arr[index + 1];
              }
            });
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    getArticle(id) {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/article/${id}`;
      this.axios.get(url)
        .then((res) => {
          const { success, article, message } = res.data;
          if (success) {
            this.article = article;
            document.title = `${article.title} | Dorii`;
          } else {
            this.$swal.fire({ icon: 'error', title: message });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$swal.fire({ icon: 'error', title: err.message });
        });
    },
    switchArticle(id) {
      this.$router.push(`/article/${id}`);
      this.getArticle(id);
      this.getArticles(id);
    },
    goToTag(tag) {
      this.$router.push({
        name: '部落格',
        params: {
          tag,
        },
      });
    },
  },
  created() {
    this.getArticle(this.$route.params.id);
    this.getArticles(this.$route.params.id);
  },
};
</script>
