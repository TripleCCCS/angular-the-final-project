import { Component } from '@angular/core';
import { $ } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../app/pipes/filter.pipe';
// import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
}


