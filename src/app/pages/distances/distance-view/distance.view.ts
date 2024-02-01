import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Distance} from "../../../model/distance-model/distance";
import {GlobalService} from "../../../services/global.service";
import {GeneralUtils} from "../../../utils/general.utils";
import {ActivatedRoute} from "@angular/router";
import * as L from "leaflet";
import "leaflet-gpx"

/*const elevation = require('@raruto/leaflet-elevation/dist/leaflet-elevation.min.js.js')*/
import * as Lg from "leaflet-gpx"

/*const LG = require('leaflet-gpx')*/



function downloadURI(uri: any, name: any) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
@Component({
  selector: 'distance-view',
  templateUrl: 'distance.view.html',
  styleUrls: ['distance.view.css']
})
export class DistanceView implements OnInit{
  distance: Distance = new Distance()
  urlId: number;

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;
  ngOnInit(): void {
    this.urlId = Number(this.route.snapshot.paramMap.get('id'));
    this.getData()

  }

  getData(){
    var incomingId:number | undefined
    if(this.data && this.data.id){
      incomingId = this.data.id;
    }
    else if( this.urlId ){
      incomingId =  this.urlId
    }
    if(incomingId)
    this.globalService.distanceService.get(incomingId).subscribe(value => {
      this.distance = value;
      this.getMap(this.distance.gpxURL)
    })
  }


  constructor(private globalService: GlobalService, @Inject(MAT_DIALOG_DATA) public data: Distance, public generalUtils: GeneralUtils,private route: ActivatedRoute) {
  }

  redirectToDownload(url: string | undefined, type?:string) {
    if (url == undefined) return
    var request = new XMLHttpRequest();
    var name = this.distance.name + "_"+this.distance.length+"km"
    request.open('GET', url, true);
    request.responseType = 'blob';

    request.onload = function() {
      var reader = new FileReader();
      reader.readAsDataURL(request.response);
      reader.onload =  () => {

        downloadURI(reader.result, name+""+type);
      }
    };
    request.send();
  }

  getMap(gpxURL?: string) {
    if (gpxURL) {
      var map = new L.Map('map')

      L.tileLayer('http://a.map.turistautak.hu/tiles/turistautak-domborzattal/{z}/{x}/{y}.png', {
        maxZoom: 15,
        minZoom: 8,
        attribution: '&copy; <ahref="https://turistautak.hu/">Turistautak.hu',}).addTo(map);
      var g = new L.GPX(gpxURL, {
        async: true,
        marker_options: {
          wptIconUrls: {'':'./assets/checkpoint.png'},
          startIconUrl: '',
          endIconUrl: '',
          shadowUrl:''
        },
      })
      g.on('loaded', function(e) {
        map.fitBounds(e.target.getBounds());
      });
      g.addTo(map)
/*
/*      var elevation_options = {theme: "lightblue-theme",}
      var controlElevation = L.control.elevation(elevation_options).addTo(map);*/
     // g.addTo(map)
/*      var el = new L.control.elevation({

      });*/
  /*    var el = L.control.elevation({

      });*/
      // el.addTo(map);
/*      L.geoJson(g,{
        onEachFeature: el.addData.bind(el) //working on a better solution
      }).addTo(map);*/
    }
  }

}
