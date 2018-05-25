import { Component } from '@angular/core';
import { $ } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe } from '../app/pipes/filter.pipe';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
}

// $(document).ready(function() {
//   $('.dropdown').hover(
//       function() {
//           $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).slideDown('400');
//           $(this).toggleClass('open');
//       },
//       function() {
//           $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp('400');
//           $(this).toggleClass('open');
//       }
//   );
// });
