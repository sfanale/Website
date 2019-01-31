import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OptionPricesService} from "../_services/option-prices.service";
import {UserService} from "../_services/user.service";
import {User, Post} from "../user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user_profile = new User();
  user_posts: Post[];

  constructor(private optionsPriceService: OptionPricesService,
              private userService: UserService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.get_user_info();
  }

  get_user_info() {
    let username = this.route.snapshot.paramMap.get('username');
    this.userService.getUserInfo_by_username(username).subscribe(data =>{
      this.user_profile = data;
    },
      (error)=>(console.log(error)) ,
      ()=> this.get_user_posts());
    }

    get_user_posts() {
      this.userService.get_posts_by_id(this.user_profile.id).subscribe( data => {
        this.user_posts=data;
      });
    }

}
