<template>
  <div>
    Container History:
    <div v-for="containerData in container.containerData">
      {{ containerData.eventId }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  container: Object
})
</script>

<style scoped>
</style>