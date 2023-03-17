import {Component, Injectable, OnInit} from "@angular/core";
import {GlobalService} from "../../../services/global.service";
import {DistanceService} from "../../../services/distance-service/distance.service";

@Component({
  selector: 'distance-10km',
  templateUrl: 'distance.10km.html',
  styleUrls: ['distance.10km.css']
})
export class Distance10km implements OnInit{
  ngOnInit(): void {
    this.globalService.checkpointService.list().subscribe(value => {
      console.log("done asd")
    })

  }
  constructor(private globalService: GlobalService, private dis: DistanceService) {
  }

  redirectToDownload(gpx: string) {
    window.location.href = gpx;
  }
}
