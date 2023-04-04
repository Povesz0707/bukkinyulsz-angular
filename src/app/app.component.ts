import {Component, OnInit} from '@angular/core';
import {GlobalService} from "./services/global.service";
import {Distance} from "./model/distance-model/distance";
import {DistanceView} from "./pages/distances/distance-view/distance.view";
import {GeneralUtils} from "./utils/general.utils";
import * as Upload from "upload-js-full";
import {ExpandedTourEvent} from "./pages/main-page/main.page";
import {TourEvent} from "./model/tourEvent-model/tourEvent.model";
import {fromEvent, Observable} from "rxjs";
import {RegistrationPage} from "./pages/registration-page/registration.page";


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
  availablePreRegistrations: ExpandedTourEvent[] = []
  scrollBackButtonVisible: boolean = false;

  registrationIsActive(tourEvent: TourEvent){
    return this.generalUtils.dateBetween(tourEvent.applicationFrom, tourEvent.applicationTo)
  }


  constructor(public globalService: GlobalService, public generalUtils : GeneralUtils) {
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
        if(this.registrationIsActive(tourEvent)){
          this.availablePreRegistrations.push(expandedTourEvent)
        }
        this.expandedTourEvents.push(expandedTourEvent)
      })


/*            if(this.generalUtils.dateBetween(value.applicationFrom, value.applicationTo)){
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
    if(event.target.scrollingElement){
      const pos = event.target.scrollingElement.scrollTop;
      if(pos) this.scrollBackButtonVisible = true
      else this.scrollBackButtonVisible = false
    }

  }

  scrollBackToTop(){
    window.scrollTo({behavior:'smooth',top:0,left:0})
  }

  openRegistrationPage(item: TourEvent) {
    this.generalUtils.openDialog100vw100vh(RegistrationPage, item)
  }
}
