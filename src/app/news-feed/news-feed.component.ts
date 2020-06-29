import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  bookmarks: any = [];

  constructor(private service: ApiService) { }


  articles: any = []

  URL: string = 'http://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=6cc609835e51458dab13e2f0808c55eb';

  ngOnInit() {
    this.getBookMarks();
    this.getData();
  }

  fetchData() {
    var myInst = this;
    fetch(this.URL)
      .then(response => response.json())
      .then(data => {
        data.articles.forEach(article => {
          if (myInst.articles.length < 30)
            myInst.articles.push(article)
        });
        console.log(myInst.articles)
      });
  }

  getData() {
    var myInst = this;
    this.service.getNewsUpdates()
      .subscribe((response: any) => {
        if (response) {
          response.forEach(article => {
            if (myInst.articles.length < 30)
              myInst.articles.push(article)
          });
        }
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        });
  }



  onScrollDown() {
    if (this.articles.length < 30)
      this.getData();
  }

  getBookMarks() {
    this.bookmarks = []
    let data = localStorage.getItem('bookmark');
    if (data)
      this.bookmarks = JSON.parse(data);
  }

}
