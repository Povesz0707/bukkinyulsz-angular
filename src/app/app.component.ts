import {Component, OnInit} from '@angular/core';
import {GlobalService} from "./services/global.service";
import {Distance} from "./model/distance-model/distance";
import {DistanceView} from "./pages/distances/distance-view/distance.view";
import {GeneralUtils} from "./utils/general.utils";
import * as Upload from "upload-js-full";
import {ExpandedTourEvent} from "./pages/main-page/main.page";
import {TourEvent} from "./model/tourEvent-model/tourEvent.model";
import {fromEvent, Observable} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bukkinyulsz-andular';
  distanceList: Distance[] = [];
  isRegistrationTimeBoolean: undefined | boolean;
  tourEvents:TourEvent[] = []
  expandedTourEvents: ExpandedTourEvent[] = []
  scrollBackButtonVisible: boolean = false;


  constructor(private globalService: GlobalService, public generalUtils : GeneralUtils) {

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

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  openTavDialog(distance: Distance) {
    this.generalUtils.openDialog100vw100vh(DistanceView, distance)
  }


  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollEnvet,true)
    this.getDistancesList()
  }
  scrollEnvet = (event: any) => {
    const pos = event.target.scrollingElement.scrollTop;
    if(pos) this.scrollBackButtonVisible = true
    else this.scrollBackButtonVisible = false
  }

  scrollBackToTop(){
    window.scrollTo({behavior:'smooth',top:0,left:0})
  }
}
