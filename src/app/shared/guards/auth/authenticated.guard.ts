import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const pid = inject(PLATFORM_ID);
  if (isPlatformBrowser(pid) && localStorage.getItem('token')) {
    return true;
  } else {
    return router.navigateByUrl('/contact');
  }
};
