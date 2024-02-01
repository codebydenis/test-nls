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
    field: "avgDiscount",
  },
];

const rows = reactive([]);

const createTable = (data) => {
  let summary = {};

  for (let month in data) {
    if (month !== "Продажи" && month !== "CC") {
      let salesCount = 0;
      let totalRevenue = 0;
      let totalProfit = 0;
      let totalDiscount = 0;
      let count = 0;

      data[month].forEach((item) => {
        salesCount++;
        totalRevenue += item["Цена со скидкой"] || 0;
        totalDiscount += item["Скидка"] || 0;
        count++;

        if (data["CC"] && data["CC"].length > 0) {
          data["CC"].forEach((costItem) => {
            if (costItem["Наименование"] === item["Наименование"]) {
              totalProfit +=
                item["Цена со скидкой"] - costItem["Себестоимость"] || 0;
            }
          });
        }
      });

      if (count > 0) {
        let avgDiscount = totalDiscount / count;
        rows.push({
          month,
          salesCount,
          totalRevenue: formatNumber(totalRevenue),
          totalProfit: formatNumber(totalProfit),
          avgDiscount: avgDiscount.toFixed(2),
        });
      }
    }
  }
};

defineExpose({
  createTable,
});
</script>
