import { defineStore } from 'pinia';

export default defineStore('favStore', {
  state: () => ({
    favorites: [],
  }),
  getters: {
    favQty() { // 更新 heart 圖示的數量
      return this.favorites.length;
    },
  },
  actions: {
    getFavId() {
      this.favorites = JSON.parse(localStorage.getItem('myFav')) || [];
    },
    addFav(id, $swal) {
      this.favorites.push(id);
      $swal.fire({ icon: 'success', title: '已加入到願望清單❤' });
    },
    removeFav(id, $swal) {
      this.favorites = this.favorites.filter((i) => i !== id);
      $swal.fire({ icon: 'success', title: '已從願望清單中移除' });
    },
    removeAllFav($swal) {
      this.favorites = [];
      localStorage.setItem('myFav', JSON.stringify([]));
      $swal.fire({ icon: 'success', title: '已全數刪除' });
    },
    updateFav(id, $swal) {
      if (this.favorites.length === 0 || !this.favorites.includes(id)) {
        // 推入
        this.addFav(id, $swal);
      } else {
        // 移除
        this.removeFav(id, $swal);
      }
      localStorage.setItem('myFav', JSON.stringify(this.favorites));
    },
  },
});
