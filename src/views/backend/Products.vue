<template>
  <Loading :active="isLoading" :z-index="1061" loader="bars"/>

  <button
    type="button"
    class="add-fixed btn btn-lg rounded-circle shadow d-md-none"
    @click="openModal('new')"
  >
    <i class="fas fa-plus"></i>
  </button>
  <div class="row">
    <div class="col-11 mx-auto">
      <div class="d-md-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center justify-content-center">
          <h3 class="fs-4 mb-0 me-md-3">
            商品管理
          </h3>
          <small class="badge bg-gray d-none d-md-inline-block">共 {{ totalQty }} 筆</small>
        </div>
        <button
          type="button"
          class="btn btn-secondary text-white d-none d-md-block"
          @click="openModal('new')"
        >
          新建商品
        </button>
      </div>
      <p class="d-md-none small text-secondary text-center">
        <i class="fab fa-pagelines ms-1"></i>
        共 {{ totalQty }} 筆
      </p>
      <div class="card shadow rounded-4">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr class="bg-white sticky-top">
                  <th scope="col" width="50" class="d-none d-md-table-cell">#</th>
                  <th scope="col" width="130">類別</th>
                  <th scope="col" width="250">商品名稱</th>
                  <th scope="col" width="120">原價</th>
                  <th scope="col" width="120">售價</th>
                  <th scope="col" width="60" class="text-center">評分</th>
                  <th scope="col" width="100" class="text-center">是否啟用</th>
                  <th scope="col" width="100"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in products" :key="item.id">
                  <th scope="row" class="d-none d-md-table-cell">{{ item.num }}</th>
                  <td>{{ item.category }}</td>
                  <td>{{ item.title }}</td>
                  <td>${{ $toCurrency(item.origin_price) }}</td>
                  <td>${{ $toCurrency(item.price) }}</td>
                  <td class="text-center">{{ item.options?.rate }}</td>
                  <td>
                    <div class="d-flex justify-content-center switch-container">
                      <input
                        type="checkbox"
                        class="scroll-input"
                        :id="item.id"
                        :true-value="1"
                        :false-value="0"
                        :checked="item.is_enabled"
                        v-model="item.is_enabled"
                        @change="updateProduct(false, item)"
                      >
                      <label :for="item.id" class="scroll-label"></label>
                    </div>
                  </td>
                  <td class="text-end">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="operate-btn btn btn-outline-secondary btn-sm"
                        @click="openModal('edit', item)"
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
          <Pagination
            :pagination="pagination"
            @emit-page="getProducts"
            v-if="pagination.total_pages > 1"
          />
        </div>
      </div>
    </div>
  </div>

  <ProductModal
   ref="productModal"
   :is-new="isNew"
   :temp-product="tempProduct"
   :outerCategory="categories"
   @emit-update="updateProduct"
  />

  <DelModal
   ref="delModal"
   topic="product"
   :temp-data="tempProduct"
   @emit-change="triggerLoading"
   @emit-get="getProducts"
  />
</template>

<script>
// @ is an alias to /src
import ProductModal from '@/components/backend/ProductModal.vue';
import DelModal from '@/components/backend/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: '產品管理',
  inheritAttrs: false, // 拒絕繼承父層 dashboard.vue 傳遞的 props 資料
  // 參考 https://v3.cn.vuejs.org/guide/component-attrs.html#%E9%9D%9E-prop-%E7%9A%84-attribute
  // 參考 https://shunnnet.github.io/blog/2020/04/29/%E7%AD%86%E8%A8%98-vue-router-1-%E4%B8%80%E4%BA%9B%E7%AD%86%E8%A8%98/
  data() {
    return {
      products: [],
      pagination: {},
      currentPage: 1,
      categories: [],
      tempProduct: {
        category: '',
        imagesUrl: [],
        options: {
          rate: 0,
        },
      },
      totalQty: 0,
      isNew: true,
      isLoading: false,
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  inject: ['emitter'],
  emits: ['emit-update', 'emit-change', 'emit-get', 'emit-page'],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;

      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.axios.get(url)
        .then((res) => {
          const { success, products, pagination } = res.data;
          if (success) {
            this.products = products;
            this.pagination = pagination;
            this.currentPage = pagination.current_page;
            this.getProductsAll();
          }
          this.triggerLoading(false);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getProductsAll() {
      const url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.axios.get(url)
        .then((res) => {
          const { products, success } = res.data;
          if (!success) {
            return;
          }
          this.totalQty = Object.keys(products).length;
          this.getCategory(products);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getCategory(productAll) {
      const categoryAll = Object.values(productAll).map((item) => item.category);
      this.categories = categoryAll.filter((item, index, arr) => arr.indexOf(item) === index);
    },
    updateProduct(isNew, item) {
      this.triggerLoading(true);

      let url;
      let httpsMethod;
      if (isNew) {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product`;
        httpsMethod = 'post';
      } else {
        url = `${process.env.VUE_APP_URL}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpsMethod = 'put';
      }
      this.axios[httpsMethod](url, { data: item })
        .then((res) => {
          if (res.data.success) {
            this.$refs.productModal.hideModal();
            this.getProducts(this.currentPage);
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
      switch (type) {
        case 'new':
          this.isNew = true;
          this.tempProduct = {
            category: '',
            imagesUrl: [],
            options: {
              rate: 5,
              choose: [],
              show: [],
            },
          };
          this.$refs.productModal.openModal();
          break;
        case 'edit':
          this.isNew = false;
          this.tempProduct = JSON.parse(JSON.stringify(item));
          this.$refs.productModal.openModal();
          break;
        case 'delete':
          this.tempProduct = { ...item };
          this.$refs.delModal.openModal();
          break;
        default:
          break;
      }
    },
    triggerLoading(boolean) {
      this.isLoading = boolean;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
