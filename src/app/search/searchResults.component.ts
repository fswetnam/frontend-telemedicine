import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'search-results-component',
  templateUrl: './searchResults.component.html',
  styleUrls: ['../message/message.component.css']
})

export class SearchResultsComponent implements OnInit {

    term: string
    results: object
    users: []

    form = new FormGroup({
        searchTerm: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
    
    @ViewChild('searchInput') input; 

    constructor(private route: ActivatedRoute, private searchService: SearchService) { }

    ngOnInit() {
        this.route.queryParams
          .subscribe(params => {
            this.term = params['term']

            // Call search url
            if(this.term) {
                this.searchService.searchTerm(this.term).subscribe((data) => {
                    console.log(data)
                    this.results = data;
                    this.users = JSON.parse(data['users']);
                })
            }
          }
        );
      }

    submit(){
        console.log(this.input)
    }

    openNav(){
        document.getElementById("mysideBar").style.width = "400px";
        document.getElementById("main").style.marginLeft = "400px";
      }
    
      closeNav(){
        document.getElementById("mysideBar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
      }
      

}