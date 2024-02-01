import {Checkpoint} from "../../../../model/checkpoint-model/checkpoint.model";
import {Component, Inject, OnInit} from "@angular/core";
import {Sponsor} from "../../../../model/sponsor-model/sponsor.model";
import {GeneralUtils} from "../../../../utils/general.utils";
import {GlobalService} from "../../../../services/global.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileUploadRequest} from "../../../../services/fileStore-service/fileStore.service";
import {environment} from "../../../../../environments/environment";
import {Tender} from "../../../../model/render-model/tender.model";

export interface OpenedDialogDialogData{
  id?:number
  openingMode:string
}
@Component({
  styleUrls:['admin.page.tender.dialog.css'],
  templateUrl:'admin.page.tender.dialog.html',
  selector:'admin.page.tender.dialog'
})
export class AdminPageTenderDialog implements OnInit {
  item: Tender = new Tender()
  tileText: string = "Új hozzáaadása"

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils,@Inject(MAT_DIALOG_DATA) public data: OpenedDialogDialogData, private dialogRef: MatDialogRef<OpenedDialogDialogData>) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      if(this.data.id)
        this.globalService.tenderService.get(this.data.id).subscribe(value => {
          this.item = value;
          this.tileText = this.item.name+" szerkesztése"
        })
    }
  }

  save() {
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_NEW){
      this.globalService.tenderService.add(this.item).subscribe(value => {
        this.dialogRef.close();
      })
    }
    else if (this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      this.globalService.tenderService.edit(this.item).subscribe(value => {
        this.dialogRef.close()
      })
    }
  }

  onFileSelected(event: any, uploadDir: string) {
    const file:File = event.target.files[0];
    if (file) {
      this.uploadFile(file, 'tender', uploadDir, this.item.id)
    }
  }

  uploadFile(uploadFile?: File , mainFolder?: string, uploadDir?: string, id?:number){
    if(uploadFile){
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onload = () => {
        var request: FileUploadRequest = {
          baseType: uploadFile.type,
          base64: reader.result,
          name: uploadFile.name,
          folder: mainFolder+'/'+id+'/'+uploadDir
        }
        this.globalService.imageStoreService.upload(request).subscribe(value => {
          this.item.imageUrl = environment.serverUrl +"/fileStore/"+ value.encodedFilePath
        })
      }
    }
  }
}
