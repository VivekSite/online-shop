import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface SignInFormType {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  signInForm!: FormGroup<SignInFormType>;

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handlerSignIn() {
    this._authService
      .loginUser({
        email: this.signInForm.value.email || '',
        password: this.signInForm.value.password || '',
      })
      .subscribe((res) => {
        localStorage.setItem('token', res.token);

        this.signInForm.setValue({
          email: '',
          password: '',
        });

        this.router.navigate(['/']);
      });
  }

  isInValidField(field: string): boolean {
    const input = this.signInForm.get(field);
    return !!(input?.dirty && input?.invalid);
  }
}
