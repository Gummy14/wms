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
      <v-text-field label="Description" v-model="objectToRegister.description"></v-text-field>
      <v-text-field label="Length In Centimeters" v-model="objectToRegister.lengthInCentimeters"></v-text-field>
      <v-text-field label="Width In Centimeters" v-model="objectToRegister.widthInCentimeters"></v-text-field>
      <v-text-field label="Height In Centimeters" v-model="objectToRegister.heightInCentimeters"></v-text-field>
      <v-text-field label="Weight In Kilograms" v-model="objectToRegister.weightOrMaxWeightInKilograms"></v-text-field>
    </v-card>
    <v-btn @click="printQrCode()">Print QR Code</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PrintQRCode } from '@/functions/functions'

var warehouseObjectTypeSelection = ref(null)
var warehouseObjectTypeList = ref([{id: 0, type: 'Item'}, {id: 1, type: 'Location'}, {id: 2, type: 'Container'}, {id: 4, type: 'Box'}])
var objectToRegister = ref({
  id: null,
  objectType: 0,
  name: '',
  description: '',
  lengthInCentimeters: 0.0,
  widthInCentimeters: 0.0,
  heightInCentimeters: 0.0,
  weightOrMaxWeightInKilograms: 0.0
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
  