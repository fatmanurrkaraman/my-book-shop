import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './ui/components/books/book-add/book-add.component';
import { BooksComponent } from './ui/components/books/books.component';
import { HomeComponent } from './ui/components/home/home.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { AuthGuard } from './ui/login/guards/auth.guard';
import { LoginComponent } from './ui/login/login.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,canActivateChild:[AuthGuard], children: [
      { path: '', component: HomeComponent, loadChildren: () => import('./ui/components/home/home.module').then(m => m.HomeModule) },
      {
        path: 'books',
        component: BooksComponent,
        loadChildren: () => import('./ui/components/books/books.module').then(m => m.BooksModule)
      },
      {
        path: 'books/add',
        component: BookAddComponent
      }
    ]
  },
  {path:'login',component:LoginComponent,loadChildren: () => import('./ui/login/login.module').then(m => m.LoginModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
