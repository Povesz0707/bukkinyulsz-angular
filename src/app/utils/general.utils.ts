import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {SubSection} from "../model/subSection-model/subSection.model";
import {formatDate} from "@angular/common";
import {Distance} from "../model/distance-model/distance";
import {DistanceSubSection} from "../model/distance-subSection-model/distance.subSection.model";
import {BaseModel} from "../model/base-model/base.model";
export interface RegistrationType{
  name:string,
  displayValue:string
}
@Injectable({
  providedIn: 'root',
})
export class GeneralUtils{
  static DIALOG_OPENING_TYPE_EDIT: string = "edit"
  static DIALOG_OPENING_TYPE_NEW: string = "new"
  static DIALOG_CLOSE_TYPE_OK = 'ok'
  static DIALOG_CLOSE_TYPE_CANCLE = 'cancle'
  MAX_DATE = "9999-12-31"
  MAX_DATE_TIME = "9999-12-31T23:59"
  CHECKING_TYPE_PERSONAL = "personal"
  CHECKING_TYPE_CODE = "code"


  constructor(private dialog: MatDialog) {
  }

  getBooleanToClass(b?:boolean){
    if(b == true) return ' bi bi-check2 text-success font-weight-bold '
    else if(b == false) return ' bi bi-x-lg text-danger font-weight-bold '
    return ' bi bi-dash text-secondary font-weight-bold '
  }

  getBooleanToTooltip(b?:boolean){
    if(b == true) return 'Igen'
    else if(b == false) return 'Nem'
    return 'Nincs meghatározva'
  }

  isEmpty(s?:string){
    if(s == undefined || s == null) return true;
    if(s.trim().length == 0) return true;
    return false;
  }

  getHUNTextIsEmpty(s?:string){
    return this.getBooleanToTooltip(!this.isEmpty(s));
  }

  getValidationBooleanToTooltip(b?:boolean){
    if(b == true) return 'Helyesen kitöltött'
     return 'Hibás kitöltés'
  }

  openDialog100w(dialogComponent: any, data: any){
    return this.dialog.open(dialogComponent, {data: data, width: '100%'});
  }

  openSimpleDialog(dialogComponent: any, data: any){
    return this.dialog.open(dialogComponent, {data: data});
  }

  openDialog100vw100vh(dialog: any, data: any){
    return this.dialog.open(dialog, {data: data, width: '100vw', maxWidth: '100vw', height: '100vh',maxHeight:'80vh', panelClass:'warning-dialog'});
  }


  sumDistanceByDistanceSubSection(sub?: DistanceSubSection[]){
    if(sub == undefined) return ''
    var sum = 0;
    sub.forEach(value => {
      if(value?.subSection && value?.subSection?.subLength)
        sum += value?.subSection?.subLength
    })
    return sum
  }

  sumDistanceByDistance(distance?:Distance){
    if(distance == undefined) return ''
    var sum = 0;
    distance.distanceSubsections?.forEach(distanceSubsection => {
      if(distanceSubsection.subSection?.subLength)
        sum += distanceSubsection.subSection?.subLength
    })
    return sum
  }

  sumAllElevationByDistanceSubSection(sub?: DistanceSubSection[]){
    if(sub == undefined) return ''
    var sum = 0;
    sub.forEach(value => {
      if(value?.subSection && value?.subSection?.subElevationGain)
        sum += value?.subSection?.subElevationGain
    })
    return sum
  }

  getRegistrationTypes(): RegistrationType[] {
    var types: RegistrationType[] = []
    types.push({name: 'SIMPLE', displayValue: 'Egyéni'})
    types.push({name: 'MULTI', displayValue: 'Csoportos'})
    return types
  }


  sumAllElevationByDistance(distance?:Distance){
    if(distance == undefined) return ''
    var sum = 0;
    distance.distanceSubsections?.forEach(distanceSubsection => {
      if(distanceSubsection.subSection?.subElevationGain)
        sum += distanceSubsection.subSection?.subElevationGain
    })
    return sum
  }

  getSubstring(s:string | undefined, n: number){
    if(s == undefined) return
    if(s.length < n) return s;
    return s.slice(0,n) + "...";
  }



  getSublistDistanceSum(itemList?:any[], item?: any){
    //console.log(itemList?.slice(0, this.getIndex(itemList, item) + 1))
    return this.sumDistanceByDistanceSubSection(itemList?.slice(0, this.getIndex(itemList, item) + 1))
  }
  getSublistElevationSum(itemList?:any[], item?: any){
    return this.sumAllElevationByDistanceSubSection(itemList?.slice(0, this.getIndex(itemList, item) + 1))
  }

  getIndex(itemList?: any[], item?: any){
    if(itemList == undefined || item == undefined) return -1;
    return itemList.indexOf(item);
  }

  getIndexById(itemList?:BaseModel[], item?:BaseModel){
    if(itemList){
      for(let i of itemList){
        if(i.id == item?.id) return i;
      }
    }
    return undefined
  }



  getLocaleTimeString(d?: Date):string{
    if(d == undefined) return ''
    var date = this.fixHours(new Date(d))
    if(date){
      var value = new Date(d).toISOString().slice(10,16).replace("T"," ")
      return value
    }
    return ''
  }
  getLocaleTimeHourMinString(d?: Date):string{
    if(d == undefined) return ''
    var date = new Date(d)
    return date.toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute:'2-digit'
    })
  }

  getYearString(d?: Date):any{
    if(d == undefined) return ''
    return new Date(d).getFullYear()
  }
  getLocaleDateString(d?: Date){
    if(d == undefined) return ''
    var date = this.fixHours(new Date(d))
    if(date){
      var value = new Date(d).toISOString().slice(0,10).replace("T"," ")
      return value
    }
    return ''
  }

  weekday = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"];
  getLocaleDateTimeString(d?: Date){
    if(d == undefined) return ''
    return this.getLocaleDateString(d) + " "+ this.getLocaleTimeString(d)
  }

  getDateTimeStringFromDatabase(d?: Date){
    if(d == undefined) return ''
    var value = new Date(d).toISOString().slice(0,16).replace("T"," ")
    return value
  }

  fixHours(d?:Date){
    if(d){
      return new Date(d.setHours(d.getHours() +Math.abs(d.getTimezoneOffset() / 60)))
    }
    return undefined;
  }

  getDayName(d?: Date){
    if(d == undefined) return ''
    var date = new Date(d)
    return this.weekday[date.getDay()]
  }

  dateLesserThen(actualDate?:Date, controlDate ?:Date){
    if(actualDate && controlDate){
      var actualDateTime = new Date(actualDate).getTime();
      var controlDateTime = new Date(controlDate).getTime();
      return actualDateTime <= controlDateTime
    }
    return false
  }
  dateHigherThen(actualDate?:Date, controlDate ?:Date){
    if(actualDate && controlDate){
      var actualDateTime = new Date(actualDate).getTime();
      var controlDateTime = new Date(controlDate).getTime();
      return actualDateTime >= controlDateTime
    }
    return false
  }

  dateBetween(fromDate?:Date, toDate ?:Date){
    return this.dateLesserThen(new Date(), toDate) && this.dateHigherThen(new Date(), fromDate)
  }

}
