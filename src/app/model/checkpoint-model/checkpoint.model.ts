import {BaseModel} from "../base-model/base.model";

export class Checkpoint extends BaseModel{
  name?:string
  ellatas?:string
  isMainCheckpoint?:boolean
}
