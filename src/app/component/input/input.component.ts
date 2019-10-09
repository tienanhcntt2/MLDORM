import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Employer } from 'src/app/model/Employer';
import { DatePipe } from '@angular/common';
import { Region } from 'src/app/model/Region.js';
import { LocationUse } from 'src/app/model/location';
// import data json
import sampleData from './data.json';
import buildData from './build.json';
import locationPublic from './location.json';

import locationPrivate from './location_private.json';
import manager from './manager.json';
import { Manager } from 'src/app/model/manager.js';
import { Adnomal } from 'src/app/model/Adnomal.js';
import { ConfigDataService } from 'src/app/Sevice/config-data.service.js';
import { DataDemo } from 'src/app/model/DataDemo.js';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

// component 
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  inputForm: FormGroup;
  employer: any = sampleData;
  private listEmployer: Employer[] = [];
  private position: number = 0;
  private txt_today: string;
  // value
  private build: any = buildData;
  private listRegion: Region[] = [];
  private disbaleButton: boolean = false;
  submitted = false;
  private icon_save: string = "assets/image/icon_save_0.PNG";

  private room: Region;
  private titleRoom: string = "";
  private hiddenSeach: string = "anSeach";
  private hiddenLocation: string = "anSeach";

  // lua chon radio
  private selectKhuvuc: string = "private";
  private location_Pulic: any = locationPublic;
  private location_Privare: any = locationPrivate;
  private listPulic: LocationUse[] = [];

  selectedLevel: string;

  // filter
  private titleLocation: string = "";
  private listTang: string[] = [];

  private checkNodeid: boolean = false;
  private nameRom: string ="";

  // check value
  private checkRegionSelect: boolean = true;
  private disableAbnormal: boolean = false;
  private checkInputRegion: boolean = false;
  private checkInputLocation: boolean = false;

  // import data json manager
  manager: any = manager;
  private listManager: Manager[] = [];
  private filteredStates: Observable<Manager[]>;
  private filteredAbnomarl : Observable<Adnomal[]>;
  private listAdnomarl: Adnomal[] = [];
  // check boolean input when use click text input
  private checkTelephone: boolean = false;
  private checkNodeIdManager: boolean = false;
  private checkFullNameManager: boolean = false;
  private checkbuildRoom: boolean = false;
  private checkInputFloor: boolean = false;
  private checknameAdnormal: boolean = false;
  private checkDescription: boolean = false;
  private checkIdabnormal: boolean = false;
  private checkSaveDrom :boolean = false;
  /**
   * 
   * @param formBuilder 
   * @param http 
   * @param datePipe 
   */
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private datePipe: DatePipe, private configData: ConfigDataService) {
    let date = new Date();
    this.txt_today = this.datePipe.transform(new Date(), "yyyy/MM/dd");
    this.listRegion = this.build;
    this.listManager = this.manager;
    this.initListAdnomarl();
  }

  ngOnInit() {
    this.listEmployer = this.employer;
    this.inputForm = this.formBuilder.group({
      telephone: ['', Validators.required],
      manhanvien: ['', Validators.required],
      contactnumber: ['', Validators.required],
      maphong: ['',Validators.required],
      fullname: ['',Validators.required],
      today: [this.txt_today,Validators.required],
      romnumber: ['', Validators.required],
      nodeIDManage: ['', Validators.required],
      nameManage: ['', Validators.required],
      searchText: ['', Validators.required],
      searchLocation: ['', null],
      tangNumber: ["", Validators.required],
      buildRoom: ['', Validators.required],
      inputLocation: ['', Validators.required],
      idAbnormal: ['', Validators.required],
      nameAdnormal: ['', Validators.required],
      description:['',Validators.required]
    });
    this.checkSelectRegion();
    // check select rogion
    if (this.titleRoom.length <= 0) {
      this.listTang = [];
    } else {
      this.listTang = ["1F", "2F", "3F", "4F", "5F", "RF"];
    }

    // set function
    this.initConfig();

    this.filteredStates = this.f.nodeIDManage.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.listManager.slice())
    );
   
    
  }
  /**
   * set config
   */
  private initConfig() {
    if (this.f.idAbnormal.value.length <= 0) {
      this.disableAbnormal = false;
    } else {
      this.disableAbnormal = true;
    }
  }

  selectIDNode(event:any){
   this.inputForm.get("nameManage").setValue(event);
  }
  /**
   * demo hello
   */
  hello() {
    if (this.checkRegionSelect) {
      if (this.f.maphong.value.length <= 0) {
        this.checkNodeid = true;
        this.hiddenLocation = "anSeach";
      } else {
        this.hiddenLocation = "showSeach";
        this.listPulic = this.location_Privare;
      }
    } else {
      if (this.titleRoom.length <= 0) {
        this.checkbuildRoom = true;
        this.hiddenLocation = "anSeach";
      } else if (this.f.tangNumber.value.length <= 0) {
        this.checkInputFloor = true;
      } else {
        this.hiddenLocation = "showSeach";
        this.listPulic = this.location_Pulic;
        this.checkbuildRoom = false;

      }
    }
    
  }
  onKey(event: any) {
    if (this.checkInputTab(event.target.value)) {
      this.inputForm.get("contactnumber").setValue(this.listEmployer[this.position].phone);
      this.inputForm.get("maphong").setValue(this.listEmployer[this.position].numberRoom);
      this.inputForm.get("fullname").setValue(this.listEmployer[this.position].fullName);
      this.checkNodeid = false;
    } else {
      this.checkNodeid = true;
      this.inputForm.get("contactnumber").setValue("");
      this.inputForm.get("maphong").setValue("");
      this.inputForm.get("fullname").setValue("");
    }
  }
  /**
   *  event input node id
   * @param event 
   */
  eventInput(event: any) {
    if (this.f.telephone.value.length <= 0) {
      this.checkTelephone = true;
    }
    if (this.checkInputTab(event.target.value)) {
      this.inputForm.get("contactnumber").setValue(this.listEmployer[this.position].phone);
      this.inputForm.get("maphong").setValue(this.listEmployer[this.position].numberRoom);
      this.inputForm.get("fullname").setValue(this.listEmployer[this.position].fullName);
      this.checkNodeid = false;
      
      this.checkSelectRegion();
    } else {
      this.checkNodeid = true;
      this.inputForm.get("contactnumber").setValue("");
      this.inputForm.get("maphong").setValue("");
      this.inputForm.get("fullname").setValue("");
    }
    this.showIconSave();
  }


  /**
   * event input telephone
   * @param event 
   */
  eventInputTelephone(event: any) {
    if (event.target.value.length > 0) {
      this.checkTelephone = false;
    }
    this.showIconSave();
  }
  /**
   * check node id valid
   * @param nodeId 
   */
  private checkInputTab(nodeId: string) {
    let flag = false;
    for (let i = 0; i < this.listEmployer.length; i++) {

      if (this.listEmployer[i].Nodeid === nodeId.toUpperCase()) {
        flag = true;
        this.position = i;
      }
    }
    return flag;
  }


  /**
   * return build form 
   */
  get f() {
    return this.inputForm.controls;
  }

  /**
   * event input id manager
   * @param event 
   */
  eventIDManager(event: any) {

    if (this.returnManager(event.target.value)) {
      this.inputForm.get("nameManage").setValue(this.listManager[this.positionMananger].fullName);
    } else {
      this.inputForm.get("nameManage").setValue("");
    }
  
  }
  positionMananger: number;
  private returnManager(manager: string) {
    let flag = false;
    for (let i = 0; i < this.listManager.length; i++) {
      if (this.listManager[i].idNode === manager.toUpperCase()) {
        flag = true;
        this.positionMananger = i;
      }
    }
    return flag;

  }
  /**
   * return name employer
   * @param manager 
   */
  private returnNameManager(manager: string) {
    let flag = false;
    for (let i = 0; i < this.listManager.length; i++) {
      if (this.listManager[i].fullName === manager.toUpperCase()) {
        flag = true;
        this.positionMananger = i;
      }
    }
    return flag;

  }

  /**
   * select room i
   * @param i 
   */
  selectRoom(i) {

    this.submitted = true;

    this.room = this.listRegion[i];
    this.titleRoom = this.room.title;
    this.disbaleButton = false;
    this.listTang = ["1F", "2F", "3F", "4F", "5F", "RF"];
    this.listPulic = this.location_Pulic;
    this.checkbuildRoom = false;
    this.checkRegion();
    this.showIconSave();
    
  }
  /**
   * select location
   * @param i 
   */
  selectLocation(i) {
    this.submitted = true;
    this.titleLocation = this.listPulic[i].nameLocation;
    this.checkLocation();
    this.showIconSave();
  }
  /**
   * input Description
   * @param event 
   */
  eventDescription(event: any) {
    this.checkDescription = false;
    if(event.target.value.length <=0){
      this.checkDescription = true;
    }
    this.showIconSave();
  }
  /**
   * show icon save
   */
  private showIconSave() {
    
    this.icon_save = "assets/image/icon_save_0.PNG";
    this.submitted = true;
    this.checkInput();
     if(!this.inputForm.validator){
       if(!this.checkTelephone && !this.checkNodeid && !this.checkbuildRoom && !this.checkInputLocation
        && !this.checkDescription && !this.checkIdabnormal && !this.checknameAdnormal){
          this.icon_save = "assets/image/icon_save.PNG";
          this.checkSaveDrom = true;
       }else{
        this.icon_save = "assets/image/icon_save_0.PNG";
        this.checkSaveDrom = true;
       }
     }
 
  }
  private checkInput(){
    
    if(this.disableAbnormal){
      this.checkIdabnormal = true;
    }
    if(this.titleLocation.length <=0){
      this.checkInputLocation = true;
     
    }
    if(!this.checkRegionSelect){
      this.nameRom = "公用區域"+this.f.tangNumber.value+"楼";
    }else{
      this.nameRom =this.f.maphong.value +"寇室";
    }
    if(this.f.description.value.length <=0){
      this.checkDescription  = true;
    }
    if(this.f.nameAdnormal.value.length <=0){
      this.checknameAdnormal =true;
    }
  }
  /**
   * save data
   */
  private dataDemo: DataDemo;
  clickSave(){
   this.submitted = true;
   let reGion:string ="";
   if(this.checkSaveDrom){
     if(this.checkRegionSelect){
      reGion = this.f.maphong.value.substring(0,1);
     }else{
       reGion = this.titleRoom;
     }
     this.dataDemo = new DataDemo();
     this.dataDemo.shape ="结案",
     this.dataDemo.Numbering = this.f.telephone.value;
     this.dataDemo.reactionDate = this.f.today.value;
    //  console.log("date : " +this.f.fullName.value);
     this.dataDemo.dormitoryStaff = this.f.fullname.value;
    //  console.log("date : " +this.f.fullName.value);
     this.dataDemo.dormitoryEast = reGion;
     this.dataDemo.location = this.nameRom;
     this.dataDemo.abnormal = this.f.idAbnormal.value;
     this.dataDemo.abnormalName =this.f.nameAdnormal.value;
     this.dataDemo.description  = this.f.description.value;
     this.dataDemo.telephoneContact = this.f.contactnumber.value;
     this.dataDemo.managerStaff = this.f.nameManage.value;
     this.dataDemo.dateofacceptance ="";
     this.dataDemo.Fillintheday ="";
     this.dataDemo.Actualday ="";
     if(this.configData.saveProjectNormal(this.dataDemo)){
      this.inputForm.reset();
      this.submitted = false;
      this.checkTelephone = false;
      this.checkNodeid = false;
     }else{
      this.inputForm.reset();
      this.submitted = false;
      this.checkTelephone = false;
      this.checkNodeid = false;
     }
   }else{
     this.checkInput();
   }
  }
 

  private checkRegion() {
    if (this.checkRegionSelect) {
      this.checkInputRegion = false;
    } else {
      if (this.titleRoom.length <= 0) {
        this.checkInputRegion = true;
      } else {
        this.checkInputRegion = false;
      }
    }

  }
  /**
   * select qu shi
   */
  selectPrivate() {
    this.checkRegionSelect = true;
    this.titleLocation = "";
    this.checkSelectRegion();
    this.inputForm.get("nameAdnormal").setValue("");
    this.showIconSave();
    this.initListAdnomarl();
  }
  /**
   * lua chon cong cong
   */
  selectPublic() {
    this.checkRegionSelect = false;
    this.titleLocation = "";
    this.checkSelectRegion();
    this.inputForm.get("nameAdnormal").setValue("");
    this.showIconSave();
    this.initListAdnomarl();
  }
  /**
   * check select radio 
   */
  private checkSelectRegion() {
    if (this.checkRegionSelect) {
      this.disbaleButton = true;
      this.disbaleButton = true;

      this.listRegion = [];

      this.titleRoom = "";
      this.listTang = [];
      this.hiddenSeach = "anSeach";
      if (this.f.maphong.value.length > 0) {
        this.listPulic = this.location_Privare;
      } else {
        this.listPulic = [];
      }

    } else {
      this.disbaleButton = false;
      this.listRegion = this.build;
      this.hiddenSeach = "showSeach";

      if (this.titleRoom.length <= 0) {
        this.disbaleButton = true;
        this.listPulic = [];

      } else {
        this.disbaleButton = false;
        this.listPulic = this.location_Pulic;
      }
    }
  }
  /**
   * select region
   * @param event 
   */
  selectRegion(event: any) {
   
    this.checkInputFloor = false;
  }
  /**
   * goto back
   */
  onBack() {
    //this.onPopState(event);

  }
  /**
   * on back
   * @param event 
   */
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    //alert('Back button pressed');
  }

  private checkLocation() {
    if (this.titleLocation.length <= 0) {
      this.checkInputLocation = true;
    } else {
      this.checkInputLocation = false;
    }
  }

  private _filterStates(value: string): Manager[] {
    const filterValue = value.toLowerCase();
    
    return this.listManager.filter(state => state.fullName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterAdnomarl(value: string): Adnomal[] {
    const filterValue = value.toLowerCase();
   
    return this.listAdnomarl.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  //get list adnomarl
  private initListAdnomarl(){
    let url ="/projectAdnomalPublic"
    if(this.checkRegionSelect){
      url="/projectAdnomalPrivate";
    }
    
    this.configData.getListAdnomarl(url).subscribe(data =>{
      this.listAdnomarl = data;
      this.filteredAbnomarl = this.f.idAbnormal.valueChanges.pipe(
        startWith(''),
        map(state => state ? this._filterAdnomarl(state) :this.listAdnomarl.slice())
      );
    })
  }

  /**
   * select id adnomarl
   * @param event 
   */
  name: string ="";
  selectIDAdnomarl(event:any){
    this.disableAbnormal = true;
    this.name = event.target.value;
    
  }
  selectAdnomol(){
    alert(name);
    this.inputForm.get("nameAdnormal").setValue(name);
  }

  eventIdNomarl(event:any){
    if(event.target.value.length<=0){
      this.inputForm.get("nameAdnormal").setValue("");
      this.disableAbnormal = false;
    }
  }
}


