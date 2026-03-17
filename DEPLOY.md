# Vercel 部署指南

## 快速部署（推荐）

### 方法一：通过 Vercel 网站

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 导入 `yueqianhan/bg-remover` 仓库
5. 配置环境变量：
   - 名称: `REMOVEBG_API_KEY`
   - 值: 你的 remove.bg API Key
6. 点击 "Deploy"

### 方法二：使用 Vercel CLI

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
cd bg-remover
vercel

# 4. 配置环境变量
vercel env add REMOVEBG_API_KEY

# 5. 生产环境部署
vercel --prod
```

## 环境变量

在 Vercel 项目设置中添加：

```
REMOVEBG_API_KEY=你的_remove.bg_api_key
```

获取 API Key: https://www.remove.bg/api

## 部署后

- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动更新（推送到 main 分支）
- ✅ 免费额度：100GB 带宽/月

## 自定义域名（可选）

在 Vercel 项目设置中：
1. 进入 "Domains"
2. 添加你的域名
3. 按提示配置 DNS
