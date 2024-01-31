<template>
  <VueTableLite
    v-if="rows.length"
    class="max-w-[450px] w-full"
    max-height="600"
    :is-hide-paging="true"
    :columns="collumns"
    :rows="rows"
  />
</template>

<script setup>
import { reactive } from "vue";
import VueTableLite from "vue3-table-lite";
import formatNumber from "../helpers/formatNumber";

const collumns = [
  {
    label: "Месяц",
    field: "month",
  },
  {
    label: "Кол-во",
    field: "salesCount",
  },
  {
    label: "Выручка",
    field: "totalRevenue",
  },
  {
    label: "Прибыль",
    field: "totalProfit",
  },
  {
    label: "Средний % скидки",
    field: "avgDiscountPercentage",
  },
];

const rows = reactive([]);

const createTable = (data) => {
  for (const month in data) {
    const salesData = data[month];

    let totalRevenue = 0;
    let totalProfit = 0;
    let totalDiscountPercent = 0;
    let salesCount = 0;

    salesData.forEach((item) => {
      totalRevenue += item["Цена со скидкой"] || 0;
      totalProfit += item["Цена"] - item["Цена со скидкой"] || 0;
      totalDiscountPercent += item["Скидка"] || 0;
      salesCount++;
    });

    const avgDiscountPercentage = (totalDiscountPercent / salesCount).toFixed(2);

    rows.push({
      month,
      salesCount: salesCount,
      totalRevenue: formatNumber(totalRevenue),
      totalProfit: formatNumber(totalProfit),
      avgDiscountPercentage,
    });
  }
};

defineExpose({
  createTable,
});
</script>
