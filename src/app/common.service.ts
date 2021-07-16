import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  currentUser
  constructor() { }

  markAllAsTouched(form: FormGroup) {
    if (!form)
      return

    Object.keys(form.controls).map(formCtrl => {
      form.get(formCtrl).markAsTouched()
    })
  }
}
