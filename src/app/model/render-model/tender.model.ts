import {BaseModel} from "../base-model/base.model";

export class Tender extends BaseModel{
  name?:string;
  description?:string;
  redirectUrl?:string;
  imageUrl?:string;
  active?:boolean
}
