<template>
  <div>
    <v-card>
      <v-text-field label="Container Name" v-model="containerToRegister.name"></v-text-field>
      <v-select :items="containerTypes" label="Container Type"></v-select>
    </v-card>
    <v-btn @click="registerContainer()">Register Container</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RegisterContainer } from '@/functions/functions'

var containerTypes = ref([0, 1])
var containerToRegister = ref({
  name: ''
})

function registerContainer() {
  RegisterContainer(containerToRegister.value)
  .then(() => {
    containerToRegister.value.name = ''
  })
}
</script>

<style scoped>
</style>
