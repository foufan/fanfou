---
title: Java基于DDD和CQRS项目架构
description: Java基于DDD和CQRS项目架构
---


```
root
│── pom.xml                          # Maven 项目文件，管理依赖和模块
│
├── start                            # 独立的启动模块
│   ├── src
│   │   └── main
│   │       ├── java
│   │       │   └── com.example.project
│   │       │       └── Application.java  # Spring Boot 启动类
│   │       └── resources
│   │           ├── application.yml       # Spring Boot 配置文件
│   │           ├── logback-spring.xml    # 日志配置文件
│   │           └── sql                   # 数据库初始化脚本
│   └── pom.xml                           # start 模块的 Maven 配置
│
├── core                               # 核心模块
│   ├── core-common                    # 公共功能，如异常处理、验证、通用工具
│   │   ├── exception                  # 异常处理
│   │   ├── validation                 # 验证逻辑
│   │   └── utils                      # 工具类
│   ├── core-event                     # 领域事件和事件总线
│   │   ├── event                      # 领域事件
│   │   └── eventbus                   # 事件总线
│   ├── core-model                     # 共享领域模型
│   │   ├── entity                     # 共享实体
│   │   └── valueobject                # 共享值对象
│   └── core-utils                     # 工具类和辅助功能
│       ├── dateutils                  # 日期工具类
│       └── stringutils                # 字符串工具类
│   └── core-bom                       # BOM 模块，集中管理依赖版本
│
├── src                                # 原有项目主模块
│   └── main
│       ├── java
│       │   └── com.example.project
│       │       ├── config                # 配置类
│       │       │   ├── ApplicationConfig # 应用级别的配置
│       │       │   ├── SecurityConfig    # 安全配置
│       │       │   └── ...               # 其他配置类
│       │       ├── common                # 公共模块，包含基础工具、全局日志等
│       │       │   ├── logging           # 日志相关功能
│       │       │   ├── exception         # 全局异常处理
│       │       │   └── utils             # 工具类（如 BeanUtils、DateUtils 等）
│       │       ├── infrastructure        # 基础设施层，外部资源访问（数据库、缓存、MQ等）
│       │       │   ├── repository        # 数据库相关实现（如 JPA 或 MyBatis）
│       │       │   ├── messaging         # 消息队列处理（如 Kafka、RabbitMQ）
│       │       │   └── config            # 基础设施配置类（如数据库连接、缓存等）
│       │       ├── interface             # 外部接口层（控制器、API、RPC 等）
│       │       │   ├── api               # REST API
│       │       │   └── mq                # 消息队列接口
│       │       ├── application           # 应用服务层，包含业务逻辑、命令和查询（CQRS）
│       │       │   ├── command           # 处理命令的应用服务
│       │       │   └── query             # 处理查询的应用服务
│       │       ├── domain                # 领域层，核心领域逻辑和模型
│       │       │   ├── model             # 领域模型（实体、值对象等）
│       │       │   ├── service           # 领域服务
│       │       │   └── event             # 领域事件
│       │       ├── auth                  # 用户认证和授权模块
│       │       │   ├── authentication    # 认证模块
│       │       │   │   ├── controller    # 控制器
│       │       │   │   ├── service       # 认证服务
│       │       │   │   └── config        # 认证配置
│       │       │   └── authorization     # 授权模块
│       │       │       ├── controller    # 控制器
│       │       │       ├── service       # 授权服务
│       │       │       └── config        # 授权配置
│       │       └── system                # 系统管理模块（基础设施配置、系统设置等）
│       │           ├── settings          # 系统设置管理
│       │           │   └── service       # 设置管理服务
│       │           └── monitoring        # 系统监控功能
│       │               ├── controller    # 监控控制器
│       │               ├── service       # 监控服务
│       │               └── config        # 监控配置
│
├── modules                            # 业务模块
│   ├── module1                        # 业务模块1
│   │   ├── domain                     # 业务领域层
│   │   │   ├── model                  # 领域模型
│   │   │   ├── service                # 领域服务
│   │   │   └── event                  # 领域事件
│   │   ├── application                # 业务应用层（CQRS，命令与查询）
│   │   │   ├── command                # 命令处理
│   │   │   └── query                  # 查询处理
│   │   ├── interface                  # 业务外部接口层（API 等）
│   │   │   ├── api                    # 业务相关的 REST API
│   │   │   └── integration            # 与外部服务的集成
│   │   └── infrastructure             # 业务基础设施层
│   │       ├── repository             # 数据访问层
│   │       └── messaging              # 消息队列处理
│   └── module2                        # 业务模块2
│       ├── domain
│       │   ├── model                  # 领域模型
│       │   ├── service                # 领域服务
│       │   └── event                  # 领域事件
│       ├── application                # 业务应用层（CQRS，命令与查询）
│       │   ├── command                # 命令处理
│       │   └── query                  # 查询处理
│       ├── interface                  # 业务外部接口层（API 等）
│       │   ├── api                    # 业务相关的 REST API
│       │   └── integration            # 与外部服务的集成
│       └── infrastructure             # 业务基础设施层
│           ├── repository             # 数据访问层
│           └── messaging              # 消息队列处理
│
└── test                               # 测试模块
    ├── java
    │   └── com.example.project
    │       ├── core                   # 核心模块的测试
    │       ├── modules                # 各个业务模块的测试
    │       │   ├── module1            # 业务模块1的测试
    │       │   └── module2            # 业务模块2的测试
    │       └── ...                    # 其他测试类
    └── resources
        └── ...                        # 测试资源文件


```

