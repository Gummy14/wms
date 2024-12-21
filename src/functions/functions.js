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
export async function GetAllWarehouseRelationships() {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseRelationships/')
}
export async function GetAllWarehouseRelationshipsByParentId(parentObjectId) {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseRelationshipsByParentId/' + parentObjectId)
}
export async function GetAllWarehouseRelationshipsByChildId(childObjectId) {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseRelationshipsByChildId/' + childObjectId)
}
export async function GetAllWarehouseRelationshipsByParentType(objectType) {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseRelationshipsByParentType/' + objectType)
}
export async function GetAllWarehouseRelationshipsByParentStatus(status) {
    return await axios.get(baseUrl + 'WMS/GetAllWarehouseRelationshipsByParentStatus/' + status)
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
export async function RegisterWarehouseObjectRelationship(objectRelationshipToRegister) {
    return await axios.post(baseUrl + 'WMS/RegisterWarehouseObjectRelationship', objectRelationshipToRegister)
}
export async function UpdateWarehouseObjectRelationship(warehouseObjectRelationship) {
    return await axios.post(baseUrl + 'WMS/UpdateWarehouseObjectRelationship', warehouseObjectRelationship)
}

//Order
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

