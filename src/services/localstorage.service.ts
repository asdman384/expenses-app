import { Injectable } from "@angular/core";
import { StorageService } from './interfaces/storage';

@Injectable()
export class LocalStorageService implements StorageService {
    get<T>(key: string): T {
        let item = localStorage.getItem(key);
        if (item)
            return JSON.parse(item) as T;

        return undefined;
    }

    put<T>(key: string, value: T): void {
        if (value)
            localStorage.setItem(key, JSON.stringify(value));
    }
}