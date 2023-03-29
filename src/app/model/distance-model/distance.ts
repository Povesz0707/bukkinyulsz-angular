import {BaseModel} from "../base-model/base.model";
import {SubSection} from "../subSection-model/subSection.model";
import {Reward} from "../reward-model/reward.model";
import {DistanceSubSection} from "../distance-subSection-model/distance.subSection.model";

export class Distance extends BaseModel{
  name?:string
  length?:number
  logoUrl?:string
  descriptionURL?:string
  mapURL?:string
  startPlace?:string
  finishPlace?:string
  startTimeFrom?:Date
  startTimeTo?:Date
  timeLimit?:Date
  price?:number
  maxNumberOfCompetitor?:number
  description?:string
  gpxURL?:string
  approach?:string
  receiptOfItinerary?:string
  receiptOfItineraryFrom?:Date
  receiptOfItineraryTo?:Date
  timekeepingType?:string
  services?:string
  distanceSubsections?:DistanceSubSection[]
  subSections?:SubSection[]
  rewards?:Reward[]
}
