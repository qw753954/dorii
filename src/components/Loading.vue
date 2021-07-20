<template>
  <!-- 花花轉轉。來自 Iulian Savin / https://codepen.io/Iulius90/pen/RaeWmY /  -->
  <transition name="fade">
    <div
      class="custom-loading bg-secondary position-fixed top-0 bottom-0 start-0 end-0
      d-flex flex-column justify-content-center align-items-center"
      v-if="active"
    >
      <div class="flower-loader"></div>
      <span class="small text-white d-block mt-5">LOADING…</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['active'],

  // 小補充：
  // 首次賦值時就觸發 watch 監聽
  // https://blog.csdn.net/Liu_yunzhao/article/details/95395427
};
</script>

<style lang="scss" scoped>
.custom-loading {
  z-index: 3000;
  transition: all .3s;
  span {
    opacity: .75;
    animation: stretch .8s infinite linear;
  }
}

@keyframes stretch {
  0% {
    letter-spacing: 2px;
  }
  50% {
    letter-spacing: 1px;
  }
  100% {
    letter-spacing: 2px;
  }
}

@keyframes flower-loader {
  0% {
    transform: rotate(0deg);
    box-shadow: white 0 0 15px 0, #fd8 -12px -12px 0 4px, #fd8 12px -12px 0 4px,
    #fd8 12px 12px 0 4px, #fd8 -12px 12px 0 4px;
  }
  50% {
    transform: rotate(1080deg);
    box-shadow: white 0 0 15px 0, #fd8 12px 12px 0 4px, #fd8 -12px 12px 0 4px,
    #fd8 -12px -12px 0 4px, #fd8 12px -12px 0 4px;
  }
}

/* :not(:required) hides this rule from IE9 and below */
.flower-loader:not(:required) {
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #e96;
  border-radius: 100%;
  box-shadow: white 0 0 15px 0, #fd8 -12px -12px 0 4px, #fd8 12px -12px 0 4px,
  #fd8 12px 12px 0 4px, #fd8 -12px 12px 0 4px;
  animation: flower-loader 5s infinite ease-in-out;
  transform-origin: 50% 50%;
}
</style>
