import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';

import { MulberyComponent } from './mulbery/mulbery.component';

import { CropComponent } from './crop/crop.component';
import { MarketComponent } from './market/market.component';


const routes: Routes = [

  {path : 'home' ,component:HomeComponent},
  {path : 'Farmers',component:CustomersComponent},

// {path : 'orders',component:OrdersComponent},
   {path : '', component:LoginComponent},

  {path:'MulberyReport',component:MulberyComponent},
  {path:'CropReport',component:CropComponent},
  {path:'MarketReport',component:MarketComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
