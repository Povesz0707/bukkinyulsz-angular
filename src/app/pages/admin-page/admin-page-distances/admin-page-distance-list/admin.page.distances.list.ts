import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Distance} from "../../../../model/distance-model/distance";
import {GlobalService} from "../../../../services/global.service";
import {
  AdminPageDistanceDialog,
  AdminPageDistanceDialogData
} from "../admin-page-distance-dialog/admin.page.distance.dialog";
@Component({
  styleUrls:['admin.page.distances.list.css'],
  templateUrl:'admin.page.distances.list.html',
  selector:'admin-page-distances-list'
})
export class AdminPageDistancesList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  @Input("inputTourEvent") inputTourEvent: TourEvent;

  tourEventDistances: TourEventDistance[] = []
  tourEventDistanceMatTableDataSource: MatTableDataSource<TourEventDistance>
  selection = new SelectionModel<TourEventDistance>(true, []);
  distancesDisplayedColumns: string[] = ['select','id','name','length','action']
  selectedTourEvent: TourEvent;
  availableTourEvents: TourEvent[] = [];
  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }
  ngOnInit(): void {
    if(this.inputTourEvent){
      this.selectedTourEvent = this.inputTourEvent;
    }
    else{
      this.getTourEventList()
    }
    this.getRefreshData()
  }
  getTourEventList(){
    this.globalService.tourEventService.list().subscribe(value => {
      this.availableTourEvents = value;
    })
  }

  getRefreshData(){
    this.tourEventDistances = []
    if(this.selectedTourEvent){
      this.globalService.tourEventDistanceService.findAllByTourEvent(this.selectedTourEvent).subscribe(value => {
        this.tourEventDistances = value;
        this.tourEventDistanceMatTableDataSource = new MatTableDataSource<TourEventDistance>(this.tourEventDistances)
        this.tourEventDistanceMatTableDataSource.sort = this.sort;
      })
    }
  }
  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tourEventDistanceMatTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    if (this.tourEventDistanceMatTableDataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.tourEventDistanceMatTableDataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.tourEventDistanceMatTableDataSource.data);
  }



  openEdit(item: Distance) {
    var data: AdminPageDistanceDialogData = {
      item: item,
      tourEvent: this.selectedTourEvent,
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
    }
    this.generalUtils.openDialog100vw100vh(AdminPageDistanceDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  deleteItem(item: TourEventDistance) {
    var message = item.distance?.name + " - "+item.distance?.length
    this.globalService.dialogService.openDeleteConfirmDialog("Szakasz", message).subscribe(value => {
      if(value == GeneralUtils.DIALOG_CLOSE_TYPE_OK){
        if(item.id)
          this.globalService.tourEventDistanceService.delete(item.id).subscribe(result => {
            this.getRefreshData()
          })
      }
    })
  }

  addNew() {
    var data: AdminPageDistanceDialogData = {
      item: new Distance(),
      tourEvent: this.selectedTourEvent,
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_NEW
    }
    this.generalUtils.openDialog100vw100vh(AdminPageDistanceDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  tourEventSelectionChange() {
    this.getRefreshData()
  }

  changeActiveStatus(b: boolean) {

  }
}
import {GeneralUtils} from "../../../../utils/general.utils";

import {TourEvent} from "../../../../model/tourEvent-model/tourEvent.model";
import {TourEventDistance} from "../../../../model/tourEvent-distance-model/tourEvent.distance.model";
