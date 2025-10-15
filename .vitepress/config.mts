import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 自定义CSS变量，调整内容区域宽度
  appearance: true,
  lastUpdated: true,
  title: "Value Investing",
  description: "A VitePress Site",
  themeConfig: {
    outline: {
      level: [2, 3],
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Philosophy", link: "/philosophy/basic.md" },
      { text: "Company", link: "/company/chinese-sprites/wuliangye.md" },
    ],
    sidebar: {
      "/philosophy/": [
        {
          text: "理念",
          items: [{ text: "基础", link: "/philosophy/basic.md" }],
        },
      ],
      "/company/": [
        {
          text: "持仓组合",
          items: [
            {
              text: "透视盈余",
              link: "/company/portfolio/portfolio.md",
            },
          ],
        },
        {
          text: "白酒",
          items: [
            { text: "五粮液", link: "/company/chinese-sprites/wuliangye.md" },
            // { text: "科沃斯", link: "/company/chinese-sprites/kewosi.md" },
          ],
        },
        {
          text: "白色家电",
          items: [
            {
              text: "白色家电",
              link: "/company/home-appliance/home-appliance.md",
            },
            { text: "格力", link: "/company/home-appliance/gree.md" },
            { text: "美的", link: "/company/home-appliance/midea.md" },
            { text: "海尔", link: "/company/home-appliance/haier.md" },
          ],
        },
        {
          text: "汽车",
          items: [{ text: "比亚迪", link: "/company/car/byd.md" }],
        },
        {
          text: "分析示例",
          items: [{ text: "格力", link: "/company/example/gree.md" }],
        },
      ],
    },

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   },
    //   {
    //     text: 'Company',
    //     items: [
    //       { text: '盐湖股份', link: '/company/yanhugufen.md'}
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
