<template>
  <div>
    <v-card>
      <v-text-field label="Item Name" v-model="itemToRegister.name"></v-text-field>
      <v-text-field label="Item Description" v-model="itemToRegister.description"></v-text-field>
    </v-card>
    <v-btn @click="registerItem()">Register Item</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RegisterItem } from '@/functions/functions'

var itemToRegister = ref({
  name: '',
  description: ''
})

function registerItem() {
  RegisterItem(itemToRegister.value)
  .then(() => {
    itemToRegister.value.name = ''
    itemToRegister.value.description = ''
  })
}
</script>

<style scoped>
</style>
