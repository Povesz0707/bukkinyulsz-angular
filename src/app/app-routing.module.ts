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
import {ResultPage} from "./pages/result-page/result.page";
import {AuthGuard} from "./auth/auth.guard";
import {RegistrationPage} from "./pages/registration-page/registration.page";
import {AdminPageSponsor} from "./pages/admin-page/admin-page-sponsor/admin-page-sponsor/admin.page.sponsor";
import {AdminPageTender} from "./pages/admin-page/admin-page-tender/admin-page-tender/admin.page.tender";
import {AdminPageNews} from "./pages/admin-page/admin-page-news/admin-page-news/admin.page.news";
import {NewsPage} from "./pages/news/news.page";
import {NewsPagePage} from "./pages/news-page/news-page.page";
import {GaleryImage} from "./model/galeryImage-model/galeryImage.model";
import {AdminPageImageGalery} from "./pages/admin-page/admin-page-imageGalery/admin-page-tender/admin.page.imageGalery";
import {GaleryPage} from "./pages/galery-page/galery.page";



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainPage, pathMatch: 'prefix'},
  {path: 'news/:id', component: NewsPage, pathMatch: 'full'},
  {path: 'newses', component: NewsPagePage, pathMatch: 'prefix'},
  {path: 'galery', component: GaleryPage, pathMatch: 'prefix'},
  {path: 'resultPage', component: ResultPage, pathMatch: 'prefix'},
  {path: 'distance/:id', component: DistanceView, pathMatch: 'full'},
  {path: 'importantInformation', component: ImportantInformationPage, pathMatch: 'full'},
  {path: 'admin-page/login', component: AdminPageLogin, pathMatch:'full'},
  {path: 'registration/:tourEventId', component: RegistrationPage, pathMatch:'full'},
  {path: 'registration/:tourEventId/:distanceId', component: RegistrationPage, pathMatch:'full'},
  {path: 'admin-page/distances', component: AdminPageDistance, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/login', component: AdminPageLogin, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/event', component: AdminPageEvent, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/subSection', component: AdminPageSubSection, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/checkpoint', component: AdminPageCheckpoint, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/sponsor', component: AdminPageSponsor, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/tender', component: AdminPageTender, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/news', component: AdminPageNews, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'admin-page/imageGalery', component: AdminPageImageGalery, pathMatch:'full', canActivate: [AuthGuard]},
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
