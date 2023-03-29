import {Component, OnInit} from "@angular/core";
import {GlobalService} from "../../../services/global.service";

@Component({
  styleUrls:['admin.page.login.css'],
  templateUrl:'admin.page.login.html',
  selector:'admin-page-login'
})
export class AdminPageLogin implements OnInit{

  constructor(private globalService: GlobalService) {
  }

  private fileName: string;
  ngOnInit(): void {
  }
  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
    }
  }
}
