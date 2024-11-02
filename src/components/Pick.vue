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
            <v-list-item v-bind="props" :title="orderIdTitle(order)"></v-list-item>
          </template>
          <v-list-item v-for="item in order.items" :key="item.id" :title="item.name" @click="getItemContainerRelationship(item.id)"></v-list-item>
        </v-list-group>
      </v-list>
    </div>
    <div>
      <v-dialog
        v-model="itemContainerData"
        width="auto"
      >
        <v-card v-if="itemContainerData"
          max-width="400"
          :text="itemContainerData.item.description"
          :title="itemContainerData.item.name"
        >
          Container Id: {{ itemContainerData.container.containerId }}
          Container Name: {{ itemContainerData.container.name }}
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
      itemContainerData: null,
      allOrders: null
    }
  },
  methods: {
    getItemContainerRelationship(idToSearch) {
      axios.get('https://localhost:7187/WMS/GetItemContainerRelationship/' + idToSearch)
      .then(response => this.itemContainerData = response.data)
    },
    pickItemFromContainer() {
      axios.post('https://localhost:7187/WMS/PickItem/', this.itemContainerData.container)
      .then(this.resetAllPutawayData())
    },
    getAllOrders() {
      axios.get('https://localhost:7187/WMS/GetAllOrders/')
      .then(response => this.allOrders = response.data)
    },
    resetAllPutawayData() {
      this.genericId = 0,
      this.itemContainerData = null
    },
    orderIdTitle(order) {
      return "Order: " + order.eventDateTime + " --- " + order.orderId
    }
  },
  mounted() {
    this.getAllOrders()
  }
}
</script>

<style scoped>
</style>
