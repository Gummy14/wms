<template>
  <div>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item title="wms"></v-list-item>
          <v-divider></v-divider>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="inbound"></v-list-item>
            </template>
          
            <v-list-item @click="setCurrentRoute('/putaway')" title="Putaway">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiHumanDolly"></svg-icon>
              </template>
            </v-list-item>
          </v-list-group>

          <v-divider></v-divider>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="outbound"></v-list-item>
            </template>

            <v-list-item @click="setCurrentRoute('/pick')" title="Picking">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiButtonPointer"></svg-icon>
              </template>
            </v-list-item>

            <v-list-item @click="setCurrentRoute('/packaging')" title="Packaging">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiPackageVariant"></svg-icon>
              </template>
            </v-list-item>

            <v-list-item @click="setCurrentRoute('/shipping')" title="Shipping">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiTruckFastOutline"></svg-icon>
              </template>
            </v-list-item>
          </v-list-group>

          <v-divider></v-divider>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="configuration"></v-list-item>
            </template>

            <v-list-item @click="setCurrentRoute('/register-item')" title="Receiving">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiTruckFastOutline"></svg-icon>
              </template>
            </v-list-item>

            <v-list-item @click="setCurrentRoute('/register-container')" title="Containers">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiWarehouse"></svg-icon>
              </template>
            </v-list-item>

            <v-list-item @click="setCurrentRoute('/orders')" title="Orders">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiInvoiceTextEditOutline"></svg-icon>
              </template>
            </v-list-item>
          </v-list-group>

          <v-divider></v-divider>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="history"></v-list-item>
            </template>

            <v-list-item @click="setCurrentRoute('/history')" title="Warehouse History">
              <template v-slot:prepend>
                <svg-icon type="mdi" :path="mdiClipboardTextClockOutline"></svg-icon>
              </template>
            </v-list-item>
          </v-list-group>

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
  mdiClipboardTextClockOutline
} from '@mdi/js';
import { RouterView }  from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

function setCurrentRoute(route) {
  router.push(route)
}
</script>

<style scoped>
</style>
