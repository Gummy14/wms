<template>
  <div>
    <v-btn @click="openRegisterItem">Register Item</v-btn>
    <v-btn @click="openRegisterContainer">Register Container</v-btn>
    <v-btn @click="openPutaway">Putaway</v-btn>
    <v-btn @click="openPickByContainer">Pick By Container</v-btn>
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
    openPickByContainer() {
        this.$router.replace('/pick-by-container')
    }
  }
}
</script>

<style scoped>
</style>
