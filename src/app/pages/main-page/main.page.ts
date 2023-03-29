import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Distance} from "../../model/distance-model/distance";
import {GeneralUtils} from "../../utils/general.utils";
import {DistanceView} from "../distances/distance-view/distance.view";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";

export interface ExpandedTourEvent{
  tourEvent:TourEvent,
  distances:Distance[]
}
@Component({
  templateUrl:'main.page.html',
  selector:'main-page',
  styleUrls:['main.page.css']
})
export class MainPage implements OnInit{
  daysLeft?: number
  hoursLeft?: number
  minutesLeft?:number
  hasRemainingTime?:boolean
  distanceList: Distance[] = [];
  tourEvents:TourEvent[] = []
  expandedTourEvents: ExpandedTourEvent[] = []
  ngOnInit(): void {
    this.getDistancesList()

  }
  getDistancesList(){
    this.distanceList = []
    this.globalService.tourEventService.getActives().subscribe(value => {
      this.tourEvents = value

      this.tourEvents.forEach(tourEvent => {
        var tourEventDistances: Distance[] = []

        tourEvent.tourEventDistances?.forEach(tourEventDistance => {
          if(tourEventDistance.distance){
            tourEventDistances.push(tourEventDistance.distance)
          }
        })
        var expandedTourEvent: ExpandedTourEvent = {
          tourEvent: tourEvent,
          distances: tourEventDistances
        }
        this.expandedTourEvents.push(expandedTourEvent)
      })


/*      if(this.generalUtils.dateBetween(value.applicationFrom, value.applicationTo)){
        this.getRegistrationRemainingTime(value.applicationTo)
      }*/
    })
  }


  constructor(private globalService : GlobalService, public generalUtils: GeneralUtils) {
  }

  getRegistrationRemainingTime(d?:Date){
    if(d == undefined) return
    var countDownDate = new Date(d).getTime();
    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.daysLeft = days;
      this.hoursLeft = hours;
      this.minutesLeft = minutes;
      this.hasRemainingTime = true;
      if (distance < 0) {
        clearInterval(x);
        this.hasRemainingTime = false;
      }
    }, 1000);
  }

  openTavDialog(distance: Distance) {
    this.generalUtils.openDialog100vw100vh(DistanceView, distance)
  }
}
