<template>
  <div>
    <div v-if="!retrievedAllContainers">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Container Name" v-model="containerToRegister.name"></v-text-field>
        <v-btn @click="printQrCode()">Print Container QR Code</v-btn>
      </v-card>

      <v-card>
        <v-list>
          <v-list-item v-for="container in allContainers" :key="container.id" :title="container.name"></v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllContainers, PrintQRCode } from '@/functions/functions'

var retrievedAllContainers = ref(false)
var allContainers = ref(null)
var containerToRegister = ref({
  id: null,
  objectType: 2,
  name: '',
  description: '',
})

function printQrCode() {
  PrintQRCode(containerToRegister.value)
  .then(() => {
    console.log('saved')
  })
}

onMounted(() => {
  GetAllContainers()
  .then(response => {
    allContainers.value = response.data
    retrievedAllContainers.value = true
  })
})
</script>

<style scoped>
</style>
  