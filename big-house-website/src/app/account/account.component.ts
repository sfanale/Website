import {Component, OnInit, Input, OnChanges, Output} from '@angular/core';
import {User } from "../user";
import {UserService} from "../_services/user.service";
import {loggedInUser} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";
import {OptionPricesService} from "../_services/option-prices.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  user;


  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private priceService: OptionPricesService
  ) { }

  ngOnInit(){
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
      let token = this.authService.currentUserValue.token;
      this.getUserInfo(token);
    }

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }



  getUserInfo(token:string) {
    this.userService.getUserInfo(token).subscribe( data => {
      this.user = data;
    }, (e)=>console.log(e))
      //()=>this.parse_holdings());
  }

  parse_holdings() {
    for (let asset of this.user.holdings) {
      if (asset.type == 'stock') {
        this.priceService.getStock(asset.symbol).subscribe(data => {
          asset.current_value = parseFloat(data[data.length-1].regularmarketprice) * parseFloat(asset.amount);
        })
      }
      else if (asset.type =='option') {
        this.priceService.getOption(asset.symbol, "", "").subscribe(data => {
          asset.current_value = data[data.length-1].lastprice * parseFloat(asset.amount);
        })
      }
    }
  }



}
