#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
npm run build

# 进入待发布的目录
cd .vitepress/dist

# 如果是发布到自定义域名
echo 'lzwdot.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push -f git@github.com:lzwdot/lzwdot.github.io.git main

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -

