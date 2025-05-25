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
      <div v-if="warehouseObjectTypeSelection != 1">
        <v-text-field label="Name" v-model="objectToRegister.name"></v-text-field>
        <v-text-field label="Description" v-model="objectToRegister.description"></v-text-field>
        <v-text-field label="Length In Centimeters" v-model="objectToRegister.lengthInCentimeters"></v-text-field>
        <v-text-field label="Width In Centimeters" v-model="objectToRegister.widthInCentimeters"></v-text-field>
        <v-text-field label="Height In Centimeters" v-model="objectToRegister.heightInCentimeters"></v-text-field>
        <v-text-field label="Weight In Kilograms" v-model="objectToRegister.weightOrMaxWeightInKilograms"></v-text-field>
      </div>
      <div v-if="warehouseObjectTypeSelection == 1">
        <v-text-field label="Zone" v-model="locationToRegister.zone"></v-text-field>
        <v-text-field label="Shelf" v-model="locationToRegister.shelf"></v-text-field>
        <v-text-field label="Row" v-model="locationToRegister.row"></v-text-field>
        <v-text-field label="Column" v-model="locationToRegister.column"></v-text-field>
        <v-text-field label="Description" v-model="locationToRegister.description"></v-text-field>
        <v-text-field label="Length In Centimeters" v-model="locationToRegister.lengthInCentimeters"></v-text-field>
        <v-text-field label="Width In Centimeters" v-model="locationToRegister.widthInCentimeters"></v-text-field>
        <v-text-field label="Height In Centimeters" v-model="locationToRegister.heightInCentimeters"></v-text-field>
        <v-text-field label="Weight In Kilograms" v-model="locationToRegister.weightOrMaxWeightInKilograms"></v-text-field>
      </div>
    </v-card>
    <v-btn @click="printQrCode()">Print QR Code</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RegisterItem, RegisterLocation, RegisterContainer, RegisterBox } from '@/functions/functions'

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

var locationToRegister = ref({
  id: null,
  objectType: 0,
  zone: 0,
  shelf: 0,
  row: 0,
  column: 0,
  description: '',
  lengthInCentimeters: 0.0,
  widthInCentimeters: 0.0,
  heightInCentimeters: 0.0,
  weightOrMaxWeightInKilograms: 0.0
})

function printQrCode() {
  objectToRegister.value.objectType = warehouseObjectTypeSelection
  switch(objectToRegister.value.objectType) {
    case 0:
      RegisterItem(objectToRegister.value)
      .then(() => {
        console.log('Registered')
      })
      break
    case 1:
      RegisterLocation(locationToRegister.value)
      .then(() => {
        console.log('Registered')
      })
      break
    case 2:
      RegisterContainer(objectToRegister.value)
      .then(() => {
        console.log('Registered')
      })
      break
    case 4:
      RegisterBox(objectToRegister.value)
      .then(() => {
        console.log('Registered')
      })
      break
    default:
      break
  }

}
</script>

<style scoped>
</style>
  