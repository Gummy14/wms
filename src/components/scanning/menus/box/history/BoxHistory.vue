<template>
  <div>
    <div v-if="!boxHistory">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      Box History:
      <div v-for="boxHistoryEvent in boxHistory">
        {{ boxHistoryEvent.eventId }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetBoxHistoryById } from '@/functions/functions';

var boxHistory = ref(null)

const props = defineProps({
  box: Object
})

onMounted(() => {
  GetBoxHistoryById(props.box.id)
  .then(response => {
    boxHistory.value = response.data
  })
})
</script>

<style scoped>
</style>