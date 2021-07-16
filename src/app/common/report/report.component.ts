import { UserService } from './../../users/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  userDetails
  allUsers
  displayUsers
  isLoading:boolean
  constructor(
    private userService: UserService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this.commonService.currentUser
    this.isLoading = true
    this.userService.getUsers()
      .subscribe((response) => {
        console.log(response);
        this.allUsers = response['users']
        if(this.userDetails?.designation === "manager"){
          this.displayUsers = this.allUsers.filter(user => user.designation === "staff")
        }else if(this.userDetails?.designation === "admin"){
          this.displayUsers = this.allUsers
        }
        console.log(this.displayUsers);
        this.isLoading = false
      }, (error) => {
        this.isLoading = false
      })
  }

  deleteUser(id){
    this.isLoading = true
    this.userService.deleteUser(id)
    .subscribe((response) => {
      console.log(response);
      this.allUsers = this.allUsers.filter(user => user._id != id)
      this.displayUsers = this.allUsers
      console.log(this.displayUsers);
      this.isLoading = false
    }, (error) => {
      this.isLoading = false
    })
  }

}
