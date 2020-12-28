import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import * as moment from "moment";

import * as firebase from "firebase/app";

import { HttpClient } from "@angular/common/http";
import { startWith, map } from 'rxjs/operators';
import { DataService } from '../data/data.service';

import { AngularFireAuth } from "@angular/fire/auth";

import {
  AngularFirestore,

} from "@angular/fire/firestore";

export interface show {
  showlog: boolean;
  showreg: boolean;
}

export interface type {
  value: string;
  viewValue: string;
}

export class District {
  value: string;
}
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hide = true;


  types: type[] = [
    { value: "CRC", viewValue: "CRC" },


  ];

  showopt: boolean

  feid: string;
  fpass: string;


  resetemail: FormGroup;


  reset: boolean = false;

  regtag: boolean;
  logtag: boolean;

  loginform: FormGroup;
  regfpform: FormGroup;


  regadform: FormGroup;
  regepform: FormGroup;

  renewalform: FormGroup;

  regtaform:FormGroup;
  regsdform:FormGroup;

  secret:FormGroup;

  districts: District[] = []
  towns: District[] = []
  states: District[] = []


  tscfilteredOptions: Observable<District[]>;

  lrformstatus: Observable<show>;
  topshow: string;

  ol: String;

  tscloc: District[] = []

anoreg:boolean=false;



dfilteredOptions: Observable<District[]>;

tfilteredOptions: Observable<District[]>;
sfilteredOptions: Observable<District[]>;

getsecret:boolean

  oooo: any
  renewal: boolean = false;
  errmess: String;

  constructor(
    private fb: FormBuilder,
    public d: DataService,
    private router: Router,
    private afAuth: AngularFireAuth,

    private _snackBar: MatSnackBar,

    private http: HttpClient,
    private afs: AngularFirestore,

  ) {


    const io = this.http.get('http://localhost:9000/logindata', { responseType: 'json' }).subscribe((resdata: any[]) => {
      if (resdata.length == 0) {
        this.takelog = false;
        this.takereg = true;
        this.showopt = false;
        this.getsecret=true;
        this._snackBar.open("Please Register Yourself", "", {
          duration: 2000
        });


      } else {
        this.getsecret=false;


     this.anoreg=true
        this.showopt = true;
        this.oooo = resdata[0];



        var today = new Date();
        var rtoday = new Date(today.toDateString()).toLocaleDateString("en-GB");
        this.ol = rtoday
        var a = moment(this.oooo.date, "DD/MM/YYYY");
        var b = moment(rtoday, "DD/MM/YYYY");
        var abdays = b.diff(a, "days");

       // console.log(abdays);

        // if(abdays>365){
          if(abdays>365){
          this.renewal = true
        }

        // if(this.oooo.renewalcode=="RIPLSARAS6");




      }

    })




    this.http.get('assets/districts.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.districts.push({ value: row[0] });
          }
          //// console.log(this.districts);
          //// console.log({...this.districts})
        },
        error => {
         // console.log(error);
        }
      );


    this.http.get('assets/taluk.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.towns.push({ value: row[0] });
          }
          //  // console.log(this.towns);
          //// console.log({...this.districts})
        },
        error => {
         // console.log(error);
        }
      );


    this.http.get('assets/states.csv', { responseType: 'text' })
    .subscribe(
      data => {
        let csvToRowArray = data.split("\n");
        for (let index = 1; index < csvToRowArray.length - 1; index++) {
          let row = csvToRowArray[index].split(",");

          this.states.push({value:row[0]});
        }
      // // console.log(this.states);
       //// console.log({...this.districts})
      },
      error => {
       // console.log(error);
      }
    );



    this.http.get('assets/tscloc.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.tscloc.push({ value: row[0] });
          }
         // console.log(this.tscloc);
          //// console.log({...this.districts})
        },
        error => {
         // console.log(error);
        }
      );




  }


  // private _tscfilter(name: string): District[] {
  //   const filterValue = name.toLowerCase();

  //   return this.tscloc.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  // }


  //confirmationResult:any
  displayFn(user?: any): string | undefined {
    return user ? user : undefined;
  }




  ngOnInit() {

 
    this.secret= this.fb.group({
      secret: ["", [Validators.required]],
     
 
     });
    this.regsdform= this.fb.group({
     state: ["", [Validators.required]],
      district: ["", [Validators.required]],

    });

    
    this.regtaform= this.fb.group({
      taluk: ["", [Validators.required]],
      tsc:["", [Validators.required]],
       authority: ["", [Validators.required]],
 
     });


    this.resetemail = this.fb.group({
      pass: ["", [Validators.required]],
      repass: ["", [Validators.required]],

    });


    this.renewalform = this.fb.group({
      renewal: ["", [Validators.required]],

    });



    this.loginform = this.fb.group({
      eid: ["", [Validators.required]],
      password: [
        "",
        [Validators.required, Validators.maxLength(10), Validators.minLength(5)]
      ]
    });

    this.regfpform = this.fb.group({
      fullname: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10),,Validators.pattern(/^(0|[1-9]\d*)?$/)]]

    });

 
    this.regepform = this.fb.group({
      eid: ["", [Validators.required,]],
      password: ["", [Validators.required]]
    });





    this.resetemail.valueChanges.subscribe((dres) => {
     // console.log(dres);
      if (dres.repass != null && dres.pass != null) {
        if (String(dres.repass).length > String(dres.pass).length / 2) {
          if (String(dres.repass) != String(dres.pass)) {
            this.errmess = 'Password is Not Matching';
          } else {
            this.errmess = 'Password Matched';

          }

        }
      }


    })


    this.dfilteredOptions =this.regsdform.get('district').valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : null),
      map(name => name ? this._dfilter(String(name)) : this.districts.slice()),

    )


    this.sfilteredOptions = this.regsdform.get('state').valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : null),
      map(name => name ? this._sfilter(name) : this.states.slice())
    );
    this.tfilteredOptions = this.regtaform.get('taluk').valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : null),
      map(name => name ? this._tfilter(name) : this.towns.slice())
    );

    // this.tscfilteredOptions = this.regadform.get('tscloc').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : null),
    //     map(name => name ? this._tscfilter(name) : this.tscloc.slice())
    //   );


  }

  
  private _sfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.states.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  }



  
  private _dfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.districts.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  }
  private _tfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.towns.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);
  }
 


  Result: any






