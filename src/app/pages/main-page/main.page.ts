import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Distance} from "../../model/distance-model/distance";
import {GeneralUtils} from "../../utils/general.utils";
import {DistanceView} from "../distances/distance-view/distance.view";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";

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
  tourEvent:TourEvent = new TourEvent()
  ngOnInit(): void {
    this.getDistancesList()

  }
  getDistancesList(){
    this.distanceList = []
    this.globalService.tourEventService.getLatestActive().subscribe(value => {
      this.tourEvent = value
        value.tourEventDistances?.forEach(value1 => {
          if(value1.distance){
            this.distanceList.push(value1.distance)
          }
        })
      this.getRegistrationRemainingTime(value.applicationDeadline)
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
    this.generalUtils.openDialog100Percent(DistanceView, distance)
  }
}
