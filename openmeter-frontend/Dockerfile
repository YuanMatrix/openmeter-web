# 基于官方 Node.js 18 Alpine 镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 拷贝依赖文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install --legacy-peer-deps --registry=https://registry.npmjs.org/

# 拷贝全部前端代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动开发服务器
CMD ["npm", "start"] 