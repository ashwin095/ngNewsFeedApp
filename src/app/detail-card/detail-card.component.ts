import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit {

  constructor() { }
  bookMarkedArticles: any = []
  article: any;
  comments: any;

  ngOnInit(): void {
    this.getBookMarks();
    this.getCurrentArticle();
  }
  getBookMarks() {
    let data = localStorage.getItem('bookmark');
    if (data)
      this.bookMarkedArticles = JSON.parse(data)
    console.log(this.bookMarkedArticles)
  }

  getCurrentArticle() {
    let data: any = localStorage.getItem('currentNewsItem');
    if (data) {
      data = JSON.parse(data)
      this.article = data.article
      this.comments = data.comments

    }

  }

}
