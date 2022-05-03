import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
})

export class SearchComponent implements OnInit {

    form = new FormGroup({
        searchTerm: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    
    @ViewChild('searchInput') input; 

    constructor(private router: Router) {}

    ngOnInit() {
    }

    submit(){
        let searchTerm = this.input.nativeElement.value;
        this.router.navigateByUrl('/search?term=' + searchTerm);
    }

}