import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSettings } from "../constants/appsettings";



@Injectable()
export class AppSettingsService {
  getSettings(): AppSettings {
    let settings = new AppSettings();
    return settings;
  }
}
