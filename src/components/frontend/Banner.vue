<template>
  <div
    class="banner bg-cover d-flex position-relative"
    :style="`background-image: url(${imageUrl})`"
  >
    <div class="container d-flex flex-column">
      <!-- 麵包屑 -->
      <nav aria-label="breadcrumb" class="ps-1 mt-auto">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/" class="link-white d-inline-block">首頁</router-link>
          </li>
          <slot></slot>
        </ol>
      </nav>
      <!-- 標題 -->
      <h2 class="fs-1 text-white text-spacing-m d-flex align-items-center pb-2">
        {{ title }}
        <span class="fs-3 ms-3">{{ engTitle }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'engTitle', 'imageUrl'],
};
</script>
