import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CommonService } from '../common.service';


const BACKEND_URL = environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
  ) {
    const localStrMobileInfo = localStorage.getItem('userInfo')
    this.commonService.currentUser = localStrMobileInfo ? JSON.parse(localStrMobileInfo) : null
  }

  //get user
  getUsers() {
    return this.http.get(BACKEND_URL + "users")
  }

  deleteUser(id) {
    return this.http.delete(BACKEND_URL + "user/" + id)
  }
}
