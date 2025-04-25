<template>
  <div>
    <div v-if="!retrievedAllBoxes">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <BoxList :boxes="allBoxes" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllBoxesMostRecentData } from '@/functions/functions'
import BoxList from '@/components/lists/BoxList.vue'

var retrievedAllBoxes = ref(false)
var allBoxes = ref(null)

onMounted(() => {
  GetAllBoxesMostRecentData()
  .then(response => {
    allBoxes.value = response.data
    retrievedAllBoxes.value = true
  })
})
</script>

<style scoped>
</style>
    