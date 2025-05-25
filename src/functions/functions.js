import axios from 'axios'

const url = 'https://localhost:7187/'
const instance = axios.create({
    baseUrl: url,
    headers: {
        'Api-Key-Header':''
    }
})

//Item
export async function GetAllItemsMostRecentData() {
    return await instance.get(url + 'Item/GetAllItemsMostRecentData/')
}
export async function GetItemById(id) {
    return await instance.get(url + 'Item/GetItemById/' + id)
}
export async function GetItemHistoryById(id) {
    return await instance.get(url + 'Item/GetItemHistoryById/' + id)
}
export async function RegisterItem(itemToRegister) {
    return await instance.post(url + 'Item/RegisterItem/', itemToRegister)
}

//Location
export async function GetAllLocationsMostRecentData() {
    return await instance.get(url + 'Location/GetAllLocationsMostRecentData/')
}
export async function GetLocationById(id) {
    return await instance.get(url + 'Location/GetLocationById/' + id)
}
export async function GetLocationHistoryById(id) {
    return await instance.get(url + 'Location/GetLocationHistoryById/' + id)
}
export async function GetPutawayLocation() {
    return await instance.get(url + 'Location/GetPutawayLocation')
}
export async function RegisterLocation(locationToRegister) {
    return await instance.post(url + 'Location/RegisterLocation/', locationToRegister)
}
export async function PutawayItemIntoLocation(itemId, locationId) {
    return await instance.post(url + 'Location/PutawayItemIntoLocation/' + itemId + '/' + locationId)
}

//Order
export async function GetAllOrdersMostRecentData() {
    return await instance.get(url + 'Order/GetAllOrdersMostRecentData/')
}
export async function GetOrderById(id) {
    return await instance.get(url + 'Order/GetOrderById/' + id)
}
export async function GetOrderHistoryById(id) {
    return await instance.get(url + 'Order/GetOrderHistoryById/' + id)
}
export async function GetNextOrderWaitingForPicking() {
    return await instance.get(url + 'Order/GetNextOrderWaitingForPicking/' + status)
}
export async function RegisterOrder(order) {
    return await instance.post(url + 'Order/RegisterOrder/', order)
}
export async function AddContainerToOrder(orderId, containerId) {
    return await instance.post(url + 'Order/AddContainerToOrder/' + orderId + '/' + containerId)
}
export async function AddBoxToOrder(orderId, boxId) {
    return await instance.post(url + 'Order/AddBoxToOrder/' + orderId + '/' + boxId)
}
export async function RemoveContainerFromOrder(containerId) {
    return await instance.post(url + 'Order/RemoveContainerFromOrder/' + containerId)
}

//Container
export async function GetAllContainersMostRecentData() {
    return await instance.get(url + 'Container/GetAllContainersMostRecentData/')
}
export async function GetContainerById(id) {
    return await instance.get(url + 'Container/GetContainerById/' + id)
}
export async function GetContainerHistoryById(id) {
    return await instance.get(url + 'Container/GetContainerHistoryById/' + id)
}
export async function RegisterContainer(containerToRegister) {
    return await instance.post(url + 'Container/RegisterContainer/', containerToRegister)
}
export async function PickItemIntoContainer(itemId, containerId) {
    return await instance.post(url + 'Container/PickItemIntoContainer/' + itemId + '/' + containerId)
}

//Box
export async function GetAllBoxesMostRecentData() {
    return await instance.get(url + 'Box/GetAllBoxesMostRecentData/')
}
export async function GetBoxById(id) {
    return await instance.get(url + 'Box/GetBoxById/' + id)
}
export async function GetBoxHistoryById(id) {
    return await instance.get(url + 'Box/GetBoxHistoryById/' + id)
}
export async function RegisterBox(boxToRegister) {
    return await instance.post(url + 'Box/RegisterBox/', boxToRegister)
}
export async function PackItemIntoBox(itemId, boxId) {
    return await instance.post(url + 'Box/PackItemIntoBox/' + itemId + '/' + boxId)
}

//Shipment
export async function GetAllShipmentsMostRecentData() {
    return await instance.get(url + 'Shipment/GetAllShipmentsMostRecentData/')
}
export async function AddBoxToShipment(boxId) {
    return await instance.post(url + 'Shipment/AddBoxToShipment/' + boxId)
}
export async function AddTruckToShipment(shipmentId, licensePlate) {
    return await instance.post(url + 'Shipment/AddTruckToShipment/' + shipmentId + '/' + licensePlate)
}

//Truck
export async function GetAllTrucks() {
    return await instance.get(url + 'Truck/GetAllTrucks/')
}
export async function SetTruckDepartedAsync(truckId) {
    return await instance.post(url + 'Truck/SetTruckDepartedAsync/' + truckId)
}
export async function AddBoxToTruck(boxId, truckId) {
    return await instance.post(url + 'Truck/AddBoxToTruck/' + boxId + '/' + truckId)
}


//WMS
export async function PrintQRCode(objectToRegister) {
    return await instance.post(url + 'WMS/PrintQRCode/', objectToRegister)
}
