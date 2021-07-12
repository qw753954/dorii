<template>
  <ul class="pagination pagination-sm justify-content-center mt-3">
    <li class="page-item" :class="{ 'disabled': !pagination.has_pre }">
      <a
        class="page-link" href="#" aria-label="Previous"
        @click.prevent="$emit('emit-page', pagination.current_page - 1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      class="page-item"
      v-for="item in pagination.total_pages"
      :key="`pagination_${item}`"
      :class="{ 'active': pagination.current_page === item }"
    >
      <a
        href="#"
        class="page-link"
        @click.prevent="$emit('emit-page', item)"
      >
        {{ item }}
      </a>
    </li>
    <li class="page-item" :class="{ 'disabled': !pagination.has_next }">
      <a
        class="page-link" href="#" aria-label="Previous"
        @click.prevent="$emit('emit-page', pagination.current_page + 1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['pagination'],
  emits: ['emit-page'],
};
</script>
