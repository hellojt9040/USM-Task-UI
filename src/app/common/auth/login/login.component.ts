import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm:FormGroup
  isLoading = false
  private authListenerSubs: Subscription

  constructor(private authService:AuthService) { }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe()
  }

  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])
        ],
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          CustomValidator.password
        ]
      }),
    })


    //gettig auth status
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe((authStaus) => {
        this.isLoading = false
      })
  }

  get f() { return this.loginForm.controls }

  onLogin(){
    this.isLoading = false
    if(this.loginForm.invalid)
      return

    this.isLoading = true
    this.authService.login({...this.loginForm.value})
  }
}
