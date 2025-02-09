<template>
  <div>
    <div v-if="!retrievedAllItems">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-list>
          <v-list-item v-for="item in allItems" :key="item.itemId" :title="item.name"></v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllItems } from '@/functions/functions'

var allItems = ref(null)
var retrievedAllItems = ref(false)

onMounted(() => {
  GetAllItems()
  .then(response => {
    allItems.value = response.data
    retrievedAllItems.value = true
  })
})
</script>

<style scoped>
</style>
