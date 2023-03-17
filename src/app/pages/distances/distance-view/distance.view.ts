import {Component, Inject, Input, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Distance} from "../../../model/distance-model/distance";
import {GlobalService} from "../../../services/global.service";
import {GeneralUtils} from "../../../utils/general.utils";
import {Marking} from "../../../model/marking-model/marking.model";
import {SubSection} from "../../../model/subSection-model/subSection.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'distance-view',
  templateUrl: 'distance.view.html',
  styleUrls: ['distance.view.css']
})
export class DistanceView implements OnInit{
  @Input('distance_id') distanceId: number
  distance: Distance = new Distance()
  urlId: number;
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
    })
  }


  constructor(private globalService: GlobalService, @Inject(MAT_DIALOG_DATA) public data: Distance, public generalUtils: GeneralUtils,private route: ActivatedRoute) {
  }

  redirectToDownload(url: string | undefined  ) {
    if (url == undefined) return
    window.location.href = url;
  }
}
