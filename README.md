# 图片背景移除工具

一个极简的在线图片背景移除工具，基于 [remove.bg API](https://www.remove.bg/api) 构建。

## ✨ 特性

- 🚀 **快速**: 3 步完成背景移除
- 🎨 **简单**: 无需注册，即用即走
- 🔒 **隐私**: 图片不存储，全部在内存中处理
- 📱 **响应式**: 支持桌面和移动设备

## 🛠️ 技术栈

- **前端**: Next.js 14 + React + TypeScript + Tailwind CSS
- **后端**: Next.js API Routes
- **API**: remove.bg v1.0
- **部署**: Vercel / Railway

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/yueqianhan/bg-remover.git
cd bg-remover

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的 remove.bg API Key
```

## 🚀 运行

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

访问 http://localhost:3000 查看效果。

## 🔑 获取 API Key

1. 访问 [remove.bg API](https://www.remove.bg/api)
2. 注册账号并获取免费 API Key
3. 将 Key 填入 `.env.local` 文件

免费版限制：
- 每月 50 张图片
- 单张最大 10MB
- 分辨率最高 25MP

## 📸 使用说明

1. 上传图片（支持 JPG、PNG、WEBP）
2. 点击"移除背景"按钮
3. 等待处理完成
4. 下载处理后的图片

## 🌐 部署

### Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Railway

直接连接 GitHub 仓库即可自动部署。

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系

如有问题，请提交 [GitHub Issue](https://github.com/yueqianhan/bg-remover/issues)
