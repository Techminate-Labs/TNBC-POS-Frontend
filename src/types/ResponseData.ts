export default interface Response {
    data: ResponseData,
    status: Number,
    statusText: String,
    headers: Object,
    config: Object,
    request: Object
}

export interface ResponseData {
    message: String
}