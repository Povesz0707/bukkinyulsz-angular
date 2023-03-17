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



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainPage, pathMatch: 'prefix'},
  {path: 'distance/:id', component: DistanceView, pathMatch: 'full'},
  {path: 'admin-page/login', component: AdminPageLogin, pathMatch:'full'},
  {path: 'admin-page/distances', component: AdminPageDistancesList, pathMatch:'full'},
  {path: 'admin-page/login', component: AdminPageLogin, pathMatch:'full'},
  {path: 'admin-page/event', component: AdminPageEventList, pathMatch:'full'},
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
