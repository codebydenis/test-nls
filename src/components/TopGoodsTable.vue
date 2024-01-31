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
import { ref } from "vue";
import VueTableLite from "vue3-table-lite";

const collumns = [
  {
    label: "Наименование",
    field: "name",
  },
  {
    label: "Прибыль",
    field: "totalProfit",
  },
  {
    label: "Кол-во",
    field: "count",
  },
];

const rows = ref([]);

const createTable = (data) => {
  let allProducts = [];

  for (let month in data) {
    if (month !== "Продажи" && month !== "CC") {
      allProducts = allProducts.concat(data[month]);
    }
  }

  let uniqueItemNames = new Set();

  allProducts.forEach((item) => {
    uniqueItemNames.add(item["Наименование"]);
  });

  let itemCounts = {};

  let topProducts = [];

  uniqueItemNames.forEach((itemName) => {
    let count = 0;
    let totalProfit = 0;

    allProducts.forEach((item) => {
      if (item["Наименование"] && item["Наименование"] === itemName) {
        count++;
        const unitsProfit = item["Цена"] - item["Цена со скидкой"];
        const itemProfit = unitsProfit * count;
        totalProfit += itemProfit;
      }
    });

    itemCounts[itemName] = count;

    topProducts.push({
      name: itemName,
      count: count,
      totalProfit: totalProfit,
    });
  });

  topProducts.sort((a, b) => b.totalProfit - a.totalProfit);

  topProducts = topProducts.slice(0, 100);

  rows.value = topProducts;
};

defineExpose({
  createTable,
});
</script>
