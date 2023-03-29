import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {Checkpoint} from "../../../../model/checkpoint-model/checkpoint.model";
import {SubSection} from "../../../../model/subSection-model/subSection.model";
import {Distance} from "../../../../model/distance-model/distance";
import {GeneralUtils} from "../../../../utils/general.utils";
import {GlobalService} from "../../../../services/global.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  AdminPageCheckpointDialogData
} from "../../admin-page-checkpoint/admin-page-checkpoint-dialog/admin.page.checkpoint.dialog";
import {TourEventDistance} from "../../../../model/tourEvent-distance-model/tourEvent.distance.model";
import {DistanceSubSection} from "../../../../model/distance-subSection-model/distance.subSection.model";
import {Marking} from "../../../../model/marking-model/marking.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {SubSectionMarking} from "../../../../model/subSection-marking-model/subSection.marking.model";

export interface AdminPageSubSectionDialogData{
  distance: Distance
  item:SubSection
  openingMode?:string
}
@Component({
  styleUrls:['admin.page.subSection.dialog.css'],
  templateUrl:'admin.page.subSection.dialog.html',
  selector:'admin-page-subSection-dialog'
})
export class AdminPageSubSectionDialog implements OnInit{
  tileText:string = "Új szakasz hozzáaadása"
  subSection: SubSection = new SubSection()
  availableCheckpoints: Checkpoint[];
  markingList: Marking[];

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.globalService.checkpointService.list().subscribe(value => {
      this.availableCheckpoints = value;
      if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
        if(this.data.item.id)
          this.globalService.subSectionService.get(this.data.item.id).subscribe(value => {
            this.subSection = value;
            this.availableCheckpoints.forEach(value1 => {
              if(value1.id == this.subSection.checkpointTo?.id){
                this.subSection.checkpointTo = value1;
              }
              if(value1.id == this.subSection.checkpointFrom?.id){
                this.subSection.checkpointFrom = value1;
              }
            })
            this.tileText = this.subSection+" ellenörzőpont szerkesztése"
            this.globalService.markingService.list().subscribe(value => {
              this.fullMarkingList = value;
              this.availableMarkingList = value;
              this.subSection.markings?.forEach(marking =>{
                this.availableMarkingList.forEach((element,index)=>{
                  if(element?.id == marking?.marking?.id) {
                    this.selectedMarkings.push(element)
                  }
                });
              })
              this.refreshFilter()
            })
          })
      }
    })


  }


  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils,@Inject(MAT_DIALOG_DATA) public data: AdminPageSubSectionDialogData, private dialogRef: MatDialogRef<AdminPageSubSectionDialog>) {
  }

  save() {
    if(this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_NEW){
      var newItem: DistanceSubSection = {
        distance: this.data.distance,
        subSection: this.subSection
      }
      this.globalService.distanceSubSectionService.add(newItem).subscribe(value => {
        this.dialogRef.close();
      })
    }
    else if (this.data.openingMode == GeneralUtils.DIALOG_OPENING_TYPE_EDIT){
      this.subSection.markings = this.getSubsectionMarkings()
        this.globalService.subSectionService.edit(this.subSection).subscribe(value => {
        this.dialogRef.close()
      })
    }
  }

  getSubsectionMarkings(){
    var markingList:Marking[] = []
    this.selectedMarkings.forEach(value => {
      var marking: SubSectionMarking = {
        marking: value,
      }
      markingList.push(marking)
    })
    return markingList;
  }

  addMarking(event: MatAutocompleteSelectedEvent){
    var marking:Marking = event.option.value
    this.selectedMarkings.push(marking)
    this.stateCtrl.setValue(null);
    this.availableMarkingList.forEach((element,index)=>{
      if(element?.id == marking?.id) {
        this.availableMarkingList.splice(index, 1);
        this.refreshFilter()
      }
    });
  }

  filteredStates: Observable<Marking[]> = new Observable<Marking[]>()
  stateCtrl = new FormControl('');
  fullMarkingList: Marking[] = [];
  selectedMarkings: Marking[] = [];
  availableMarkingList: Marking[];

  refreshFilter(){
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(null),
      map(state => (state ? this._filterStates(state) : this.availableMarkingList.slice())),
    );
  }
  removeMarking(marking: Marking) {
    this.selectedMarkings.forEach((element,index)=>{
      if(element?.id == marking?.id) this.selectedMarkings.splice(index, 1);
    });
    this.availableMarkingList.push(marking)
    this.refreshFilter()
  }

  private _filterStates(value: any): Marking[] {
    const filterValue = value;
    return this.availableMarkingList.filter(state => state?.name?.toLowerCase().includes(filterValue));
  }

}
