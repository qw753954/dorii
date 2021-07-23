import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () => import('../views/frontend/Front.vue'),
    meta: {
      title: 'Dorii',
    },
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
        meta: {
          title: 'About | Dorii',
        },
      },
      {
        path: 'products',
        name: '商店',
        component: () => import('../views/frontend/Products.vue'),
        meta: {
          title: 'Store | Dorii',
        },
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
        meta: {
          title: '結帳 | Dorii',
        },
      },
      {
        path: 'checkout/:id',
        name: '訂單建立',
        component: () => import('../views/frontend/OrderCreate.vue'),
        meta: {
          title: '訂單 | Dorii',
        },
      },
      {
        path: 'blog',
        name: '部落格',
        component: () => import('../views/frontend/Blog.vue'),
        meta: {
          title: 'Blog | Dorii',
        },
      },
      {
        path: 'article/:id',
        name: '單一文章',
        component: () => import('../views/frontend/Article.vue'),
      },
      {
        path: 'favorite',
        name: '願望清單',
        component: () => import('../views/frontend/Favorite.vue'),
        meta: {
          title: '願望清單 | Dorii',
        },
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
        meta: {
          title: '管理儀表板 | Dorii',
        },
      },
      {
        path: 'products',
        name: '商品管理',
        component: () => import('../views/backend/Products.vue'),
        meta: {
          title: '商品管理 | Dorii',
        },
      },
      {
        path: 'orders',
        name: '訂單管理',
        component: () => import('../views/backend/Orders.vue'),
        meta: {
          title: '訂單管理 | Dorii',
        },
      },
      {
        path: 'articles',
        name: '文章管理',
        component: () => import('../views/backend/Articles.vue'),
        meta: {
          title: '文章管理 | Dorii',
        },
      },
      {
        path: 'coupons',
        name: '優惠券管理',
        component: () => import('../views/backend/Coupons.vue'),
        meta: {
          title: '優惠券管理 | Dorii',
        },
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

// 參考：https://leahlin912.github.io/2019/10/03/Vue-%E8%A8%AD%E7%BD%AE%E6%AF%8F%E9%A0%81%E7%9A%84title%E5%8F%8A%E5%9C%96%E6%A8%99/
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
