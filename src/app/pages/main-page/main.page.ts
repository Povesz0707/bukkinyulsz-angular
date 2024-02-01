import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Distance} from "../../model/distance-model/distance";
import {GeneralUtils} from "../../utils/general.utils";
import {DistanceView} from "../distances/distance-view/distance.view";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
import {Route} from "@angular/router";
import {Sponsor} from "../../model/sponsor-model/sponsor.model";
import {Tender} from "../../model/render-model/tender.model";
import {News} from "../../model/news-model/news.model";

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
  availablePreRegistrations: ExpandedTourEvent[] = []
  remainingTime: string;

  newses: News[] = []




  ngOnInit(): void {
    this.getDistancesList()
    this.getTopNews()
  }



  getTopNews(){
    this.globalService.newsService.listActiveTop3().subscribe(value => {
      this.newses = value;
    })
  }


  registrationIsActive(tourEvent: TourEvent){
    return this.generalUtils.dateBetween(tourEvent.applicationFrom, tourEvent.applicationTo)
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
        console.log(expandedTourEvent.tourEvent.bannerImage)

        this.expandedTourEvents.push(expandedTourEvent)
      })
    })
  }

  slideToEvent(expandedTourEvent: ExpandedTourEvent){
    return this.generalUtils.getIndex(this.expandedTourEvents, expandedTourEvent)
  }


  constructor(private globalService : GlobalService, public generalUtils: GeneralUtils) {
  }

  remainingTimeString(d?: Date){
    if(d == undefined) return
    var countDownDate = new Date(d).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      return days + 'nap ' + hours + 'óra ' + minutes +'perc '

  }


  openTavDialog(distance: Distance) {
    this.generalUtils.openDialog100vw100vh(DistanceView, distance)
  }

  redirectTo(url: string | undefined) {
    if(url == undefined) return
    window.location.href = url;
  }
  redirectToNews(url: number | undefined) {
    if(url == undefined) return
    window.location.href = "#/news/"+url
  }



}
