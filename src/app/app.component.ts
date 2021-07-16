import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/common/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'USM-TASK';
  private authListenerSubs: Subscription
  userIsAuthenticated = false

  constructor(private authService:AuthService){}

  // onPostAdded(post){
  //   this.storedPosts.push(post)
  // }

  ngOnInit(){
    this.authService.autoAuthUser()
    this.userIsAuthenticated = this.authService.getIsAuth()
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
