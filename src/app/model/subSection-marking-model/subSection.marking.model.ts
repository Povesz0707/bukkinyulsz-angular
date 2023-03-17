import {SubSection} from "../subSection-model/subSection.model";
import {BaseModel} from "../base-model/base.model";
import {Marking} from "../marking-model/marking.model";

export class SubSectionMarking extends BaseModel{
  subSection?:SubSection
  marking?:Marking
}
