import { Injectable } from '@angular/core';

export class Inquire{
     title: string;

}
export class NameHeader{
    titleHeader:string;
}
let listHeader: NameHeader[] =[
    {
        titleHeader:"狀惠"
    }, {
        titleHeader:"編號"
    }, {
        titleHeader:"反應日期"
    }, {
        titleHeader:"宿舍人員"
    }, {
        titleHeader:"宿舍東別"
    }, {
        titleHeader:"地點"
    }, {
        titleHeader:"異常項目"
    }, {
        titleHeader:"項目姓名"
    }, {
        titleHeader:"異常說明"
    }, {
        titleHeader:"連絡電話"
    }, {
        titleHeader:"管理人員"
    }, {
        titleHeader:"受理日期"
    }, {
        titleHeader:"填完日"
    }, {
        titleHeader:"實完日"
    }
]
let listInquire: Inquire[] =[
    {
    title:"1"},
    {
    title:"2"
    },
    {
    title:"3"
    },
    {
    title:"4"
    },
    {
    title:"5"
    },
    {
    title:"6"
    },
    {
    title:"7"
    },
    {
    title:"8"
    },
    {
    title:"9"
    },
    {
    title:"10"
    },
    {
    title:"11"
    },
    {
    title:"12"
    },
    {
    title:"13"
    },
    {
    title:"14"
    }
        
]

@Injectable()
export class InquireService{
    getListInquire():Inquire[]{
        return listInquire;
    }
    getListHeader() : NameHeader[]{
        return listHeader;
    }
}