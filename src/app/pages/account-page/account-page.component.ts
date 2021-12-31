import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState, selectUserProfile, UserState } from 'src/app/store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  user: Observable<User | null>;

  constructor(private store: Store<AppState>) {
    this.user = this.store.select(selectUserProfile);
  }

  ngOnInit(): void {}

}
