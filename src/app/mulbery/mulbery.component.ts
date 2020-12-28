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


@Component({
  selector: 'app-mulbery',
  templateUrl: './mulbery.component.html',
  styleUrls: ['./mulbery.component.scss']
})
export class MulberyComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Large)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );


  displayedColumns = [
    "firstname",
    "phone",
    "date",
 
//    "gram",
//  "village",
    "land",
    "monyear",
"surveyno",
 
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  
ikik:any[];

download:boolean=false
chooseopt:any[]=[]

checkyear:boolean=false;


  monyear:FormGroup
  constructor(

    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public d: DataService,
    private _snackBar: MatSnackBar,
   
    private router: Router,
    private http: HttpClient,
  ) {

    if(!d.myauth){
      this.router.navigate(["/"]);
    }
    this.ikik = []
    this.chooseopt = []

this.mydata()

  }

  ngOnInit() {


    this.monyear = this.fb.group({
      monyear: ["", [Validators.required]],
    
    });
  }

  
  mydata()
  {
    

//   const ujuju=  this.http.get<any[]>('http://localhost:9000/mulbery', { responseType: 'json' })
//   .subscribe(res=>{
//   res.map(a=>{
  
//         return { ...a };
    
//     })
  
//    // console.log(res);

//     this.chooseopt=[]
    
    
//     // this.len = Object.keys(res).length;
//     // this.checkmob = res
//     this.dataSource.data = res;
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
  
//    // console.log(res);

  
//     this.ikik = []
//     this.chooseopt = []
//     this.ikik = res

// var repeats = [], item, i = 0; 

  
//   while(i < this.ikik.length){
//       repeats.indexOf(item = this.ikik[i++].month) > -1 ? this.ikik.pop() : repeats.push(item)
//   }
// // console.log(this.ikik)


// this.ikik.forEach((dd,ddin)=>{
//   var rr:any[]=[];
//   rr['month']=dd.month;
//   rr['year']=dd.year;

// this.chooseopt.push({...rr})
// })

//// console.log(this.chooseopt);





// var today = new Date(); 
// // var rtoday= new Date(today.toDateString()).toLocaleDateString("en-GB");
// //// console.log(rtoday);

// if(Number(today.getDate())===15&&Number(today.getMonth())===0)
// {
// this.chooseopt.forEach((ym,ymin)=>{
//  var year=today.getFullYear()-1 

// if(ym.year===Number(year)){ 

//    this.http.delete('http://localhost:9000/mulbery/deleteyeardata/'+String(year), { responseType: 'json' })
//   .subscribe(res=>{
//// console.log(res);

//   })

// }

// if(ymin==this.chooseopt.length-1){
//   this.mydata()
// }

// })
// }
    
//   })

this.chooseopt=[]
this.ikik=[]

console.log(this.chooseopt);
console.log(this.ikik);

const ujuju = this.http.get<any[]>('http://localhost:9000/mulbery', { responseType: 'json' })
.subscribe(res => {

  res.map(a => {
return { ...a };

  })

 // console.log(res);

  this.dataSource.data = res;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;



  this.chooseopt = []


 // console.log(this.chooseopt);


  var repeats = [], item, i = 0;

  
  res.forEach((mm,min)=>{
    
    repeats.indexOf(item = String(mm.month)+'('+String(mm.year)+')') > -1 ? this.ikik.pop() : repeats.push(item)
if(min=res.length-1){
  this.chooseopt=repeats
}
  })
 

// console.log(repeats);
 

 // console.log(this.chooseopt);
  




  var today = new Date();
  // var rtoday= new Date(today.toDateString()).toLocaleDateString("en-GB");
  //// console.log(rtoday);

  if (Number(today.getDate()) === 15 && Number(today.getMonth()) === 0) {
    this.chooseopt.forEach((ym, ymin) => {
      var year = today.getFullYear() - 1

      if (ym.year === Number(year)) {

        this.http.delete('http://localhost:9000/mulbery/deleteyeardata/' + String(year), { responseType: 'json' })
          .subscribe(res => {
           // console.log(res);

          })

      }

      if (ymin == this.chooseopt.length - 1) {
        this.mydata()
      }

    })
  }

})
  }




  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cusrepshow:any[]=[]
  counter:number=0

compclear:boolean = false;
fname:string;
  downloadreport(){
var oo=this.monyear.value.monyear
console.log(oo);

var mm = String(oo).split('(');
console.log(mm);
var yy=String(mm[1]).split(')');

console.log(yy);


this.fname='Mulberry Report-'+mm[0]+'('+yy[0]+')';

this._snackBar.open(
  "Genarating Report" + " " + mm[0]+'('+yy[0]+')',
  "OK", { duration:5000 });

     this.http.get('http://localhost:9000/mulbery/sorted/'+mm[0]+'/'+Number(yy[0]),{ responseType: 'json' })
    .subscribe((res:any)=>{


console.log(res);


if(res.length>0){
  var convert: any[] = [];

  res.forEach((data, ciindex, dindata) => {
var plus:string 
    if(Number(data.muladdremo)>0){
plus='+'+String(data.muladdremo)
    }else{
plus=data.muladdremo

    }

     
    this.counter = this.counter + 1;
    convert['S_No'] = this.counter;
 convert['Farmer Name'] =data.fullname;
    convert['Mobile No'] = data.phone;
    // convert['Village'] = data.village;
  
    convert['Date'] = data.date;
    convert['Mulberry Added/Removed'] =plus
    convert['Survey Number'] =data.surveyno;



   // console.log({ ...convert });
    try {
     
      
      this.cusrepshow.push({ ...convert });
    } catch (err) {
     // console.log(err)
     // console.error(err);
    }

  

  if (ciindex == dindata.length - 1) {
  
    this.compclear = true;
  }
});

if (this.compclear == true) {

  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    filename: this.fname+".csv",
    showLabels: true,

    showTitle: false,
    title: this.fname+".csv",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  try {
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.cusrepshow)
    convert = [];

    this.compclear = false;
    this.counter = 0;
    this.cusrepshow = []
  this.download=false;
  this.monyear.reset();

  } catch (err) {
   // console.log(err)
   // console.error(err);
  }
}







}else{
  this._snackBar.open(
    "No Mulbery Changes in"+oo.month, 
    "OK", { duration:5000 });
}


    })
  }



}
//   loadreport(bdata: any) {


