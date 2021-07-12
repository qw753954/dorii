import swal from 'vue-sweetalert2';

console.log(swal);
const Toast = this.$swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  // timerProgressBar: true
});

export default Toast;
