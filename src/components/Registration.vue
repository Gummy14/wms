<template>
  <div>
    <v-card>
      <v-select 
        label="Warehouse Objects"
        item-title="type"
        item-value="id"
        :items="warehouseObjectTypeList"
        v-model="warehouseObjectTypeSelection"
      >
      </v-select>
      <v-text-field label="Name" v-model="objectToRegister.name"></v-text-field>
      <v-text-field v-if="warehouseObjectTypeSelection == 0" label="Description" v-model="objectToRegister.description"></v-text-field>
    </v-card>
    <v-btn @click="printQrCode()">Print QR Code</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PrintQRCode } from '@/functions/functions'

var warehouseObjectTypeSelection = ref(null)
var warehouseObjectTypeList = ref([{id: 0, type: 'Item'}, {id: 1, type: 'Location'}, {id: 2, type: 'Container'}])
var objectToRegister = ref({
  id: null,
  objectType: 0,
  name: '',
  description: ''
})

function printQrCode() {
  objectToRegister.value.objectType = warehouseObjectTypeSelection
  PrintQRCode(objectToRegister.value)
  .then(() => {
    console.log('saved')
  })
}
</script>

<style scoped>
</style>
  