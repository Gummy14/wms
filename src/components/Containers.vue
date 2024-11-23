<template>
  <div>
    <div v-if="!retrievedAllContainers">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Container Name" v-model="containerToRegister.name"></v-text-field>
        <v-select :items="containerTypes" item-title="type" item-value="id" label="Container Type" v-model="containerToRegister.containerType"></v-select>
        <v-btn @click="registerContainer()">Register Container</v-btn>
      </v-card>
      <v-card>
        <v-list>
          <v-list-item v-for="container in allContainers" :key="container.containerDetail.containerId" :title="container.containerDetail.name"></v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllContainers, RegisterContainer } from '@/functions/functions'

var containerTypes = ref([{id: 0, type: 'Putaway'}, {id: 1, type: 'Picking'}])
var retrievedAllContainers = ref(false)
var allContainers = ref(null)
var containerToRegister = ref({
  name: '',
  containerType: 0
})

function registerContainer() {
  RegisterContainer(containerToRegister.value)
  .then(() => {
    containerToRegister.value.name = ''
  })
}

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
