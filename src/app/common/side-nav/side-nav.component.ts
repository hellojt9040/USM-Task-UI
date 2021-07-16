import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription
  userIsAuthenticated = false
  userDetails


  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    ) { }

  ngOnInit(): void {
    this.userDetails = this.commonService.currentUser
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated
      })
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }

}
