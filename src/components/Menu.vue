<template>
  <div>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item title="wms"></v-list-item>

          <v-divider></v-divider>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Warehouse Configuration" ref="warehouseConfigItem" @mouseover="autoClick(0)"></v-list-item>
            </template>
            <v-list-item><v-btn @click="openRegisterContainer">Register Container</v-btn></v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Receiving" ref="registrationItem" @mouseover="autoClick(1)"></v-list-item>
            </template>
            <v-list-item><v-btn @click="openRegisterItem">Register Item</v-btn></v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Putaway" ref="putawayItem" @mouseover="autoClick(2)"></v-list-item>
            </template>
            <v-list-item><v-btn @click="openPutaway">Putaway</v-btn></v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Orders" ref="orderItem" @mouseover="autoClick(3)"></v-list-item>
            </template>
            <v-list-item><v-btn @click="openOrders">Orders</v-btn></v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Picking" ref="pickItem" @mouseover="autoClick(4)"></v-list-item>
            </template>
            <v-list-item><v-btn @click="openPickByContainer">Pick By Container ID</v-btn></v-list-item>
            <v-list-item><v-btn @click="openPickByItem">Pick By Item ID</v-btn></v-list-item>
          </v-list-group>

        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
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
    openPickByContainer() {
        this.$router.replace('/pick-by-container')
    },
    openPickByItem() {
        this.$router.replace('/pick-by-item')
    },
    autoClick(num) {
      switch(num) {
        case 0:
          this.$refs.warehouseConfigItem.$el.click()
          break
        case 1:
          this.$refs.registrationItem.$el.click()
          break
        case 2:
          this.$refs.putawayItem.$el.click()
          break
        case 3:
          this.$refs.orderItem.$el.click()
          break
        case 4:
          this.$refs.pickItem.$el.click()
          break
      }

    }
  }
}
</script>

<style scoped>
</style>
