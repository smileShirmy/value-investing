<script setup lang="ts">
import { getStockItem } from "../../../types";
import profitValuation from "./profit-valuation.vue";
import { data } from "../../service/data";

const props = defineProps<{
  code: keyof typeof data;
}>();

const stockItem = getStockItem(props.code);
</script>

<template>
  <div class="profit-valuation-group-container">
    <template v-if="stockItem.profitValuationConfig">
      <profitValuation
        class="valuation-item"
        :code="props.code"
        caption="特价估算"
        :growth="stockItem.profitValuationConfig?.specialOffer"
      />
      <profitValuation
        class="valuation-item"
        :code="props.code"
        caption="保守估算"
        :growth="stockItem.profitValuationConfig?.conservative"
      />
      <profitValuation
        class="valuation-item"
        :code="props.code"
        caption="均值估算"
        :growth="stockItem.profitValuationConfig?.neutral"
      />
      <profitValuation
        class="valuation-item"
        :code="props.code"
        caption="乐观估算"
        :growth="stockItem.profitValuationConfig?.optimistic"
      />
    </template>
    <span v-else>请设置 profitValuationConfig</span>
  </div>
</template>

<style lang="scss" scoped>
.profit-valuation-group-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -16px;

  .valuation-item {
    margin: 0 16px;
  }
}
</style>
