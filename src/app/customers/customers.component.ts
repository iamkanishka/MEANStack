import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay, tap, startWith, } from "rxjs/operators";

import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

import * as moment from "moment"
import { DataService } from '../data/data.service';
import { MatSnackBar } from "@angular/material/snack-bar";

import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

import { ExportToCsv } from 'export-to-csv';



export interface customers {
  fullname?: string;
  adharno?: number;
  phone?: number;
 tscloc?: string;
  surveyno?: string;
  district?: string;
  town?: string;
  date?: any;
  farmtype?: string;
  land?: number;
  mulland?: number;
ifscno?:number;
caste?:string;
gender?:string;
  odate?: any;
  village?: string;
  id?: string;
  _id?: string;
  voterid?:number;
  repid?:string;
  gram?:string;

  disdetails?: any[];
}

export interface Food {
  value: string;
  viewValue: string;
}


export class District {
  value: string;
}

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  displayedColumns = [
    "firstname",
    "fid",
    "lastname",
    "town",
 
    "village",
"phone",
    "land",
"recpid",
    "list",
    "actions"
  ];
  dataSource = new MatTableDataSource<customers>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ssdetails: Observable<any[]>;
  ssdetname: string;
  showaddc: boolean = false;
  flform: FormGroup;
  addform: FormGroup;
  pfform: FormGroup;
  dcform: FormGroup;

  benifitsform: FormGroup;


  spform: FormGroup;
  headstring: string = "Add";

  clearsalesid: string;

  showbenifits:boolean=false;

  showothdet:Boolean=false;
  showbut: boolean = true;
  showform: boolean = false;

  showaddemp: boolean = true;
  showup: boolean = false;
  showssaldet: boolean = false;

  checkmob: customers[] = [];
  showotherdetails:any
  ordbut: boolean = true;
  ordphone: boolean = false;



  datest: any;

  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];
  sdtform: FormGroup;
  apform: FormGroup;
  abs: string = "Add";
  len: number;
  clen: number;

  cgvform: FormGroup;

showphmes:string
  pppform: FormGroup
  isConnected = true;
  status = "Online";
  checktimes: number = 0;

  aibform:FormGroup

  districts: District[] = []
  towns: District[] = []
 gram: District[] = []
 villages: District[] = []
 tscloc: District[] = []


  dfilteredOptions: Observable<District[]>;
  gfilteredOptions: Observable<District[]>;
  tfilteredOptions: Observable<District[]>;
  vfilteredOptions: Observable<District[]>;
  tscfilteredOptions: Observable<District[]>;
  
  getbenifit:boolean=false

  sdistrict: FormControl
  inin: number;
  constructor(

    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public d: DataService,
    private _snackBar: MatSnackBar,
   
    private router: Router,
    private http: HttpClient,
  ) {

    // this.clearsales()


    
    // if(!d.myauth){
    //   this.router.navigate(["/"]);
    // }


    this.http.get('assets/districts.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.districts.push({ value: row[0] });
          }
     // console.log(this.districts);
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
         // console.log(this.towns);
          //// console.log({...this.districts})
        },
        error => {
         // console.log(error);
        }
      );


    this.http.get('assets/gram.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.gram.push({ value: row[0] });
          }
         // console.log(this.gram);
          //// console.log({...this.districts})
        },
        error => {
         // console.log(error);
        }
      );




      this.http.get('assets/villages.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.villages.push({ value: row[0] });
          }
      // console.log(this.villages);
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



    const li = String(d.userdata.licno);


