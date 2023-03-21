import {TourEventDistance} from "../tourEvent-distance-model/tourEvent.distance.model";
import {BaseModel} from "../base-model/base.model";

export class TourEvent extends BaseModel{
  name?:string
  applicationFrom?:Date
  applicationTo?:Date
  dateOfEvent?:Date
  placeOfEvent?:string
  active?:boolean
  tourEventDistances?:TourEventDistance[]
}
