import { Component, OnInit } from '@angular/core';
import { InquireService, Inquire, NameHeader } from 'src/app/model/inquire';
import { ConfigDataService } from 'src/app/Sevice/config-data.service';
import { DataDemo } from 'src/app/model/DataDemo';

@Component({
  selector: 'app-inquire',
  templateUrl: './inquire.component.html',
  styleUrls: ['./inquire.component.scss']
})
export class InquireComponent implements OnInit {

  private listData:DataDemo[] =[];
  private listHeader : NameHeader[] = [];

  constructor(private inquireService:InquireService, private conFigData: ConfigDataService) { }

  ngOnInit() {
   
    this.listHeader = this.inquireService.getListHeader();
    this.conFigData.getProjectNormal().subscribe(data =>{
      this.listData = data;
   });
  }

}
