<template>
  <div class="modal fade"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modal"
  >
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header bg-primary">
        <h5
          class="modal-title text-white"
          id="staticBackdropLabel"
        >
          {{ isNew ? '新增商品' : '編輯商品' }}
        </h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
        </button>
      </div>

      <div class="modal-body">
        <!-- 導覽列 -->
        <ul class="nav nav-pills bg-light rounded-3 p-2 mb-4" id="pills-tab" role="tablist">
          <li class="nav-item me-2" role="presentation">
            <button class="nav-link active" id="pills-main-tab" data-bs-toggle="pill"
              data-bs-target="#pills-main" type="button" role="tab" aria-controls="pills-home"
              aria-selected="true" ref="mainLink">主要資訊</button>
          </li>
          <li class="nav-item me-2" role="presentation">
            <button class="nav-link" id="pills-des-tab" data-bs-toggle="pill"
              data-bs-target="#pills-des" type="button" role="tab" aria-controls="pills-profile"
              aria-selected="false">補充說明</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-img-tab" data-bs-toggle="pill"
              data-bs-target="#pills-img" type="button" role="tab" aria-controls="pills-contact"
              aria-selected="false">圖片設定</button>
          </li>
        </ul>

        <div class="tab-content" id="pills-tabContent">
          <!-- 內容 1 -->
          <div
            class="tab-pane fade show active" id="pills-main"
            role="tabpanel" aria-labelledby="pills-profile-tab"
            ref="mainArea"
          >
            <div class="mb-3">
              <label for="title" class="form-label">標題<span class="text-danger">*</span></label>
              <input
                type="text" id="title" name="標題" class="form-control" placeholder="請輸入名稱"
                v-model.trim="product.title"
              >
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="category" class="form-label">
                  <template v-if="isAdding">新增類別</template>
                  <template v-else>類別<span class="text-danger">*</span></template>
                </label>
                <div class="row gx-0 align-items-center">
                  <template v-if="!isAdding">
                    <div class="col pe-2">
                      <select
                        id="category" class="form-select" name="類別"
                        v-model="product.category"
                        @change="changeCategory"
                      >
                        <option value="" selected disabled>請選擇類別</option>
                        <option v-for="item in categories" :key="item" :value="item">
                          {{ item }}
                        </option>
                      </select>
                    </div>
                    <div class="col-auto">
                      <button
                        type="button"
                        class="set-category text-secondary"
                        @click="setCategory"
                      >
                        <i class="fas fa-cog fa-pulse"></i>
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div class="col pe-2">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="欲新增的類別名稱"
                        v-model.trim="tempCategory"
                      >
                    </div>
                    <div class="col-auto d-flex">
                      <button
                        type="button"
                        class="set-category text-secondary"
                        @click="addCategory"
                      >
                        <i class="fas fa-check"></i>
                      </button>
                      <button
                        type="button"
                        class="set-category text-muted"
                        @click="isAdding = false"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <p class="col-12 small text-danger d-flex align-items-baseline pt-1 mb-0">
                      <i class="fas fa-exclamation-circle d-block me-1"></i>
                      沒使用到的類別，頁面重整後即會自動刪除
                    </p>
                  </template>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="unit" class="form-label">
                  單位<span class="text-danger">*</span>
                </label>
                <input
                  type="text" id="unit" placeholder="請輸入單位" class="form-control" name="單位"
                  v-model="product.unit"
                >
              </div>
            </div>
            <div class="row">
              <!-- 耳環 -->
              <div class="col mb-3" v-if="product.category === '耳環'">
                <p class="mb-2">可選款式<span class="text-danger">*</span></p>
                <div class="d-flex">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input" id="clip" name="style" type="checkbox" value="夾式"
                      v-model="product.options.choose"
                    >
                    <label class="form-check-label" for="clip">夾式</label>
                  </div>
                  <div class="form-check me-3">
                    <input
                      class="form-check-input" id="pin" name="style" type="checkbox" value="針式"
                      v-model="product.options.choose"
                    >
                    <label class="form-check-label" for="pin">針式</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input" id="hook" name="style" type="checkbox" value="勾式"
                      v-model="product.options.choose"
                    >
                    <label class="form-check-label" for="hook">勾式</label>
                  </div>
                </div>
              </div>
              <!-- 戒指、手環 -->
              <div class="col mb-3"
                v-if="product.category === '手鍊' || product.category === '戒指'"
              >
                <p class="mb-2">尺寸<span class="text-danger">*</span></p>
                <div class="d-flex">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input" id="origine_size" name="size" type="checkbox"
                      value="原尺寸" v-model="product.options.choose"
                    >
                    <label class="form-check-label" for="origine_size">原尺寸</label>
                  </div>
                  <div class="form-check me-3">
                    <input
                      class="form-check-input" id="modify_size" name="size" type="checkbox"
                      value="改尺寸（請備註尺寸）" v-model="product.options.choose"
                    >
                    <label class="form-check-label" for="modify_size">
                      改尺寸（請備註尺寸）
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="origin_price" class="form-label">
                  原價<span class="text-danger">*</span>
                </label>
                <input
                  type="number" class="form-control" id="origin_price" name="原價" min="0"
                  placeholder="請輸入原價" :true-value="1" :false-value="0"
                  v-model.number="product.origin_price"
                >
              </div>
              <div class="col-md-6 mb-3">
                <label for="price" class="form-label">
                  售價<span class="text-danger">*</span>
                </label>
                <input
                  type="number" class="form-control" id="price" name="售價" min="0"
                  placeholder="請輸入售價" :true-value="1" :false-value="0"
                  v-model.number="product.price"
                >
              </div>
            </div>
            <div class="mb-3">
              <label for="rate" class="form-label d-block">
                評分<span class="text-danger">*</span>
                <span class="text-muted small ps-2">( 請拖曳 )</span>
              </label>
              <div class="d-flex align-items-center border rounded-1 p-3">
                <p class="h5 font-monospace mb-0 me-2">{{ product.options.rate }}</p>
                <input
                  type="range" id="rate" class="form-range"
                  min="1" max="5" step="1"
                  v-model.number="product.options.rate"
                >
              </div>
            </div>
          </div>

          <!-- 內容 2 -->
          <div class="tab-pane fade" id="pills-des" role="tabpanel"
            aria-labelledby="pills-contact-tab">
            <div class="mb-3">
              <label for="description" class="mb-1">商品描述</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入商品描述"
                rows="4"
                v-model="product.description"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="mb-1">說明內容</label>
              <textarea
                id="content"
                type="text"
                class="form-control"
                placeholder="請輸入說明內容"
                rows="4"
                v-model="product.content"
              ></textarea>
            </div>
          </div>

          <!-- 內容 3 -->
          <div class="tab-pane fade" id="pills-img" role="tabpanel"
            aria-labelledby="pills-home-tab">
            <!-- 主要圖片區 -->
            <div class="row">
              <div class="col-7">
                <label for="image" class="form-label mb-2">主要圖片</label>
                <input
                  type="url"
                  id="image"
                  class="form-control mb-3"
                  placeholder="請輸入圖片網址"
                  v-model="product.image"
                >
                <div class="d-flex justify-content-end align-items-center">
                  <span class="me-2">或</span>
                  <label
                    class="btn btn-sm btn-secondary d-inline-block"
                    v-if="!loadingBtn.mainImgUpload"
                  >
                    <input type="file" class="d-none" ref="mainFile"
                      @change="uploadImg('main')">
                    <i class="fas fa-upload"></i> 本機選取
                  </label>
                  <button type="button" class="btn btn-sm btn-secondary disabled" v-else>
                    <span class="spinner-border spinner-border-sm" role="status"></span>
                    上傳中
                  </button>
                </div>
              </div>
              <div class="col-5">
                <div class="img-default bg-light" v-if="!product.image" style="height: 170px">
                  <i class="fas fa-image"></i>
                </div>
                <img
                  :src="product.image"
                  class="img-fluid rounded-3"
                  :alt="`${product.title}_主圖`"
                  v-else
                >
              </div>
            </div>

            <hr class="my-5">

            <!-- 多圖區 -->
            <label for="images" class="form-label">
              多圖新增<span class="text-muted">（最多六張）</span>
            </label>
            <ul class="row mb-1">
              <!-- 沒多圖時 -->
              <template v-if="product.imagesUrl.length === 0">
                <li class="col-4 mb-2" v-for="i in 3" :key="`images_${i}`">
                  <div class="img-default bg-light" style="height: 100px">
                    <i class="fas fa-image"></i>
                  </div>
                </li>
              </template>

              <!-- 有多圖時 -->
              <template v-else>
                <li
                  class="col-4"
                  v-for="(item, index) in product.imagesUrl"
                  :key="item.id"
                >
                  <a
                    href="#"
                    class="img-delete text-white w-100 mb-2"
                    @click.prevent="product.imagesUrl.splice(index, 1)"
                  >
                    <img :src="item"
                      class="rounded-3 img-fluid img-cover w-100"
                      style="height: 100px"
                      :alt="`${product.title}_${index}`"
                    >
                  </a>
                </li>
              </template>
            </ul>

            <div class="row align-items-center" v-if="product.imagesUrl.length !== 6">
              <div class="col">
                <input type="url" id="images" class="form-control" placeholder="請輸入圖片網址"
                  v-model="tempImgUrl">
              </div>
              <div class="col-auto d-flex justify-content-end align-items-center">
                <span class="me-2">或</span>
                <label class="btn btn-sm btn-secondary d-inline-block"
                  v-if="!loadingBtn.subsImgUpload">
                  <input
                    type="file" class="d-none"
                    ref="subsFile"
                    @change="uploadImg('subs')"
                  >
                  <i class="fas fa-upload"></i> 本機選取
                </label>
                <button type="button" class="btn btn-sm btn-secondary disabled" v-else>
                  <span class="spinner-border spinner-border-sm" role="status"></span>
                  上傳中
                </button>
              </div>
              <div class="w-100 mb-3"></div>
              <button
                type="button"
                class="col-5 mx-auto btn btn-outline-danger"
                @click="addImages"
              >
                確定新增
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <div class="form-check me-auto" v-if="isNew">
          <input
            class="form-check-input"
            type="checkbox"
            id="is_enabled"
            :true-value="1"
            :false-value="0"
            v-model="product.is_enabled"
          >
          <label
            for="is_enabled"
            class="form-check-label align-middle"
          >
            是否啟用
          </label>
        </div>
        <button type="button" class="btn btn-sm btn-outline-gray" data-bs-dismiss="modal">
          取消
        </button>
        <button
          type="button" class="btn btn-sm btn-primary"
          @click="submitData"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Tab from 'bootstrap/js/dist/tab';
