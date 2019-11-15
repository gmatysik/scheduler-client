import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AuthService} from './auth/auth.service';
import {RouterTestingModule} from '@angular/router/testing'
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router, RouterModule  } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let router: Router;

  class MockAuthService extends AuthService {
    
        /**
         * This method is implemented in the AuthService
         * we extend, but we overload it to make sure we
         * return a value we wish to test against
         */
        isLoggedIn() {
            return false;
        }
    };
    
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers : [
        HttpHandler,
        //AuthService,
        {provide: AuthService, useClass: MockAuthService },
        HttpClient,
        /*{
          provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); }
        }*/
      ],      
      imports: [ RouterTestingModule ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should create`, async(inject([AuthService],
    (authService: AuthService) => {
      expect(authService).toBeTruthy();
  })));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to scheduler5!');
  }));
  it('should render nav tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    let service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'isLoggednIn').and.returnValue(true);

    fixture.detectChanges();
    const nav = fixture.debugElement.query(By.css('nav'));
    expect(nav).toBeTruthy();
  }));
  it('should render Logout tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    
    let service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'isLoggednIn').and.returnValue(true);
    fixture.detectChanges();
    const test = fixture.debugElement.query(By.css('p'));
    expect(test).toBeTruthy();
  }));
  it('should render nav-item tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    
    let service = fixture.debugElement.injector.get(AuthService);
    spyOn(service, 'isLoggednIn').and.returnValue(true);
    fixture.detectChanges();
    const test = fixture.debugElement.query(By.css('a'));
    const length = fixture.debugElement.queryAll(By.css('a')).length;
    //expect(test).toBeTruthy();
    expect(length).toEqual(3);    
  }));

});
