<template>
  <h2 class="fs-2 text-gray text-uppercase text-spacing-l text-center text-md-start p-4">
    Hello ~
    <p class="display-5 fw-bolder text-dark mt-3 ms-md-5">{{ user }} 👋</p>
  </h2>
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
