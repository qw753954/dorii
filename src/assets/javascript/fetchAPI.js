import axios from 'axios';

export function $get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err.message);
      });
  });
}

export function $post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err.message);
      });
  });
}

export function $put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err.message);
      });
  });
}

export function $delete(url) {
  return new Promise((resolve, reject) => {
    axios.delete(url)
      .then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err.message);
      });
  });
}
