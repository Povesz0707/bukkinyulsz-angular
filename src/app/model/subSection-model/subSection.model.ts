import {BaseModel} from "../base-model/base.model";
import {Checkpoint} from "../checkpoint-model/checkpoint.model";
import {Marking} from "../marking-model/marking.model";
import {SubSectionMarking} from "../subSection-marking-model/subSection.marking.model";

export class SubSection extends BaseModel{
  position?:number
  checkpointFrom?:Checkpoint
  checkpointTo?:Checkpoint
  subLength?:number
  subElevationGain?:number
  markings?:SubSectionMarking[]
}
