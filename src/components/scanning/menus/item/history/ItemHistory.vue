<template>
  <div>
    <div v-if="!itemHistory">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      Item History:
      <div v-for="itemHistoryEvent in itemHistory">
        {{ itemHistoryEvent.eventId }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetItemHistoryById } from '@/functions/functions';

var itemHistory = ref(null)

const props = defineProps({
  item: Object
})

onMounted(() => {
  GetItemHistoryById(props.item.id)
  .then(response => {
    itemHistory.value = response.data
  })
})
</script>

<style scoped>
</style>