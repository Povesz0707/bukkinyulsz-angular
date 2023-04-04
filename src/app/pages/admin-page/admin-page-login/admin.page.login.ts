import {Component, OnInit} from "@angular/core";
import {GlobalService} from "../../../services/global.service";
import {LoginRequest} from "../../../model/payload/login/LoginRequest";

@Component({
  styleUrls:['admin.page.login.css'],
  templateUrl:'admin.page.login.html',
  selector:'admin-page-login'
})
export class AdminPageLogin implements OnInit{
  username: string
  password:string
  errorMessage: string;

  constructor(public globalService: GlobalService) {
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

  login() {
    var request: LoginRequest = {
      username: this.username,
      password: this.password
    }
    this.globalService.userService.logIn(request).subscribe(value => {
      console.log("DONE", value)
      if(value.accessToken){
        this.globalService.storageServices.userStorageService.saveToken(value.accessToken)
      }
      this.globalService.storageServices.userStorageService.saveUser(value)
    },error => {
      this.errorMessage = error.error.message
    })
  }
}
