import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {map, Observable, startWith} from "rxjs";
import {Marking} from "../../../../model/marking-model/marking.model";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";

@Component({
  styleUrls:['admin.page.subSection.css'],
  templateUrl:'admin.page.subSection.html',
  selector:'admin-page-subSection'
})
export class AdminPageSubSection implements OnInit{
  fullMarkingList: Marking[] = [];
  selectedMarkings: Marking[] = [];
  availableMarkingList: Marking[];
  ngOnInit(): void {
    this.init()
  }

  constructor(private globalService: GlobalService,private  generalUtils: GeneralUtils) {
  }


  filteredStates: Observable<Marking[]> = new Observable<Marking[]>()
  stateCtrl = new FormControl('');

  init(){
    this.globalService.markingService.list().subscribe(value => {
      this.fullMarkingList = value;
      this.availableMarkingList = value;
      this.refreshFilter()
    })
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
