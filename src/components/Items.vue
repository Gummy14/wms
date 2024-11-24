<template>
  <div>
    <div v-if="!retrievedAllItems">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Item Name" v-model="itemToRegister.name"></v-text-field>
        <v-text-field label="Item Description" v-model="itemToRegister.description"></v-text-field>
      </v-card>
      <v-btn @click="registerItem()">Register Item</v-btn>
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
import { GetAllItems, RegisterItem, PrintItemQRCode } from '@/functions/functions'

var allItems = ref(null)
var retrievedAllItems = ref(false)
var itemToRegister = ref({
  itemId: null,
  name: '',
  description: ''
})

function registerItem() {
  console.log('item', JSON.stringify(itemToRegister.value))
  PrintItemQRCode(itemToRegister.value)
  .then(() => {
    console.log('saved')
  })
  // RegisterItem(itemToRegister.value)
  // .then(() => {
  //   itemToRegister.value.name = ''
  //   itemToRegister.value.description = ''
  // })
}

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
