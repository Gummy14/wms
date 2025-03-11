<template>
  <div>
    <v-card>
      <Scanner @codeScanned="(emittedData) => scannedObject = emittedData" />
    </v-card>
    <v-card v-if="scannedObject">
      ID: {{ scannedObject.Id }}, 
      Name: {{ scannedObject.Name }}, 
      Description: {{ scannedObject.Description }}, 
      Object Type: {{ scannedObject.ObjectType }}
      <v-btn @click="addObject()">Add Object To Database</v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RegisterQRCode } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var scannedObject = ref(null)

function addObject() {
  var objectToRegister = ref({
    id: scannedObject.value.Id,
    objectType: scannedObject.value.ObjectType,
    name: scannedObject.value.Name,
    description: scannedObject.value.Description
  })
  RegisterQRCode(objectToRegister.value)
  .then(() => {
    console.log('saved')
  })
}
</script>

<style scoped>
</style>