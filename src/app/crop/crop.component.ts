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


export class District {
  value: string;
}


export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );




  displayedColumns = [
    "fullname",
    "fid",
    "dfls",
  "lotno",
  "date",
  "crc",
  "hdate",
  "ddate",
    "village",
"subsidy",
"fshare",
"avg",  
 
"market", 
    "actions"



  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  bdform: FormGroup;
  piform: FormGroup;
  vpdform: FormGroup;

  foods: Food[] = [
    { value: "Cross Breed(CB)", viewValue: "Cross Breed(CB)" },
    { value: "Bivoltine(BV)", viewValue: "Bivoltine(BV)" },
    { value: "BV P1 Seed", viewValue: "BV P1 Seed" },
    { value: "Pure Mysore", viewValue: "Pure Mysore(PM)" }

  ];

  scform: FormGroup;
  
  lmcform: FormGroup;
  shlform: FormGroup;
  fivform: FormGroup;


  gram: District[] = []
  villages: District[] = []
  vfilteredOptions: Observable<District[]>;
  gfilteredOptions: Observable<District[]>;

 

  abs: string = "Add Crop";
  aus: string = "Update Crop";

  headstring: string = "Add";

  editdetails: boolean = true
  editqn: boolean = true

ordrow:any;

  ikik: any[];
  showoni: boolean;

  download: boolean = false
  chooseopt: any[] = []




  showaddemp: boolean = true;
  checkyear: boolean = false;
  showcancel: boolean = true;
  showup: boolean = false;
  addinfo: boolean = false;

  getcus:boolean=false;
  takeorder:boolean=false;
  
  market: District[] = []

  mfilteredOptions: Observable<District[]>;

  getnumform:FormGroup
  
  showphstat:boolean=false;
  orderingcus:any

  showphmes:string

  monyear: FormGroup
  constructor(

    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public d: DataService,
    private _snackBar: MatSnackBar,

    private router: Router,
    private http: HttpClient,
  ) {


    // if(!d.myauth){
    //   this.router.navigate(["/"]);
    // }




    this.http.get('assets/market.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");

            this.market.push({ value: row[0] });
          }
         // console.log(this.gram);
          //// console.log({...this.districts})
        },
        error => {
         // console.log(error);
        }
      );

   // console.log(this.showaddemp);
    




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





















    this.mydata()

  }


  displayFn(user?: any): string | undefined {
    return user ? user : undefined;
  }


  private _gfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.gram.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  }


  private _vfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.villages.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);

  }

  ngOnInit() {


    this.fivform = this.fb.group({
     
    fullname: ["", [Validators.required]],
      phone: ["", [Validators.required]],

    
     });
 


     this.monyear = this.fb.group({
      monyear: ["", [Validators.required]],

    });


    this.scform = this.fb.group({
     
      crc: ["", [Validators.required]],
      subsidy: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]],
    source: ["", [Validators.required]],
    
     });
 
 
 
 
 
 
     this.vpdform = this.fb.group({
       dfls: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      price: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      variety: ["", [Validators.required]]
 
     });
 
     this.lmcform = this.fb.group({
       lotno: ["", [Validators.required]],
      mardate: ["", [Validators.required]],
   //   avg: ["", [Validators.required,Validators.pattern(/^(0|[1-9]\d*)?$/)]],
 
     });
 
     this.shlform = this.fb.group({
       hdate: ["", [Validators.required]],
      ddate: ["", [Validators.required]],
 market: ["", [Validators.required]]
     });
 
 

     
  
        
    this.mfilteredOptions = this.shlform.get('market').valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : null),
      map(name => name ? this._mfilter(name) : this.market.slice())
    );




    // this.gfilteredOptions = this.gvform.get('gram').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : null),
    //     map(name => name ? this._gfilter(name) : this.gram.slice())
    //   );



    // this.vfilteredOptions = this.gvform.get('village').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : null),
    //     map(name => name ? this._vfilter(name) : this.villages.slice())
    //   );




    this.getnumform = this.fb.group({
      getcusno: ["", [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    
    });




  
    this.getnumform.get('getcusno').valueChanges.subscribe((psres)=>{

      // console.log(psres);
      
            
          if(String(psres).length==10){
              this.http.get('http://localhost:9000/farmersdata/phno/'+psres, { responseType: 'json' })
      .subscribe((res)=>{
      
      
      if(res!=null){
      this.orderingcus=res;
      // this.showphstat=false
      this.getcus=true



      
      
      
       
      
                this.fivform.patchValue({
                  fullname:this.orderingcus.fullname,
                        phone: this.orderingcus.phone,
                      
                      });
             
      
      
      


      }else{
      //this.showphstat=false;
      this.showphstat=true
      this.showphmes="This Phone Number is Not Registered"
      
      }
      
      })
      
          }
          else{
      this.showphstat=false; 
          }
      
      
        })
      
       







  }


  
  
  private _mfilter(name: string): District[] {
    const filterValue = name.toLowerCase();

    return this.market.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);











  }

 
  mydata() {

    const ujuju = this.http.get<any[]>('http://localhost:9000/orders', { responseType: 'json' })
      .subscribe(res => {

        res.map(a => {

          const data = Object.assign(
            a as any,
            {
              realddate: new Date(
                a.ddate
              ).toLocaleDateString("en-GB")
            },
            { ddate: new Date(a.ddate) },
            {
              realhdate: new Date(
                a.hdate
              ).toLocaleDateString("en-GB")
            },
            { hdate: new Date(a.hdate) },

            {
              realmardate: new Date(
                a.mardate
              ).toLocaleDateString("en-GB")
            },
            { mardate: new Date(a.mardate) },

            { id: a._id },
          );


          return { ...data };

        })

      console.log(res);


        // this.len = Object.keys(res).length;
        // this.checkmob = res
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

       // console.log(res);

        this.ikik = []
        this.chooseopt = []
        this.ikik = res


        var repeats = [], item, i = 0;

        while (i < this.ikik.length) {
          repeats.indexOf(item = this.ikik[i++].month) > -1 ? this.ikik.pop() : repeats.push(item)
        }
       // console.log(this.ikik)


        this.ikik.forEach((dd, ddin) => {
          var rr: any[] = [];
          rr['month'] = dd.month;
          rr['year'] = dd.year;

          this.chooseopt.push({ ...rr })
        })

      console.log(this.chooseopt);





        var today = new Date();
        // var rtoday= new Date(today.toDateString()).toLocaleDateString("en-GB");
        //// console.log(rtoday);

        if (Number(today.getDate()) === 15 && Number(today.getMonth()) === 0) {
          this.chooseopt.forEach((ym, ymin) => {
            var year = today.getFullYear() - 1

            if (ym.year === Number(year)) {

              this.http.delete('http://localhost:9000/orders/deleteyeardata/' + String(year), { responseType: 'json' })
                .subscribe(res => {
               console.log(res);

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
    if(filterValue.trim()==null||filterValue.trim()==''){
      this.mydata()
        }
  }

  cusrepshow: any[] = []
  counter: number = 0

  compclear: boolean = false;
  fname: string;








  downloadreport() {
    var oo = this.monyear.value.monyear
   // console.log(oo);



    this.fname = 'Orders Report-' + oo.month + '(' + oo.year + ')';

    this._snackBar.open(
      "Genarating Report" + " " + oo.month + '(' + oo.year + ')',
      "OK", { duration: 5000 });

    this.http.get('http://localhost:9000/orders/sorted/' + oo.month + '/' + oo.year, { responseType: 'json' })
      .subscribe((res: any) => {
        res.map(a => {

          const data = Object.assign(
            a as any,
            {
              realddate: new Date(
                a.ddate
              ).toLocaleDateString("en-GB")
            },
            { ddate: new Date(a.ddate) },
            {
              realhdate: new Date(
                a.hdate
              ).toLocaleDateString("en-GB")
            },
            { hdate: new Date(a.hdate) },

            {
              realmardate: new Date(
                a.mardate
              ).toLocaleDateString("en-GB")
            },
            { mardate: new Date(a.mardate) },

            { id: a._id },
          );


          return { ...data };

        })


       // console.log(res);


        if (res.length > 0) {
          var convert: any[] = [];

          res.forEach((data, ciindex, dindata) => {



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
            convert['Month'] =data.month;




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
              filename: this.fname+'.csv',
              showLabels: true,

              showTitle: false,
              title: this.fname,
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
              this.download = false;
              this.monyear.reset();

            } catch (err) {
             // console.log(err)
             // console.error(err);
            }
          }







        } else {
          this._snackBar.open(
            "No Crop/s in" + oo.month,
            "OK", { duration: 5000 });
        }


      })
  }


  async addbcus(data:any) {

    var check = confirm("Are you Sure You want to Dispatch this Order?...")
    if (check) {
    this.abs = "Dispatching..."
   


const rr=Object.assign(data, {
     dispatch:true
 });
 

 console.log(data);

    try {

      this.http.patch('http://localhost:9000/orders/disporder/' + String(data.id), { responseType: 'json' })
      .subscribe((res) => {
    
    console.log(res);
    
    console.log(data);
    
      })








 this.http.patch('http://localhost:9000/farmersdata/salesup/' + String(data.farmerid), data, { responseType: 'json' })
  .subscribe((res) => {
console.log(res);


    console.log(data);
    this.abs = "Dispatch";
        this.showcancel = true;

        this._snackBar.open("Order Dispatched", "OK", {
                duration: 10000
              });

        this.mydata()
  })
    

   





    } catch (err) {
      console.error(err);
    }



  }


  }


  delete(rrr: any) {

    var check = confirm("Are you Sure You want to delete this Crop Details?...")
    if (check) {
      this.http.delete('http://localhost:9000/orders/' + rrr.id, { responseType: 'json' })
        .subscribe(res => {
         // console.log(res);

          this.mydata()

        })

    }

  }

  getdata: any


  hq = 0
  hn = 0
  sq = 0
  sn = 0
  lq = 0
  ln = 0
  fq = 0
  fn = 0



  editloaddata(datar: any) {


    this.editqn = false;
    this.editdetails = true;

    this.getdata = datar;
    console.log(this.getdata);
    
    this.showaddemp = false;
    this.showup = true;
    this.headstring = "Edit Order of "+ datar.fullname;
    //// console.log(datar);



 
this.vpdform.patchValue({
  dfls: datar.dfls,
       price:datar.price,
   variety: datar.variety
   
});
this.scform.patchValue({
  crc:datar.crcname,
        subsidy: datar.subsidy,
        source:datar.source,
      });



    this.shlform.patchValue({
      hdate: datar.hdate,
            ddate:datar.ddate,
       market: datar.market
       
    });
    this.lmcform.patchValue({
      lotno:datar.lotno,
            mardate: datar.mardate,
          
          });
 

          this.fivform.patchValue({
            fullname:datar.fullname,
                  phone: datar.phone,
                
                });
       



  }

  orddata:any


  updatedata() {
    this.chooseopt = []
    


    var h=new Date(
      this.shlform.value.hdate
     ).toLocaleDateString("en-GB");
    
    var dd=new Date(
      this.shlform.value.ddate
     ).toLocaleDateString("en-GB");
     
     var mm=new Date(
      this.lmcform.value.mardate
     ).toLocaleDateString("en-GB");
     
    
          var a = moment(h, "DD/MM/YYYY");
          var b = moment(dd, "DD/MM/YYYY");
          var hddays = b.diff(a, "days");
          
          
          var c = moment(dd, "DD/MM/YYYY");
          var dy = moment(mm, "DD/MM/YYYY");
          var dmdays = dy.diff(c, "days");
          
             
          var e = moment(h, "DD/MM/YYYY");
          var f = moment(mm, "DD/MM/YYYY");
          var hmdays = f.diff(e, "days");
    
          if(hddays>0&&dmdays>0&&hmdays>0){
 
const total= Number(this.vpdform.value.price)*Number(this.vpdform.value.dfls);

if(total-Number(this.scform.value.subsidy)>0){

  this.aus = 'Updating...';

   var data:any[]=[]
data['dispatch']= this.getdata.dispatch;
data['district']=this.getdata.district;
data['total']=total;
data['fshare']=total-Number(this.scform.value.subsidy);

data ['town']= this.getdata.town
data ['fid']= this.getdata.fid
data ['village']= this.getdata.village
data ['date']= this.getdata.date
data ['farmerid']= this.getdata.farmerid
data ['batchid']= this.getdata.batchid

data ['avg']=Number(Number(this.vpdform.value.dfls)*0.70).toFixed(0)





    this.showcancel = false;


   // console.log(empdet);

    try {

   this.orddata={...this.shlform.value,...this.lmcform.value,...this.vpdform.value,...this.scform.value,...this.fivform.value,...data}




      this.http.patch('http://localhost:9000/orders/' + String(this.getdata.id), this.orddata, { responseType: 'json' })
        .subscribe(res => {
         // console.log(res);4
      
         this.lmcform.reset()
         this.fivform.reset()
         this.shlform.reset()
         this.vpdform.reset()
         this.scform.reset()
     
          this.mydata()

          this._snackBar.open("Crop Updated", "OK", {
            duration: 5000
          });

        })


      this.addinfo = false;
      this.headstring = "Update";
      this.aus = 'Update Crop';

      this.showcancel = true;






    } catch (err) {
     // console.error(err);
      this._snackBar.open("Something Error Occured", "OK", {
        duration: 15000
      });
    }


  }else{
    this._snackBar.open("Subsidy is more than the total Amount ", "OK", {
      duration: 5000
    });
  }

}else{
  this._snackBar.open("Dispatch Date and Market Date should be ahead of Hatch date  ", "OK", {
    duration: 15000
  });
}
  }

  canceladd() {




    this.editdetails = true;
    this.editqn = true;

    this.takeorder = false;
    this.showaddemp = true;
    this.showup = false;

    this.getcus = false;
    this.lmcform.reset()
    this.fivform.reset()
    this.shlform.reset()
    this.vpdform.reset()
    this.scform.reset()
    this.getnumform.reset();


  }

  closeup(){
    this.addinfo = false;
    this.lmcform.reset()
    this.fivform.reset()
    this.shlform.reset()
    this.vpdform.reset()
    this.scform.reset()
    
    this.getcus=false

  }

  
  closp(){
    this.takeorder = false;
    this.lmcform.reset()
    this.fivform.reset()
    this.shlform.reset()
    this.vpdform.reset()
    this.scform.reset()
    this.getnumform.reset();
    this.getcus=false

  }






  ordermonth:string

  dispatch(){
    try{
  
var h=new Date(
  this.shlform.value.hdate
 ).toLocaleDateString("en-GB");

var dd=new Date(
  this.shlform.value.ddate
 ).toLocaleDateString("en-GB");
 
 var mm=new Date(
  this.lmcform.value.mardate
 ).toLocaleDateString("en-GB");
 

      var a = moment(h, "DD/MM/YYYY");
      var b = moment(dd, "DD/MM/YYYY");
      var hddays = b.diff(a, "days");
      
      
      var c = moment(dd, "DD/MM/YYYY");
      var dy = moment(mm, "DD/MM/YYYY");
      var dmdays = dy.diff(c, "days");
      
         
      var e = moment(h, "DD/MM/YYYY");
      var f = moment(mm, "DD/MM/YYYY");
      var hmdays = f.diff(e, "days");

      if(hddays>0&&dmdays>0&&hmdays>0){
     
     

  
  var fff=Number(this.vpdform.value.price)*Number(this.vpdform.value.dfls);
   
  var rfff=fff-Number(this.scform.value.subsidy)
  if(rfff>=0){
  
  
    var d = new Date();
    var n = d.getMonth();
  
    if(n=0){
  this.ordermonth="January"
    }
    if(n=1){
      this.ordermonth="February"
      
    } if(n=2){
      this.ordermonth="March"
      
    } if(n=3){
      this.ordermonth="April"
      
    } if(n=4){
      this.ordermonth="May"
      
    } if(n=5){
      this.ordermonth="June"
      
    } if(n=6){
      this.ordermonth="July"
      
    } if(n=7){
      this.ordermonth="August"
      
    } if(n=8){
      this.ordermonth="September"
      
    } if(n=9){
      this.ordermonth="October"
      
    } if(n=10){
      this.ordermonth="November"
      
    } if(n=11){
      this.ordermonth="December"
      
    }
  
  
    console.log(this.orderingcus);
    
  
  
  var aaa=Number(Number(this.vpdform.value.dfls)*0.70).toFixed(0);
  
  
  
    var data:any[]=[]
    data['date']=new Date(d.toDateString()).toLocaleDateString("en-GB");
    
  data['total']=fff
  data['fshare']=rfff
  data['month']=this.ordermonth
  
  data['year']=d.getFullYear();
  data['avg']=aaa
  
  
  data['farmerid']= this.orderingcus._id
  data['fid'] =this.orderingcus.fid
  
  

 data['village']= this.orderingcus.village
 data['town']= this.orderingcus.town
 data['district']= this.orderingcus.district
  
  
  
  var orddata={...this.shlform.value,...this.lmcform.value,...this.vpdform.value,...this.scform.value,...this.fivform.value,...data,dispatch:false,}
  
 // var orddata={...this.dsform.value,...this.lmform.value,...data,dispatch:false,crc:this.orderingbatch.crcname}

  
  
  
  
  console.log(orddata);
  
  
  
  
  var io = this.http.post('http://localhost:9000/orders', orddata, { responseType: 'json' }).subscribe((resdata) => {
  console.log(resdata);
  this._snackBar.open("Dispatched ", "OK", {
    duration: 5000
  });
  
  
  this.mydata()
     })
     this.lmcform.reset()
     this.fivform.reset()
     this.shlform.reset()
     this.vpdform.reset()
     this.scform.reset()
  
    this.getnumform.reset();
  this.getcus=false;

  this.orderingcus=null;
  this.takeorder=false
  
  
  }else{
    this._snackBar.open("Subsidy is more than the total Amount", "OK", {
      duration: 5000
    });
  }
  
}else{
  this._snackBar.open("Dispatch Date and Market Date should be ahead of Hatch date  ", "OK", {
    duration: 15000
  });
}
  
  }catch(err){
    console.log(err);
    
      }
  
  
  }
  

 

}

