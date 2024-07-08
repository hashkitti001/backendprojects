import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
        return {'msg': 'You are signed up'}
    }
    login(){
        return {'msg': 'You are logged in'}
    }
}