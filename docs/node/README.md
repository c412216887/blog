# node
根据```package.json```文件中```type```属性，node有两种标准：esm，commonjs。
commonjs标准，全局注入了module、exports、require、__dirname、__filename
esm标准：
获取当前文件路径、当前文件夹路径
```js
import {fileURLToPath} from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```

