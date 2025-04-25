<template>
  <div>
    <div v-if="!retrievedAllLocations">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <LocationList :locations="allLocations" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllLocationsMostRecentData } from '@/functions/functions'
import LocationList from '@/components/lists/LocationList.vue'

var retrievedAllLocations = ref(false)
var allLocations = ref(null)

onMounted(() => {
  GetAllLocationsMostRecentData()
  .then(response => {
    allLocations.value = response.data
    retrievedAllLocations.value = true
  })
})
</script>

<style scoped>
</style>