架构说明
该架构基于 DDD（领域驱动设计） 和 CQRS（命令查询责任分离） 的思想，结合 Spring Boot 和 Maven 多模块项目的最佳实践进行设计，旨在提供一个可扩展、易维护且高度模块化的项目结构。

## 1. 项目结构概览
项目根目录包含核心配置文件（如 pom.xml）以及两个主要模块：

src：主应用逻辑，包含通用模块、基础设施、领域逻辑、外部接口层、应用服务层等。
core：共享内核模块，提供跨业务模块使用的领域模型、工具类和事件系统。
modules：业务模块区域，包含多个独立的业务模块，模块内部按照 DDD 和 CQRS 进行分层。

## 2. 模块划分

### 2.1 common 模块
公共模块用于存放全局性的工具类和通用逻辑，帮助项目减少重复代码、统一管理常用功能。包括：

logging：全局日志处理，使用如 Logback 进行统一日志管理。
exception：全局异常处理机制，用于捕获和处理全局异常。

### 2.2 infrastructure 模块
基础设施层负责处理与外部资源交互的所有操作。包括：

repository：数据库访问层的实现，支持 JPA 或 MyBatis。
messaging：消息队列处理（如 Kafka、RabbitMQ）。
config：与基础设施相关的配置（如数据库连接、缓存等）。

### 2.3 interface 模块
外部接口层负责暴露系统的接口（如 REST API 和 MQ 接口），用于系统与外部交互。包括：

api：RESTful API 接口层，处理客户端 HTTP 请求。
mq：消息队列接口层，用于处理外部系统通过 MQ 与本系统的交互。

### 2.4 application 模块
应用服务层实现了 CQRS 模式，分离了命令和查询的处理逻辑。包括：

command：处理写操作（即命令）的应用服务，如创建、修改、删除操作。
query：处理读取操作（即查询）的应用服务。

### 2.5 domain 模块
领域层是系统的核心，包含领域模型、领域服务和领域事件。包括：

model：领域模型，包含实体类、值对象等领域概念。
service：领域服务，用于处理领域内的复杂业务逻辑。
event：领域事件，用于领域内和领域间事件的传播。

### 2.6 auth 模块
用户认证模块，负责处理用户认证、授权相关的逻辑。包括：

security：Spring Security 配置，保护系统资源。
service：与认证、授权相关的业务逻辑实现。

### 2.7 system 模块
系统管理模块，提供系统配置和监控功能。包括：

settings：管理系统配置和设置。
monitoring：系统的健康监控和性能监控功能。

## 3. 共享内核模块 (core)
model：共享的领域模型，跨多个业务模块使用的实体类、值对象等。
utils：工具类，包含常用的工具函数、格式转换、验证等功能。
event：共享领域事件，用于跨模块的事件传播。
eventbus：事件总线，负责发布和订阅事件，实现事件驱动架构（EDA），让各个模块之间通过事件进行解耦和协作。

## 4. 业务模块 (modules)
业务模块按照具体业务需求进行划分，每个业务模块中同样遵循 DDD 和 CQRS 分层，包含领域层（domain）、应用层（application）、接口层（interface）、基础设施层（infrastructure）。每个业务模块相互独立，但可以通过共享的 core 模块和事件机制进行协作。

### 4.1 业务模块分层：
domain：业务模块的领域层，包括业务特有的领域模型、领域服务和领域事件。
application：业务应用服务层，处理业务模块内的命令和查询操作，遵循 CQRS 原则。
interface：业务模块的接口层，提供 API 和外部服务集成接口。
infrastructure：业务模块的基础设施层，负责该模块的资源访问与管理。

## 5. 测试模块
测试模块为每个业务模块及共享模块提供测试支持，按照包结构对各个层的逻辑进行单元测试和集成测试。

## 6. 架构特点
模块化设计：每个业务模块独立实现，遵循 DDD 和 CQRS 的设计模式，模块之间松耦合，通过事件总线和共享模型进行协作。
事件驱动架构：通过 core 中的事件总线和领域事件实现模块间的事件驱动通信，减少模块之间的直接依赖。
共享内核：将常用的领域模型、工具和事件逻辑放入 core 模块，方便跨模块共享。
扩展性和可维护性：随着业务增长，可以轻松添加新的业务模块，核心架构不会受影响。

## 7. 适用场景
适用于中大型项目，需要高扩展性和模块化设计。
适合以领域驱动设计为基础的系统构建，同时结合命令查询责任分离架构进行业务逻辑的清晰分层。