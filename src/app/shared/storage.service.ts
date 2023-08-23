import { Injectable } from '@angular/core';
import { CreateForm } from './create-form.class';
import { ISerializable } from './iserializable';
import { Template } from './template.class';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageService<T> {

  constructor(public key: string) { }

  /**
   * generate groups of 4 random characters
   * @example getUniqueId(1) : 607f
   * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
   */
  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
  localStorageClear(){
    window.localStorage.clear();
  }
  localStorageSet(value: any):void{
    window.localStorage.setItem(this.key, JSON.stringify(value));
  }

  abstract getDefault() : T;

  localStorageGet<T>():T {
    var rawJson = window.localStorage.getItem(this.key);

    if(!rawJson){
      return <T>{};
    }
    var jsonData = JSON.parse(rawJson);
    let result : T = Object.assign(this.getDefault(), jsonData) as T;
    return result;
  }

  localStorageGetArray<T extends ISerializable<T>>(): Array<T> {
    let result = new Array<T>();

    var rawJson = window.localStorage.getItem(this.key);

     if(!rawJson){
       return result;
     }

     var jsonArray = JSON.parse(rawJson);
     for(var item of jsonArray) {
           let temp : T = Object.assign(this.getDefault(), item) as T;
           let data : T = temp.fromJSON();
           result.push(data);
     }
     return result;
   }

}
