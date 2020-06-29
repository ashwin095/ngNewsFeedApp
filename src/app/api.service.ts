import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private commentsUrl = 'https://cors-anywhere.herokuapp.com/http://cookbookrecipes.in/test.php';
  private newsUrl = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=6cc609835e51458dab13e2f0808c55eb';

  private newsURL2 = `http://newsapi.org/v2/everything?q=bitcoin&from=2020-05-29&sortBy=publishedAt&apiKey=6cc609835e51458dab13e2f0808c55eb`


  constructor(private httpClient: HttpClient) { }

  getComments() {
    return this.httpClient.get(this.commentsUrl);
  }

  getNewsUpdates() {
    return this.httpClient.get(this.newsURL2);

  }
}
