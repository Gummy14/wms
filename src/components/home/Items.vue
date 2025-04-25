<template>
  <div>
    <div v-if="!retrievedAllItems">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <ItemList :items="allItems" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllItemsMostRecentData } from '@/functions/functions'
import ItemList from '@/components/lists/ItemList.vue'

var allItems = ref(null)
var retrievedAllItems = ref(false)

onMounted(() => {
  GetAllItemsMostRecentData()
  .then(response => {
    allItems.value = response.data
    retrievedAllItems.value = true
  })
})
</script>

<style scoped>
</style>
