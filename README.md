# vue3-final

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

## 環境與版本
### Bootstrap 5.0.2
原本是 [5.0.1](https://blog.getbootstrap.com/2021/05/13/bootstrap-5-0-1/)，但起本地環境時會出錯，改成 [5.0.2](https://blog.getbootstrap.com/2021/06/22/bootstrap-5-0-2/) 就正常。點擊版號可看到 Bootstrap 團隊修改項目。

### Node.js：14 / 16 版本都可
12 會太低。
若有使用 node-sass，node-sass 與 node 版本會有相容問題，可以到[這邊](https://www.npmjs.com/package/node-sass)查看 nodejs 版本分別對應的 node-sass 版本
> [參考文章](https://hackmd.io/@mko123654/S1io-20K9)
<br>
若出現了以下錯誤，需改用 sass 套件： <br>
> Syntax Error: SassError: Function not found: to-rgb

- #### sass
  因 Bootstrap 5 倚賴 dart-sass 套件編譯樣式，[官網有說](https://getbootstrap.com/docs/5.1/getting-started/contribute/#sass)，因此要將 node-sass 改成 sass！

  ```bash
  npm i sass -D
  ```

  還有可能會出現以下錯誤 <br>
  > Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
  <br>
  Dart Sass 2.0.0 不再支援用 `/` 表示除法，雖然不會對編譯結果有影響，但出現太多警告還是覺得很煩 <br>
  可以用較舊版的 sass，就不會出現這些警告 <br>
  > 其實 BS 5.0.2 有修復 `/` 問題，但目前專案覆蓋 _variables.scss 是用舊版的，就算把 BS 版本升成 5.0.2 還是會出現相同錯誤，甚至還有後續其他新語法的棄用警告。

  ```
  "sass": "~1.32.6"
  ```

  表示 1.32.6 ~ 1.32.x 都可以使用，1.33.0 以上的版本則會被禁止 <br>
  > [參考文章](https://www.astralweb.com.tw/resolving-sass-deprecation-warning/)

### Python：9 版本
- https://forum.edgeimpulse.com/t/edge-impulse-cli-installation-fail/8669/6
- https://stackoverflow.com/questions/74832197/node-gyp-build-error-on-mac-for-npm-install
- https://stackoverflow.com/questions/74715990/node-gyp-err-invalid-mode-ru-while-trying-to-load-binding-gyp
- [卸載 Python 版本](https://www.sysgeek.cn/macos-uninstall-python/)
可能會出現以下錯誤：
>  ValueError: invalid mode: 'rU' while trying to load binding.gyp
<br>
因為 U 模式在 Python 3.11 被棄用了，但 node-gyp 仍然使用這模式，因此與 Python 3.11 不相容。 <br>
解決方式：降版 Python 到 3.10 以下