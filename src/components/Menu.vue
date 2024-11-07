<template>
  <div>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item title="wms"></v-list-item>
          <v-divider></v-divider>

          <v-list-item @click="setCurrentRoute('/register-container')" title="Warehouse Configuration">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="warehouseConfigurationIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="setCurrentRoute('/register-item')" title="Receiving">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="receivingIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="setCurrentRoute('/putaway')" title="Putaway">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="putawayIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="setCurrentRoute('/orders')" title="Orders">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="ordersIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="setCurrentRoute('/pick')" title="Picking">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="pickingIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item title="Packaging">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="packagingIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item title="Shipping">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="shippingIconPath"></svg-icon>
            </template>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-main>
        <RouterView />
      </v-main>

    </v-layout>
  </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { 
  mdiWarehouse, 
  mdiTruckFastOutline, 
  mdiHumanDolly, 
  mdiInvoiceTextEditOutline, 
  mdiButtonPointer,
  mdiPackageVariant,
  mdiTruckFast
} from '@mdi/js';
import { RouterView }  from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

var warehouseConfigurationIconPath = mdiWarehouse
var receivingIconPath = mdiTruckFastOutline
var putawayIconPath = mdiHumanDolly
var ordersIconPath = mdiInvoiceTextEditOutline
var pickingIconPath = mdiButtonPointer
var packagingIconPath = mdiPackageVariant
var shippingIconPath = mdiTruckFastOutline

function setCurrentRoute(route) {
  router.push(route)
}
</script>

<style scoped>
</style>
