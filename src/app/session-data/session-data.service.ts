import { Injectable } from '@angular/core';
import { PersistenceService, StorageType} from 'angular-persistence';


@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

    constructor(
        private persistence: PersistenceService
    ) { }

    set user(user_data){
        this.persistence.set('user',user_data,{type: StorageType.SESSION})
    }

    set token(token){
        this.persistence.set('token',token,{type: StorageType.SESSION})
    }

    get user(){
        return this.persistence.get('user', StorageType.SESSION)
    }
    get token(){
        return this.persistence.get('token', StorageType.SESSION)
    }

    checkToken(){
        const token = this.token
        if (token){
            return true
        } else {
            return false
        }
    }

    checkUser(){
        const user = this.user
        if (user){
            return true
        } else {
            return false
        }
    }

    clearSessionData(){
        this.persistence.removeAll(StorageType.SESSION)
    }
}