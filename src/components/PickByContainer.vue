<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Container Id" v-model="containerToPickFrom"></v-text-field>
      </v-card>
      <v-btn @click="getContainerById">Find Contents of Container</v-btn>
    </div>
    <div>
      <v-dialog
        v-model="openContainerContentsDialog"
        width="auto"
      >
        <v-card v-if="itemInContainer"
          max-width="400"
          :text="itemInContainer.description"
          :title="itemInContainer.name"
        >
          <v-btn @click="pickItemFromContainer">Pick Item</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      containerToPickFrom: 0,
      openContainerContentsDialog: false,
      itemInContainer: null,
      pickAction: {
        containerId: null,
        itemId: null
      }
    }
  },
  methods: {
    getContainerById() {
      axios.get('https://localhost:7187/Item/GetContentsOfContainerById/' + this.containerToPickFrom)
      .then(response => this.itemInContainer = response.data)
      .then(this.openContainerContentsDialog = true)
    },
    pickItemFromContainer() {
      this.pickAction.containerId = this.containerToPickFrom;
      this.pickAction.itemId = this.itemInContainer.id;
      axios.post('https://localhost:7187/Item/PickItem/', this.pickAction)
      .then(response => this.itemInContainer = response.data)
      .then(this.openContainerContentsDialog = true)
    },
    resetAllPutawayData() {
      this.containerToPickFrom = 0,
      this.openContainerContentsDialog = false,
      this.itemInContainer = null,
      this.pickAction = {
        containerId: null,
        itemId: null
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
