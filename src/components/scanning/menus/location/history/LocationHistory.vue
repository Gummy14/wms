<template>
  <div>
    Location History:
    <div v-for="locationData in location.locationData">
      {{ locationData.eventId }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  location: Object
})

</script>

<style scoped>
</style>