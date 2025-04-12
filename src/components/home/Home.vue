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
import { ref } from 'vue'
import { mdiQrcodeScan, mdiPlus } from '@mdi/js'
import { useStore } from 'vuex'

const store = useStore()

var warehouseObjectListSelection = ref(null)
var warehouseObjectList = ref([{id: 0, type: 'Items'}, {id: 1, type: 'Locations'}, {id: 2, type: 'Containers'}, {id: 3, type: 'Orders'}])
var openScanner = ref(false)
var openRegistration = ref(false)


</script>

<style scoped>
</style>
  