# Google OAuth 配置指南（纯前端方案）

## ✅ 已完成的改动

1. **移除了 next-auth**，改用纯前端的 Google Identity Services
2. **创建了 AuthContext**，管理用户登录状态
3. **更新了 LoginButton**，使用纯前端 Google 登录
4. **更新了环境变量**，使用 `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

## 🔧 需要你在 Google Cloud Console 中做的配置

### 步骤 1：更新 OAuth 客户端类型

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 进入 **API 和服务** → **凭据**
3. 点击你的 OAuth 2.0 客户端 ID 编辑
4. **应用类型** 改为 **Web 应用**
5. **已授权的 JavaScript 源** 添加：
   ```
   https://removebg.hyqonline.asia
   ```
6. **已授权的重定向 URI** 删除所有（纯前端不需要重定向 URI）
7. 保存

### 步骤 2：验证配置

配置完成后，等待 1-2 分钟，然后：

1. 访问 https://removebg.hyqonline.asia
2. 点击右上角 "使用 Google 登录"
3. 应该会弹出 Google 登录窗口
4. 登录成功后，右上角会显示你的头像和名字

## 📝 环境变量说明

```env
# Google OAuth (纯前端方案)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=377559093721-anu26blt0iqbrt32kv0da5k9kesi25m1.apps.googleusercontent.com
```

- `NEXT_PUBLIC_` 前缀表示这个变量可以在浏览器中访问
- 不再需要 `GOOGLE_CLIENT_SECRET`（纯前端方案不需要）
- 不再需要 `NEXTAUTH_URL` 和 `NEXTAUTH_SECRET`

## 🚀 如何使用

部署完成后，用户点击 "使用 Google 登录" 按钮，会：

1. 弹出 Google 登录窗口
2. 用户选择 Google 账号并授权
3. Google 返回用户信息（姓名、头像、邮箱等）
4. 用户信息保存在浏览器的 localStorage 中
5. 页面右上角显示用户头像和名字

## 💡 注意事项

1. **Session 管理**：用户信息保存在 localStorage 中，刷新页面后会自动恢复
2. **安全性**：Client ID 是公开的，这是正常的（就像你的网站域名一样）
3. **无需后端**：整个登录流程完全在浏览器中完成，不需要服务器支持

## 🐛 调试

如果遇到问题：

1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签，看是否有错误信息
3. 查看 Network 标签，确认是否成功加载了 `https://accounts.google.com/gsi/client`
4. 确认 Google Cloud Console 中的配置是否正确

常见错误：
- **"Origin not allowed"**：检查 Google Cloud Console 中的 JavaScript 源配置
- **"Client ID not found"**：检查环境变量 `NEXT_PUBLIC_GOOGLE_CLIENT_ID` 是否正确
- **"Popup blocked"**：检查浏览器是否阻止了弹窗
