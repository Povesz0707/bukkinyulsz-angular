import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {SubSection} from "../model/subSection-model/subSection.model";

@Injectable({
  providedIn: 'root',
})
export class GeneralUtils{
  static DIALOG_OPENING_TYPE_EDIT: string = "edit"
  static DIALOG_OPENING_TYPE_NEW: string = "new"
  static DIALOG_CLOSE_TYPE_OK = 'ok'
  static DIALOG_CLOSE_TYPE_CANCLE = 'cancle'


  constructor(private dialog: MatDialog) {
  }

  getBooleanToClass(b?:boolean){
    if(b == true) return ' bi bi-check2 text-success font-weight-bold '
    else if(b == false) return ' bi bi-x-lg text-danger font-weight-bold '
    return ' bi bi-dash text-secondary font-weight-bold '
  }

  openDialog(dialogComponent: any, data: any){
    return this.dialog.open(dialogComponent, {data: data, width: '100%'});
  }
  openDialog100Percent(dialog: any, data: any){
    return this.dialog.open(dialog, {data: data, width: '100vw', maxWidth: '100vw', height: '100vh',maxHeight:'80vh', panelClass:'warning-dialog'});
  }

  sumAllElevation(sub: SubSection[] | undefined){
    if(sub == undefined) return ''
    var sum = 0;
    sub.forEach(value => {
      if(value.subElevationGain)
      sum += value.subElevationGain
    })
    return sum
  }

  sumDistance(sub?: SubSection[]){
    if(sub == undefined) return ''
    var sum = 0;
    sub.forEach(value => {
      if(value.subLength)
        sum += value.subLength
    })
    return sum
  }

  getSublistDistanceSum(itemList?:any[], item?: any){
    return this.sumDistance(itemList?.slice(0, this.getIndex(itemList, item) + 1))
  }
  getSublistElevationSum(itemList?:any[], item?: any){
    return this.sumAllElevation(itemList?.slice(0, this.getIndex(itemList, item) + 1))
  }

  getIndex(itemList?: any[], item?: any){
    if(itemList == undefined || item == undefined) return -1;
    return itemList.indexOf(item);
  }



  getLocaleTimeString(d?: Date):string{
    if(d == undefined) return ''
    var date = new Date(d)
    return date.toLocaleTimeString()
  }
  getLocaleTimeHourMinString(d?: Date):string{
    if(d == undefined) return ''
    var date = new Date(d)
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    })
  }
  getLocaleDateString(d?: Date):string{
    if(d == undefined) return ''
    var date = new Date(d)
    return date.toLocaleDateString()
  }
  weekday = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"];
  getLocaleDateTimeString(d?: Date){
    if(d == undefined) return ''
    var date = new Date(d)
    return this.getLocaleDateString(d) + " "+ this.getLocaleTimeString(d)
  }

  getDayName(d?: Date){
    if(d == undefined) return ''
    var date = new Date(d)
    return this.weekday[date.getDay()]
  }
}
