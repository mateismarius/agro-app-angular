import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';

// Define your routes using the Routes interface
const routes: Routes = [
  // Define a route for the home page
  { path: '', component: HomeComponent },
  // Define a route for displaying a test error
  { path: 'test-error', component: TestErrorComponent, pathMatch: 'full' },
  // Define a route for displaying a "not found" page
  { path: 'not-found', component: NotFoundComponent, pathMatch: 'full' },
  // Define a route for displaying a server error
  { path: 'server-error', component: ServerErrorComponent, pathMatch: 'full' },
  // Define a lazy-loaded route for the account module
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  // Define a lazy-loaded route for the shop module
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
  },
  // Define a wildcard route that redirects to the home page for all other routes
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  // Import the RouterModule and call forRoot() with the routes array
  imports: [RouterModule.forRoot(routes)],
  // Export the RouterModule so other modules can use the routing configuration
  exports: [RouterModule],
})
export class AppRoutingModule {}

