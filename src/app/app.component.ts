import { Component, OnInit } from '@angular/core';
import { LanguageService } from './util/LanguageService';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MLDORM';
  constructor(private languageService: LanguageService){}
  /**
   * ng onit
   */
  ngOnInit() {
    this.languageService.setInitState();
  }
  
}
