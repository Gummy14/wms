<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Pick By Search" v-model="genericId"></v-text-field>
      </v-card>
      <v-btn @click="getItemContainerRelationship(genericId)">Search</v-btn>
      
      <v-list>
        <v-list-group v-for="order in allOrders" :key="order.id">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(order.id)"></v-list-item>
          </template>
          <v-list-item v-for="item in order.items" :key="item.id" :title="item.name" @click="getItemContainerRelationship(item.id)"></v-list-item>
        </v-list-group>
      </v-list>
    </div>
    <div>
      <v-dialog
        v-model="containerData"
        width="auto"
      >
        <v-card v-if="containerData"
          max-width="400"
          :text="containerData.item.description"
          :title="containerData.item.name"
        >
          Container Id: {{ containerData.containerId }}
          Container Name: {{ containerData.name }}
          <v-btn @click="pickItemFromContainer">Pick</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      genericId: 0,
      containerData: null,
      allOrders: null
    }
  },
  methods: {
    getItemContainerRelationship(idToSearch) {
      axios.get('https://localhost:7187/WMS/GetItemContainerRelationship/' + idToSearch)
      .then(response => this.containerData = response.data)
    },
    pickItemFromContainer() {
      axios.post('https://localhost:7187/WMS/PickItem/', this.containerData)
      .then(this.resetAllPutawayData())
    },
    getAllOrders() {
      axios.get('https://localhost:7187/WMS/GetAllOrders/')
      .then(response => this.allOrders = response.data)
    },
    resetAllPutawayData() {
      this.genericId = 0,
      this.containerData = null
    },
    orderIdTitle(orderId) {
      return "Order Id: " + orderId
    }
  },
  mounted() {
    this.getAllOrders()
  }
}
</script>

<style scoped>
</style>
