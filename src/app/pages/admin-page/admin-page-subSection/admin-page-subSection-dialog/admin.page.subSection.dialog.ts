import {Component, Inject, OnInit} from "@angular/core";
import {Checkpoint} from "../../../../model/checkpoint-model/checkpoint.model";
import {SubSection} from "../../../../model/subSection-model/subSection.model";
import {Distance} from "../../../../model/distance-model/distance";
import {GeneralUtils} from "../../../../utils/general.utils";
import {GlobalService} from "../../../../services/global.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  AdminPageCheckpointDialogData
} from "../../admin-page-checkpoint/admin-page-checkpoint-dialog/admin.page.checkpoint.dialog";
import {TourEventDistance} from "../../../../model/tourEvent-distance-model/tourEvent.distance.model";
import {DistanceSubSection} from "../../../../model/distance-subSection-model/distance.subSection.model";

export interface AdminPageSubSectionDialogData{
  distance: Distance
  item:SubSection
  openingMode?:string
}
@Component({
  styleUrls:['admin.page.subSection.dialog.css'],
  templateUrl:'admin.page.subSection.dialog.html',
  selector:'admin-page-subSection-dialog'
})
export class AdminPageSubSectionDialog implements OnInit{
  tileText:string = "Új szakasz hozzáaadása"
  subSection: SubSection = new SubSection()
  availableCheckpoints: Checkpoint[];
  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.globalService.checkpointService.list().subscribe(value => {
      this.availableCheckpoints = value;
      if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
        if(this.data.item.id)
          this.globalService.subSectionService.get(this.data.item.id).subscribe(value => {
            this.subSection = value;
            this.availableCheckpoints.forEach(value1 => {
              if(value1.id == this.subSection.checkpointTo?.id){
                this.subSection.checkpointTo = value1;
              }
              if(value1.id == this.subSection.checkpointFrom?.id){
                this.subSection.checkpointFrom = value1;
              }
            })
            this.tileText = this.subSection+" ellenörzőpont szerkesztése"
          })
      }
    })

  }

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils,@Inject(MAT_DIALOG_DATA) public data: AdminPageSubSectionDialogData, private dialogRef: MatDialogRef<AdminPageSubSectionDialog>) {
  }

  save() {
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_NEW){
      var newItem: DistanceSubSection = {
        distance: this.data.distance,
        subSection: this.subSection
      }
      this.globalService.distanceSubSectionService.add(newItem).subscribe(value => {
        this.dialogRef.close();
      })
    }
    else if (this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      this.globalService.subSectionService.edit(this.subSection).subscribe(value => {
        this.dialogRef.close()
      })
    }
  }
}
