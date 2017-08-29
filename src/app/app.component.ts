import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { IssuesService } from './issue-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Issue Tracker';
  results = [];
  issues = [];
  page = 1;
  constructor(private issuesService: IssuesService) { }

  incrementPage() {
    if (this.issues.length == 30){
      this.page++;
      this.getIssues();
    }
  }

  decrementPage() {
    if (this.page != 1){
      this.page--;
      this.getIssues();
    }
  }

  getIssues() {
    this.issuesService.getIssues(this.page)
      .then((issues) => this.issues = issues);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.getIssues();
  }
}
