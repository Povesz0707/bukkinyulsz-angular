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

@Component({
  templateUrl:'news.page.html',
  selector:'news-page',
  styleUrls:['news.page.css']
})
export class NewsPage implements OnInit{
  newses: News[] = []

  ngOnInit(): void {

    const incomingId = this.route.snapshot.params['id'];

      this.getNews(incomingId)

  }

  getTopNews(){
    this.globalService.newsService.listActive().subscribe(value => {
      this.newses = value;
    })
  }
  getNews(id: number){
    this.globalService.newsService.get(id).subscribe(value => {
      this.newses.push(value);
    })
  }
  constructor(private globalService : GlobalService, public generalUtils: GeneralUtils, private route: ActivatedRoute) {

  }

  backToNewses() {
    window.location.href = "#/newses";
  }


}
