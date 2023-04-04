import {Component, OnInit, ViewChild} from "@angular/core";
import {GeneralUtils} from "../../utils/general.utils";
import {GlobalService} from "../../services/global.service";
import {OldTeljesitokData} from "../../model/oldTeljesitok-model/oldTeljesitok.data.model";
import {MatTableDataSource} from "@angular/material/table";
import {TourEventDistance} from "../../model/tourEvent-distance-model/tourEvent.distance.model";
import {MatSort} from "@angular/material/sort";

export interface OldFilters{
  displayText: string
  value: string
}
@Component({
  templateUrl:'result.page.html',
  selector:'result-page',
  styleUrls:['result.page.css']
})
export class ResultPage implements OnInit{


  constructor(public generalUtils: GeneralUtils, private globalService: GlobalService) {
  }

  filters:OldFilters[] = []
  selectedOldFilter?: OldFilters
  ngOnInit(): void {
    var old1: OldFilters = {
      displayText: 'Bükkinyúlsz 2022 TT',
      value: 'nevsor'
    }
    var old2: OldFilters = {
      displayText: 'GeoGo eredmények',
      value: 'teljesitok'
    }
    this.filters.push(old1)
    this.filters.push(old2)
  }

  dataList: OldTeljesitokData[] = []
  dataSource: MatTableDataSource<OldTeljesitokData>
  distancesColumns: string[] = ['ssz','rsz','nev','ev','tlp','tav','ido','action']
  @ViewChild(MatSort) sort: MatSort;

  oldFilterSelect() {
    if(this.selectedOldFilter){
      if(this.selectedOldFilter.value == 'nevsor'){
        this.globalService.oldTeljesitokService.getOldTeljesitok().subscribe(value => {
          this.dataList = value.data
          this.dataSource = new MatTableDataSource<OldTeljesitokData>(this.dataList)
          this.dataSource.sort = this.sort;
        })
      }
    }
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadPdf(item: OldTeljesitokData) {
    if(item.rsz)
    this.globalService.oldTeljesitokService.getOklevel(Number.parseInt(item.rsz)).subscribe(value => {
      console.log(value)
    })
  }
}
