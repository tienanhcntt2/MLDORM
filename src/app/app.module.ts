import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { InquireComponent } from './component/inquire/inquire.component';
import { InputComponent } from './component/input/input.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InquireService } from './model/inquire';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InquireComponent,
    InputComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    InquireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
