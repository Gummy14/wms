<template>
  <div>
    <v-card
      v-for="item in allItems"
      :key="item.id"
      :title="item.name"
      :subtitle="item.description"
      :text="putawayLocation(item.putawayLocation)"
      variant="tonal"
    >
      <v-card-actions>
        <v-btn @click="putawayItem(item)">Putaway</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      allItems: {}
    }
  },
  methods: {
    getAllItemData() {
      axios.get('https://localhost:7187/Item/GetAllItems')
      .then(response => this.allItems = response.data)
    },
    putawayLocation(itemPutawayLocation) {
      return "Putaway in Location: " + itemPutawayLocation
    }
  },
  mounted() {
    this.getAllItemData()
  }
}
</script>

<style scoped>
</style>