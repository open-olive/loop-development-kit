export interface HttpRequest {
    url: string;
    method: string;
    body: string | Uint8Array;
}
export interface HttpResponse {
    statusCode: number;
    data: string | Uint8Array;
}
export interface NetworkService {
    httpRequest(req: HttpRequest): Promise<HttpResponse>;
}
