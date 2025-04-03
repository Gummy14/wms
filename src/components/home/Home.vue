<template>
  <v-app>
    <v-container>
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
      <v-dialog 
        v-model="openRegistration"
        max-width="400"
      >
        <Registration />
      </v-dialog>
      <v-dialog 
        v-model="openAddition"
        max-width="400"
      >
        <Addition />
      </v-dialog>
      
      <v-bottom-navigation>
        <v-bottom-sheet>
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" text="Open Tools"></v-btn>
          </template>
        
          <v-card
            title="Tools"
            text="Warehouse Operation Tools"
          >
            <ObjectScanner v-if="openScanner" />

            <v-btn
              v-for="tool in tools"
              @click="openScanner = true"
              :prepend-icon="mdiQrcodeScan"
              :text="tool[0]"
            >
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="tool[1]"></svg-icon>
              </template>
            </v-btn>

          </v-card>
        </v-bottom-sheet>
      </v-bottom-navigation>
    </v-container>
  </v-app>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import ObjectScanner from '@/components/ObjectScanner.vue'
import Registration from '../Registration.vue';
import Addition from '../Addition.vue';
import Items from '@/components/home/Items.vue'
import Locations from '@/components/home/Locations.vue'
import Containers from '@/components/home/Containers.vue'
import Orders from '@/components/home/Orders.vue'
import { ref } from 'vue'
import { mdiQrcodeScan, mdiPlus } from '@mdi/js'

var warehouseObjectListSelection = ref(null)
var warehouseObjectList = ref([{id: 0, type: 'Items'}, {id: 1, type: 'Locations'}, {id: 2, type: 'Containers'}, {id: 3, type: 'Orders'}])
var openScanner = ref(false)
var openRegistration = ref(false)
var openAddition = ref(false)
var tools = ref([
  ["Scanner", mdiQrcodeScan],
  ["Register New Warehouse Object", mdiPlus],
  ["Add Previously Printed QR Code", mdiPlus]
])

</script>

<style scoped>
</style>
  