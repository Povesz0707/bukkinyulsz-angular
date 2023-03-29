import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalHttpInterceptorProviders} from "./interseptor/global-http-interceptor.service";
import {MainPage} from "./pages/main-page/main.page";
import {AdminPageLogin} from "./pages/admin-page/admin-page-login/admin.page.login";
import {
  AdminPageDistancesList
} from "./pages/admin-page/admin-page-distances/admin-page-distance-list/admin.page.distances.list";
import {AdminPageEventList} from "./pages/admin-page/admin-page-event/admin-page-event-list/admin.page.event.list";
import {Distance} from "./model/distance-model/distance";
import {DistanceView} from "./pages/distances/distance-view/distance.view";
import {AdminPageDistance} from "./pages/admin-page/admin-page-distances/admin-page-distance/admin.page.distance";
import {AdminPageEvent} from "./pages/admin-page/admin-page-event/admin-page-event/admin.page.event";
import {
  AdminPageSubSection
} from "./pages/admin-page/admin-page-subSection/admin-page-subSection/admin.page.subSection";
import {
  AdminPageCheckpoint
} from "./pages/admin-page/admin-page-checkpoint/admin-page-checkpoint/admin.page.checkpoint";
import {ImportantInformationPage} from "./pages/importantInformation-page/importantInformation.page";



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainPage, pathMatch: 'prefix'},
  {path: 'distance/:id', component: DistanceView, pathMatch: 'full'},
  {path: 'importantInformation', component: ImportantInformationPage, pathMatch: 'full'},
  {path: 'admin-page/login', component: AdminPageLogin, pathMatch:'full'},
  {path: 'admin-page/distances', component: AdminPageDistance, pathMatch:'full'},
  {path: 'admin-page/login', component: AdminPageLogin, pathMatch:'full'},
  {path: 'admin-page/event', component: AdminPageEvent, pathMatch:'full'},
  {path: 'admin-page/subSection', component: AdminPageSubSection, pathMatch:'full'},
  {path: 'admin-page/checkpoint', component: AdminPageCheckpoint, pathMatch:'full'},
  {path: '**', redirectTo: '404'}

];

@NgModule({
  providers: [
    GlobalHttpInterceptorProviders
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
