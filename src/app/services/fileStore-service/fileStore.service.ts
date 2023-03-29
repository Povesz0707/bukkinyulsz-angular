import {Injectable} from "@angular/core";
import {BaseService} from "../base-service/base-service.service";
import {ImageStore} from "../../model/imageStore-model/imageStore.model";
import {HttpClient} from "@angular/common/http";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
import {Observable} from "rxjs";
import {TourEventDistance} from "../../model/tourEvent-distance-model/tourEvent.distance.model";

export interface FileUploadRequest {
  baseType: string
  name: string
  base64: any
  folder:string
}
export interface FileUploadResponse {
  encodedFilePath: string
}
@Injectable({
  providedIn: 'root'
})
export class FileStoreService extends BaseService<ImageStore>{
  constructor(override http: HttpClient) {
    super("fileStore");
  }

  upload(request: FileUploadRequest): Observable<FileUploadResponse>{
    return this.http.post<FileUploadResponse>(`${this.apiMethodDir}/upload`,request);
  }
}
