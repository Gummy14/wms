<template>
  <div>
    <v-btn @click="openReceiving">Receiving</v-btn>
    <v-btn @click="openPutaway">Putaway</v-btn>
    <v-btn @click="openPick">Pick</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    openReceiving() {
        this.$router.replace('/receiving')
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
