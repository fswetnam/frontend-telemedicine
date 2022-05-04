import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactUs',
  templateUrl: './contactUs.component.html',
  styleUrls: ['./contactUs.component.css'],
})
export class ContactUsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  myFunction1() {
    var em = document.forms['myForm']['email'].value;
    var txt = document.forms['myForm']['text'].value;
    alert('Email sent');
  }
}
