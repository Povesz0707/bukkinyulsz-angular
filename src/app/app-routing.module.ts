import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GlobalHttpInterceptorProviders} from "./interseptor/global-http-interceptor.service";
import {MainPage} from "./pages/main-page/main.page";



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: MainPage, pathMatch: 'prefix'},
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
