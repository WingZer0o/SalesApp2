import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterEventService implements OnDestroy {
  public currentUrl = signal<string>('');
  private onDestroy = new Subject<void>();

  constructor(private router: Router) {
    this.router.events.pipe(takeUntil(this.onDestroy)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }
}
