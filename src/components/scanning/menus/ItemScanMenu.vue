<template>
  <div>
    <v-card
      :title="item.itemData[0].name"
      :text="item.itemData[0].description"
    >
      <div v-if="actionSelected == 0">
        <v-btn
          @click="selectForPutaway()"
        >
          Select For Putaway
        </v-btn>
        <v-btn
          @click="selectForPicking()"
        >
          Select For Picking
        </v-btn>
        <v-btn
          @click="selectForPacking()"
        >
          Select For Packing
        </v-btn>
        <v-btn
          @click="getItemHistory()"
        >
          Get Item History
        </v-btn>
      </div>

      <div v-if="actionSelected == 1">
        Putaway In Location: {{ putawayLocation.name}}
        Scan Correct Location To Putaway Into:
        <Scanner @codeScanned="(emittedData) => scannedPutawayLocation = emittedData" />
        <div v-if="scannedPutawayLocation">
          Location Scanned
          <v-btn @click="putItemInLocation()">Confirm Putaway</v-btn>
        </div>
      </div>

      <div v-if="actionSelected == 2">
        Pick Item Into Container: {{ store.state.activeOrder.orderContainer.filter(x => x.nextEventId == null)[0].containerId }}
        <v-btn @click="pickItemIntoContainer()">Confirm Pick</v-btn>
      </div>

      <div v-if="actionSelected == 3">
        Pack Item Into Box: {{ store.state.activeOrder.orderBox.filter(x => x.nextEventId == null)[0].boxId }}
        <v-btn @click="packItemIntoBox()">Confirm Pack</v-btn>
      </div>

      <div v-if="actionSelected == 4">
        Item History:
        <div v-for="itemData in item.itemData">
          {{ itemData.eventId }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { 
  GetPutawayLocation,
  PutawayItemIntoLocation,
  PickItemIntoContainer,
  PackItemIntoBox
} from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var actionSelected = ref(0)
var putawayLocation = ref(null)
var scannedPutawayLocation = ref(null)

const store = useStore()
const props = defineProps({
  item: Object
})

function selectForPutaway() {
  GetPutawayLocation()
  .then(response => {
    putawayLocation.value = response.data
    actionSelected.value = 1
  })
}
function selectForPicking() {
  actionSelected.value = 2
}
function selectForPacking() {
  actionSelected.value = 3
}
function getItemHistory() {
  actionSelected.value = 4
}

function putItemInLocation() {
  PutawayItemIntoLocation(props.item.id, scannedPutawayLocation.value.objectData.id)
  .then(() => {
    resetAll()
  })
}
function pickItemIntoContainer() {
  PickItemIntoContainer(props.item.id, store.state.activeOrder.orderContainer.filter(x => x.nextEventId == null)[0].containerId)
  .then(response => {
    resetAll()
    store.commit('updateActiveOrder', response.data)
  })
}
function packItemIntoBox() {
  PackItemIntoBox(props.item.id, store.state.activeOrder.orderBox.filter(x => x.nextEventId == null)[0].boxId)
  .then(response => {
    resetAll()
    store.commit('updateActiveOrder', response.data)
  })
}
function resetAll() {
  actionSelected.value = 0
  putawayLocation.value = null
  scannedPutawayLocation.value = null
}
</script>

<style scoped>
</style>