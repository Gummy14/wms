<template>
  <div>
    <div v-if="!locationHistory">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      Location History:
      <div v-for="locationHistoryEvent in locationHistory">
        {{ locationHistoryEvent.eventId }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetLocationHistoryById } from '@/functions/functions';

var locationHistory = ref(null)

const props = defineProps({
  location: Object
})

onMounted(() => {
  GetLocationHistoryById(props.location.id)
  .then(response => {
    locationHistory.value = response.data
  })
})
</script>

<style scoped>
</style>