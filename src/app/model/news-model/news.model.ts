import {BaseModel} from "../base-model/base.model";

export class News extends BaseModel{
  title?:string;
  subTitle?:string;
  content?:string;
  imageURL?:string;
  active?:boolean
}
