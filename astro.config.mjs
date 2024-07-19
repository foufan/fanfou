import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from 'starlight-blog'

// https://astro.build/config
export default defineConfig({
  site: "https://fou.fan",
  // base: "/",
  integrations: [
    starlight({
      title: "FOU.FAN",
      description: "FouFan's Blog",
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: true,
      },
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
          label: "经验分享",
          // 自动生成一个链接分组
          autogenerate: { directory: "ExpShare" },
 
        },
        {
          label: "前端笔记",
          // 自动生成一个链接分组
          autogenerate: { directory: "Frontend" },
 
        },
        {
          label: "后端笔记",
          // 自动生成一个链接分组
          autogenerate: { directory: "Backend" },
        },
      ],
      plugins: [starlightBlog(
        ({
          title: 'Blog',
          authors: {
            hideoo: {
              name: '王子肥波',
              title: '人生海海，山山而川.',
              picture: '/a.jpg', // Images in the `public` directory are supported.
              url: 'https://fou.fan',
            },
            },
        })
      )],
    }),
  ],
});
