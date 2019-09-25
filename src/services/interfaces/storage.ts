import { Injectable } from "@angular/core";

@Injectable()
export abstract class StorageService {
    abstract get<T>(key: string): T;
    abstract put<T>(key: string, value: T): void;
}