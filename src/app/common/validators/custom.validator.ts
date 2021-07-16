import { environment } from './../../../environments/environment';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
export class CustomValidator {
    static required(control: FormControl): ValidationErrors | null {
        if (typeof control.value !== 'string') {
            return null
        }
        const input = (control.value as string).trim();
        if (input.length === 0) {
            return { required: true };
        }
        return null;
    }
    static canNotContainSpace(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /[\s]+/;
        if (regexp.test(input)) {
            return { canNotContainSpace: true };
        }
        return null;
    }
    static onlynumeric(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^([\d]+)$/;
        if (regexp.test(input)) {
            return null;
        }
        return { onlynumeric: true };
    }
    static onlyAlphabets(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^([a-zA-Z]+)$/;
        if (regexp.test(input)) {
            return null;
        }
        return { onlyAlphabets: true };
    }
    static alphanumeric(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^([a-zA-Z0-9]+)$/;
        if (regexp.test(input)) {
            return null;
        }
        return { alphanumeric: true };
    }
    static alphaSpacesBetween(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
        // let regexp = /^([a-zA-Z]+\s?)+\s*$/;
        if (regexp.test(input)) {
            return null;
        }
        return { alphaSpacesBetween: true };
    }
    static alphaNumericSpacesBetween(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^[a-zA-Z0-9]+([\s][a-zA-Z0-9]+)*$/;
        // let regexp = /^([a-zA-Z0-9]+\s?)+\s*$/;
        if (regexp.test(input)) {
            return null;
        }
        return { alphaNumericSpacesBetween: true };
    }
    static alphaSpaces(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        if(input.trim() == ""){
            return { required: true };
        }

        let regexp = /^([a-zA-Z\s]+)$/;
        if (regexp.test(input)) {
            return null;
        }
        return { alphaSpaces: true };
    }
    // spaces not allowed
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: true }
        }

        return null;
    }
    static cannotContainQuotesBackslash(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /['"\\]+/;
        if (regexp.test(input)) {
            return { cannotContainQuotesBackslash: true };
        }
        return null;
    }
    static email(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^[a-zA-Z0-9`~!#$%^&*_+={}?|\/\.'-]+@([a-zA-Z\d]+\.)+[\w-]{2,3}$/;
        if (regexp.test(input)) {
            return null;
        }
        return { email: true };
    }
    static password(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (regexp.test(input)) {
            return null;
        }
        return { password: true };
    }
    static fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidationErrors {
        return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
            const fromDate = formGroup.get(fromDateField).value;
            const toDate = formGroup.get(toDateField).value;
            // Ausing the fromDate and toDate are numbers. In not convert them first after null check
            if ((fromDate !== null && toDate !== null) && fromDate > toDate) {
                return { [errorName]: true };
            }
            return null;
        };
    }
    //works for tin and address (doesn't include `~_ )
    static tin(control: FormControl): ValidationErrors | null {
        const input = (control.value as string).trim();
        if (input.length === 0) {
            return { required: true };
        }
        let regexp = /[`~_'"\\]+/;
        if (regexp.test(input)) {
            return { tin: true };
        }
        return null;
    }
    static onlyCurrence(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        let regexp = /^([0-9\.]+)$/;
        if (regexp.test(input)) {
            return null;
        }
        return { onlyCurrence: true };
    }
    static mustCheck(control: FormControl): ValidationErrors | null {
        const input = control.value as boolean;
        if (!input) {
            return { mustCheck: true };
        }
        return null;
    }
    static addressIndia(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        if(input.trim() == ""){
            return { required: true };
        }

        let regexp = /^([a-zA-Z0-9\,\.\s]+)$/;
        if (regexp.test(input)) {
            return null;
        }
        return { addressIndia: true };
    }
    static addressGermany(control: FormControl): ValidationErrors | null {
        const input = control.value as string;
        if(input.trim() == ""){
            return { required: true };
        }

        let regexp = /^([a-zA-Z0-9\,\.\s\/_-]+)$/;
        if (regexp.test(input)) {
            return null;
        }
        return { addressGermany: true };
    }
    static shouldMoreThanToday(control: FormControl): ValidationErrors | null {
        const inputDate = control.value;
        const minDate = new Date()

        if (inputDate instanceof Date && !isNaN(inputDate.getTime())) {
            if (minDate >= inputDate) {
                return { mindate: true }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    static shouldNotMoreThanToday(control: FormControl): ValidationErrors | null {
        const inputDate = control.value;
        const minDate = new Date()

        if (inputDate instanceof Date && !isNaN(inputDate.getTime())) {
            if (minDate >= inputDate) {
                return null;
            } else {
                return { maxdate: true }
            }
        } else {
            return null;
        }
    }
    static confirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }
    static courseDurationCanNotBeZero: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const courseYears = control.get('durationYears');
        const courseMonths = control.get('durationMonths');
        if (courseYears.invalid || courseMonths.invalid) {
            return
        }

        if (+courseYears.value || +courseMonths.value) {
            return null;
        } else {
            return { courseDurationCanNotBeZero: true }
        }
    };
}
