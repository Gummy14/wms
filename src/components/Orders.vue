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
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="order in allOrders">
            <v-expansion-panel-title v-slot="{ expanded }">
             <v-row no-gutters>
               <v-col>
                 Order #{{ order.name }}
               </v-col>
             </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-divider class="border-opacity-25"></v-divider>
              <v-row>
                <v-col>Order ID:</v-col>
                <v-col>{{ order.id }}</v-col>
              </v-row>
              <v-divider class="border-opacity-25"></v-divider>
              <v-divider class="border-opacity-25"></v-divider>
              <v-row>
                <v-col>Status:</v-col>
                <v-col>{{ order.status }}</v-col>
              </v-row>
              <v-divider class="border-opacity-25"></v-divider>
              <v-row>
                <v-col>Timestamp Of Last Status Change:</v-col>
                <v-col>{{ order.dateTimeStamp }}</v-col>
              </v-row>
              <v-divider class="border-opacity-25"></v-divider>
              <v-row>
                <v-col>Order Items:</v-col>
                <v-expansion-panels multiple>
                <v-expansion-panel v-for="item in order.orderItems">
                  <v-expansion-panel-title v-slot="{ expanded }">
                   <v-row no-gutters>
                     <v-col>
                       {{ item.name }}
                     </v-col>
                   </v-row>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col>Description:</v-col>
                      <v-col>{{ item.description }}</v-col>
                    </v-row>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-row>
                      <v-col>Item ID:</v-col>
                      <v-col>{{ item.id }}</v-col>
                    </v-row>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-row>
                      <v-col>Location:</v-col>
                      <v-col>{{ item.locationId }}</v-col>
                    </v-row>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-row>
                      <v-col>Container:</v-col>
                      <v-col>{{ item.containerId }}</v-col>
                    </v-row>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-row>
                      <v-col>Order:</v-col>
                      <v-col>{{ item.orderId }}</v-col>
                    </v-row>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-row>
                      <v-col>Status:</v-col>
                      <v-col>{{ item.status }}</v-col>
                    </v-row>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-row>
                      <v-col>Timestamp Of Last Status Change:</v-col>
                      <v-col>{{ item.dateTimeStamp }}</v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                </v-expansion-panels>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { GetAllItems, GetAllOrders, GetAllEventTypes, RegisterOrder } from '@/functions/functions'


var allOrders = ref(null)
var allItems = ref(null)
var newOrderItems = ref([])
var eventTypes = ref(null)

function getAllItems() {
  GetAllItems()
  .then(response => {
    allItems.value = response.data
  })
}
function getAllOrders() {
  GetAllOrders()
  .then(response => {
    allOrders.value = response.data
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

onMounted(() => {
  getAllOrders()
  getAllEventTypes()
})
</script>

<style scoped>
</style>
  