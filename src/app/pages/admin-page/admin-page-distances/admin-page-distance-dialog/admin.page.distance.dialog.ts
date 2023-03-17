import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Distance} from "../../../../model/distance-model/distance";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";

export interface AdminPageDistanceDialogData{
  item:Distance,
  openingMode?:string
}
@Component({
  styleUrls:['admin.page.distance.dialog.css'],
  templateUrl:'admin.page.distance.dialog.html',
  selector:'admin-page-distance-dialog'
})
export class AdminPageDistanceDialog implements OnInit{
  distance:Distance = new Distance()
  openingTypeText:string = "Új táv hozzáaadása"
  ngOnInit(): void {
    this.getData()

  }
  getData(){
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      if(this.data.item.id)
      this.globalService.distanceService.get(this.data.item.id).subscribe(value => {
        this.distance = value;
        this.openingTypeText = this.distance.length + " - "+this.distance.name+" táv szerkesztése"
      })
    }
  }
  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils, @Inject(MAT_DIALOG_DATA) public data: AdminPageDistanceDialogData, private dialogRef: MatDialogRef<AdminPageDistanceDialog>) {
  }

  save() {
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_NEW){
      this.globalService.distanceService.add(this.distance).subscribe(value => {
        this.dialogRef.close();
      })
    }
    else if (this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      this.globalService.distanceService.edit(this.distance).subscribe(value => {
        this.dialogRef.close()
      })
    }
  }
}
