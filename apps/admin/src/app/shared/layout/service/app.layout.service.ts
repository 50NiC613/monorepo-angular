import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
  inputStyle: string;
  colorScheme: string;
  theme: string;
  ripple: boolean;
  menuMode: string;
  scale: number;
}
interface IGDBauth {
  access_token: string;
  expires_in: number;
  token_type: string;

}
interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  };

  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  };

  auth: IGDBauth = {
    access_token: "",
    expires_in: 0,
    token_type: ""
  }

  private configUpdate = new Subject<AppConfig>();
  private authUpdate = new Subject<IGDBauth>();

  private overlayOpen = new Subject<any>();

  configUpdate$ = this.configUpdate.asObservable();
  authUpdate$ = this.authUpdate.asObservable();

  overlayOpen$ = this.overlayOpen.asObservable();
  constructor(private http: HttpClient) { }

  onMenuToggle() {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
    }
    else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  showProfileSidebar() {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }

  showConfigSidebar() {
    this.state.configSidebarVisible = true;
  }

  isOverlay() {
    return this.config.menuMode === 'overlay';
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }

  onConfigUpdate() {
    this.configUpdate.next(this.config);
  }
  onAuthUpdate() {
    this.authUpdate.next(this.auth);
    console.log(this.auth);
  }
  renewToken() {
    const client_id = "client_id=4mmynh9wdgtfip44dm0xh2wrvgs10y";
    const client_secret = "client_secret=2pcax2vysv9epd6t52dy4l4wxirep6";
    const grant_type = "grant_type=client_credentials";
    this.http.post<IGDBauth>(`https://id.twitch.tv/oauth2/token?${client_id}&${client_secret}&${grant_type}`, "nada").subscribe(auth => {
      this.auth = auth;
      this.onAuthUpdate();
    })

  }

}
