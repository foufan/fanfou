import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://fou.fan",
  base: "/",
  integrations: [
    starlight({
      title: "饭否",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      social: {
        // github: 'https://github.com/foufan',
      },
      sidebar: [
        {
          label: "前端笔记",
          // 自动生成一个链接分组
          autogenerate: { directory: "frontend" },
        },
        {
          label: "后端笔记",
          // 自动生成一个链接分组
          autogenerate: { directory: "backend" },
        },
      ],
    }),
  ],
});
