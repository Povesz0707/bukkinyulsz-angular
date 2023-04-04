import {Injectable} from "@angular/core";
import {UserStorageService} from "./user-storage-service/user.storage.service";

@Injectable({
  providedIn: 'root'
})
export class StorageServices{

  constructor(public userStorageService: UserStorageService) {
  }
}
