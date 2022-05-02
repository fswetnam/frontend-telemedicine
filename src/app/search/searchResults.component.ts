import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search-results-component',
  templateUrl: './searchResults.component.html',
})

export class SearchResultsComponent implements OnInit {

    term: string
    results: object

    form = new FormGroup({
        searchTerm: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
    
    @ViewChild('searchInput') input; 

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams
          .subscribe(params => {
            this.term = params['term']

            // Call search url
            if(this.term) {
                
            }
          }
        );
      }

    submit(){
        console.log(this.input)
    }

}