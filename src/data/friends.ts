export interface Friend {
  name: string;
  avatar: string;
  description: string;
  url: string;
  tags?: string[];
}

export const friends: Friend[] = [
  {
    name: "TAGTAG",
    avatar: "/blog-1.webp",
    description: "TagTag工作室",
    url: "https://tagtag.dev",
    tags: ["技术博客", "前端开发"]
  },
  {
    name: "TABTAB",
    avatar: "/blog-2.webp",
    description: "TabTab软件酱",
    url: "https://tabtab.dev",
    tags: ["框架", "JavaScript"]
  },
  {
    name: "FOU.FAN",
    avatar: "/blog-3.webp",
    description: "饭否.技术博客",
    url: "https://fou.fan",
    tags: ["技术博客", "前端开发"]
  },
  {
    name: "TypeScript",
    avatar: "/blog-4.webp",
    description: "JavaScript 的超集",
    url: "https://www.typescriptlang.org",
    tags: ["编程语言", "开发工具"]
  }
];