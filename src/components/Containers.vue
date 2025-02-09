<template>
  <div>
    <div v-if="!retrievedAllContainers">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <ContainerList :containers="allContainers" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllContainers } from '@/functions/functions'
import ContainerList from '@/components/ContainerList.vue'

var retrievedAllContainers = ref(false)
var allContainers = ref(null)

onMounted(() => {
  GetAllContainers()
  .then(response => {
    allContainers.value = response.data
    retrievedAllContainers.value = true
  })
})
</script>

<style scoped>
</style>
  