# nest

## 目录

src
|--- app.controller.spec.ts
|--- app.controller.ts
|--- app.module.ts
|--- app.service.ts
|--- main.ts

| 模块                   | 说明                                                  |
| ---------------------- | ----------------------------------------------------- |
| app.controller.ts      | 带有单个路由的基本控制器示例                          |
| app.controller.spec.ts | 对于基本控制器的单元测试示例                          |
| app.module.ts          | 应用程序的根模块                                      |
| app.service.ts         | 带有单个方法的基本服务                                |
| main.ts                | 应用程序入口文件。使用`NestFactory`创建 Nest 应用实例 |

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

## 核心概念

- module
- controller
- service
- middleware
- filter
- guard

## 添加 swagger

## 发送邮件
