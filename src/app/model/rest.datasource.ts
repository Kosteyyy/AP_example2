import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { catchError, delay, map, Observable, throwError } from "rxjs";
import { Product } from "./product.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class RestDataSource {
    constructor(
        private http: HttpClient,
        @Inject(REST_URL) private url: string
    ) {}

    getData(): Observable<Product[]> {
        return this.sendRequest<any | Product[]>("GET", this.url).pipe(
            // delay(5000),
        );
    }
    saveProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>("POST", this.url, product);
    }
    updateProduct(product: Product): Observable<Product> {
        return this.sendRequest<Product>(
            "PUT",
            `${this.url}/${product.id}`,
            product
        );
    }
    deleteProduct(id: number): Observable<Product> {
        return this.sendRequest<Product>("DELETE", `${this.url}/${id}`);
    }
    private sendRequest<T>(
        verb: string,
        url: string,
        body?: Product
    ): Observable<T> {
        let myHeaders = new HttpHeaders();
        myHeaders = myHeaders.set("Access-Key", "<secret>");
        myHeaders = myHeaders.set("Application-Names", [
            "exampleApp",
            "proAngular",
        ]);
        return this.http
            .request<T>(verb, url, {
                body: body,
                headers: myHeaders,
            })
            .pipe(
                catchError((error: Response) => {
                    throw `Сетевая ошибка: ${error.statusText} (${error.status})`;
                })
            );
    }
}
