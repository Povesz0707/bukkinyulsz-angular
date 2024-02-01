import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Distance} from "../../model/distance-model/distance";
import {GeneralUtils} from "../../utils/general.utils";
import {DistanceView} from "../distances/distance-view/distance.view";
import {TourEvent} from "../../model/tourEvent-model/tourEvent.model";
import {ActivatedRoute, Route} from "@angular/router";
import {Sponsor} from "../../model/sponsor-model/sponsor.model";
import {Tender} from "../../model/render-model/tender.model";
import {News} from "../../model/news-model/news.model";
import {GaleryImage} from "../../model/galeryImage-model/galeryImage.model";

@Component({
  templateUrl:'galery.page.html',
  selector:'galery-page',
  styleUrls:['galery.page.css']
})
export class GaleryPage implements OnInit{
  list: GaleryImage[] = []

  ngOnInit(): void {

      this.getTopNews()


  }

  getTopNews(){
    this.globalService.galeryImageService.listActive().subscribe(value => {
      this.list = value;
    })
  }

  constructor(private globalService : GlobalService, public generalUtils: GeneralUtils, private route: ActivatedRoute) {

  }


}
