import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './ui/components/books/books.component';
import { HomeComponent } from './ui/components/home/home.component';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: HomeComponent, loadChildren: () => import('./ui/components/home/home.module').then(m => m.HomeModule) },
      {
        path: 'book',
        component: BooksComponent,
        loadChildren: () => import('./ui/components/books/books.module').then(m => m.BooksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
