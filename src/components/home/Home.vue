<template>
  <div>
    <v-btn
      @click="openScanner = true"
      icon="mdi-qrcode-scan"
      size="x-large"
    >
    </v-btn>

    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-plus"
            title="Register Object"
            @click="openRegistration = true"
          ></v-list-item>
          <v-divider></v-divider>
          <v-list-item
            prepend-icon="mdi-cube-outline"
            title="Items"
            @click="warehouseObjectListSelection = 0"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-map-marker-outline"
            title="Locations"
            @click="warehouseObjectListSelection = 1"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-receipt"
            title="Orders"
            @click="warehouseObjectListSelection = 2"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-package-variant-closed"
            title="Boxes"
            @click="warehouseObjectListSelection = 4"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-view-module"
            title="Shipments"
            @click="warehouseObjectListSelection = 5"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-truck-outline"
            title="Trucks"
            @click="warehouseObjectListSelection = 6"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <div v-if="warehouseObjectListSelection == 0">
      <Items />
    </div>
    <div v-else-if="warehouseObjectListSelection == 1">
      <Locations />
    </div>
    <div v-else-if="warehouseObjectListSelection == 2">
      <Orders />
    </div>
    <div v-else-if="warehouseObjectListSelection == 4">
      <Boxes />
    </div>
    <div v-else-if="warehouseObjectListSelection == 5">
      <Shipments />
    </div>
    <div v-else-if="warehouseObjectListSelection == 6">
      <Trucks />
    </div>

    <v-dialog 
      v-model="openScanner"
      max-width="400"
    >
      <ObjectScanner />
    </v-dialog>

    <v-dialog 
      v-model="openRegistration"
      max-width="400"
    >
      <Registration />
    </v-dialog>

    <v-alert
      v-model="isPickingComplete"
      color="success"
      icon="$success"
      :title="orderName"
      text="All Items in Order Picked, Move to Verification"
    >
    <v-btn @click="completePicking()">Complete Picking</v-btn>
    </v-alert>
  </div>
</template>

<script setup>
import ObjectScanner from '@/components/scanning/ObjectScanner.vue'
import Registration from '../Registration.vue';
import Items from '@/components/home/Items.vue'
import Locations from '@/components/home/Locations.vue'
import Orders from '@/components/home/Orders.vue'
import Boxes from '@/components/home/Boxes.vue'
import Shipments from '@/components/home/Shipments.vue'
import Trucks from '@/components/home/Trucks.vue'
import { ref, computed, compile } from 'vue'
import { useStore } from 'vuex'


const store = useStore()

var warehouseObjectListSelection = ref(null)
var warehouseObjectList = ref([
{id: 0, type: 'Items'}, 
{id: 1, type: 'Locations'}, 
{id: 3, type: 'Orders'},
{id: 4, type: 'Boxes'},
{id: 5, type: 'Shipments'},
{id: 6, type: 'Trucks'}
])
var openScanner = ref(false)
var openRegistration = ref(false)

const isPickingComplete = computed(() => {
  if(store.state.activeOrder != null) {
    var itemStatuses = store.state.activeOrder.orderItems.filter(x => x.nextEventId == null && x.boxId == null)
    return itemStatuses.length > 0 ? false : true
  } else {
    return false
  }
})

const orderName = computed(() => {
  if(store.state.activeOrder != null) {
    return "Order #" + store.state.activeOrder.orderDataHistory.filter(x => x.nextEventId == null)[0].name
  }
})

function completePicking() {
  store.commit('updateActiveOrder', null)
}

</script>

<style scoped>
</style>
  