<template>
  <div id="app" class="container mx-auto p-[40px]">
    <ExcelFilePond class="max-w-[300px] mx-auto mb-[80px]" @add-file="onAddfile" />
    <div class="flex gap-[40px] justify-between flex-wrap">
      <PivotTable ref="pivotTable" />
      <TopGoodsTable ref="topGoodsTable" />
      <ManagerTable ref="managerTable" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import ExcelFilePond from "../components/ExcelFilePond.vue";
import PivotTable from "../components/PivotTable.vue";
import TopGoodsTable from "../components/TopGoodsTable.vue";
import ManagerTable from "../components/ManagerTable.vue";
import * as XLSX from "xlsx";

const data = reactive({});
const pivotTable = ref(null);
const topGoodsTable = ref(null);
const managerTable = ref(null);

const onAddfile = (workbook) => {
  const sheetNames = workbook.SheetNames;
  sheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    data[sheetName] = XLSX.utils.sheet_to_json(worksheet);
  });
  pivotTable.value.createTable(data);
  topGoodsTable.value.createTable(data);
  managerTable.value.createTable(data);
};
</script>
