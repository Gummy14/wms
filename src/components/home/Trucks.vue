<template>
    <div>
      <div v-if="!retrievedAllTrucks">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <div v-else>
        <v-card>
          <TruckList :trucks="allTrucks" />
        </v-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { GetAllTrucks } from '@/functions/functions'
  import TruckList from '@/components/lists/TruckList.vue'
  
  var retrievedAllTrucks = ref(false)
  var allTrucks = ref(null)
  
  onMounted(() => {
    GetAllTrucks()
    .then(response => {
      allTrucks.value = response.data
      retrievedAllTrucks.value = true
    })
  })
  </script>
  
  <style scoped>
  </style>
      