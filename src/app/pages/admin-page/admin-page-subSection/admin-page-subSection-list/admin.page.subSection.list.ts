import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatSort} from "@angular/material/sort";
import {TourEvent} from "../../../../model/tourEvent-model/tourEvent.model";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {TourEventDistance} from "../../../../model/tourEvent-distance-model/tourEvent.distance.model";
import {DistanceSubSection} from "../../../../model/distance-subSection-model/distance.subSection.model";
import {Distance} from "../../../../model/distance-model/distance";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {SubSection} from "../../../../model/subSection-model/subSection.model";
import {Checkpoint} from "../../../../model/checkpoint-model/checkpoint.model";
import {
  AdminPageDistanceDialog,
  AdminPageDistanceDialogData
} from "../../admin-page-distances/admin-page-distance-dialog/admin.page.distance.dialog";
import {
  AdminPageSubSectionDialog,
  AdminPageSubSectionDialogData
} from "../admin-page-subSection-dialog/admin.page.subSection.dialog";

@Component({
  styleUrls:['admin.page.subSection.list.css'],
  templateUrl:'admin.page.subSection.list.html',
  selector:'admin-page-subsection-list'
})
export class AdminPageSubSectionList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  @Input("inputDistance") inputDistance: Distance;

  distanceSubSection: DistanceSubSection[] = []
  distanceSubSectionMatTableDataSource: MatTableDataSource<DistanceSubSection>
  distanceSubSectionSelection = new SelectionModel<DistanceSubSection>(true, []);
  distanceSubSectionDisplayedColumns: string[] = ['select','id','from','to','subLength','subElevationGain','action']
  selectedTourEvent: TourEvent;
  availableTourEvents: TourEvent[] = [];

  selectedDistance: Distance;
  availableDistances: Distance[]
  ngOnInit(): void {
    if(this.inputDistance){
      this.selectedDistance = this.inputDistance;
    }
    else{
      this.getTourEventList()
    }
    this.getRefreshData()
  }
  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }

  getTourEventList(){
    this.globalService.tourEventService.list().subscribe(value => {
      this.availableTourEvents = value;
    })
  }

  getRefreshData(){
    this.distanceSubSection = []
    if(this.selectedDistance){
      this.globalService.distanceSubSectionService.findAllByDistance(this.selectedDistance).subscribe(value => {
        this.distanceSubSection = value;
        this.distanceSubSectionMatTableDataSource = new MatTableDataSource<DistanceSubSection>(this.distanceSubSection)
        this.distanceSubSectionMatTableDataSource.sort = this.sort;
      })
    }
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.distanceSubSectionMatTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    if (this.distanceSubSectionMatTableDataSource) {
      const numSelected = this.distanceSubSectionSelection.selected.length;
      const numRows = this.distanceSubSectionMatTableDataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.distanceSubSectionSelection.clear();
      return;
    }
    this.distanceSubSectionSelection.select(...this.distanceSubSectionMatTableDataSource.data);
  }

  tourEventSelectionChange() {
    this.refreshAvailableDistances()

  }
  refreshAvailableDistances(){
    this.availableDistances = []
    if(this.selectedTourEvent){
      this.selectedTourEvent.tourEventDistances?.forEach(value => {
        if(value.distance)
        this.availableDistances.push(value.distance)
      })
    }
  }

  distanceSelectionChange(){
    this.getRefreshData()
  }

  changeActiveStatus(b: boolean) {

  }

  addNew() {
    var data: AdminPageSubSectionDialogData = {
      distance: this.selectedDistance,
      item: new SubSection(),
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_NEW
    }
    this.generalUtils.openDialog100vw100vh(AdminPageSubSectionDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }

  deleteItem(item: DistanceSubSection) {

  }

  openEdit(item: SubSection) {
    if(item){
      var data: AdminPageSubSectionDialogData = {
        item: item,
        distance: this.selectedDistance,
        openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
      }
      this.generalUtils.openDialog100vw100vh(AdminPageSubSectionDialog, data).afterClosed().subscribe(value => {
        this.getRefreshData()
      })
    }
  }
}
