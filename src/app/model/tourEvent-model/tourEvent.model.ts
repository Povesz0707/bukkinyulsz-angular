import {TourEventDistance} from "../tourEvent-distance-model/tourEvent.distance.model";
import {BaseModel} from "../base-model/base.model";

export class TourEvent extends BaseModel{
  name?:string
  applicationDeadline?:Date
  dateOfEvent?:Date
  active?:boolean
  tourEventDistances?:TourEventDistance[]
}
