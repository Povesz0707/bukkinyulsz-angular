import {Component, Inject, OnInit} from "@angular/core";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdminPageEventDialogData} from "../../admin-page-event/admin-page-event-dialog/admin.page.event.dialog";
import {TourEvent} from "../../../../model/tourEvent-model/tourEvent.model";
import {Checkpoint} from "../../../../model/checkpoint-model/checkpoint.model";
import {TourEventDistance} from "../../../../model/tourEvent-distance-model/tourEvent.distance.model";

export interface AdminPageCheckpointDialogData{
  item:Checkpoint
  openingMode?:string
}
@Component({
  styleUrls:['admin.page.checkpoint.dialog.css'],
  templateUrl:'admin.page.checkpoint.dialog.html',
  selector:'admin-page-checkpoint-dialog'
})
export class AdminPageCheckpointDialog implements OnInit{
  checkpoint:Checkpoint = new Checkpoint()
  tileText:string = "Új ellenörzőpont hozzáaadása"
  ngOnInit(): void {
    this.getData()
  }

  getData(){
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      if(this.data.item.id)
        this.globalService.checkpointService.get(this.data.item.id).subscribe(value => {
          this.checkpoint = value;
          this.tileText = this.checkpoint.name+" ellenörzőpont szerkesztése"
        })
    }
  }

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils,@Inject(MAT_DIALOG_DATA) public data: AdminPageCheckpointDialogData, private dialogRef: MatDialogRef<AdminPageCheckpointDialog>) {
  }

  save() {
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_NEW){
      this.globalService.checkpointService.add(this.checkpoint).subscribe(value => {
        this.dialogRef.close();
      })
    }
    else if (this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      this.globalService.checkpointService.edit(this.checkpoint).subscribe(value => {
        this.dialogRef.close()
      })
    }
  }
}
