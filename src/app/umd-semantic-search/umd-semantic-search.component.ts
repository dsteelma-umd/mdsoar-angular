import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ds-semantic-search',
  styleUrls: ['./umd-semantic-search.component.scss'],
  templateUrl: './umd-semantic-search.component.html'
})
export class UmdSemanticSearchComponent {
  searchControl = new FormControl(); // Reactive form control for the search input
  results: any[] = []; // Array to store the results from the API

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Listen for changes in the search input and query the API
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait for 300ms after the user stops typing
        distinctUntilChanged(), // Only proceed if the value has changed
        switchMap((searchTerm) => this.queryApi(searchTerm)) // Switch to a new observable for each search term
      )
      .subscribe((data: any) => {
        this.results = data; // Assign the API response to the results array
      });
  }

  // Function to query the REST API
  queryApi(searchTerm: string) {
    const apiUrl = `http://localhost:5000/search`; // Replace with the actual API endpoint
    const payload = { query: searchTerm }; // JSON payload with the search term
    const headers = { 'Content-Type': 'application/json' }; // Set the Content-Type header

    return this.http.post<any[]>(apiUrl, payload, { headers } ); // Make a POST request
  }
}
