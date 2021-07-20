import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () => import('../views/frontend/Front.vue'),
    children: [
      {
        path: '',
        name: '首頁',
        component: () => import('../views/frontend/Index.vue'),
      },
      {
        path: 'about',
        name: '關於',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'products',
        name: '商店',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'product/:id',
        name: '單一商品介紹',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: 'checkout',
        name: '資料填寫',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: 'checkout/:id',
        name: '訂單建立',
        component: () => import('../views/frontend/OrderCreate.vue'),
      },
      {
        path: 'blog',
        name: '部落格',
        component: () => import('../views/frontend/Blog.vue'),
      },
      {
        path: 'article/:id',
        name: '單一文章',
        component: () => import('../views/frontend/Article.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: '後台首頁',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: '',
        name: '後台首頁',
        component: () => import('../views/backend/Index.vue'),
      },
      {
        path: 'products',
        name: '商品管理',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        name: '訂單管理',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'articles',
        name: '文章管理',
        component: () => import('../views/backend/Articles.vue'),
      },
      {
        path: 'coupons',
        name: '優惠券管理',
        component: () => import('../views/backend/Coupons.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: '登入',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  scrollBehavior(to, from) {
    // console.log(to, from, savedPosition);
    if (from.fullPath.match('product/-')) { // 切換路徑時，若上個路徑有 product/- 字眼，會觸發滾動的行為
      if (to.fullPath.match('products')) {
        return {
          top: 290, // 進入時畫面滾到 290 高度的位置
          behavior: 'smooth',
        };
      }
    }
    return { // 其他的就都滾到最上方
      top: 0,
      behavior: 'smooth',
    };
  },

  routes,
});

export default router;
