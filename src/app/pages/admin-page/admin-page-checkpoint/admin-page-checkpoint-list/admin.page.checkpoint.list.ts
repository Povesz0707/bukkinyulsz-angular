import {Component, OnInit, ViewChild} from "@angular/core";
import {Checkpoint} from "../../../../model/checkpoint-model/checkpoint.model";
import {MatTableDataSource} from "@angular/material/table";
import {Distance} from "../../../../model/distance-model/distance";
import {SelectionModel} from "@angular/cdk/collections";
import {TourEvent} from "../../../../model/tourEvent-model/tourEvent.model";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {MatSort} from "@angular/material/sort";
import {
  AdminPageEventDialog,
  AdminPageEventDialogData
} from "../../admin-page-event/admin-page-event-dialog/admin.page.event.dialog";
import {
  AdminPageCheckpointDialog,
  AdminPageCheckpointDialogData
} from "../admin-page-checkpoint-dialog/admin.page.checkpoint.dialog";

@Component({
  styleUrls:['admin.page.checkpoint.list.css'],
  templateUrl:'admin.page.checkpoint.list.html',
  selector:'admin-page-checkpoint-list'
})
export class AdminPageCheckpointList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  checkpointDisplayedColumns: string[] = ['select','id','name','isMainCheckpoint','action'];
  selectedCheckpointData = new SelectionModel<Checkpoint>(true, []);
  checkpointList: Checkpoint[] = [];
  checkpointDataSource: MatTableDataSource<Checkpoint>

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }

  getRefreshData(){
    this.globalService.checkpointService.list().subscribe(value => {
      this.checkpointList = value;
      this.checkpointDataSource = new MatTableDataSource<Distance>(this.checkpointList)
      this.checkpointDataSource.sort = this.sort;
      this.selectedCheckpointData = new SelectionModel<TourEvent>(true, []);
    })
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.checkpointDataSource.filter = filterValue.trim().toLowerCase();
  }
  isAllSelected() {
    if (this.checkpointDataSource) {
      const numSelected = this.selectedCheckpointData.selected.length;
      const numRows = this.checkpointDataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedCheckpointData.clear();
      return;
    }
    this.selectedCheckpointData.select(...this.checkpointDataSource.data);
  }

  ngOnInit(): void {
    this.getRefreshData()
  }

  openEdit(item: Checkpoint) {
    var data: AdminPageCheckpointDialogData = {
      item: item,
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
    }
    this.generalUtils.openDialog100vw100vh(AdminPageCheckpointDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  deleteItem(item: Checkpoint) {
    var message = item.name
    this.globalService.dialogService.openDeleteConfirmDialog("Ellenötzőpont", message).subscribe(value => {
      if(value == GeneralUtils.DIALOG_CLOSE_TYPE_OK){
        if(item.id)
          this.globalService.checkpointService.delete(item.id).subscribe(result => {
            this.getRefreshData()
          })
      }
    })
  }

  addNew() {
    var data: AdminPageCheckpointDialogData = {
      item: new Checkpoint(),
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_NEW
    }
    this.generalUtils.openDialog100vw100vh(AdminPageCheckpointDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }
}
