import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
declare var M;

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  author: any;
  description: any;
  showDescription: boolean = false;
  showComments: boolean = false;

  bookmarked: boolean = false;
  showAllComments: boolean = false;

  sourceName: any;
  publishedAt: any;

  constructor(private service: ApiService, private router: Router) { }

  articleData: any = {}
  newsImage: string = null;
  comments: any = [];

  requiredComments: any = []

  @Input('article')
  set article(data) {
    this.articleData = data;
    this.updateArticle()
  }

  @Input() bookmarks: any

  @Input('commentData')
  set commentData(data) {
    this.requiredComments = data;
  }


  ngOnInit() {
  }

  getcomments() {
    this.service.getComments()
      .subscribe(response => {
        this.comments = response;
        this.requiredComments = this.comments.slice(0, 2);
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        });
  }

  updateArticle() {
    this.newsImage = this.articleData && this.articleData['high thumbnail'] ? this.articleData['high thumbnail'] : "NA";
    this.author = this.articleData && this.articleData.channelname ? this.articleData.author : 'Author';
    this.sourceName = this.articleData && this.articleData.source && this.articleData.source.name ? this.articleData.source.name : "location";
    this.description = this.articleData && this.articleData.title ? this.articleData.title : "NA";
    this.publishedAt = this.articleData && this.articleData.publishedAt ? this.articleData.publishedAt : Date.now();
    this.validateBookMark()
    if (!this.requiredComments.length)
      this.getcomments();
    else
      this.showAllComments = true

  }

  addBookMark() {
    if (!this.bookmarked) {
      this.bookmarked = true
      this.bookmarks.push(this.articleData)
      localStorage.setItem('bookmark', JSON.stringify(this.bookmarks));
      M.toast({ html: 'bookmark added!', classes: 'rounded  green darken-1' });
    }
    else {
      var index = this.bookmarks.findIndex(x => x.id == this.articleData.id)
      if (index != -1) {
        this.bookmarked = false;
        this.bookmarks.splice(index, 1);
        localStorage.setItem('bookmark', JSON.stringify(this.bookmarks));
        M.toast({ html: 'bookmark removed!', classes: 'rounded  pink lighten-3' });

      }
    }
  }

  validateBookMark() {
    if (this.bookmarks) {
      var index = this.bookmarks.findIndex(x => x.id == this.articleData.id)
      if (index != -1) {
        this.bookmarked = true;
      }
    }
  }

  showAllCommentData() {
    this.showAllComments = true;
    let data = {
      article: this.articleData,
      comments: this.comments
    }
    localStorage.setItem('currentNewsItem', JSON.stringify(data));
    this.router.navigate(['/detailed']);

  }

  showfullDescription() {
    this.showDescription = true
  }

}
