import {Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {Distance} from "../../../../model/distance-model/distance";
import {GlobalService} from "../../../../services/global.service";
import {
  AdminPageDistanceDialog,
  AdminPageDistanceDialogData
} from "../admin-page-distance-dialog/admin.page.distance.dialog";
import {GeneralUtils} from "../../../../utils/general.utils";

@Component({
  styleUrls:['admin.page.distances.list.css'],
  templateUrl:'admin.page.distances.list.html',
  selector:'admin-page-distances-list'
})
export class AdminPageDistancesList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  distances: Distance[] = []
  distancesDataSource: MatTableDataSource<Distance>
  selection = new SelectionModel<Distance>(true, []);
  distancesDisplayedColumns: string[] = ['select','id','active','name','length','action']
  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }

  getRefreshData(){
    this.globalService.distanceService.list().subscribe(value => {
      this.distances = value;
      this.distancesDataSource = new MatTableDataSource<Distance>(this.distances)
      this.distancesDataSource.sort = this.sort;
    })
  }
  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.distancesDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    if (this.distancesDataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.distancesDataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.distancesDataSource.data);
  }

  ngOnInit(): void {
    this.getRefreshData()
  }

  openEdit(item: Distance) {
    var data: AdminPageDistanceDialogData = {
      item: item,
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
    }
    this.generalUtils.openDialog100Percent(AdminPageDistanceDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  deleteItem(item: Distance) {
    var data: AdminPageDistanceDialogData = {
      item: item,
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
    }
    this.generalUtils.openDialog100Percent(AdminPageDistanceDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  addNew() {
    var data: AdminPageDistanceDialogData = {
      item: new Distance(),
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_NEW
    }
    this.generalUtils.openDialog100Percent(AdminPageDistanceDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }
}
