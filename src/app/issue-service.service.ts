import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from './issue';
import { Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as moment from 'moment';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IssuesService {
  results = [];
  constructor(private http: HttpClient) { }

  getIssues(page): Promise<Issue[]> {
    const lastWeek = moment().subtract(7, 'days').startOf('day').toISOString();
    return this.http.get(`https://api.github.com/repos/angular/angular/issues?page=${page}&since=${lastWeek}`)
      .toPromise()
      .then(response => {
        const issues = [];
        Object.keys(response).forEach((key) => {
          let iss = response[key];
          let title = iss.title;
          let body = iss.body;
          let userLogin = iss.user.login;
          let assigneeLogin = null;
          if (iss.assignee) {
            assigneeLogin = iss.assignee.login;
          }
          let issue = new Issue(title, body, userLogin, assigneeLogin);
          issues.push(issue);
        })
        return issues;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
