import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  templateUrl:'main.page.html',
  selector:'main-page',
  styleUrls:['main.page.css']
})
export class MainPage implements OnInit{
  daysLeft?: number
  hoursLeft?: number
  minutesLeft?:number
  hasRemainingTime?:boolean
  ngOnInit(): void {
    this.getRegistrationRemainingTime()
  }

  getRegistrationRemainingTime(){
    var countDownDate = new Date("2023-06-12 11:00").getTime();
    var x = setInterval(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.daysLeft = days;
      this.hoursLeft = hours;
      this.minutesLeft = minutes;
      this.hasRemainingTime = true;
      if (distance < 0) {
        clearInterval(x);
        this.hasRemainingTime = false;
      }
    }, 1000);
  }

  openTavDialog(s: string) {

  }
}
