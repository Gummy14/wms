<template>
  <div>
    <v-btn @click="openRegisterItem">Register Item</v-btn>
    <v-btn @click="openRegisterContainer">Register Container</v-btn>
    <v-btn @click="openPutaway">Putaway</v-btn>
    <v-btn @click="openPick">Pick</v-btn>
  </div>
</template>

<script>
export default {
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
    openPick() {
        this.$router.replace('/pick')
    }
  }
}
</script>

<style scoped>
</style>
