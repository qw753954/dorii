# Dorii 飾品電商

<img src="https://i.imgur.com/7VYv4hG.png" height="400">

<br>

## 專案說明
區分為前台用戶使用，以及後台管理者使用。 <br>
模擬實際電商操作流程，並無串金流。

<br>

## 開發技術
- 導入 Vue 3 框架，選用的 API 風格為 Options API
- 使用 HTML、CSS、SCSS 與 Bootstrap 5 進行網頁切版
- 加入 Pinia 狀態管理工具

<br>

## 使用、參考來源
### API 文件
[hexshool-vue3-course-api](https://github.com/hexschool/vue3-course-api-wiki/wiki)

### 圖片來源
Unsplash、Font Awesome Icons

<br>

---

<br>

## Project setup
```bash
npm install
```

### Compiles and hot-reloads for development
```bash
npm run serve
```

### Compiles and minifies for production
```bash
npm run build
```

### Deployment
```bash
npm run deploy
```

### Lints and fixes files
```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<br>

---

<br>

## 開發環境介紹

- ### Node
  Node 版本適用 14 以上（12 會太低）
  
  若有使用 node-sass 套件，node-sass 與 node 版本會有相容問題， <br>
  可以到[這邊](https://www.npmjs.com/package/node-sass)查看 nodejs 版本分別對應的 node-sass 版本
  > [參考文章](https://hackmd.io/@mko123654/S1io-20K9) <br>
  
  > 本專案已淘汰 node-sass 改用 sass

<br>

- ### Python
  Python 版本適用 3.10 以下。
  
  若版本超過 3.10，終端機可能會出現以下錯誤：
  
  ```bash
  ValueError: invalid mode: 'rU' while trying to load binding.gyp
  ```
  因為 U 模式在 Python 3.11 被棄用了，但 node-gyp 仍然使用這模式，因此與 Python 3.11 不相容。
  
  - [參考文章 1](https://forum.edgeimpulse.com/t/edge-impulse-cli-installation-fail/8669/6)
  - [參考文章 2](https://stackoverflow.com/questions/74832197/node-gyp-build-error-on-mac-for-npm-install)
  - [參考文章 3](https://stackoverflow.com/questions/74715990/node-gyp-err-invalid-mode-ru-while-trying-to-load-binding-gyp)
  - [卸載指定 Python 版本教學](https://www.sysgeek.cn/macos-uninstall-python/)

<br>

## 注意事項

1. Bootstrap 版本更新：5.0.1 ➡️ 5.0.2
    原先的 [5.0.1](https://blog.getbootstrap.com/2021/05/13/bootstrap-5-0-1/) 在起本地環境時會出錯，改成 [5.0.2](https://blog.getbootstrap.com/2021/06/22/bootstrap-5-0-2/) 就正常了 <br>
    > 點擊各版號可看到該版 Bootstrap 的修改項目

2. node-sass ➡️ sass
    Bootstrap 5 是倚賴 dart-sass（sass）套件編譯樣式，[官網也有說明](https://getbootstrap.com/docs/5.1/getting-started/contribute/#sass) <br>
    因此要將 node-sass 改成 sass
  
    ```bash
    npm i sass -D
    ```
  
    若仍使用 node-sass，終端機會出現以下錯誤：
    ```bash
    Syntax Error: SassError: Function not found: to-rgb
    ```
  
    ---
  
    安裝好 sass 後，終端機還是有可能會出現以下警告：
    ```bash
    Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
    ```
  
    這是因為 Dart Sass 2.0.0 不再支援用 `/` 表示除法，雖然不會對編譯結果有影響，但出現太多警告還是覺得很煩 <br>
  
    > 其實 BS 5.0.2 有修復 `/` 的問題，但目前專案是用舊版的 _variables.scss，很難無痛轉移，而且 5.0.2 還是會出現後續新增加的語法棄用警告，所以放棄。
  
    解決辦法是**改用較舊版的 sass**，就不會出現這些警告！
    ```json
    "sass": "~1.32.6"
    ```
    表示 1.32.6 ~ 1.32.x 都可以使用，1.33.0 以上的版本則會被禁止
  
    > [參考文章](https://www.astralweb.com.tw/resolving-sass-deprecation-warning/)