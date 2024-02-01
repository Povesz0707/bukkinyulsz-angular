import {Component, OnInit, ViewChild} from "@angular/core";
import {GlobalService} from "../../../../services/global.service";
import {GeneralUtils} from "../../../../utils/general.utils";
import {MatSort} from "@angular/material/sort";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {
  AdminPageCheckpointDialog,
  AdminPageCheckpointDialogData
} from "../../admin-page-checkpoint/admin-page-checkpoint-dialog/admin.page.checkpoint.dialog";
import {AdminPageNewsDialog, OpenedDialogDialogData} from "../admin-page-news-dialog/admin.page.news.dialog";
import {SubSection} from "../../../../model/subSection-model/subSection.model";
import {
  AdminPageSubSectionDialog,
  AdminPageSubSectionDialogData
} from "../../admin-page-subSection/admin-page-subSection-dialog/admin.page.subSection.dialog";
import {News} from "../../../../model/news-model/news.model";

@Component({
  styleUrls:['admin.page.news.list.css'],
  templateUrl:'admin.page.news.list.html',
  selector:'admin-page-news-list'
})
export class AdminPageNewsList implements OnInit{
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select','id','title','subTitle','content','hasImageUrl','active','action'];
  selectedData = new SelectionModel<News>(true, []);
  list: News[] = [];
  dataSource: MatTableDataSource<News>

  constructor(private globalService: GlobalService, public generalUtils: GeneralUtils) {
  }
  ngOnInit(): void {
    this.getRefreshData()
  }
  getRefreshData(){
    this.globalService.newsService.list().subscribe(res => {
      this.list = res;
      this.dataSource = new MatTableDataSource<News>(this.list);
      this.dataSource.sort = this.sort;
      this.selectedData = new SelectionModel<News>(true, [])
    })
  }

  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selectedData.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedData.clear();
      return;
    }
    this.selectedData.select(...this.dataSource.data);
  }

  addNew() {
    var data: OpenedDialogDialogData = {
      openingMode: GeneralUtils.DIALOG_OPENING_TYPE_NEW
    }
    this.generalUtils.openDialog100vw100vh(AdminPageNewsDialog, data).afterClosed().subscribe(value => {
      this.getRefreshData()
    })
  }
  openEdit(item: News) {
    if(item){
      var data: OpenedDialogDialogData = {
        id: item.id,
        openingMode: GeneralUtils.DIALOG_OPENING_TYPE_EDIT
      }
      this.generalUtils.openDialog100vw100vh(AdminPageNewsDialog, data).afterClosed().subscribe(value => {
        this.getRefreshData()
      })
    }
  }

  deleteItem(item: News) {
    var message = item.title
    this.globalService.dialogService.openDeleteConfirmDialog("Hírek", message).subscribe(value => {
      if(value == GeneralUtils.DIALOG_CLOSE_TYPE_OK){
        if(item.id)
          this.globalService.newsService.delete(item.id).subscribe(result => {
            this.getRefreshData()
          })
      }
    })
  }
}