import modalMixins from '../../mixins/modalMixins';

export default {
  data() {
    return {
      modal: '',
      tab: '',
      product: {
        imagesUrl: [],
        options: {},
      },
      tempImgUrl: '',
      categories: '',
      tempCategory: '',
      isAdding: false,
      loadingBtn: {
        mainImgUpload: '',
        subsImgUpload: '',
      },
    };
  },
  mixins: [modalMixins],
  props: {
    isNew: Boolean,
    tempProduct: Object,
    outerCategory: Object,
  },
  emits: ['emit-update'],
  methods: {
    velidateField() {
      this.isDisabled = false;
    },
    openModal() {
      this.modal.show();
      this.tab.show(); // 每打開 Modal 都會在 "主要資訊" 頁籤底下
      this.isAdding = false;
      this.$refs.form.resetForm();
    },
    setCategory() {
      this.tempCategory = '';
      this.isAdding = true;
    },
    addCategory() {
      if (!this.tempCategory) {
        const data = {
          success: false,
          message: '類別名稱不可為空',
        };
        this.$httpMsgState(data, '新增類別');
        return;
      }

      this.categories.push(this.tempCategory);
      const data = {
        success: true,
      };
      this.$httpMsgState(data, '新增類別');

      this.tempCategory = '';
      this.isAdding = false;
    },
    changeCategory() {
      if (this.product.category === '項鍊') {
        delete this.product.options.choose;
      } else {
        this.product.options.choose = [];
      }
    },
    addImages() {
      if (!this.tempImgUrl) {
        const data = {
          success: false,
          message: '圖片網址不可為空',
        };
        this.$httpMsgState(data, '上傳');
        return;
      }
      this.product.imagesUrl.push(this.tempImgUrl);
      this.tempImgUrl = '';
    },
    uploadImg(type) {
      const formData = new FormData();
      if (type === 'main') {
        formData.append('file-to-upload', this.$refs.mainFile.files[0]);
        this.loadingBtn.mainImgUpload = 'main';
      } else {
        formData.append('file-to-upload', this.$refs.subsFile.files[0]);
        this.loadingBtn.subsImgUpload = 'subs';
      }
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.axios.post(url, formData)
        .then((res) => {
          const { success, imageUrl } = res.data;
          if (success) {
            this.loadingBtn = {};
            if (type === 'main') {
              this.product.image = imageUrl;
            } else {
              this.tempImgUrl = imageUrl;
            }
          }
          this.loadingBtn = {};
          this.$httpMsgState(res.data, '上傳圖片');
        })
        .catch((err) => {
          console.dir(err);
          this.loadingBtn = {};
        });
    },
    submitData() {
      if (!this.product.title || !this.product.unit || !this.product.category
      || this.product.price === '' || this.product.origin_price === ''
      || (this.product.category === '戒指' && !this.product.options.choose.length)
      || (this.product.category === '手鍊' && !this.product.options.choose.length)
      || (this.product.category === '耳環' && !this.product.options.choose.length)) {
        const data = {
          success: false,
          message: '主要資訊的欄位都要填寫',
        };
        this.$httpMsgState(data, this.isNew ? '新增' : '更新');
        this.tab.show();
        return;
      }
      if (this.product.price < 0 || this.product.origin_price < 0) {
        const data = {
          success: false,
          message: '價格不能低於 0',
        };
        this.$httpMsgState(data, this.isNew ? '新增' : '更新');
        return;
      }
      this.$emit('emit-update', this.isNew, this.product);
    },
  },
  watch: {
    tempProduct() {
      this.product = { ...this.tempProduct };
      if (!this.product.imagesUrl) {
        this.product.imagesUrl = [];
      }
      this.tempImgUrl = '';
    },
    outerCategory() {
      this.categories = this.outerCategory;
    },
  },
  mounted() {
    this.tab = new Tab(this.$refs.mainLink);
  },
};
</script>
