import { Injectable, OnInit } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class DataService  implements OnInit{
 
 
myauth:boolean=false
 
  ngOnInit(){}
 constructor( ) {}

 coddate:string;
batchesdata:any;
cdatafobatdel:any;
userdata:any={licno:'KA/6666/9999',adharno:895190016444}
userdocid:string;
  orderbillingdata:any;
  isbilldataad:boolean=false;

showhome:boolean=true;

}




