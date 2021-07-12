<template>
  <div class="modal fade"
   tabindex="-1"
   aria-labelledby="exampleModalLabel"
   aria-hidden="true"
   ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white" id="exampleModalLabel">
            {{ isNew ? '新增文章' : '編輯文章' }}
          </h5>
          <button type="button"
           class="btn-close btn-close-white"
           data-bs-dismiss="modal"
           aria-label="Close"
          >
          </button>
        </div>

        <div class="modal-body">
          <div
           class="alert align-items-end py-3 mb-4"
           :class="{ 'alert-success': article.isPublic, 'alert-gray': !article.isPublic, }"
          >
            <div class="d-flex">
              是否上架？
              <div class="form-check ms-4 me-3">
                <input
                  class="form-check-input"
                  type="radio"
                  id="disagree"
                  name="isPublic"
                  :value="false"
                  v-model="article.isPublic"
                >
                <label
                 for="disagree"
                 class="form-label align-middle mb-0"
                >
                  否
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="agree"
                  name="isPublic"
                  :value="true"
                  v-model="article.isPublic"
                >
                <label
                 for="agree"
                 class="form-label align-middle mb-0"
                >
                  是
                </label>
              </div>
            </div>
          </div>
          <label for="tag" class="form-label">
            標籤
          </label>
          <div class="row gx-2 mb-3">
            <template v-if="article.tag.length">
              <div
               class="col-4 col-md-2 mb-2"
               v-for="(item, index) in article.tag"
               :key="`tag_${index}`"
              >
                <div class="input-group input-group-sm">
                  <input
                  type="text"
                  class="form-control form-control"
                  placeholder="請輸入標籤"
                  v-model="article.tag[index]"
                  >
                  <button
                  type="button" class="btn btn-outline-danger"
                  @click="article.tag.splice(index, 1)"
                  >
                    <i class="small fas fa-times"></i>
                  </button>
                </div>
              </div>
            </template>
            <div
             class="col-4 col-md-2 mb-2"
             v-if="!article.tag.length || article.tag[article.tag.length - 1]"
            >
              <button
               class="btn btn-outline-secondary btn-sm"
               @click="article.tag.push('')"
              >新增標籤</button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7 mb-3 order-md-1">
              <label for="title" class="form-label">
                標題<span class="text-danger">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入標題"
                v-model="article.title"
              >
            </div>
            <div class="col-md-5 mb-3 order-md-0">
              <label for="img" class="form-label">
                封面圖<span class="text-danger">*</span>
              </label>
              <input
               type="url"
               class="form-control"
               id="img"
               placeholder="可透過本機上傳，也可直接貼外部圖片 URL"
               v-model="article.image"
              >
            </div>
          </div>
          <div class="row">
            <div class="col-md-5 mb-3">
              <div class="spinner d-flex align-items-center h-100"
               v-if="loadingState == 'loading'">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
              <label
               class="img-upload rounded-3 h-100"
               :class="{ 'border-dotted': !article.image }"
               style="min-height: 150px"
               v-else>
                <input type="file" class="d-none" ref="coverFile"
                 @change="uploadImg()">
                <img :src="article.image" class="img-fluid rounded-2">
                <i class="fw-bolder fas fa-camera"></i>
              </label>
            </div>
            <div class="col-md-7">
              <div class="mb-3">
                <label for="author" class="form-label">
                  作者<span class="text-danger">*</span>
                </label>
                <input
                 class="form-control"
                 id="author"
                 list="presentAuthors"
                 placeholder="請輸入作者名稱"
                 autocomplete="off"
                 v-model="article.author"
                >
                <datalist id="presentAuthors">
                  <option value="호랑해💎"></option>
                  <option value="小紀"></option>
                  <option value="丸丸"></option>
                  <option value="Kai"></option>
                </datalist>
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">
                建立日期<span class="text-danger">*</span>
                </label>
                <input
                 type="date"
                 class="form-control"
                 id="date"
                 v-model="createAt"
                >
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">
              簡述
            </label>
            <textarea
             name=""
             id="description"
             class="form-control"
             placeholder="輸入簡述..."
             rows="2"
             v-model="article.description"></textarea>
          </div>
          <div class="mb-3">
            <ckeditor :editor="editor" v-model="article.content" :config="editorConfig"></ckeditor>
          </div>
        </div>

        <div class="modal-footer">
          <button
           type="button"
           class="btn btn-outline-gray btn-sm"
           data-bs-dismiss="modal"
          >
            取消
          </button>

          <button
           type="button"
           class="btn btn-primary btn-sm"
           @click="trigger"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@ckeditor/ckeditor5-build-classic';
import modalMixins from '../../mixins/modalMixins';

export default {
  data() {
    return {
      article: {
        tag: [],
      },
      createAt: '',
      editor: Editor,
      editorConfig: {
        toolbar: ['heading', 'typing', 'bold', 'italic', 'numberedList', 'bulletedList', '|', 'link', 'blockQuote'],
      },
      loadingState: '',
    };
  },
  mixins: [modalMixins],
  props: {
    tempArticle: Object,
    isNew: Boolean,
  },
  methods: {
    uploadImg() {
      this.loadingState = 'loading';
      const formData = new FormData();
      formData.append('file-to-upload', this.$refs.coverFile.files[0]);
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.axios.post(url, formData)
        .then((res) => {
          const { success, imageUrl } = res.data;
          if (!success) return;
          this.article.image = imageUrl;
          this.loadingState = '';
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    trigger() {
      if (!this.article.title || !this.article.create_at || !this.article.author
      || !this.article.content) {
        const data = {
          success: false,
          message: '必填欄位不可空白',
        };
        this.$httpMsgState(data, '新增');
        return;
      }
      this.$emit('emit-update', this.isNew, this.article);
    },
  },
  watch: {
    tempArticle() {
      this.article = {
        ...this.tempArticle,
        tag: this.tempArticle.tag || [],
        isPublic: this.tempArticle.isPublic || false,
      };

      // https://sealman234.github.io/2020-02-11-javascript-timestamp/
      this.createAt = new Date(this.article.create_at * 1000).toISOString().split('T', 1).join();
    },
    createAt() {
      // 後端是收 Timestamp 格式
      this.article.create_at = Math.floor(new Date(this.createAt) / 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheets/all-back";

:deep .ck.ck-toolbar {
  padding: 0.25rem
}
:deep .ck-editor__editable_inline {
  min-height: 280px;
  font-size: 0.9375rem;
}

:deep .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
  border-radius: 0.25rem;
  border-color: rgb(131, 178, 184);
  box-shadow: rgba(7, 101, 112, 0.25) 0px 0px 0px 0.25rem;
}
</style>
