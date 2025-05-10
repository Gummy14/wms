<template>
  <div>
    <v-card
      :title="container.containerData[0].name"
      :text="container.containerData[0].description"
    >
      <div v-if="actionSelected == 0">
        <v-btn
          @click="selectBoxToAddToOrder()"
        >
          Select Box To Pack Items In
        </v-btn>
        <v-btn
          @click="getContainerHistory()"
        >
          Get Container History
        </v-btn>
      </div>

      <div v-if="actionSelected == 1">
        Scan Box To Pack Items In:
        <Scanner @codeScanned="(emittedData) => scannedBoxToPackInto = emittedData" />
        <div v-if="scannedBoxToPackInto">
          Box Scanned
          <v-btn @click="addBoxToOrder()">Confirm Pack Items With Box</v-btn>
        </div>
      </div>

      <div v-if="actionSelected == 2">
        Container History:
        <div v-for="containerData in container.containerData">
          {{ containerData.eventId }}
        </div>
      </div>

    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { AddBoxToOrder } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var actionSelected = ref(0)
var scannedBoxToPackInto = ref(null)

const store = useStore()
const props = defineProps({
  container: Object
})

function selectBoxToAddToOrder() {
  actionSelected.value = 1
}
function getContainerHistory() {
  actionSelected.value = 2
}

function addBoxToOrder() {
  AddBoxToOrder(props.container.containerData[0].orderId, scannedBoxToPackInto.value.objectData.id)
  .then(response => {
    store.commit('updateActiveOrder', response.data)
  })
}
</script>

<style scoped>
</style>