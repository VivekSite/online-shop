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
import { MatchPasswordValidator } from '../../util/validators.util';

interface SignUpFormType {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  signUpForm!: FormGroup<SignUpFormType>;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordRegex)],
      ],
      confirmPassword: ['', [Validators.required, MatchPasswordValidator()]],
    });
  }

  handlerSignUp() {
    this._authService
      .registerUser({
        name: this.signUpForm.value.name || '',
        email: this.signUpForm.value.email || '',
        password: this.signUpForm.value.password || '',
      })
      .subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.signUpForm.setValue({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        this.router.navigate(['/']);
      });
  }

  isInValidField(field: string): boolean {
    const input = this.signUpForm.get(field);
    return !!(input?.dirty && input?.invalid);
  }
}
