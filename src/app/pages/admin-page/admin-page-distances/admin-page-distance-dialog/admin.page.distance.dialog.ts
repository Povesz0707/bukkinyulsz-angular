import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Distance} from "../../../../model/distance-model/distance";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {TourEvent} from "../../../../model/tourEvent-model/tourEvent.model";
import {TourEventDistance} from "../../../../model/tourEvent-distance-model/tourEvent.distance.model";
import {
  FileStoreService,
  FileUploadRequest,
  FileUploadResponse
} from "../../../../services/fileStore-service/fileStore.service";
import * as domain from "domain";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

export interface AdminPageDistanceDialogData{
  item:Distance,
  tourEvent:TourEvent,
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
  logoLoading: boolean = false;
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
      var newItem: TourEventDistance = {
        distance: this.distance,
        tourEvent: this.data.tourEvent
      }
      this.globalService.tourEventDistanceService.add(newItem).subscribe(value => {
        this.dialogRef.close();
      })
    }
    else if (this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      this.globalService.distanceService.edit(this.distance).subscribe(value => {
        this.uploadAllFiles(value.id)
        this.dialogRef.close()
      })
    }
  }
  logoFile: File
  gpxFile?:File
  leirasFile?:File
  terkepFile?:File

  uploadAllFiles(id?: number){
    this.uploadFile(this.logoFile, 'distance','logoUrl', id)
    this.uploadFile(this.logoFile, 'distance','gpxFile', id)
    this.uploadFile(this.logoFile, 'distance','leirasFile', id)
    this.uploadFile(this.logoFile, 'distance','terkepFile', id)
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
          if(uploadDir == 'logoUrl')  this.distance.logoUrl = environment.serverUrl +"/fileStore/"+ value.encodedFilePath
          if(uploadDir == 'gpxURL')  this.distance.gpxURL = environment.serverUrl +"/fileStore/"+ value.encodedFilePath
          if(uploadDir == 'descriptionURL')  this.distance.descriptionURL = environment.serverUrl +"/fileStore/"+ value.encodedFilePath
          if(uploadDir == 'mapURL')  this.distance.mapURL = environment.serverUrl +"/fileStore/"+ value.encodedFilePath

        })
      }
    }

  }
  onFileSelected(event: any, uploadDir: string) {
    const file:File = event.target.files[0];
    if (file) {
      if(uploadDir == 'logoUrl') this.uploadFile(file, 'distance', uploadDir, this.distance.id)
      if(uploadDir == 'mapURL') this.uploadFile(file, 'distance', uploadDir, this.distance.id)
      if(uploadDir == 'descriptionURL') this.uploadFile(file, 'distance', uploadDir, this.distance.id)
      if(uploadDir == 'gpxURL') this.uploadFile(file, 'distance', uploadDir, this.distance.id)

    }
  }
}
