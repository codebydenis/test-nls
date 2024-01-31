<template>
  <file-pond
    ref="pond"
    class-name="my-pond"
    label-idle="Перетащите сюда Excel файл..."
    :allowFileTypeValidation="true"
    :accepted-file-types="acceptedFileTypes"
    @addfile="onAddFile"
  />
</template>

<script setup>
import { ref } from "vue";
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import * as XLSX from "xlsx";

const FilePond = vueFilePond(FilePondPluginFileEncode, FilePondPluginFileValidateType);

const acceptedFileTypes = [
  "application/vnd.ms-excel",
  "application/vnd.ms-excel.sheet.macroEnabled.12",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const pond = ref(null);

const emits = defineEmits("addFile");

const onAddFile = () => {
  const file = pond.value.getFile();
  const workbook = XLSX.read(file.getFileEncodeBase64String(), {
    type: "base64",
  });
  emits("addFile", workbook);
};
</script>
