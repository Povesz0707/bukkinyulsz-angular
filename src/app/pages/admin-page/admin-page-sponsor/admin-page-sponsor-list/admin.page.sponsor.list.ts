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
import {AdminPageSponsorDialog, OpenedDialogDialogData} from "../admin-page-sponsor-dialog/admin.page.sponsor.dialog";
import {SubSection} from "../../../../model/subSection-model/subSection.model";
import {
  AdminPageSubSectionDialog,
  AdminPageSubSectionDialogData
} from "../../admin-page-subSection/admin-page-subSection-dialog/admin.page.subSection.dialog";

@Component({
  styleUrls:['admin.page.sponsor.list.css'],
  templateUrl:'admin.page.sponsor.list.html',
  selector:'admin-page-sponsor-list'
})
export class AdminPageSponsorList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select','id','name','description','hasRedirectUrl','hasImageUrl','active','action'];
  selectedData = new SelectionModel<Sponsor>(true, []);
  list: Sponsor[] = [];
  dataSource: MatTableDataSource<Sponsor>

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }
  ngOnInit(): void {
    this.getRefreshData()
  }
  getRefreshData(){
    this.globalService.sponsorService.list().subscribe(res => {
      this.list = res;
      this.dataSource = new MatTableDataSource<Sponsor>(this.list);
      this.dataSource.sort = this.sort;
      this.selectedData = new SelectionModel<Sponsor>(true, [])
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
    this.generalUtils.openDialog100vw100vh(AdminPageSponsorDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }
  openEdit(item: Sponsor) {
    if(item){
      var data: OpenedDialogDialogData = {
        id: item.id,
        openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
      }
      this.generalUtils.openDialog100vw100vh(AdminPageSponsorDialog, data).afterClosed().subscribe(value => {
        this.getRefreshData()
      })
    }
  }

  deleteItem(item: Sponsor) {
    var message = item.name
    this.globalService.dialogService.openDeleteConfirmDialog("Sponzor", message).subscribe(value => {
      if(value == GeneralUtils.DIALOG_CLOSE_TYPE_OK){
        if(item.id)
          this.globalService.sponsorService.delete(item.id).subscribe(result => {
            this.getRefreshData()
          })
      }
    })
  }
}
