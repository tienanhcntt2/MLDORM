import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/util/LanguageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private showLogin: boolean = true;
  public languages = ListLanguage;
  public lag: Language;
  private lg: string = "";
  private entrypoint: string = '';
  public activeState: string ;
  /**
   * contrustor header of website
   * @param translateService 
   * @param languageService 
   */
  constructor(private translateService: TranslateService,
    private languageService: LanguageService) { }

    /**
     * function onit there fist
     */
  ngOnInit() {
    this.lg = localStorage.getItem("language");
    for (let i = 0; i < this.languages.length; i++) {
      if (this.languages[i].title === this.lg.toUpperCase()) {
        this.lag = this.languages[i];
        this.activeState = this.languages[i].title.toUpperCase();
      }
    }
    this.translateService.use(this.lg);
  }
  /**
   * function click login
   */
  clickLogin(){
    window.location.href = this.EntryPoint;
  }
   /**
    * selete languager
    * @param i 
    */
   selectLanguage(i: number) {
    this.lag = this.languages[i];
    this.activeState =this.languages[i].title.toUpperCase();
    this.translateService.use(this.languages[i].title.toLowerCase());
    localStorage.setItem("language", this.languages[i].title.toLowerCase());
  }
 /**
  * link call web login 
  */
  public get EntryPoint(): string {
    if (this.entrypoint.length == 0) {
      let para: string = '';
      Object.keys(environment.OIDC.Paramaters).forEach((k: string) => {

        para += k + '=' + environment.OIDC.Paramaters[k] + '&';

      });
      this.entrypoint = environment.OIDC.baseUrl + environment.OIDC.authorizationEndpoint + '?' + para.substring(0, para.length - 1);

    }

    return this.entrypoint;
  }
}
export class Language {

  constructor(public id:number,public imagePath: string,public title :string,public name:string){

  };
}
export const ListLanguage : Language[] =[
  {id:1,imagePath: "assets/image/vietnam.png", title : "VI",name:"Việt Nam"},
  {id:2,imagePath: "assets/image/taiwan.png", title : "ZH",name:"中文" },
  {id:3,imagePath: "assets/image/flag.png", title : "EN",name:"English"}

];
