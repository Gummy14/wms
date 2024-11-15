<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Order Container Id" v-model="orderContainerId"></v-text-field>
      </v-card>
      <v-btn @click="getContainerById()">Find Container</v-btn>
    </div>
    <!-- <div>
      <v-dialog
        v-model="putawayItem"
        width="auto"
      >
        <v-card v-if="putawayItem"
          max-width="400"
          :text="putawayItem.description"
          :title="putawayItem.name"
        >
        <div v-if="putawayContainer == null">
          <v-btn @click="beginPutaway()">Begin Putaway</v-btn>
        </div>
        <div v-else>
          Putaway In Location: {{ putawayContainer.name }}
          <v-btn @click="putItemInContainer()">Putaway</v-btn>
        </div>
        </v-card>
      </v-dialog>
    </div> -->
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

var orderToPackage = ref(null)
var orderContainerId = ref(null)

function getContainerById() {
  axios.get('https://localhost:7187/Order/GetContainerById/' + orderContainerId)
  .then(response => orderToPackage.value = response.data)
}
</script>

<style scoped>
</style>