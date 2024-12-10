// 定义类型：如果有自定义封面图片路径，则返回自定义路径；否则返回默认的随机图片路径
export function getCoverImage(customCoverPath?: string): string {
    // 如果提供了自定义封面图片路径，则返回该路径
    if (customCoverPath) {
      return customCoverPath;
    }
  
    // 如果没有提供自定义封面图片路径，则从 public 文件夹中随机选择一张图片
    const randomImageIndex = Math.floor(Math.random() * 7) + 1;  // 生成 1 到 7 的随机整数
    return `/blog-${randomImageIndex}.webp`;  // 返回路径，如：/blog-1.webp 到 /blog-7.webp
  }
  