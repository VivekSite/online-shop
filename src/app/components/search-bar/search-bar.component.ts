import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';

import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';

interface SearchFormType {
  query: FormControl<string | null>;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    InputIconModule,
    InputTextModule,
    IconFieldModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  searchForm!: FormGroup<SearchFormType>;

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  handleSearch() {
    this.router.navigate([`/search`], {
      queryParams: {
        query: this.searchForm.value.query,
      },
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
