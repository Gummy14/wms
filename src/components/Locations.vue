<template>
  <div>
    <div v-if="!retrievedAllLocations">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <LocationList :locations="allLocations" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllLocations } from '@/functions/functions'
import LocationList from '@/components/LocationList.vue'

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
