<template>
  <h1 class="fs-3 text-gray text-uppercase text-spacing-l text-center text-md-start p-4">
    Hello ~
    <p class="fs-2 fw-bolder text-dark mt-3 ms-md-5">{{ user }} 👋</p>
  </h1>
  <img
    src="@/assets/images/backend/dashboard.svg"
    class="dashboard-bg position-absolute"
    alt="dashboard 示意圖"
  >
</template>

<script>
export default {
  name: 'Backend Home',
  props: {
    user: String,
  },
};
</script>
