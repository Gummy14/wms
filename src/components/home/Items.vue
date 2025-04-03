<template>
  <v-app>
    <v-container>
      <div v-if="!retrievedAllItems">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <div v-else>
        <v-card>
          <v-data-table 
            :items="allItems"
            :headers="headers"
          >
          </v-data-table>
          <!-- <ItemList :items="allItems" /> -->
        </v-card>
      </div>
    </v-container>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllItems } from '@/functions/functions'
//import ItemList from '@/components/lists/ItemList.vue'

const headers = [
    { title: 'ID', align: 'start', key: 'id' },
    { title: 'Name', align: 'start', key: 'name' },
    { title: 'Description', align: 'start', key: 'description' },
    { title: 'Status', align: 'start', key: 'status' },
    { title: 'DateTime Last Modified', align: 'start', key: 'dateTimeStamp' },
    { title: 'Location Name', align: 'start', key: 'locationName' },
    { title: 'Container Name', align: 'start', key: 'containerName' },
    { title: 'Order Name', align: 'start', key: 'orderName' },
  ]

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
