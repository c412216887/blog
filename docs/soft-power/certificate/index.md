# 获取免费证书

在开发和测试阶段，你可以使用免费的代码签名证书或自签名证书。但请注意，免费证书无法完全消除 SmartScreen 警告，且通常不适合生产环境的应用分发。以下是几种获取免费证书的方法：

1. 使用自签名证书（仅适用于开发和测试）
   自签名证书可以在本地环境中使用，但会被 SmartScreen 标记为“未验证”。
   1.1 使用 OpenSSL 生成自签名证书

# 生成私钥

`openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048`

# 生成证书签名请求 (CSR)

`openssl req -new -key private.key -out certificate.csr`

# 生成自签名证书 (有效期 365 天)

`openssl x509 -req -in certificate.csr -signkey private.key -out certificate.crt -days 365`

1.2 使用 Electron Builder 配置自签名证书
在 package.json 中添加：

```json
{
  "build": {
    "win": {
      "certificateFile": "path/to/certificate.crt",
      "certificateKeyFile": "path/to/private.key"
    }
  }
}
```

2. 使用 Windows 开发人员证书（仅适用于 Windows 应用）
   Windows 10/11 提供了内置工具来创建开发人员证书：
   2.1 使用 PowerShell 创建证书

# 创建自签名证书

`New-SelfSignedCertificate -Type CodeSigning -Subject "CN=YourAppName" -FriendlyName "YourAppName Dev Certificate" -CertStoreLocation "Cert:\CurrentUser\My"`

# 导出证书为 PFX 格式

`Export-PfxCertificate -Cert "Cert:\CurrentUser\My\THUMBPRINT" -FilePath "path\to\your\certificate.pfx" -Password (ConvertTo-SecureString -String "yourpassword" -Force -AsPlainText)`

将 THUMBPRINT 替换为你生成的证书指纹（可通过` Get-ChildItem -Path Cert:\CurrentUser\My` 查看）。 3. 开源项目的免费证书选项
某些组织为开源项目提供免费的代码签名证书：
3.1 SignPath.io
● 为开源项目提供免费的代码签名服务。
● 支持 OSS 项目申请 EV 代码签名证书。
● 申请地址
3.2 Let's Encrypt
● 主要用于 SSL/TLS 证书，但某些 CA 可能提供针对开源项目的代码签名证书。
● 需联系具体 CA 咨询。 4. GitHub Actions 临时证书（CI/CD 环境）
如果你使用 GitHub Actions 构建应用，可以使用临时证书进行测试：

# GitHub Actions 工作流示例

```yml
name: Build and Sign Electron App

jobs:
  build:
    runs-on: windows-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x

      - name: Install dependencies
        run: npm ci

      - name: Build and sign with temporary certificate
        run: npm run build -- --win --x64
        env:
          CSC_LINK: ${{ secrets.CSC_LINK }} # 证书文件的 Base64 编码
          CSC_KEY_PASSWORD: ${{ secrets.CSC_KEY_PASSWORD }} # 证书密码
```

5. 免费证书的局限性
   ● SmartScreen 警告：免费或自签名证书会触发 Windows SmartScreen 警告，提示用户“此应用未经验证”。
   ● 有效期短：自签名证书通常有效期较短（如 1 年），需要定期更新。
   ● 不可用于商业分发：免费证书一般不满足商业应用的分发要求。
6. 生产环境的建议
   对于生产环境的应用，建议购买商业代码签名证书（如 DigiCert、Sectigo），特别是 EV 证书，以获得 SmartScreen 的完全信任。商业证书价格通常在每年 $400-$1500 之间，具体取决于证书类型和提供商。
   如果你的应用是开源项目，可以尝试通过 SignPath.io 等平台申请免费的代码签名服务。但对于商业应用，购买正式证书是必经之路。
