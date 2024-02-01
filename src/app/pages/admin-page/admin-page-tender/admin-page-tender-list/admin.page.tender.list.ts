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
import {AdminPageTenderDialog, OpenedDialogDialogData} from "../admin-page-tender-dialog/admin.page.tender.dialog";
import {SubSection} from "../../../../model/subSection-model/subSection.model";
import {
  AdminPageSubSectionDialog,
  AdminPageSubSectionDialogData
} from "../../admin-page-subSection/admin-page-subSection-dialog/admin.page.subSection.dialog";
import {Tender} from "../../../../model/render-model/tender.model";

@Component({
  styleUrls:['admin.page.tender.list.css'],
  templateUrl:'admin.page.tender.list.html',
  selector:'admin-page-tender-list'
})
export class AdminPageTenderList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select','id','name','description','hasRedirectUrl','hasImageUrl','active','action'];
  selectedData = new SelectionModel<Tender>(true, []);
  list: Tender[] = [];
  dataSource: MatTableDataSource<Tender>

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }
  ngOnInit(): void {
    this.getRefreshData()
  }
  getRefreshData(){
    this.globalService.tenderService.list().subscribe(res => {
      this.list = res;
      this.dataSource = new MatTableDataSource<Tender>(this.list);
      this.dataSource.sort = this.sort;
      this.selectedData = new SelectionModel<Tender>(true, [])
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
    this.generalUtils.openDialog100vw100vh(AdminPageTenderDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }
  openEdit(item: Sponsor) {
    if(item){
      var data: OpenedDialogDialogData = {
        id: item.id,
        openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
      }
      this.generalUtils.openDialog100vw100vh(AdminPageTenderDialog, data).afterClosed().subscribe(value => {
        this.getRefreshData()
      })
    }
  }

  deleteItem(item: Sponsor) {
    var message = item.name
    this.globalService.dialogService.openDeleteConfirmDialog("Pályázatok", message).subscribe(value => {
      if(value == GeneralUtils.DIALOG_CLOSE_TYPE_OK){
        if(item.id)
          this.globalService.tenderService.delete(item.id).subscribe(result => {
            this.getRefreshData()
          })
      }
    })
  }
}
