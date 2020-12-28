import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  letteer:String

  constructor(    private http: HttpClient,    private router: Router,  public d: DataService,) {

    
    // if(!d.myauth){
    //   this.router.navigate(["/"]);
    // }
    const io = this.http.get('http://localhost:9000/logindata', { responseType: 'json' }).subscribe((resdata: any[]) => {
this.letteer=String(resdata[0].fullname)[0]

  })
   }

  ngOnInit() {
  }
 
}
