import { CommonService } from './../../../common.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../../validators/mime-type.validator';
import { UsernameValidator } from './username.validator'
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/users/user.service';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false
  submitted: boolean
  private authListenerSubs: Subscription
  imagePreview: string
  signupForm: FormGroup

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private commonService: CommonService
  ) { }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }

  ngOnInit() {

    this.signupForm = new FormGroup({
      userName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          CustomValidator.alphaSpacesBetween
        ],

      }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          CustomValidator.email
        ],
      }),
      mobile: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(10),
          CustomValidator.onlynumeric
        ],
      }),
      designation: new FormControl('', {
        validators: [
          Validators.required,
        ],
      }),
      gender: new FormControl('', {
        validators: [
          Validators.required,
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

  get f() { return this.signupForm.controls }

  onSignup(signupForm: FormGroup) {
    this.submitted = true
    this.commonService.markAllAsTouched(this.signupForm)
    if (signupForm.invalid)
      return

    this.isLoading = true

    const newUser = {
      name: this.f.userName.value ? this.f.userName.value : "",
      email: this.f.email.value? this.f.email.value : "",
      password: this.f.password.value? this.f.password.value : "",
      mobile: this.f.mobile.value? this.f.mobile.value : "",
      designation: this.f.designation.value? this.f.designation.value : "",
      gender: this.f.gender.value? this.f.gender.value : "",
    }

    this.authService.signUp(newUser)
  }


}
