import { CommonService } from './../../common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDetails
  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.userDetails = this.commonService.currentUser
  }

}
