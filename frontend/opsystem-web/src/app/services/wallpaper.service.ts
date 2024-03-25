import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WallpaperService {
  wallpaper: Subject<string> = new BehaviorSubject<string>('');

  constructor() {
  }

}