this.mydata()

  }




  








  displayFn(user?: any): string | undefined {
    return user ? user : undefined;
  }

 

  private _gfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.gram.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  }

  private _dfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.districts.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  }
  private _tfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.towns.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);
  }
    private _vfilter(name: string): District[] {
      const filterValue = name.toLowerCase();
  
      return this.villages.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  }

  private _tscfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.tscloc.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

}



  ngOnInit() {


    


    this.sdistrict = new FormControl('', Validators.required);

    var a = moment("1/7/2018", "DD/MM/YYYY");
    var b = moment("10/7/2018", "DD/MM/YYYY");
    var days = b.diff(a, "days");
    //// console.log(days);



    this.pppform = this.fb.group({
      // cscheck: ["", [Validators.required, Validators.maxLength(12), Validators.minLength(12),Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      cscheck: ["", [Validators.required]],

    });


    this.benifitsform= this.fb.group({
      type: ["", [Validators.required]],
      area: ["", [Validators.required]],
      year: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      amount: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]]

    });




    this.flform = this.fb.group({
      fullname: ["", [Validators.required, Validators.maxLength(40)]],
      adharno: ["", [Validators.required, Validators.maxLength(12), Validators.minLength(12),Validators.pattern(/^(0|[1-9]\d*)?$/)]]
    });


    this.sdtform = this.fb.group({
      village: ["", [Validators.required]],
      town: ["", [Validators.required]],
      district: ["", [Validators.required]]
    });

    this.apform = this.fb.group({
      tscloc: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern(/^(0|[1-9]\d*)?$/)]],
    
      pincode: ["", [ Validators.required,Validators.maxLength(6), Validators.minLength(6),Validators.pattern(/^(0|[1-9]\d*)?$/)]]
    });

    this.pfform = this.fb.group({
      fftype: ["", [Validators.required]],
      land: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)\.(0|[1-9]\d*)?$/)]],
      mulland: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)\.(0|[1-9]\d*)?$/)]]

    });
    this.dcform = this.fb.group({
      repid: ["", [Validators.required]],
      farmtype: ["", [Validators.required]],
      surveyno: ["", [Validators.required]]

    });


    this.cgvform = this.fb.group({
      caste: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      fid: ["", [Validators.required]]

    });


    this.aibform = this.fb.group({
      accntno: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      ifscno: ["", [Validators.required]],
      branch: ["", [Validators.required]]

    });


    this.dfilteredOptions = this.sdtform.get('district').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : null),
        map(name => name ? this._dfilter(String(name)) : this.districts.slice()),

      )


    // this.gfilteredOptions = this.apform.get('gram').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : null),
    //     map(name => name ? this._gfilter(name) : this.gram.slice())
    //   );
    this.tfilteredOptions = this.sdtform.get('town').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : null),
        map(name => name ? this._tfilter(name) : this.towns.slice())
      );


      this.vfilteredOptions = this.sdtform.get('village').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : null),
        map(name => name ? this._vfilter(name) : this.villages.slice())
      );


      this.tscfilteredOptions = this.apform.get('tscloc').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : null),
        map(name => name ? this._tscfilter(name) : this.tscloc.slice())
      );




  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showadd() {
    this.showaddc = true;
  }

  cancel() {
    this.showaddc = false;
    this.flform.reset();
    this.sdtform.reset();
    this.apform.reset();
    this.cgvform.reset();
this.aibform.reset();

    this.pfform.reset();
    this.dcform.reset();
    this.headstring = "Add";
    this.showaddemp = true;
    this.showup = false;
    
  }

  cusfill: any;


  adhfill: any;
  orddpp: string
















  checkbefore() {

    this.orddpp = String(this.pppform.value.cscheck)
    
     this.adhfill = this.orddpp;



 this._snackBar.open(
      "Checking Customer ",
      "OK",
      {
        duration: 2000
      }
    )



    
 // const ujuju=  this.http.get('http://localhost:9000/farmersdata/adhno/'+this.orddpp, { responseType: 'json' })
 const ujuju=  this.http.get('http://localhost:9000/farmersdata/fid/'+this.orddpp, { responseType: 'json' })
   
 .subscribe(res=>{
        if(res==null){
         
          this.cgvform.patchValue({

            fid: String(this.adhfill)
          });



          this._snackBar.open(
            "Add Customer",
            "OK", { duration: 5000 });

          this.showaddc = true
        }else{
          this._snackBar.open(
            "Customer Already Exist...",
            "OK", { duration: 5000 });
        }


      
       

      })

  

      this.ordbut = true;
      this.ordphone = false;
      this.orddpp = null
      this.pppform.reset();
      this.clen = null;


  }




  async addemp() {
    this.http.get('http://localhost:9000/farmersdata/phno/'+
    this.apform.value.phone, { responseType: 'json' })
.subscribe((res)=>{



if(res==null){

      this.abs = "Creating...";
    const flvalue = this.flform.value;
    const sdtvalue = this.sdtform.value;
    const apvalue = this.apform.value;

    const pffvalue = this.pfform.value;
    const dcvalue = this.dcform.value;
    const cvgvalue = this.cgvform.value;
    const aibvalue = this.aibform.value;
    
    
    const empdet = {
      ...flvalue,
      ...sdtvalue,
      ...apvalue,
      ...pffvalue,
      ...dcvalue,
      ...cvgvalue,
      ...aibvalue
    };

    console.log(empdet)

   
  //  const cid = this.afs.AddId();
    const li = String(this.d.userdata.licno);

//    var senddata = this.afs.firestore.collection("customers").doc(cid);

    try {
      const data: any[] = [];

     

      data["disdetails"] = [];
      data["benifits"] = [];

    
      data['myuser'] = this.d.userdata;
      data['date'] =new Date;
  
      const adh: string = this.d.userdata.adharno.toString();
      const dis: string = this.sdtform.value.district.toString();
      const tow: string = this.sdtform.value.town.toString();

      
        const cusno =this.len+1

          const cusunique: string = String(cusno);


          data['uid'] = "RI".concat( "SFR", adh.slice(8, 12), dis.slice(0, 4).toUpperCase(), tow.slice(0, 4).toUpperCase(), "C", cusunique)

        //  transaction.update(Ahome, { ycuscount: increment })

        const dd={ ...empdet, ...data }
       // console.log(dd);
        
const io=this.http.post('http://localhost:9000/farmersdata',dd,{responseType: 'json'}).subscribe((resdata)=>{

console.log(resdata);


this._snackBar.open("Customer Added", "OK", {
  duration: 10000
});


this.mydata()

this.flform.reset();
this.pfform.reset();
this.dcform.reset();
this.apform.reset();
this.cgvform.reset();
this.aibform.reset();


this.abs = "Add";
this.sdtform.reset();
this.showaddc = false;
})




    } catch (err) {
     // console.error(err);
     // console.log(err);
    }
  }else{
    
this._snackBar.open("This Phone Number is Already in use", "OK", {
  duration: 10000
});

  }
})

  }

  getdata: any;
 

  editloaddata(datar: any) {



    //// console.log(datar.date)
    this.getdata = datar;
    this.showaddemp = false;
    this.showup = true;
    this.headstring = "Edit";
  // // console.log(datar);
    this.showaddc = true;
    
          this.flform.patchValue({
            fullname: datar.fullname,
            adharno: datar.adharno
          });
          this.sdtform.patchValue({
            village: datar.village,
            district: datar.district,
            town: datar.town
          });
          this.apform.patchValue({
            tscloc: datar.tscloc,
            phone: datar.phone,
            pincode: datar.pincode
          });
          this.pfform.patchValue({
            fftype: datar.fftype,
            land: datar.land,
            mulland: datar.mulland

          });
          this.dcform.patchValue({
            repid: datar.repid,
            farmtype: datar.farmtype,
            surveyno: datar.surveyno

          });


          this.cgvform.patchValue({
            caste: datar.caste,
            gender: datar.gender,
            fid: datar.fid

          });




          

          this.aibform.patchValue({
            accntno: datar.accntno,
            ifscno: datar.ifscno,
            branch: datar.branch

          });



      
      
      
     


       
  }
  aus: string = "Update";

  async updatedata() {

if(String(this.apform.value.phone)==String(this.getdata.phone)){
//if(!this.checkthephone()){}

    this.aus = "Updating...";
    const npvalue = this.flform.value;
    const sdtvalue = this.sdtform.value;
    const apvalue = this.apform.value;

    const lpvalue = this.pfform.value;
    const wsvalue = this.dcform.value;
    const cvgvalue = this.cgvform.value;
    const aibvalue = this.aibform.value;
    
    // // console.log(wsvalue.date);
    
    //console.log(wsvalue.date.toDateString());
    const cusdet = {
      ...npvalue,
      ...sdtvalue,
      ...apvalue,
      ...lpvalue,
      ...wsvalue,
      ...cvgvalue,
      ...aibvalue
    };
   
    


    this.http.patch('http://localhost:9000/farmersdata/'+String(this.getdata.id), cusdet,{ responseType: 'json' })
    .subscribe(res=>{
   // console.log(res);
    this.mydata()
    this._snackBar.open("Customer Updated", "OK", {
              duration: 5000
            });
  
    this.flform.reset();
          this.sdtform.reset();
          this.apform.reset();
          this.pfform.reset();
          this.dcform.reset();
          this.cgvform.reset();
this.aibform.reset();
          this.showaddc = false;
          this.headstring = "Add";
          this.aus = "Update";
    
    })    


    this.showaddemp = true;
    this.showup = false;



    if(Number(this.getdata.mulland)!=Number(lpvalue.mulland)){


      
  var today = new Date(); 
  var rtoday= new Date(today.toDateString()).toLocaleDateString("en-GB");

      var muldiff=Number(lpvalue.mulland)-Number(this.getdata.mulland)
      var realmuldiff=Number(muldiff.toFixed(2))

var datee=new Date().getMonth();
var datyear=new Date().getFullYear();


var wordmonth:string[]=['January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December']
var muldata={

fullname:this.getdata.fullname,
surveyno:wsvalue.surveyno,
muladdremo:realmuldiff,
date:rtoday,
phone:apvalue.phone,

village:sdtvalue.village,
month:wordmonth[datee],
year:datyear
}




// {
//   "fullname":"kansihka",
//   "date":"20/07/2020",
//   "surveyno":"sdcvshgdc",
//   "month":"july",
//   "year":"2020",
//   "muladdremo":3,
//   "phone":8951900164,
//   "village":"ahcvhsd",
//   "gram":"dcadshxc"
//   }
  

console.log(muldata);

      
    this.http.post('http://localhost:9000/mulbery', muldata,{ responseType: 'json' })
    .subscribe(res=>{
   // console.log(res);

    
    
    
    })

    }



  }else{
    this.http.get('http://localhost:9000/farmersdata/phno/'+
    this.apform.value.phone, { responseType: 'json' })
.subscribe((res)=>{

    if(res==null){


      this.aus = "Updating...";
      const npvalue = this.flform.value;
      const sdtvalue = this.sdtform.value;
      const apvalue = this.apform.value;
  
      const lpvalue = this.pfform.value;
      const wsvalue = this.dcform.value;
      const cvgvalue = this.cgvform.value;
      const aibvalue = this.aibform.value;
      
      // // console.log(wsvalue.date);
      
      //console.log(wsvalue.date.toDateString());
      const cusdet = {
        ...npvalue,
        ...sdtvalue,
        ...apvalue,
        ...lpvalue,
        ...wsvalue,
        ...cvgvalue,
        ...aibvalue
      };
     
      
  
  
      this.http.patch('http://localhost:9000/farmersdata/'+String(this.getdata.id), cusdet,{ responseType: 'json' })
      .subscribe(res=>{
     // console.log(res);
      this.mydata()
      this._snackBar.open("Customer Updated", "OK", {
                duration: 5000
              });
    
      this.flform.reset();
            this.sdtform.reset();
            this.apform.reset();
            this.pfform.reset();
            this.dcform.reset();
            this.cgvform.reset();
  this.aibform.reset();
            this.showaddc = false;
            this.headstring = "Add";
            this.aus = "Update";
      
      })    
  
  
      this.showaddemp = true;
      this.showup = false;
  
  
  
      if(Number(this.getdata.mulland)!=Number(lpvalue.mulland)){
  
  
        
    var today = new Date(); 
    var rtoday= new Date(today.toDateString()).toLocaleDateString("en-GB");
  
        var muldiff=Number(lpvalue.mulland)-Number(this.getdata.mulland)
        var realmuldiff=Number(muldiff.toFixed(2))
  
  var datee=new Date().getMonth();
  var datyear=new Date().getFullYear();
  
  
  var wordmonth:string[]=['January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December']
  var muldata={
  
  fullname:this.getdata.fullname,
  surveyno:wsvalue.surveyno,
  muladdremo:realmuldiff,
  date:rtoday,
  phone:lpvalue.phone,
  
  village:sdtvalue.village,
  month:wordmonth[datee],
  year:datyear
  }
  
  
  
  
  // {
  //   "fullname":"kansihka",
  //   "date":"20/07/2020",
  //   "surveyno":"sdcvshgdc",
  //   "month":"july",
  //   "year":"2020",
  //   "muladdremo":3,
  //   "phone":8951900164,
  //   "village":"ahcvhsd",
  //   "gram":"dcadshxc"
  //   }
    
  
  console.log(muldata);
  
        
      this.http.post('http://localhost:9000/mulbery', muldata,{ responseType: 'json' })
      .subscribe(res=>{
     // console.log(res);
  
      
      
      
      })
  
      }
  
  

    }else{
      this._snackBar.open("This Phone is Already in Use", "OK", {
        duration: 5000
      });
    }
  })
  }






  }






  ondelete(id: string) {
    var check = confirm("Are you Sure You want to delete this Customer?...")
    if (check) {
      
      this.http.delete('http://localhost:9000/farmersdata/'+id, { responseType: 'json' })
      .subscribe(res=>{
       // console.log(res);

        this.mydata()
        
      })      
      

    }
  }

  sdetailsupdateid: string;
  showssdetails(dataaa: any) {
    //  // console.log(dataaa);
    this.ssdetails = dataaa.sdetails;
    this.ssdetname = dataaa.fullname;
    this.sdetailsupdateid = dataaa.id
  }









   mydata()
{
  
const ujuju=  this.http.get<customers[]>('http://localhost:9000/farmersdata', { responseType: 'json' })
.subscribe(res=>{



  res.map(a=>{

   const data = Object.assign(
        a as customers,
        {
          odate: new Date(
            a.date
          ).toLocaleDateString("en-GB")
        },
        { date: new Date(a.date) },
      {id : a._id},
      );

     
      return { ...data };
  
  })

 console.log(res);
  
  
  this.len = Object.keys(res).length;

  this.checkmob = res
  this.dataSource.data = res;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

 // console.log(res);
  
})
}








