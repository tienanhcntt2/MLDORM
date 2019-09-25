import { Component, OnInit } from '@angular/core';
import { InquireService, Inquire } from 'src/app/model/inquire';

@Component({
  selector: 'app-inquire',
  templateUrl: './inquire.component.html',
  styleUrls: ['./inquire.component.scss']
})
export class InquireComponent implements OnInit {

  listQuire: Inquire[];
  constructor(private inquireService:InquireService) { }

  ngOnInit() {
    this.listQuire = this.inquireService.getListInquire();
  }

}
