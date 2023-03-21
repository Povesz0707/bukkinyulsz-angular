import {Distance} from "../../model/distance-model/distance";
import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  AdminPageDistanceDialogData
} from "../../pages/admin-page/admin-page-distances/admin-page-distance-dialog/admin.page.distance.dialog";
import {GeneralUtils} from "../../utils/general.utils";

export interface ConfirmDialogData{
  title?:string
  message?:string
}
@Component({
  styleUrls:['confirm.dialog.css'],
  templateUrl:'confirm.dialog.html',
  selector:'confirm-dialog'
})
export class ConfirmDialog implements OnInit{

  ngOnInit(): void {
  }


  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData, private dialogRef: MatDialogRef<ConfirmDialog>) {
  }

  ok() {
    this.dialogRef.close(GeneralUtils.DIALOG_CLOSE_TYPE_OK)
  }
}
