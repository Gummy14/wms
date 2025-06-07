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
export async function AddBoxToOrder(orderId, boxId) {
    return await instance.post(url + 'Order/AddBoxToOrder/' + orderId + '/' + boxId)
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
export async function PickItemIntoBox(itemId, boxId) {
    return await instance.post(url + 'Box/PickItemIntoBox/' + itemId + '/' + boxId)
}

//Shipment
export async function GetAllShipmentsMostRecentData() {
    return await instance.get(url + 'Shipment/GetAllShipmentsMostRecentData/')
}
export async function AddBoxToShipment(boxId) {
    return await instance.post(url + 'Shipment/AddBoxToShipment/' + boxId)
}

//Truck
export async function GetAllTrucks() {
    return await instance.get(url + 'Truck/GetAllTrucks/')
}
export async function SetTruckDepartedAsync(truckId) {
    return await instance.post(url + 'Truck/SetTruckDepartedAsync/' + truckId)
}
export async function AddShipmentToTruck(shipmentId, truckId) {
    return await instance.post(url + 'Truck/AddShipmentToTruck/' + shipmentId + '/' + truckId)
}


//WMS
export async function PrintQRCode(objectToRegister) {
    return await instance.post(url + 'WMS/PrintQRCode/', objectToRegister)
}
