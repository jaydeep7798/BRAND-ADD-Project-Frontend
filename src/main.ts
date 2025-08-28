import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/app.component';
import { loginReducer } from './app/Store/loginStore/login.reducer';
import { LoginEffects } from './app/Store/loginStore/login.effect';
import { LoginService } from './app/Service/login.service';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/Auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore({ login: loginReducer }),
    provideEffects([LoginEffects]),
    provideStoreDevtools({ maxAge: 25 }),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    LoginService, // ✅ Provide the LoginService so DI works
    importProvidersFrom(RouterModule.forRoot(routes)),
  ]
}).catch(err => console.error(err));
