<template>
  <div>
    <v-btn
      @click="openScanner = true"
      :prepend-icon="mdiQrcodeScan"
    >
      <template v-slot:prepend>
        <svg-icon type="mdi" :path="mdiQrcodeScan"></svg-icon>
      </template>
      Scanner
    </v-btn>

    <v-btn
      @click="openRegistration = true"
      :prepend-icon="mdiPlus"
    >
      <template v-slot:prepend>
        <svg-icon type="mdi" :path="mdiPlus"></svg-icon>
      </template>
      Register New Warehouse Object
    </v-btn>
    
    <v-select 
      label="Warehouse Objects"
      item-title="type"
      item-value="id"
      :items="warehouseObjectList"
      v-model="warehouseObjectListSelection"
    >
    </v-select>

    <div v-if="warehouseObjectListSelection == 0">
      <Items />
    </div>
    <div v-else-if="warehouseObjectListSelection == 1">
      <Locations />
    </div>
    <div v-else-if="warehouseObjectListSelection == 2">
      <Containers />
    </div>
    <div v-else-if="warehouseObjectListSelection == 3">
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
      text="All Items in Order Picked, Move to Packing"
    >
    <v-btn @click="completePicking()">Complete Picking</v-btn>
    </v-alert>
    <v-alert
      v-model="isPackingComplete"
      color="success"
      icon="$success"
      :title="orderName"
      text="All Items in Order Packed. Seal Box and Return Container"
    >
    <v-btn @click="returnContainer()">Confirm Box Sealed and Return Container</v-btn>
    </v-alert>
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import ObjectScanner from '@/components/ObjectScanner.vue'
import Registration from '../Registration.vue';
import Items from '@/components/home/Items.vue'
import Locations from '@/components/home/Locations.vue'
import Containers from '@/components/home/Containers.vue'
import Orders from '@/components/home/Orders.vue'
import Boxes from '@/components/home/Boxes.vue'
import Shipments from '@/components/home/Shipments.vue'
import Trucks from '@/components/home/Trucks.vue'
import { ref, computed, compile } from 'vue'
import { mdiQrcodeScan, mdiPlus } from '@mdi/js'
import { useStore } from 'vuex'
import { RemoveContainerFromOrder } from '@/functions/functions'


const store = useStore()

var warehouseObjectListSelection = ref(null)
var warehouseObjectList = ref([
{id: 0, type: 'Items'}, 
{id: 1, type: 'Locations'}, 
{id: 2, type: 'Containers'}, 
{id: 3, type: 'Orders'},
{id: 4, type: 'Boxes'},
{id: 5, type: 'Shipments'},
{id: 6, type: 'Trucks'}
])
var openScanner = ref(false)
var openRegistration = ref(false)

const isPickingComplete = computed(() => {
  if(store.state.activeOrder != null) {
    var itemStatuses = store.state.activeOrder.orderItems.filter(x => x.nextEventId == null && x.containerId == null)
    return itemStatuses.length > 0 ? false : true
  } else {
    return false
  }
})
const isPackingComplete = computed(() => {
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
function returnContainer() {
  RemoveContainerFromOrder(store.state.activeOrder.containerUsedToPickOrder.filter(x => x.nextEventId == null)[0].containerId)
  .then(() => {
    store.commit('updateActiveOrder', null)
  })
}

</script>

<style scoped>
</style>
  