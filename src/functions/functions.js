import axios from 'axios'

const baseUrl = 'https://localhost:7187/'

//WMS
export async function GetAllWarehouseObjects() {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseObjects/')
}
export async function GetAllWarehouseObjectsByType(objectType) {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseObjectsByType/' + objectType)
}
export async function GetWarehouseObjectById(objectId) {
    return await axios.get(baseUrl + 'WMS/GetWarehouseObjectById/' + objectId)
}
export async function GetWarehouseParentObjectWithChildrenByParentId(parentObjectId) {
    return await axios.get(baseUrl + 'WMS/GetWarehouseParentObjectWithChildrenByParentId/' + parentObjectId)
}
export async function GetAllWarehouseOrderObjectsWithChildren() {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseOrderObjectsWithChildren/')
}
export async function GetWarehouseOrderObjectWithChildrenByOrderId(orderObjectId) {
    return await axios.get(baseUrl + 'WMS/GetWarehouseOrderObjectWithChildrenByOrderId/' + orderObjectId)
}
export async function GetWarehouseOrderObjectWithChildrenByEventType(eventType) {
    return await axios.get(baseUrl + 'WMS/GetWarehouseOrderObjectWithChildrenByEventType/' + eventType)
}
export async function PrintQRCode(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/PrintQRCode/', objectToRegister)
}
export async function RegisterWarehouseObject(objectToRegister) {
    return await axios.post(baseUrl + 'WMS/RegisterWarehouseObject', objectToRegister)
}
export async function UpdateWarehouseObject(warehouseObject) {
    return await axios.post(baseUrl + 'WMS/UpdateWarehouseObject', warehouseObject)
}
export async function CreateWarehouseObjectRelationship(objectRelationshipToRegister) {
    return await axios.post(baseUrl + 'WMS/CreateWarehouseObjectRelationship', objectRelationshipToRegister)
}

//Order
export async function GetOrderByContainerId(containerId) {
    return await axios.get(baseUrl + 'Order/GetOrderByContainerId/' + containerId)
}
export async function RegisterOrder(newOrderItems) {
    return await axios.post(baseUrl + 'Order/RegisterOrder/', newOrderItems)
}

//EventTypes
export async function GetAllEventTypes() {
    return await axios.get(baseUrl + 'EventTypes/GetAllEventTypes/')
}

//Other
export async function GetPutawayLocation() {
    return await axios.get(baseUrl + 'Putaway/GetPutawayLocation')
}
export async function PickItem(item) {
    return await axios.post(baseUrl + 'Pick/PickItem/', item)
}

