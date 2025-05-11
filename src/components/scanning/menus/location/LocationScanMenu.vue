<template>
  <div>
    <v-card
      :title="location.locationData[0].name"
      :text="location.locationData[0].description"
    >
      <div v-if="actionSelected == 0">
        <v-btn
          @click="actionSelected = 1"
        >
          Get Location History
        </v-btn>
      </div>

      <LocationHistory
        v-if="actionSelected == 1"
        :location="location"
      />
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LocationHistory from './history/LocationHistory.vue'

var actionSelected = ref(0)

const props = defineProps({
  location: Object
})
</script>

<style scoped>
</style>