import {Component, Inject, OnInit} from "@angular/core";
import {GlobalService} from "../../services/global.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Distance} from "../../model/distance-model/distance";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
import {GeneralUtils, RegistrationType} from "../../utils/general.utils";


export interface Registration{
  name?: string
  email?:string
  distance?: Distance
}
@Component({
  templateUrl:'registration.page.html',
  selector:'registration-page',
  styleUrls:['registration.page.css']
})
export class RegistrationPage implements OnInit{
  ngOnInit(): void {
  }
  selectedRegistrationType: RegistrationType
  tourEvent: TourEvent = new TourEvent()
  registrations: Registration[] = []


  constructor(public generalUtils: GeneralUtils ,public globalService: GlobalService, @Inject(MAT_DIALOG_DATA) public data: TourEvent) {
    this.tourEvent = data
    var reg:Registration = {email:'',distance:'',name:''}
    this.registrations.push(reg)
  }

  addNewRegistration() {
    var reg:Registration = {email:'',distance:'',name:''}
    this.registrations.push(reg)
  }
}
