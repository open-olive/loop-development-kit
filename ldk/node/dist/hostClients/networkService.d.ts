export interface HttpRequest {
    url: string;
    method: string;
    body: string | Uint8Array;
    headers: Map<string, string>;
}
export interface HttpResponse {
    statusCode: number;
    data: string | Uint8Array;
    headers: Map<string, Array<string>>;
}
export interface NetworkService {
    httpRequest(req: HttpRequest): Promise<HttpResponse>;
}
