import {Distance} from "../distance-model/distance";
import {SubSection} from "../subSection-model/subSection.model";
import {BaseModel} from "../base-model/base.model";

export class GaleryImage extends BaseModel{
  name?:string
  description?:string
  imageUrl?:string
  active?:boolean
}
