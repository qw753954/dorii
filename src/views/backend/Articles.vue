<template>
  <Loading :active="isLoading" :z-index="1061" loader="bars"/>
  <button
    type="button"
    class="add-fixed rounded-circle shadow d-md-none"
    @click="openModal('new')"
  >
    <i class="far fa-plus"></i>
  </button>
  <div class="row">
    <div class="col-md-11 mx-auto">
      <div class="d-md-flex justify-content-between align-items-center mb-4">
        <h2 class="text-center fs-4 mb-0">文章管理</h2>
        <button
          type="button"
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
                <tr class="bg-white sticky-top">
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
                  <td class="text-truncate" style="min-height: 150px">
                    {{ item.description }}
                  </td>
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
  />

  <DelModal
    ref="delModal"
    topic="article"
    :tempData="tempArticle"
    @emit-change="triggerLoading"
    @emit-get="getArticles"
  />
</template>

<script>
import ArticleModal from '@/components/backend/ArticleModal.vue';
import DelModal from '@/components/backend/DelModal.vue';

import * as fetch from '@/assets/javascript/fetchAPI';

export default {
  name: 'Articles Management',
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
    async getArticles(page = 1) {
      try {
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/articles?page=${page}`;
        const res = await fetch.$get(url);
        const { success, articles, pagination } = res.data;
        if (success) {
          this.articles = articles;
          this.pagination = pagination;
        }
        this.triggerLoading(false);
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: err.message });
      }
    },
    async getArticle(id, rightNow) {
      this.triggerLoading(true);

      try {
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`;
        const res = await fetch.$get(url);
        const { success, article } = res.data;
        if (success) {
          if (rightNow) {
            // 若直接在表格修改上架狀態，不用打開 modal
            this.tempArticle.isPublic = !this.tempArticle.isPublic;
            await this.updateArticle(false, this.tempArticle);
          } else {
            this.openModal('edit', article);
          }
        }
        this.triggerLoading(false);
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: err.message });
      }
    },
    async updateArticle(isNew, item) {
      this.triggerLoading(true);

      try {
        const httpsMethod = isNew ? '$post' : '$put';
        const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/article${isNew ? '' : `/${item.id}`}`;
        const res = await fetch[httpsMethod](url, { data: item });
        const { success } = res.data;
        if (success) {
          this.$refs.articleModal.hideModal();
          await this.getArticles();
        } else {
          this.triggerLoading(false);
        }
        this.$httpMsgState(res.data, isNew ? '新增' : '更新');
      } catch (err) {
        this.$swal.fire({ icon: 'error', title: err.message });
      }
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
        this.tempArticle = { ...item };
        console.log(this.tempArticle);
        this.$refs.articleModal.openModal();
      } else {
        this.tempArticle = { ...item };
        this.$refs.delModal.openModal();
      }
    },
    triggerLoading(item) {
      this.isLoading = item;
    },
  },
  async created() {
    await this.getArticles();
  },
};
</script>
