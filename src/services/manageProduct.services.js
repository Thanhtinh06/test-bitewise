import { http } from "../constant/api"

export const manageProductServices = {
  getData : () => http.get(`https://api.npoint.io/41e0054d101b60de325c`),
  getDataQuestion2 : () => http.get(`https://api.npoint.io/dff346ad58db47375bbf`)
}