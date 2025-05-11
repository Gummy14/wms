<template>
  <div>
    Box History:
    <div v-for="boxData in box.boxData">
      {{ boxData.eventId }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  box: Object
})
</script>

<style scoped>
</style>