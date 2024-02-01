import {Distance} from "../distance-model/distance";
import {Shirt} from "../shirt-model/shirt-model";

export class RegistrationUserModel {
  firstName?: string
  lastName?:string
  email?: string
  phoneNumber?: string
  birthDay?: string
  livingPlace?: string
  distance?:Distance
  needShirt?:boolean
  shirt?:Shirt
  needFinishFood?:boolean
  finishFoodPrice?:number
}
