import {Component, Inject, OnInit} from "@angular/core";
import {Distance} from "../../../../model/distance-model/distance";
import {TourEvent} from "../../../../model/tourEvent-model/tourEvent.model";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  AdminPageDistanceDialogData
} from "../../admin-page-distances/admin-page-distance-dialog/admin.page.distance.dialog";

export interface AdminPageEventDialogData{
  item:TourEvent
  openingMode?:string
}
@Component({
  styleUrls:['admin.page.event.dialog.css'],
  templateUrl:'admin.page.event.dialog.html',
  selector:'admin-page-event-dialog'
})
export class AdminPageEventDialog implements OnInit{
  tourEvent:TourEvent = new TourEvent()
  tileText:string = "Új esemény hozzáaadása"

  incomeTourEventApplicationTo?:string
  incomeTourEventApplicationFrom?: string;
  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils,@Inject(MAT_DIALOG_DATA) public data: AdminPageEventDialogData, private dialogRef: MatDialogRef<AdminPageEventDialog>) {
  }
  ngOnInit(): void {
    this.getData()
  }

  getData(){
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      if(this.data.item.id)
        this.globalService.tourEventService.get(this.data.item.id).subscribe(value => {
          this.tourEvent = value;
          this.tileText = this.tourEvent.name+" esemény szerkesztése"
          this.incomeTourEventApplicationTo = this.generalUtils.getDateTimeStringFromDatabase(value.applicationTo)
          this.incomeTourEventApplicationFrom = this.generalUtils.getDateTimeStringFromDatabase(value.applicationFrom)
        })
    }
  }

  fixDates(){
    if(this.incomeTourEventApplicationTo){
      this.tourEvent.applicationTo = this.generalUtils.fixHours(new Date(this.incomeTourEventApplicationTo))
    }
    if(this.incomeTourEventApplicationFrom){
      this.tourEvent.applicationFrom = this.generalUtils.fixHours(new Date(this.incomeTourEventApplicationFrom))
    }
  }




  save() {
    this.fixDates()
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_NEW){
      this.globalService.tourEventService.add(this.tourEvent).subscribe(value => {
        this.dialogRef.close();
      })
    }
    else if (this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      this.globalService.tourEventService.edit(this.tourEvent).subscribe(value => {
        this.dialogRef.close()
      })
    }
  }

}
