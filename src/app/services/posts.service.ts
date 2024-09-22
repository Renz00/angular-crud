import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Post } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private apiService: ApiService
  ) { }

  // params can be for pagination (currentPage, perPage, etc)
  // just added it as an example.
  getPosts = (url: string, params: any): Observable<Array<Post>> => {
    return this.apiService.get(
      url,
      {
        params,
        responseType: 'json'
      }
    );
  }

  addPost = (url: string, body: Post): Observable<any> => {
    return this.apiService.post(
      url,
      body,
      { /* empty params*/ }
    );
  }

  editPost = (url: string, body: Post): Observable<any> => {
    return this.apiService.put(
      url,
      body,
      { /* empty params*/ }
    );
  }

  deletePost = (url: string): Observable<any> => {
    return this.apiService.delete(
      url,
      { /* empty params*/ }
    );
  }

}
