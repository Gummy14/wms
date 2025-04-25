<template>
  <div>
    <div v-if="!retrievedAllContainers">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <ContainerList :containers="allContainers" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllContainersMostRecentData } from '@/functions/functions'
import ContainerList from '@/components/lists/ContainerList.vue'

var retrievedAllContainers = ref(false)
var allContainers = ref(null)

onMounted(() => {
  GetAllContainersMostRecentData()
  .then(response => {
    allContainers.value = response.data
    retrievedAllContainers.value = true
  })
})
</script>

<style scoped>
</style>
  