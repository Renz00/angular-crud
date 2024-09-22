import { HttpHeaders } from "@angular/common/http";
import { HttpContext } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}


export interface Post {
  userId?: number;
  id?: number;
  title: string,
  body: string;
}

// export interface Posts {
//   posts: Array<Post>;
// }
