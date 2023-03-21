import {Component, OnInit, ViewChild} from "@angular/core";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Distance} from "../../../../model/distance-model/distance";
import {TourEvent} from "../../../../model/tourEvent-model/tourEvent.model";
import {SelectionModel} from "@angular/cdk/collections";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {
  AdminPageDistanceDialog,
  AdminPageDistanceDialogData
} from "../../admin-page-distances/admin-page-distance-dialog/admin.page.distance.dialog";
import {AdminPageEventDialog, AdminPageEventDialogData} from "../admin-page-event-dialog/admin.page.event.dialog";

@Component({
  styleUrls:['admin.page.event.list.css'],
  templateUrl:'admin.page.event.list.html',
  selector:'admin-page-event-list'
})
export class AdminPageEventList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  tourEventList: TourEvent[] = []
  tourEventDataSource: MatTableDataSource<TourEvent>
  selectedTourEventData = new SelectionModel<TourEvent>(true, []);
  tourEventDisplayedColumns: string[] = ['select','id','active','name','dateOfEvent','placeOfEvent','applicationFrom','applicationTo','tourEventDistances','action']

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }
  ngOnInit(): void {
    this.getRefreshData()
  }
  getRefreshData(){
    this.globalService.tourEventService.list().subscribe(value => {
      this.tourEventList = value;
      this.tourEventDataSource = new MatTableDataSource<Distance>(this.tourEventList)
      this.tourEventDataSource.sort = this.sort;
      this.selectedTourEventData = new SelectionModel<TourEvent>(true, []);
    })
  }
  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tourEventDataSource.filter = filterValue.trim().toLowerCase();
  }
  isAllSelected() {
    if (this.tourEventDataSource) {
      const numSelected = this.selectedTourEventData.selected.length;
      const numRows = this.tourEventDataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedTourEventData.clear();
      return;
    }
    this.selectedTourEventData.select(...this.tourEventDataSource.data);
  }

  openEdit(item: TourEvent) {
    var data: AdminPageEventDialogData = {
      item: item,
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
    }
    this.generalUtils.openDialog100vw100vh(AdminPageEventDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  deleteItem(item: TourEvent) {
    var message = item.name + " - " + this.generalUtils.getYearString(item.dateOfEvent)
    this.globalService.dialogService.openDeleteConfirmDialog("Esemény", message).subscribe(value => {
      if(value == GeneralUtils.DIALOG_CLOSE_TYPE_OK){
        if(item.id)
        this.globalService.tourEventService.delete(item.id).subscribe(result => {
          this.getRefreshData()
        })
      }
    })
  }

  addNew() {
    var data: AdminPageEventDialogData = {
      item: new TourEvent(),
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_NEW
    }
    this.generalUtils.openDialog100vw100vh(AdminPageEventDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  changeActiveStatus(b: boolean) {
    if(this.selectedTourEventData.selected){
      this.globalService.tourEventService.updateActiveStatus(this.selectedTourEventData.selected, b).subscribe(value => {
        this.getRefreshData()
      })
    }
  }
}
