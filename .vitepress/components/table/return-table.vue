<script setup lang="ts">
import AppTable, { type TableColumn } from "../shared/app-table.vue";
import { data } from "../../service/data";
import { computed } from "vue";

const props = defineProps<{
  code: keyof typeof data;
}>();

const returnData = data[props.code].returnData;

// 定义表格列
const columns: TableColumn[] = [
  {
    key: "year",
    title: "年份",
  },
  {
    key: "roe",
    title: "ROE",
    formatter: (value: number) => (isNaN(value) ? "-" : value.toFixed(2) + "%"),
  },
  {
    key: "roa",
    title: "ROA",
    formatter: (value: number) => (isNaN(value) ? "-" : value.toFixed(2) + "%"),
  },
  {
    key: "roic",
    title: "ROIC",
    formatter: (value: number) => (isNaN(value) ? "-" : value.toFixed(2) + "%"),
  },
  {
    key: "netProfitMargin",
    title: "销售净利率",
    formatter: (value: number) => (isNaN(value) ? "-" : value.toFixed(2) + "%"),
  },
  {
    key: "assetTurnover",
    title: "资产周转率",
    formatter: (value: number) => (isNaN(value) ? "-" : value.toFixed(2) + "%"),
  },
  {
    key: "equityMultiplier",
    title: "权益乘数",
    formatter: (value: number) => (isNaN(value) ? "-" : value.toFixed(2)),
  },
];

// 表格标题
const tableCaption = computed(() => "回报率数据");

const tableData = computed(() => {
  // 获取原始数据并确保有足够的数据点
  const originalData = returnData.slice(0, 10);
  if (originalData.length < 2) return originalData.reverse();

  // 按年份升序排序
  const sortedData = [...originalData].sort(
    (a, b) => parseInt(a.year) - parseInt(b.year)
  );

  // 返回按年份降序排列的数据 + 统计行
  return [...sortedData];
});
</script>

<template>
  <AppTable :data="tableData" :columns="columns" :caption="tableCaption" />
</template>
