<template>
  <div>
    <div v-if="!containerHistory">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      Container History:
      <div v-for="containerHistoryEvent in containerHistory">
        {{ containerHistoryEvent.eventId }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetContainerHistoryById } from '@/functions/functions';

var containerHistory = ref(null)

const props = defineProps({
  container: Object
})

onMounted(() => {
  GetContainerHistoryById(props.container.id)
  .then(response => {
    containerHistory.value = response.data
  })
})
</script>

<style scoped>
</style>