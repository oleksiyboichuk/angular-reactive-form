import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";

function firstCharUppercase(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value as string;
    if (!value || !/^[A-Z]/.test(value)) {
      return { firstCharUppercase: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  styleUrl: './form-group.component.scss'
})
export class FormGroupComponent {

  users: User[] = [];
  submitted = false;

  userForm: FormGroup = new FormGroup({
    id: new FormControl('0', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), firstCharUppercase()]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private http: HttpClient) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any) => {
      this.users = res;
    })
  }

  onEdit(id: number) {
    this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`).subscribe((res: any) => {
      this.userForm.patchValue({
        id: res.id,
        name: res.name,
        username: res.username,
        email: res.email,
      });
    });
  }

  onSaveUser() {
    // debugger;
    const obj = this.userForm.value;
    this.submitted = true;
    console.log(this.userForm.controls['username'].errors)

    this.http.post('https://jsonplaceholder.typicode.com/users', obj)
      .subscribe((res: any) => {
      })
  }

}