showme(){
 // console.log(this.showotherdetails);
  
}



cusrepshow:any[]
fname:string;
fdate:string;
counter:number=0

collcom:boolean=true

loadreport() {
var bdata=this.showotherdetails

  this.cusrepshow = []

 var fd=new Date(bdata.frmdate).toLocaleDateString("en-GB")
var ft=new Date(bdata.todate).toLocaleDateString("en-GB")
  this.fname = bdata.fullname+" kulavaru"
 

  this._snackBar.open(
    "Genarating Report" + " " + this.fname,
    "OK", { duration: bdata.disdetails.length*100 });

  var convert: any[] = [];

  if(bdata.disdetails.length!=0){
  bdata.disdetails.forEach((data, ciindex, dindata) => {


    this.counter = this.counter + 1;
    convert['S_No'] = this.counter;
    convert['Fullname'] = data.fullname;
    convert['Fid'] = data.fid;
    convert['Mobile No'] = data.phone;
    convert['Village'] = data.village;
    convert['District'] = data.district;
    convert['Taluk'] = data.town;
    convert['Variety'] = data.variety;
    convert['DFLS'] =  data.dfls;
    convert['Date'] = data.date;
    convert['Hatch Date'] =data.realhdate;
    convert['Dispatch Date'] =data.realddate;
    convert['LOT_No'] =data.lotno;
    convert['Expected Market'] = data.market;
    convert['Market Date'] = data.realmardate;
    convert['Avg_cacoon'] =data.avg;
    convert['Source'] =data.source;
    convert['CRC Name'] =data.crcname;
    convert['total'] =data.total;
    convert['subsidy'] =data.subsidy;
    convert['fshare'] =data.fshare;
   
     


      try {
        this.cusrepshow.push({ ...convert });
      } catch (err) {
       // console.log(err)
       // console.error(err);
      }

    

    if (ciindex == dindata.length - 1) {
      this.collcom = false;
          }
  });



 // console.log(this.cusrepshow)
  if (this.collcom == false) {

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      filename: `${this.fname}`+".csv",
      showLabels: true,

      showTitle: false,
      title: `${this.fname}-${this.fdate}`+".csv",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    try {
      const csvExporter = new ExportToCsv(options);

      csvExporter.generateCsv(this.cusrepshow)
      convert = [];
      this.collcom = true
      this.counter = 0;
      this.cusrepshow = []
    

    } catch (err) {
     // console.log(err)
     // console.error(err);
    }
  }

}else{
  this._snackBar.open(
    "No Customers",
    "OK", { duration:5000 });
}
}



