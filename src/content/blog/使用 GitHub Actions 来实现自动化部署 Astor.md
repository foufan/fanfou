---
title: GitHub Actions 自动化部署Astor
description: GitHub Actions 自动化部署Astor
pubDate: 2024-07-26
heroImage: "/blog-1.webp"
---

 
> 文章使用 CHAT GPT-4o 辅助撰写。
 
使用 GitHub Actions 将一个仓库中的编译后的代码部署到另一个仓库。这种情况可以通过 SSH 部署密钥来实现。以下是具体的步骤：

## 准备工作

1. **生成 SSH 密钥对：**
在本地生成一个 SSH 密钥对，如果没有的话：

```shell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

确保将公钥 (id_rsa.pub 文件内容) 添加到目标仓库 (your_repository.github.io) 的部署密钥中。

2. **生成 SSH 密钥对：**
将生成的公钥 (`id_rsa.pub`) 添加到 `your_repository.github.io` 仓库的部署密钥中。可以在 GitHub 仓库的 Settings > Deploy keys 中添加。

## 设置 GitHub Actions Workflow

3. **创建 GitHub Actions Workflow 文件：**
在源代码仓库 (`your_repository`) 中创建一个新的文件夹 `.github/workflows`，并在里面创建一个 YAML 文件，比如 `deploy.yml`。

4. **配置 GitHub Actions Workflow：**
在 `deploy.yml` 文件中，配置一个 Workflow，用来在每次代码提交时自动触发编译和部署：
   
   

```bash
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ] # 每次推送到 `main` 分支时触发这个“工作流程”
  workflow_dispatch: # 允许你在 GitHub 上的 Actions 标签中手动触发此“工作流程”

permissions:
  contents: read # 允许 job 克隆 repo 并创建一个 page deployment
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4 # 使用 actions/checkout@v4 检出存储库

      - name: Install pnpm
        run: |
          npm install -g pnpm # 安装 pnpm

      - name: 打印 pnpm 存储路径
        run: |
          echo "PNPM Store Path: $(pnpm store path)" # 打印 pnpm 存储路径

      - name: 列出 node_modules
        run: |
          ls node_modules || echo "node_modules 目录不存在" # 列出 node_modules 目录，如果不存在则打印信息

      - name: 缓存 pnpm store
        uses: actions/cache@v4
        id: pnpm-cache
        with:
          path: ~/.pnpm-store # 缓存 pnpm 存储
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: 缓存 node_modules
        uses: actions/cache@v4
        id: node-modules-cache
        with:
          path: node_modules # 缓存 node_modules 目录
          key: ${{ runner.os }}-node_modules-${{ hashFiles('pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-node_modules-

      - name: 安装依赖
        run: pnpm install # 安装依赖

      - name: 构建项目
        run: pnpm run build # 确保这个命令将构建产物输出到 dist 目录

      - name: 创建 .nojekyll 文件
        run: |
          touch dist/.nojekyll

      - name: 上传构建产物
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: 下载构建产物
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist

      - name: 配置 SSH
        env:
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.DEPLOY_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan github.com >> ~/.ssh/known_hosts

      - name: 克隆 gh-pages 分支
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git clone --branch gh-pages git@github.com:your_repository/your_repository.github.io.git deploy

      - name: 备份 CNAME 文件
        run: |
          if [ -f deploy/CNAME ]; then cp deploy/CNAME CNAME; fi

      - name: 同步构建产物
        run: |
          rsync -av --delete --exclude '.git' --exclude 'CNAME' dist/ deploy/

      - name: 恢复 CNAME 文件
        run: |
          if [ -f CNAME ]; then mv CNAME deploy/CNAME; fi

      - name: 提交并推送到 gh-pages 分支
        run: |
          cd deploy
          git add .
          git commit -m "Deploy to GitHub Pages"
          git push origin gh-pages
```



## 注意事项：

* 替换 `dist` 为你实际的编译输出目录。
* 确保设置了正确的构建和部署步骤，以及正确的 Git 配置和推送命令。
* 在 Workflow 文件中使用 `SSH_PRIVATE_KEY` 变量来引用 GitHub 仓库的 Secrets 中配置的私钥。
