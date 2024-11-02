<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Pick By Search" v-model="genericId"></v-text-field>
      </v-card>
      <v-btn @click="getItemContainerRelationship(genericId)">Search</v-btn>
      
      <v-list>
        <v-list-group v-for="orderItems in allOrderItems" :key="orderItems.order.orderId">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(orderItems.order)" @click="getItemsForOrder(orderItems.order.orderId)"></v-list-item>
          </template>
          <v-list-item v-for="item in orderItems.items" :key="item.id" :title="item.name" @click="getItemContainerRelationship(item.itemId)">
            <template v-slot:append>
              <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
            </template>
          </v-list-item>
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
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCheckCircleOutline } from '@mdi/js';

export default {
  data() {
    return {
      allOrderItems: null,
      genericId: 0,
      itemContainerData: null,
      mdiCheckCircleOutline: mdiCheckCircleOutline
    }
  },
  components: {
    SvgIcon
  },
  methods: {
    getItemContainerRelationship(idToSearch) {
      axios.get('https://localhost:7187/WMS/GetItemContainerRelationship/' + idToSearch)
      .then(response => this.itemContainerData = response.data)
    },
    pickItemFromContainer() {
      console.log(this.itemContainerData)
      axios.post('https://localhost:7187/WMS/PickItem/', this.itemContainerData)
      .then(this.checkoffPickedItem())
    },
    getAllOrderWithoutItems() {
      axios.get('https://localhost:7187/WMS/GetAllCurrentOrdersWithOutItems/')
      .then(response => this.allOrderItems = response.data)
    },
    getItemsForOrder(orderId) {
      if(!this.allOrderItems.find(x => x.order.orderId === orderId).items) {
        axios.get('https://localhost:7187/WMS/GetOrderItems/' + orderId)
        .then(response => this.addItemsToOrderItems(orderId, response.data))
      }
    },
    checkoffPickedItem() {

      this.resetAllPutawayData()
    },
    resetAllPutawayData() {
      this.genericId = 0,
      this.itemContainerData = null
    },
    orderIdTitle(order) {
      return "Order: " + order.eventDateTime + " --- " + order.orderId
    },
    addItemsToOrderItems(orderId, items) {
      this.allOrderItems.find(x => x.order.orderId === orderId).items = items
    }
  },
  mounted() {
    this.getAllOrderWithoutItems()
  }
}
</script>

<style scoped>
</style>
