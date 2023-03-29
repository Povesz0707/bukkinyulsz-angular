import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Distance} from "../../../model/distance-model/distance";
import {GlobalService} from "../../../services/global.service";
import {GeneralUtils} from "../../../utils/general.utils";
import {ActivatedRoute} from "@angular/router";
import GPX from 'leaflet-gpx';
import L, {latLng, tileLayer, control} from "leaflet";

//import "./node_modules/leaflet/dist/leaflet.css"


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
  @Input('distance_id') distanceId: number
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
      // this.getMap()
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

  gpxURL = 'https://bukkinyulsz.hu/static/bukkinyulsz/gpx/bukkinyulsz_60.gpx';
  gpx: L.GPX = new L.GPX(this.gpxURL, {async: true})

  options = {
    layers: [
      tileLayer('http://a.map.turistautak.hu/tiles/turistautak-domborzattal/{z}/{x}/{y}.png', { attribution: '...' ,
        bounds: this.gpx.getBounds()
        }),

    ],
    zoom: 10,
    center: latLng(47.966913, 20.526699),
    control:{

    }


  };

  getMap(){
    var map = L.map('map');
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
    }).addTo(map);
    //https://bukkinyulsz.hu/static/bukkinyulsz/gpx/bukkinyulsz_60.gpx
    var gpx = 'https://bukkinyulsz.hu/static/bukkinyulsz/gpx/bukkinyulsz_60.gpx';
    new L.GPX(gpx, {async: true}).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    }).addTo(map);
/*    g.on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    });
    g.on("addline",function(e){
      $.each(e.line, function (k, v) {
        el.addData(v);
      });
    });*/

    //L.control.fullscreen().addTo(map);

/*    var el = L.control.elevation();
    el.addTo(map);
    g.on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    });
    g.on("addline",function(e){
      $.each(e.line, function (k, v) {
        el.addData(v);
      });
    });
    g.addTo(map);*/
  }

}
