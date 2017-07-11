import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAppComponent } from './client.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HasspControllerComponent } from './hassp-controller/hassp-controller.component';
import { HasspPresenterComponent } from './hassp-presenter/hassp-presenter.component';
import { HttpModule } from '@angular/http';
import { Ng2TweetModule } from 'ng2-tweet/lib/index';

const appRoutes: Routes = [
  { path: 'controller', component: HasspControllerComponent },
  { path: 'presenter', component: HasspPresenterComponent },
  { 
    path: '**',
    redirectTo: '/presenter'
  }
];

@NgModule({
  declarations: [ClientAppComponent, HasspControllerComponent, HasspPresenterComponent],
  bootstrap: [ClientAppComponent],
  imports: [BrowserModule, FormsModule, HttpModule, Ng2TweetModule, RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )]      
})

export class AppModule {}