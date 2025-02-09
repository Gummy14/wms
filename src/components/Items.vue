<template>
  <div>
    <div v-if="!retrievedAllItems">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <ItemList :items="allItems" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllItems } from '@/functions/functions'
import ItemList from '@/components/ItemList.vue'

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
