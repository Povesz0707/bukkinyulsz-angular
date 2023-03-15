import {Component, Injectable, OnInit} from "@angular/core";

@Component({
  selector: 'distance-10km',
  templateUrl: 'distance.10km.html',
  styleUrls: ['distance.10km.css']
})
export class Distance10km implements OnInit{
  ngOnInit(): void {
  }

  redirectToDownload(gpx: string) {
    window.location.href = gpx;
  }
}
