import { Injectable } from '@angular/core';

export class Inquire{
     title: string;

}
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
}