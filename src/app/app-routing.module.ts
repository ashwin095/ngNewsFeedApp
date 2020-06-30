import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { BookMarkComponent } from './book-mark/book-mark.component';
import { DetailCardComponent } from './detail-card/detail-card.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "bookmarks",
    component: BookMarkComponent
  },
  {
    path: "home",
    component: NewsFeedComponent
  },
  {
    path: "detailed",
    component: DetailCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