//     this.cusrepshow = []
  
//    var fd=new Date(bdata.frmdate).toLocaleDateString("en-GB")
// var ft=new Date(bdata.todate).toLocaleDateString("en-GB")
//     this.fname = bdata.bname
//     this.fdate = `${fd}`+'-'+`${ft}`;

//     this._snackBar.open(
//       "Genarating Report" + " " + this.fname + "" + this.fdate,
//       "OK", { duration: bdata.farmers.length*100 });


//     bdata.farmers.forEach((data, ciindex, dindata) => {
 
 
     
//         this.counter = this.counter + 1;
//         convert['S_No'] = this.counter;
//         convert['Date'] = data.disdet.disdate;

//         convert['Fullname'] = data.cusdata.fullname;
//         convert['Mobile No'] = data.cusdata.phone;
//         convert['Village'] = data.cusdata.village;
//         convert['Gram Panchayat'] = data.cusdata.gram;
//         convert['Variety'] = data.disdet.variety;
//         convert['DFLS'] =  data.disdet.dfls;
//         convert['LOT_No'] =data.disdet.lotno;
// convert['Laid Date'] = new Date(new Date(data.disdet.laiddate)).toLocaleDateString("en-GB");
//         convert['Hatch Date'] =new Date(new Date(data.disdet.hdate)).toLocaleDateString("en-GB");
//         convert['Spun On Date'] = new Date(new Date(data.disdet.spindate)).toLocaleDateString("en-GB");
//         convert['Market Date'] = new Date(new Date(data.disdet.mardate)).toLocaleDateString("en-GB");
//         convert['Avg_cacoon'] =data.disdet.cacoon
       


//         try {
//           this.cusrepshow.push({ ...convert });
//         } catch (err) {
//          // console.log(err)
//          // console.error(err);
//         }

      

//       if (ciindex == dindata.length - 1) {
//         this.showtrackspin = false;
//         this.compclear = true;
//       }
//     });



//    // console.log(this.cusrepshow)
//     if (this.showtrackspin == false &&
//       this.compclear == true) {

//       const options = {
//         fieldSeparator: ',',
//         quoteStrings: '"',
//         decimalSeparator: '.',
//         filename: `${this.fname}-${this.fdate}`,
//         showLabels: true,

//         showTitle: false,
//         title: `${this.fname}-${this.fdate}`,
//         useTextFile: false,
//         useBom: true,
//         useKeysAsHeaders: true,
//         // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
//       };
//       try {
//         const csvExporter = new ExportToCsv(options);

//         csvExporter.generateCsv(this.cusrepshow)
//         convert = [];
//         this.showtrackspin = true;
//         this.compclear = false;
//         this.counter = 0;
//         this.cusrepshow = []
      

//       } catch (err) {
//        // console.log(err)
//        // console.error(err);
//       }
//     }
//   }
// 




