import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adnomal } from '../model/Adnomal';
import { DataDemo } from '../model/DataDemo';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {

  private url ="http://localhost:3000";
  constructor(private http: HttpClient) { }

  public getListAdmonomalPrivate(){
    return this.http.get<Adnomal[]>(this.url +"/"+"projectAdnomalPrivate");
  }
  public getListAdmonomalPublic(){
    return this.http.get<Adnomal[]>(this.url +"/"+"projectAdnomalPublic");
  }

  public getNameAdmono(region:string,id: number){
    return this.http.get<Adnomal>(this.url +region+id);
  }

  public getListAdnomarl(region:string){
    return this.http.get<Adnomal[]>(this.url +region);
  }
  public saveProjectNormal(dataDemo:DataDemo){
    let flat : boolean = false;
    this.http.post("http://localhost:3000/dataDemo",dataDemo).pipe().subscribe(data =>{
      flat = true;
    },err =>{
      flat = false
    });
    return flat;
  }
 
  public getProjectNormal(){
    return this.http.get<DataDemo[]>(this.url +"/dataDemo");
  }
}
