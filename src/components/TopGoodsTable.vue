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
    field: "profit",
  },
  {
    label: "Кол-во",
    field: "count",
  },
];

const rows = ref([]);

const createTable = (data) => {
  let result = [];

  data["Продажи"].forEach((sale) => {
    let productName = sale["Наименование"];
    let discountPrice = sale["Цена со скидкой"];

    let costPrice = 0;
    data["CC"].forEach((ccItem) => {
      if (ccItem["Наименование"] === productName) {
        costPrice = ccItem["Себестоимость"];
      }
    });

    if (costPrice !== 0) {
      let existingProductIndex = result.findIndex(
        (item) => item.name === productName
      );
      if (existingProductIndex !== -1) {
        result[existingProductIndex].count++;
        result[existingProductIndex].profit += discountPrice - costPrice;
      } else {
        result.push({
          name: productName,
          count: 1,
          discount_price: discountPrice,
          price: costPrice,
          profit: discountPrice - costPrice,
        });
      }
    }
  });

  result.sort((a, b) => b.profit - a.profit);
  rows.value = result.slice(0, 100);
};

defineExpose({
  createTable,
});
</script>