allloadreport() {
  var bdata=this.showotherdetails
  
    this.cusrepshow = []
  
   var fd=new Date().toLocaleDateString("en-GB")

    this.fname =fd+" kulavaru"
   
  
    this._snackBar.open(
      "Genarating Report" + " " + this.fname,
      "OK", { duration: this.checkmob.length*100 });
  
    var convert: any[] = [];
  
     if(this.checkmob.length!=0){
       this.checkmob.forEach((adata,aindex,alldata)=>{


    

    if(adata.disdetails.length!=0){
    adata.disdetails.forEach((data, ciindex, dindata) => {
  
  
      this.counter = this.counter + 1;
      convert['S_No'] = this.counter;
      convert['Fullname'] = data.fullname;
      convert['Fid'] = data.fid;
      convert['Mobile No'] = data.phone;
      convert['Village'] = data.village;
      convert['District'] = data.district;
      convert['Taluk'] = data.town;
      convert['Variety'] = data.variety;
      convert['DFLS'] =  data.dfls;
      convert['Date'] = data.date;
      convert['Hatch Date'] =data.realhdate;
      convert['Dispatch Date'] =data.realddate;
      convert['LOT_No'] =data.lotno;
      convert['Expected Market'] = data.market;
      convert['Market Date'] = data.realmardate;
      convert['Avg_cacoon'] =data.avg;
      convert['Source'] =data.source;
      convert['CRC Name'] =data.crcname;
      convert['total'] =data.total;
      convert['subsidy'] =data.subsidy;
      convert['fshare'] =data.fshare;
     
        try {
          this.cusrepshow.push({ ...convert });
        } catch (err) {
         // console.log(err)
         // console.error(err);
        }
  
      
  
    });
  
    }
    
    if (aindex == alldata.length - 1) {
      this.collcom = false;
          }

  })
}
 
  
   // console.log(this.cusrepshow)
    if (this.collcom == false) {
  
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        filename: `${this.fname}`+".csv",
        showLabels: true,
  
        showTitle: false,
        title: `${this.fname}-${this.fdate}`+".csv",
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
      try {
        const csvExporter = new ExportToCsv(options);
  
        csvExporter.generateCsv(this.cusrepshow)
        convert = [];
        this.collcom = true
        this.counter = 0;
        this.cusrepshow = []
      
  
      } catch (err) {
       // console.log(err)
       // console.error(err);
      }
    }
  
  





  }



  

  addbenifits(idd:string){
    console.log(idd);

    this.showotherdetails.benifits.push({...this.benifitsform.value})
    
    this.http.patch('http://localhost:9000/farmersdata/addbenifit/' + String(idd),{...this.benifitsform.value}, { responseType: 'json' })
    .subscribe((res) => {
  console.log(res);
  this.getbenifit=false;
  this.benifitsform.reset();
this.mydata()
})
  }

  deletebenifit(bbid:any,id:any){
    this.showotherdetails.benifits.splice(id,1)


   var  dd={
      in:id

    }

        
    this.http.patch('http://localhost:9000/farmersdata/delbenifit/' + String(bbid),dd, { responseType: 'json' })
    .subscribe((res) => {
  console.log(res);
  this.getbenifit=false;
  this.benifitsform.reset();
this.mydata()
})
  }


}

