<template>
  <div>
    <div v-if="!retrievedAllLocations">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-list>
          <v-list-item v-for="location in allLocations" :key="location.id" :title="location.name"></v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllLocations } from '@/functions/functions'

var retrievedAllLocations = ref(false)
var allLocations = ref(null)

onMounted(() => {
  GetAllLocations()
  .then(response => {
    allLocations.value = response.data
    retrievedAllLocations.value = true
  })
})
</script>

<style scoped>
</style>
