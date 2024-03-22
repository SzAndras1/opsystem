import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {UserDto} from "../generated";

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  subjectIsLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  currentUser: Subject<UserDto> = new BehaviorSubject<UserDto>({});

  constructor() { }
}
