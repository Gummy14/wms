<template>
  <div>
    Item History:
    <div v-for="itemData in item.itemData">
      {{ itemData.eventId }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object
})
</script>

<style scoped>
</style>