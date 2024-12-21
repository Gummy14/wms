<template>
  <div>
    <div>
      <v-btn @click="getAllItems()">Create Order</v-btn>

      <v-dialog v-model="allItems">
        <v-card>
          <v-list>
            <v-list-item v-for="item in allItems" :key="item.id" :title="item.name"><v-btn @click="addItemToOrder(item)">Add To Order</v-btn></v-list-item>
          </v-list>
          <v-btn @click="registerOrder()">Create New Order</v-btn>
        </v-card>
      </v-dialog>

      <v-list>
        <v-list-group v-for="(order, index) in allOrders" :key="index">
          <template v-slot:activator="{ props }">
            <v-list-item 
            v-bind="props" 
            :title="orderTitle(index)" 
            :subtitle="orderStatusText(index)"
            >
            </v-list-item>
          </template>
          <v-list-item v-for="(item, itemIndex) in allOrders[index]" :key="item" :title="item"></v-list-item>
        </v-list-group>
      </v-list>

    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { GetAllWarehouseObjectsByType, GetAllWarehouseRelationshipsByParentType, GetAllEventTypes, RegisterOrder } from '@/functions/functions'


var allOrders = ref(null)
var allItems = ref(null)
var newOrderItems = ref([])
var eventTypes = ref(null)

function getAllItems() {
  GetAllWarehouseObjectsByType(0)
  .then(response => {
    allItems.value = response.data
  })
}
function getAllOrders() {
  GetAllWarehouseRelationshipsByParentType(3)
  .then(response => {
    var dictionary = {}
    response.data.forEach(warehouseRelationship => {
      if (dictionary[warehouseRelationship.parentId]) {
        dictionary[warehouseRelationship.parentId].push(warehouseRelationship.childId)
      } else {
        dictionary[warehouseRelationship.parentId] = [warehouseRelationship.childId]
      }
    });
    allOrders.value = dictionary
  })
}
function getAllEventTypes() {
  GetAllEventTypes()
  .then(response => {
    eventTypes.value = response.data
  })
}
function registerOrder() {
  RegisterOrder(newOrderItems.value)
  .then(() => {
    allItems.value = null
  })
}
function addItemToOrder(item) {
  newOrderItems.value.push(item)
}
function orderTitle(orderName) {
  return "Order #" + orderName
}
function orderStatusText(orderStatus) {
  // if(orderStatus && eventTypes.value) {
  //   return eventTypes.value.find(x => x.Id === orderStatus).eventTypeDescription
  // } else {
  //   return 'Fetching Order Status'
  // }
}

onMounted(() => {
  getAllOrders()
  getAllEventTypes()
})
</script>

<style scoped>
</style>
  