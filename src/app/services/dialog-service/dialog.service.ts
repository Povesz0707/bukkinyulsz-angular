import {Injectable} from "@angular/core";
import {GeneralUtils} from "../../utils/general.utils";
import {ConfirmDialog, ConfirmDialogData} from "../../dialogs/confirm-dialog/confirm.dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  constructor(private generalUtils: GeneralUtils) {
  }

  public openDeleteConfirmDialog(title?:string, message?:string){

    var data: ConfirmDialogData = {
      title: 'Biztos törölni akarja a(z) '+ title + '-t?',
      message: message
    }
    return this.generalUtils.openDialog100w(ConfirmDialog, data).afterClosed()
  }
}
