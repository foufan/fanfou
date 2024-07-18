import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: 'https://fou.fan',
  base: '/',
  integrations: [
    starlight({
      title: "饭否",
      locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
			},
      social: {
				// github: 'https://github.com/foufan',
			},
    }),
  ],
});
