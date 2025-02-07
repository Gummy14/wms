<template>
  <div>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item title="Kepler WMS"></v-list-item>
          <v-list-item subtitle="Astronomia Solutions"></v-list-item>
          
          <v-divider></v-divider>

          <v-list-item @click="setCurrentRoute('/data')" title="Warehouse Objects">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="mdiInvoiceTextEditOutline"></svg-icon>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="setCurrentRoute('/objectScanner')" title="Scanner">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="mdiQrcodeScan"></svg-icon>
            </template>
          </v-list-item>
          
      <!--<v-list-item @click="setCurrentRoute('/packaging')" title="Packaging">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="mdiPackageVariant"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="setCurrentRoute('/shipping')" title="Shipping">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="mdiTruckFastOutline"></svg-icon>
            </template>
          </v-list-item> -->

          <v-divider></v-divider>

          <v-list-item @click="setCurrentRoute('/history')" title="Warehouse History">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="mdiClipboardTextClockOutline"></svg-icon>
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
  mdiQrcodeScan, 
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
