import {Component, OnInit} from '@angular/core';
import {GlobalService} from "./services/global.service";
import {Distance} from "./model/distance-model/distance";
import {DistanceView} from "./pages/distances/distance-view/distance.view";
import {GeneralUtils} from "./utils/general.utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bukkinyulsz-andular';
  distanceList: Distance[] = [];


  constructor(private globalService: GlobalService, private generalUtils : GeneralUtils) {
  }

  getDistancesList(){
    this.distanceList = []
    this.globalService.tourEventService.getLatestActive().subscribe(value => {
      value.tourEventDistances?.forEach(value1 => {
        if(value1.distance){
          this.distanceList.push(value1.distance)
        }
      })
    })
  }
  openTavDialog(distance: Distance) {
    this.generalUtils.openDialog100Percent(DistanceView, distance)
  }

  ngOnInit(): void {
    this.getDistancesList()
  }
}
