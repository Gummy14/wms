import axios from 'axios'

const baseUrl = 'https://localhost:7187/'

//Item
export async function GetAllItemsMostRecentData() {
    return await axios.get(baseUrl + 'Item/GetAllItemsMostRecentData/')
}
export async function GetItemById(id) {
    return await axios.get(baseUrl + 'Item/GetItemById/' + id)
}
export async function GetItemHistory(id) {
    return await axios.get(baseUrl + 'Item/GetItemHistory/' + id)
}
export async function RegisterItem(itemToRegister) {
    return await axios.post(baseUrl + 'Item/RegisterItem/', itemToRegister)
}

//Location
export async function GetAllLocationsMostRecentData() {
    return await axios.get(baseUrl + 'Location/GetAllLocationsMostRecentData/')
}
export async function GetLocationById(id) {
    return await axios.get(baseUrl + 'Location/GetLocationById/' + id)
}
export async function GetPutawayLocation() {
    return await axios.get(baseUrl + 'Location/GetPutawayLocation')
}
export async function GetLocationHistory(id) {
    return await axios.get(baseUrl + 'Location/GetLocationHistory/' + id)
}
export async function RegisterLocation(locationToRegister) {
    return await axios.post(baseUrl + 'Location/RegisterLocation/', locationToRegister)
}
export async function PutawayItemIntoLocation(itemId, locationId) {
    return await axios.post(baseUrl + 'Location/PutawayItemIntoLocation/' + itemId + '/' + locationId)
}

//Order
export async function GetAllOrdersMostRecentData() {
    return await axios.get(baseUrl + 'Order/GetAllOrdersMostRecentData/')
}
export async function GetOrderById(id) {
    return await axios.get(baseUrl + 'Order/GetOrderById/' + id)
}
export async function GetNextOrderWaitingForPicking() {
    return await axios.get(baseUrl + 'Order/GetNextOrderWaitingForPicking/' + status)
}
export async function RegisterOrder(order) {
    return await axios.post(baseUrl + 'Order/RegisterOrder/', order)
}
export async function AddContainerToOrder(orderId, containerId) {
    return await axios.post(baseUrl + 'Order/AddContainerToOrder/' + orderId + '/' + containerId)
}
export async function AddBoxToOrder(orderId, boxId) {
    return await axios.post(baseUrl + 'Order/AddBoxToOrder/' + orderId + '/' + boxId)
}
export async function RemoveContainerFromOrder(containerId) {
    return await axios.post(baseUrl + 'Order/RemoveContainerFromOrder/' + containerId)
}

//Container
export async function GetAllContainersMostRecentData() {
    return await axios.get(baseUrl + 'Container/GetAllContainersMostRecentData/')
}
export async function GetContainerById(id) {
    return await axios.get(baseUrl + 'Container/GetContainerById/' + id)
}
export async function GetContainerHistory(id) {
    return await axios.get(baseUrl + 'Container/GetContainerHistory/' + id)
}
export async function RegisterContainer(containerToRegister) {
    return await axios.post(baseUrl + 'Container/RegisterContainer/', containerToRegister)
}
export async function PickItemIntoContainer(itemId, containerId) {
    return await axios.post(baseUrl + 'Container/PickItemIntoContainer/' + itemId + '/' + containerId)
}

//Box
export async function GetAllBoxesMostRecentData() {
    return await axios.get(baseUrl + 'Box/GetAllBoxesMostRecentData/')
}
export async function GetBoxById(id) {
    return await axios.get(baseUrl + 'Box/GetBoxById/' + id)
}
export async function RegisterBox(boxToRegister) {
    return await axios.post(baseUrl + 'Box/RegisterBox/', boxToRegister)
}
export async function PackItemIntoBox(itemId, boxId) {
    return await axios.post(baseUrl + 'Box/PackItemIntoBox/' + itemId + '/' + boxId)
}
export async function AddBoxToShipment(boxId) {
    return await axios.post(baseUrl + 'Box/AddBoxToShipment/' + boxId)
}
export async function AddBoxToTruck(boxId, truckId) {
    return await axios.post(baseUrl + 'Box/AddBoxToTruck/' + boxId + '/' + truckId)
}

//Shipment
export async function GetAllShipmentsMostRecentData() {
    return await axios.get(baseUrl + 'Shipment/GetAllShipmentsMostRecentData/')
}
export async function AddTruckToShipment(shipmentId, licensePlate) {
    return await axios.post(baseUrl + 'Shipment/AddTruckToShipment/' + shipmentId + '/' + licensePlate)
}

//Truck
export async function GetAllTrucks() {
    return await axios.get(baseUrl + 'Truck/GetAllTrucks/')
}
export async function TruckDeparted(truckId) {
    return await axios.post(baseUrl + 'Truck/TruckDeparted/' + truckId)
}


//WMS
export async function PrintQRCode(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/PrintQRCode/', objectToRegister)
}
