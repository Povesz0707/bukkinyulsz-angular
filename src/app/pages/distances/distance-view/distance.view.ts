import {Component, Inject, Input, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Distance} from "../../../model/distance-model/distance";
import {GlobalService} from "../../../services/global.service";
import {GeneralUtils} from "../../../utils/general.utils";
import {Marking} from "../../../model/marking-model/marking.model";
import {SubSection} from "../../../model/subSection-model/subSection.model";

@Component({
  selector: 'distance-view',
  templateUrl: 'distance.view.html',
  styleUrls: ['distance.view.css']
})
export class DistanceView implements OnInit{
  @Input('distance_id') distanceId: number
  distance: Distance = new Distance()
  ngOnInit(): void {
    this.getData()
  }
  getData(){
    if(this.data.id)
    this.globalService.distanceService.get(this.data.id).subscribe(value => {
      this.distance = value;
      console.log(this.distance)
    })
  }


  constructor(private globalService: GlobalService,@Inject(MAT_DIALOG_DATA) public data: Distance, public generalUtils: GeneralUtils) {
  }

  redirectToDownload(url: string | undefined  ) {
    if (url == undefined) return
    window.location.href = url;
  }

  sout(markings?: SubSection) {
    if (markings)
      markings.markings?.forEach(value => {

      })

  }
}
