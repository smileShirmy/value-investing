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
        {
          text: "投资风格",
          items: [
            {
              text: "主题股投资",
              link: "/philosophy/investment-style/thematic.md",
            },
            {
              text: "成长股投资",
              link: "/philosophy/investment-style/growth.md",
            },
            {
              text: "价值股投资",
              link: "/philosophy/investment-style/value.md",
            },
            {
              text: "周期股投资",
              link: "/philosophy/investment-style/cyclical.md",
            },
          ],
        },
        {
          text: "周期",
          items: [
            { text: "人口周期", link: "/philosophy/cycles/population.md" },
            { text: "技术生命周期", link: "/philosophy/cycles/technology.md" },
            { text: "经济周期", link: "/philosophy/cycles/economic.md" },
            { text: "资本周期", link: "/philosophy/cycles/capital.md" },
            { text: "库存周期", link: "/philosophy/cycles/inventory.md" },
            { text: "政治周期", link: "/philosophy/cycles/political.md" },
          ],
        },
        {
          text: "生意模式",
          items: [
            {
              text: "竞争优势",
              link: "/philosophy/business-model/competitive-advantage.md",
            },
            {
              text: "财务分析",
              link: "/philosophy/business-model/financial-analysis.md",
            },
          ],
        },
        {
          text: "估值思维",
          items: [
            { text: "绝对估值", link: "/philosophy/valuation/absolute.md" },
            { text: "相对估值", link: "/philosophy/valuation/relative.md" },
          ],
        },
        {
          text: "公司治理",
          items: [
            { text: "管理层", link: "/philosophy/governance/management.md" },
            {
              text: "组织和规则",
              link: "/philosophy/governance/organization.md",
            },
            { text: "行为判断", link: "/philosophy/governance/behavior.md" },
          ],
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
            {
              text: "白酒",
              link: "/company/chinese-sprites/chinese-sprites.md",
            },
            { text: "贵州茅台", link: "/company/chinese-sprites/moutai.md" },
            { text: "五粮液", link: "/company/chinese-sprites/wuliangye.md" },
            {
              text: "泸州老窖",
              link: "/company/chinese-sprites/luzhoulaojiao.md",
            },
            { text: "古井贡", link: "/company/chinese-sprites/gujinggong.md" },
            {
              text: "山西汾酒",
              link: "/company/chinese-sprites/shanxifenjiu.md",
            },
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
          text: "航运",
          items: [{ text: "中远海控", link: "/company/shipping/cosco.md" }],
        },
        {
          text: "汽车",
          items: [{ text: "比亚迪", link: "/company/car/byd.md" }],
        },
        {
          text: "分析示例",
          items: [{ text: "格力", link: "/company/example/gree.md" }],
        },
        {
          text: "农业化工",
          items: [
            {
              text: "盐湖股份",
              link: "/company/agricultural-chemicals/yanhu.md",
            },
          ],
        },
        {
          text: "摩托车",
          items: [
            { text: "摩托车", link: "/company/motorcycle/motorcycle.md" },
            { text: "九号公司", link: "/company/motorcycle/ninebot.md" },
            { text: "爱玛科技", link: "/company/motorcycle/aima.md" },
          ],
        },
        {
          text: "中药",
          items: [
            {
              text: "中药",
              link: "/company/chinese-medicine/chinese-medicine.md",
            },
            { text: "东阿阿胶", link: "/company/chinese-medicine/donge.md" },
          ],
        },
        {
          text: "港口",
          items: [
            { text: "港口", link: "/company/port/port.md" },
            { text: "青岛港", link: "/company/port/qingdao.md" },
          ],
        },
        {
          text: "电力",
          items: [
            { text: "电力", link: "/company/electricity/electricity.md" },
            { text: "长江电力", link: "/company/electricity/yangtze.md" },
            { text: "国投电力", link: "/company/electricity/guotou.md" },
          ],
        },
        {
          text: "物流",
          items: [
            { text: "物流", link: "/company/logistics/logistics.md" },
            { text: "顺丰控股", link: "/company/logistics/shunfeng.md" },
          ],
        },
        {
          text: "塑料包装",
          items: [{ text: "永新股份", link: "/company/packaging/yongxin.md" }],
        },
        {
          text: "煤炭",
          items: [
            { text: "煤炭", link: "/company/coal/coal.md" },
            { text: "中国神华", link: "/company/coal/shenhua.md" },
            { text: "陕西煤业", link: "/company/coal/shanxi.md" },
            { text: "中煤能源", link: "/company/coal/zhongmei.md" },
            { text: "兖矿能源", link: "/company/coal/yankuang.md" },
          ],
        },
        {
          text: "运营商",
          items: [
            { text: "运营商", link: "/company/operator/operator.md" },
            { text: "中国移动", link: "/company/operator/mobile.md" },
            { text: "中国电信", link: "/company/operator/telecom.md" },
            { text: "中国联通", link: "/company/operator/unicom.md" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