resultdata:any

  async Register() {

    
  if(navigator.onLine){
    // alert('online');

   
  
    this.afAuth.auth
    .signInWithEmailAndPassword("tscreg@gmail.com", "8951900164")
    .then(user => {
    
    

    })


if(this.secret.value.secret=="RuhminnovatioN"){






    this._snackBar.open("Registering...", "", {
      duration: 7000
    });
    const sdtdata: any[] = [];

    const fpvalue = this.regfpform.value;

    const sdvalue = this.regsdform.value;
    const epvalue = this.regepform.value;
    const tavalue = this.regtaform.value;

    const secret = this.secret.value;


    var today = new Date();
    var rtoday = new Date(today.toDateString()).toLocaleDateString("en-GB");

    sdtdata['date'] = rtoday


    //// console.log(data);

    if (!this.anoreg) {
    const data = { ...fpvalue, ...sdvalue,...tavalue, ...epvalue, ...sdtdata,...secret };

      const io = this.http.post('http://localhost:9000/logindata', data, { responseType: 'json' }).subscribe((resdata) => {
      // console.log(resdata);
       this.regtaform.reset();

        this.regsdform.reset();
        this.regepform.reset();
        this.regfpform.reset();
this.secret.reset();

        const read =   this.http.get('http://localhost:9000/logindata', { responseType: 'json' }).subscribe((resdata: any[]) => {
   
          console.log(resdata);
          this.resultdata=resdata
    
          this.afs.collection('ztscreg').doc(String(this.resultdata[0]._id)).set(data).then(()=>{
            this.regtaform.reset();
      
            this.regsdform.reset();
             this.regepform.reset();
             this.regfpform.reset();
             this.router.navigate(["/home"]).then(()=>{
               this._snackBar.open("Welcome " + String(this.resultdata[0].fullname), "", {
                 duration: 2000
               });
             })
         })
    
    
    
        })
      

      })



    

    } 
    if(this.anoreg) {
    var data = { ...fpvalue, ...sdvalue,...tavalue, ...epvalue, ...sdtdata };

      const io = this.http.patch('http://localhost:9000/logindata/'+String(this.oooo._id), data, { responseType: 'json' }).subscribe((resdata) => {

       // console.log(resdata);
this.resultdata=resdata
     

      })
    }




  }else{
    this._snackBar.open("You have Entered Wrong Secret Key", "", {
      duration: 2000
    })
  }
  




} else {
  // alert('offline')
  
  this._snackBar.open("Please Connect to the Internet for Registration", "", {
    duration: 2000
  })
 }
  }

  login() {
    this._snackBar.open("Authenticating...", "", {
      duration: 10000
    });

    this.feid = this.loginform.value.eid;
    this.fpass = this.loginform.value.password;
    //console.log(this.loginform.value.email);

   // console.log(this.feid, this.fpass);

    this.loginform.reset();

    const io = this.http.get('http://localhost:9000/logindata', { responseType: 'json' }).subscribe((resdata) => {

     // console.log(resdata);
      if (this.feid == String(resdata[0].eid) && this.fpass == String(resdata[0].password)) {
this.d.myauth=true
        this.router.navigate(["/home"]).then(() => {
          this._snackBar.open("Welcome " + String(resdata[0].fullname), "", {
            duration: 2000
          });
        })

      } else {
        this._snackBar.open("Incorrect Credentials", "", {
          duration: 5000
        });
      }


    })



  }

  takereg: boolean = false;
  takelog: boolean = true;

  showofflog: boolean = false


  passwordreset() {


    this.oooo.password = this.resetemail.value.repass

    const iio = this.http.patch('http://localhost:9000/logindata/' + this.oooo._id, this.oooo, { responseType: 'json' }).subscribe((upresdata) => {
      this.reset = false; this.loginform.reset(); this.resetemail.reset();
      this._snackBar.open("Password Reset", "", {
        duration: 5000
      });
    })
  }



  getreg() {
    this.takelog = false;
    this.takereg = true;



    this.loginform.reset();

    this.regfpform.reset();
    this.regsdform.reset();
    this.regepform.reset();
    this.regtaform.reset();


  }

  getlog() {
    this.takelog = true;
    this.takereg = false;

    this.loginform.reset();

    this.regfpform.reset();
    this.regsdform.reset();
    this.regepform.reset();
    this.regtaform.reset();

  }

  renew() {
    var ren = this.renewalform.value.renewal;
    if (String(ren) == "RIPLSARAS6") {
      var kk = {
        date: this.ol
      }
      const iio = this.http.patch('http://localhost:9000/logindata/renewal/' + this.oooo._id, kk, { responseType: 'json' }).subscribe((upresdata) => {


        this._snackBar.open("Subscription Renewed", "", {
          duration: 2000
        });

        this.renewal = false;
        this.renewalform.reset()

      })


      const io = this.http.get('http://localhost:9000/logindata', { responseType: 'json' }).subscribe((resdata: any[]) => {

        this.oooo = resdata[0];

        var today = new Date();
        var rtoday = new Date(today.toDateString()).toLocaleDateString("en-GB");
        this.ol = rtoday
        var a = moment(this.oooo.date, "DD/MM/YYYY");
        var b = moment(rtoday, "DD/MM/YYYY");
        var abdays = b.diff(a, "days");

       // console.log(abdays);

        // if(abdays>365){
          if(abdays>365){
          this.renewal = true
        }
      })

    } else {
      this._snackBar.open("Wrong Renewal Code", "", {
        duration: 2000
      });
    }
  }

}
