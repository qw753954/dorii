<template>
  <div
    class="toast-container position-fixed p-3 top-0 end-0"
    style="z-index: 1500"
  >
    <div
      v-for="(item, index) in msgs"
      :key="`toast_${index}`"
      class="toast show"
      role="alert"
    >
      <div class="toast-header">
        <span
          :class="`bg-${item.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <span class="me-auto">{{ item.title }}</span>
        <button
          type="button"
          class="btn-close"
          @click="clearToast(key)"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body" v-if="item.content">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toast: '',
      msgs: [],
    };
  },
  inject: ['emitter'],
  methods: {
    showToast() {
      setTimeout(() => {
        this.msgs.shift();
      }, 4500);
    },
    clearToast(index) {
      this.msgs.splice(index, 1);
    },
    pushMsg(msg) {
      const { style, title, content } = msg;
      this.msgs.push({ style, title, content });
      this.showToast();
    },
  },
  created() {
    // 當 push-msg 這個事件被觸發時，就會執行右邊的函式，把外部訊息推送至 this.msgs 列表
    // 參數 msg -> 外部傳來的資訊
    this.emitter.on('push-msg', this.pushMsg);
  },
  unmounted() {
    this.emitter.off('push-msg', this.pushMsg);
  },
};
</script>
