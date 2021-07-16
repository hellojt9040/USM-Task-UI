import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { UserService } from './../../../users/user.service';
import { AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidator {
  constructor(private http: HttpClient) {}

  // Can not contain space
  static canNotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0)
      return { canNotContainSpace: true }

    return null
  }

  static email(control: FormControl): ValidationErrors | null {
    const input = control.value as string;
    let regexp = /^[a-zA-Z0-9`~!#$%^&*_+={}?|\/\.'-]+@([a-zA-Z\d]+\.)+[\w-]{2,3}$/;
    if (regexp.test(input)) {
      return null;
    }
    return { email: true };
  }

}
