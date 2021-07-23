<template>
  <div
    class="banner bg-cover d-flex position-relative"
    :style="`background-image: url(${imageUrl})`"
  >
    <div class="container d-flex flex-column py-3">
      <!-- 麵包屑 -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/" class="link-white d-inline-block">首頁</router-link>
          </li>
          <slot></slot>
        </ol>
      </nav>
      <!-- 標題 -->
      <h2
        data-aos="fade-right" data-aos-delay="500"
        class="fs-1 text-white text-spacing-m d-flex align-items-center mt-auto"
      >
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
