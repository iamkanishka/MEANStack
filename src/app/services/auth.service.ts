import { Injectable, NgZone } from "@angular/core";

import { map, timestamp } from "rxjs/operators";

import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { Observable, Timestamp, BehaviorSubject } from "rxjs";
import { DataService } from "../data/data.service";

import * as moment from "moment";
export interface users {
  fullname?: string;
  licno?: string;
  phone?: number;
  adharno?: number;
  address?: string;
  state?: string;
  distow?: string;
  username?: string;
  status?: boolean;
  permission?: boolean;
  ctype?: string;
}


@Injectable({
  providedIn: "root"
})
export class AuthService {



 
  crcdetails: Observable<users[]>;
  grgdetails: Observable<users[]>;



 
  item: Observable<any>;

  constructor(

    private router: Router,
    private _snackBar: MatSnackBar,
 private zone:NgZone,


    public ds: DataService) {


    









  }





  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);


  error: string;
  emailSent = false;
  useruid: string;

 
  //Register the account
  Register(email: string, password: string, data: any) {




  }




  UserDocid: string;

  recaptchaWidgetId:any;
  getcode:any;
  Result:any

  userid: string;
  login(email: string, apassword: string) {

  }


 
 
 
 
  logOut() {
   


  }

  sdate: string;




}


