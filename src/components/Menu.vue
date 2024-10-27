<template>
  <div>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item title="wms"></v-list-item>
          <v-divider></v-divider>

          <v-list-item @click="openRegisterContainer" title="Warehouse Configuration">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="warehouseConfigurationIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="openRegisterItem" title="Receiving">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="receivingIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="openPutaway" title="Putaway">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="putawayIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="openOrders" title="Orders">
            <template v-slot:prepend>
              <svg-icon type="mdi" :path="ordersIconPath"></svg-icon>
            </template>
          </v-list-item>

          <v-list-item @click="openPick" title="Picking">
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
    </v-layout>
  </div>
</template>

<script>
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

export default {
  data() {
    return {
      warehouseConfigurationIconPath: mdiWarehouse,
      receivingIconPath: mdiTruckFastOutline,
      putawayIconPath: mdiHumanDolly,
      ordersIconPath: mdiInvoiceTextEditOutline,
      pickingIconPath: mdiButtonPointer,
      packagingIconPath: mdiPackageVariant,
      shippingIconPath: mdiTruckFastOutline
    }
  },
  components: {
    SvgIcon
  },
  methods: {
    openRegisterItem() {
        this.$router.replace('/register-item')
    },
    openRegisterContainer() {
        this.$router.replace('/register-container')
    },
    openPutaway() {
        this.$router.replace('/putaway')
    },
    openOrders() {
        this.$router.replace('/orders')
    },
    openPick() {
        this.$router.replace('/pick')
    }
  }
}
</script>

<style scoped>
</style>
