<script setup lang="ts">
import {
  formatNum,
  formatPercent,
  numToAHundredMillion,
} from "../../../fetch-data/helper";
import { getStockItem, type ProfitValuationGrowth } from "../../../types";
import { data } from "../../service/data";
import {
  ProfitValuation,
  type ProfitValuationFutureData,
} from "../../service/profit-valuation";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    code: keyof typeof data;
    caption?: string;
    growth?: ProfitValuationGrowth;
  }>(),
  {
    caption: "利润估值",
  }
);

const valuationData = data[props.code].valuationData;
const dynamicData = data[props.code].dynamicData;
const stockItem = getStockItem(props.code);

const profitValuation = new ProfitValuation(
  valuationData,
  stockItem,
  dynamicData,
  props.growth
);

const historyData = computed(() => {
  return valuationData.historyData;
});

/**
 * A 和 H 可能略有不同？
 */
const dividendRate = computed(() => {
  const { totalDividend } = historyData.value[historyData.value.length - 1];
  return (
    numToAHundredMillion(totalDividend, 8) /
    profitValuation.totalSharesOutstanding /
    profitValuation.price
  );
});

const expectDps = (row: ProfitValuationFutureData) => {
  const lastData = historyData.value[historyData.value.length - 1];
  const ratio = row.profit / numToAHundredMillion(lastData.profit, 8);
  return formatNum(lastData.dps * ratio, 2);
};

const expectDividendRate = (row: ProfitValuationFutureData) => {
  const lastData = historyData.value[historyData.value.length - 1];
  const ratio = row.profit / numToAHundredMillion(lastData.profit, 8);
  return formatPercent(dividendRate.value * ratio * 100);
};
</script>

<template>
  <div class="profit-valuation-container">
    <section>
      <table class="valuation-table">
        <caption>
          {{
            caption
          }}
        </caption>
        <thead>
          <tr>
            <th>年度利润</th>
            <th>净利润</th>
            <th>增长率</th>
            <th>每股收益</th>
            <th>总股本</th>
            <th>每股分红</th>
            <th>分红率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in historyData">
            <td>{{ row.year }}</td>
            <td>{{ numToAHundredMillion(row.profit, 2) }}</td>
            <td>{{ formatPercent(row.profit_tb * 100, 2) }}</td>
            <td>{{ formatNum(row.basicEps, 2) }}</td>
            <td>{{ numToAHundredMillion(row.totalSharesOutstanding, 2) }}</td>
            <td>{{ formatNum(row.dps, 2) }}</td>
            <td>{{ formatPercent(row.dividendRatio * 100) }}</td>
          </tr>
          <tr class="bold-tr">
            <td>年度利润</td>
            <td>净利润</td>
            <td>增长率</td>
            <td>每股收益</td>
            <td>当前股价PE</td>
            <td class="dividend-rate-td">当前股息率</td>
            <td class="dividend-rate-td">
              {{ formatPercent(dividendRate * 100, 2) }}
            </td>
          </tr>
          <tr
            v-for="(row, index) in profitValuation.tableData.value.slice(
              0,
              Math.ceil(profitValuation.backYearsNum.value)
            )"
            :key="index"
          >
            <td>{{ row.year }}</td>
            <td class="input-td">
              <input
                class="cell-input profit-input"
                type="number"
                :value="row.displayProfit"
                @focus="
                  profitValuation.handleFocus(row, 'displayProfit', 'profit')
                "
                @input="profitValuation.updateCell(index, 'profit', $event)"
                @blur="
                  profitValuation.handleBlur(row, 'displayProfit', 'profit')
                "
              />
            </td>
            <td class="input-td">
              <input
                class="cell-input growth-input"
                type="number"
                :value="row.displayGrowth"
                @focus="
                  profitValuation.handleFocus(row, 'displayGrowth', 'growth')
                "
                @input="profitValuation.updateCell(index, 'growth', $event)"
                @blur="
                  profitValuation.handleBlur(row, 'displayGrowth', 'growth')
                "
              />
              <span>%</span>
            </td>
            <td class="input-td">
              <input
                class="cell-input eps-input"
                type="number"
                :value="row.displayEps"
                @focus="profitValuation.handleFocus(row, 'displayEps', 'eps')"
                @input="profitValuation.updateCell(index, 'eps', $event)"
                @blur="profitValuation.handleBlur(row, 'displayEps', 'eps')"
              />
            </td>
            <td>{{ profitValuation.dynamicPE(row) }}</td>
            <td>{{ expectDps(row) }}</td>
            <td>{{ expectDividendRate(row) }}</td>
          </tr>
          <tr class="bold-tr">
            <td class="sum-eps-td">
              {{ profitValuation.backYearsNum }}年利润合计
            </td>
            <td class="sum-eps-td">￥{{ profitValuation.sumEps }}</td>
            <td>当前股价</td>
            <td>￥{{ profitValuation.price }}</td>
            <td>有息负债率：</td>
            <td>
              {{
                formatPercent(valuationData.interestBearingDebtOverTotal * 100)
              }}
            </td>
            <td></td>
          </tr>
          <tr class="bold-tr">
            <td class="anchor-td">人民币锚点</td>
            <td class="anchor-td">￥{{ profitValuation.anchor }}</td>
            <td class="batting-edge-td">击球区边缘</td>
            <td class="batting-edge-td">{{ profitValuation.battingEdge }}</td>
            <td>资产负债率：</td>
            <td>{{ formatPercent(valuationData.debtRatio) }}</td>
            <td></td>
          </tr>
          <tr class="bold-tr">
            <td class="could-fall-another-td">还可以跌</td>
            <td class="could-fall-another-td">
              {{ profitValuation.couldFallAnother }}
            </td>
            <td>每股现金</td>
            <td>￥{{ profitValuation.cashPerShare }}</td>
            <td>毛利率</td>
            <td>{{ formatPercent(valuationData.grossProfitMargin) }}</td>
            <td></td>
          </tr>
          <tr class="bold-tr">
            <td class="long-term-average-return-td">长期平均收益率</td>
            <td class="long-term-average-return-td">
              {{ profitValuation.longTermAverageReturnYieldWithPrice }}
            </td>
            <td class="long-term-average-return-td">预期锚点收益率</td>
            <td class="long-term-average-return-td">
              {{ profitValuation.longTermAverageReturnYieldWithAnchor }}
            </td>
            <td>净利率</td>
            <td>{{ formatPercent(valuationData.netProfitMargin) }}</td>
            <td></td>
          </tr>
          <tr class="bold-tr">
            <td>ROE</td>
            <td>{{ formatPercent(valuationData.roe) }}</td>
            <td>ROIC</td>
            <td>{{ formatPercent(valuationData.roic) }}</td>
            <td>ROA</td>
            <td>{{ formatPercent(valuationData.roa) }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.profit-valuation-container {
  .input-td {
    background-color: #c7ecff;
  }

  .highlight-tr {
    background-color: #ffe9e8;
  }

  .cell-input {
    padding-inline: 0;
    border: none;
    outline: none;
    background-color: #c7ecff;
    text-align: center;

    &.growth-input {
      width: 30px;
    }

    &.profit-input {
      width: 50px;
    }

    &.eps-input {
      width: 70px;
    }
  }

  .sum-eps-td {
    background-color: #8ddefa;
  }

  .batting-edge-td {
    background-color: #8ddefa;
  }

  .anchor-td {
    background-color: #f88920;
  }

  .could-fall-another-td {
    background-color: #00b24f;
  }

  .long-term-average-return-td {
    background: #ffff00;
  }

  .dividend-rate-td {
    background: #ffcac8;
  }
}
</style>
