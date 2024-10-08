---
title: npm/pnpm/yarn切换源
description: npm/pnpm/yarn切换源
lastUpdated: 2024-07-29
---


----------------

| 提供商  | 搜索地址                                                                              | registry地址                                                                                                                                |
| ---- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 淘宝   | [https://npmmirror.com/](https://link.zhihu.com/?target=https%3A//npmmirror.com/) | [https://registry.npmmirror.com](https://link.zhihu.com/?target=https%3A//registry.npmmirror.com)                                         |
| 腾讯云  |                                                                                   | [http://mirrors.cloud.tencent.com/npm/](https://link.zhihu.com/?target=http%3A//mirrors.cloud.tencent.com/npm/)                           |
| 华为云  |                                                                                   | [https://mirrors.huaweicloud.com/repository/npm](https://link.zhihu.com/?target=https%3A//mirrors.huaweicloud.com/repository/npm)         |
| 浙江大学 |                                                                                   | [http://mirrors.zju.edu.cn/npm/](https://link.zhihu.com/?target=http%3A//mirrors.zju.edu.cn/npm/)                                         |
| 南京邮电 |                                                                                   | [https://mirrors.njupt.edu.cn/nexus/repository/npm/](https://link.zhihu.com/?target=https%3A//mirrors.njupt.edu.cn/nexus/repository/npm/) |

### npm

    # 查看源
    npm get registry
    npm config get registry
    
    # 临时修改
    npm --registry https://registry.npmmirror.com install any-touch
    
    # 永久修改
    npm config set registry https://registry.npmmirror.com
    
    # 还原
    npm config set registry https://registry.npmjs.org

### NRM

    # 安装 nrm
    npm install -g nrm
    
    # 列出当前可用的所有镜像源
    nrm ls
    
    # 使用淘宝镜像源
    nrm use taobao
    
    # 测试访问速度
    nrm test taobao

### pnpm

    # 查看源
    pnpm get registry
    pnpm config get registry
    
    # 临时修改
    pnpm --registry https://registry.npmmirror.com install any-touch
    
    # 永久修改
    pnpm config set registry https://registry.npmmirror.com
    
    # 还原
    pnpm config set registry https://registry.npmjs.org

### yarn

    # 查看源
    yarn config get registry
    
    # 临时修改
    yarn add any-touch@latest --registry=https://registry.npmjs.org/
    
    # 永久修改
    yarn config set registry https://registry.npmmirror.com/
    
    # 还原
    yarn config set registry https://registry.yarnpkg.com

### YRM

    # 安装 yrm
    npm install -g yrm
    
    # 列出当前可用的所有镜像源
    yrm ls
    
    # 使用淘宝镜像源
    yrm use taobao
    
    # 测试访问速度
    yrm test taobao



:::note
本文转载知乎 https://zhuanlan.zhihu.com/p/572154328
:::
