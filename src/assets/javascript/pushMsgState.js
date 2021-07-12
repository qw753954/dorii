import emitter from './emitter';

export default function (data, title) {
  if (data.success) {
    emitter.emit('push-msg', {
      style: 'success', // 風格 (狀態)
      title: `${title}成功 🎉`,
    });
  } else {
    // 有些訊息是字串、有些是陣列，在此統一格式為陣列
    const msg = typeof data.message === 'string' ? [data.message] : data.message;
    emitter.emit('push-msg', {
      style: 'danger',
      title: `${title}失敗`,
      content: msg.join('、'),
    });
  }
}
