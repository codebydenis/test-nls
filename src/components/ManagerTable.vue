<template>
  <VueTableLite
    v-if="rows.length"
    class="max-w-[450px] w-full"
    :is-hide-paging="true"
    max-height="600"
    :columns="collumns"
    :rows="rows"
  />
</template>

<script setup>
import { ref } from "vue";
import VueTableLite from "vue3-table-lite";

const collumns = [
  {
    label: "Менеджер",
    field: "managerName",
  },
  {
    label: "Прибыль",
    field: "totalProfit",
  },
];

const rows = ref([]);

const createTable = (data) => {
  let profitByManager = {};

  for (let month in data) {
    if (month !== "Продажи" && month !== "CC") {
      let items = data[month];
      items.forEach((item) => {
        let managerName = item["Имя продавца"];
        if (managerName) {
          if (!profitByManager[managerName]) {
            profitByManager[managerName] = {
              managerName,
              totalProfit: 0,
              totalRevenue: 0,
            };
          }

          const unitsProfit = item["Цена"] - item["Цена со скидкой"];
          profitByManager[managerName].totalProfit += unitsProfit;
          profitByManager[managerName].totalRevenue += item["Цена со скидкой"];
        }
      });
    }
  }

  profitByManager = Object.values(profitByManager);

  rows.value = profitByManager.sort((a, b) => b.totalProfit - a.totalProfit);
};

defineExpose({
  createTable,
});
</script>
