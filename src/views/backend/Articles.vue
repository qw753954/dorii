<template>
  <Loading :active="isLoading" :z-index="1061" loader="bars"></Loading>
  <button
   class="add-fixed btn btn-lg rounded-circle shadow d-md-none"
   @click="openModal('new')"
  >
    <i class="fas fa-plus"></i>
  </button>
  <div class="row">
    <div class="col-md-11 mx-auto">
      <div class="d-md-flex justify-content-between align-items-center mb-4">
        <h3 class="text-center fs-4 mb-0">文章管理</h3>
        <button
         class="btn btn-secondary text-white d-none d-md-block"
         @click="openModal('new')"
        >
          新增文章
        </button>
      </div>
      <div class="card shadow rounded-4">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col" width="220">標題</th>
                  <th scope="col" width="100">作者</th>
                  <th scope="col" width="250">簡述</th>
                  <th scope="col" width="100">建立時間</th>
                  <th scope="col" width="80" class="text-center">是否上架</th>
                  <th scope="col" width="100"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in articles" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.author }}</td>
                  <td>{{ item.description }}</td>
                  <!-- 變日期格式 ↓ -->
                  <td>{{ $toLocalDate(item.create_at) }}</td>
                  <td>
                    <div class="d-flex justify-content-center switch-container">
                      <input
                      type="checkbox"
                      class="scroll-input"
                      :id="item.id"
                      :checked="item.isPublic"
                      v-model="item.isPublic"
                      @change="getArticle(item.id, true)"
                      >
                      <label :for="item.id" class="scroll-label"></label>
                    </div>
                  </td>
                  <td class="text-end">
                    <div class="btn-group">
                      <button
                      type="button"
                      class="operate-btn btn btn-outline-secondary btn-sm"
                      @click="getArticle(item.id)"
                      >
                        <i class="fas fa-edit fa-fw"></i>
                      </button>
                      <button
                      type="button"
                      class="operate-btn btn btn-outline-danger btn-sm"
                      @click="openModal('delete', item)"
                      >
                        <i class="fas fa-trash-alt fa-fw"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ArticleModal
   ref="articleModal"
   :is-new="isNew"
   :tempArticle="tempArticle"
   @emit-change="triggerLoading"
   @emit-update="updateArticle"
  ></ArticleModal>

  <DelModal
   ref="delModal"
   topic="article"
   :tempData="tempArticle"
   @emit-change="triggerLoading"
   @emit-get="getArticles"
  ></DelModal>
</template>

<script>
import ArticleModal from '@/components/backend/ArticleModal.vue';
import DelModal from '@/components/backend/DelModal.vue';

export default {
  inheritAttrs: false,
  data() {
    return {
      articles: [],
      pagination: {},
      tempArticle: {},
      isNew: true,
      isLoading: true,
    };
  },
  components: {
    ArticleModal,
    DelModal,
  },
  methods: {
    getArticles(page = 1) {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
      this.axios.get(url)
        .then((res) => {
          const { success, articles, pagination } = res.data;
          if (success) {
            this.articles = articles;
            this.pagination = pagination;
          }
          this.triggerLoading(false);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getArticle(id, rightNow) {
      this.triggerLoading(true);

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
      this.axios.get(url)
        .then((res) => {
          const { success, article } = res.data;
          if (success) {
            this.tempArticle = article;
            if (rightNow) {
              // 若直接在表格修改上架狀態，不用打開 modal
              this.tempArticle.isPublic = !this.tempArticle.isPublic;
              this.updateArticle(false, this.tempArticle);
            } else {
              this.openModal('edit', this.tempArticle);
            }
          }
          this.triggerLoading(false);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    updateArticle(isNew, item) {
      this.triggerLoading(true);

      let url;
      let httpsMethod;
      if (isNew) {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article`;
        httpsMethod = 'post';
      } else {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${item.id}`;
        httpsMethod = 'put';
      }
      this.axios[httpsMethod](url, { data: item })
        .then((res) => {
          if (res.data.success) {
            this.$refs.articleModal.hideModal();
            this.getArticles();
          } else {
            this.triggerLoading(false);
          }
          this.$httpMsgState(res.data, this.isNew ? '新增' : '更新');
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    openModal(type, item) {
      if (type === 'new') {
        this.isNew = true;
        this.tempArticle = {
          create_at: Math.floor(Date.now() / 1000), // 預設會是當天日期
        };
        this.$refs.articleModal.openModal();
      } else if (type === 'edit') {
        this.isNew = false;
        this.$refs.articleModal.openModal();
      } else {
        this.tempArticle = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    triggerLoading(boolean) {
      this.isLoading = boolean;
    },
  },
  created() {
    this.getArticles();
  },
};
</script>
