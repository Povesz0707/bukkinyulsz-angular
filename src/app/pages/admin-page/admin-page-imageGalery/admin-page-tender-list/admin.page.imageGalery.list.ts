import {Component, OnInit, ViewChild} from "@angular/core";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Checkpoint} from "../../../../model/checkpoint-model/checkpoint.model";
import {Sponsor} from "../../../../model/sponsor-model/sponsor.model";
import {MatTableDataSource} from "@angular/material/table";
import {
  AdminPageCheckpointDialog,
  AdminPageCheckpointDialogData
} from "../../admin-page-checkpoint/admin-page-checkpoint-dialog/admin.page.checkpoint.dialog";
import {AdminPageImageGaleryDialog, OpenedDialogDialogData} from "../admin-page-tender-dialog/admin-page-image-galery-dialog.component";
import {SubSection} from "../../../../model/subSection-model/subSection.model";
import {
  AdminPageSubSectionDialog,
  AdminPageSubSectionDialogData
} from "../../admin-page-subSection/admin-page-subSection-dialog/admin.page.subSection.dialog";
import {Tender} from "../../../../model/render-model/tender.model";
import {GaleryImage} from "../../../../model/galeryImage-model/galeryImage.model";

@Component({
  styleUrls:['admin.page.imageGalery.list.css'],
  templateUrl:'admin.page.imageGalery.list.html',
  selector:'admin-page-imageGalery-list'
})
export class AdminPageImageGaleryList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select','id','image','name','description','hasImageUrl','active','action'];
  selectedData = new SelectionModel<Tender>(true, []);
  list: GaleryImage[] = [];
  dataSource: MatTableDataSource<GaleryImage>

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }
  ngOnInit(): void {
    this.getRefreshData()
  }
  getRefreshData(){
    this.globalService.galeryImageService.list().subscribe(res => {
      this.list = res;
      this.dataSource = new MatTableDataSource<GaleryImage>(this.list);
      this.dataSource.sort = this.sort;
      this.selectedData = new SelectionModel<GaleryImage>(true, [])
    })
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selectedData.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedData.clear();
      return;
    }
    this.selectedData.select(...this.dataSource.data);
  }

  addNew() {
    var data: OpenedDialogDialogData = {
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_NEW
    }
    this.generalUtils.openDialog100vw100vh(AdminPageImageGaleryDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }
  openEdit(item: GaleryImage) {
    if(item){
      var data: OpenedDialogDialogData = {
        id: item.id,
        openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
      }
      this.generalUtils.openDialog100vw100vh(AdminPageImageGaleryDialog, data).afterClosed().subscribe(value => {
        this.getRefreshData()
      })
    }
  }

  deleteItem(item: GaleryImage) {
    var message = item.name
    this.globalService.dialogService.openDeleteConfirmDialog("Kép", message).subscribe(value => {
      if(value == GeneralUtils.DIALOG_CLOSE_TYPE_OK){
        if(item.id)
          this.globalService.galeryImageService.delete(item.id).subscribe(result => {
            this.getRefreshData()
          })
      }
    })
  }
}
