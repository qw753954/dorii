import emitter from '@/assets/javascript/emitter';

export default {
  data() {
    return {
      favList: [],
    };
  },
  methods: {
    checkStorage() {
      this.favList = JSON.parse(localStorage.getItem('myFav')) || [];
    },
    updateFavorite(id) {
      if (this.favList.length === 0 || !this.favList.includes(id)) {
        // 推入
        this.favList.push(id);
        this.$swal.fire({ icon: 'success', title: '已加入到願望清單❤' });
      } else {
        // 移除
        this.favList.forEach((item, index) => {
          if (id === item) {
            this.favList.splice(index, 1);
            this.$swal.fire({ icon: 'success', title: '已從願望清單中移除' });
          }
        });
      }
      localStorage.setItem('myFav', JSON.stringify(this.favList));
      emitter.emit('emit-update-favorite', this.favList.length);
    },
  },
};
