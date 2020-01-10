import { AuthService } from './../authentication/auth.service';
import { WorkRotaSettings } from './../interfaces/WorkRotaSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class WorkRotaService {
  apiUrl = 'https://a3pzcoway8.execute-api.eu-west-1.amazonaws.com/prod/rotas';

  constructor(private http: HttpClient) { }

  public createRotaSettings(workRota: WorkRotaSettings) {
    // this.http.post(`${this.apiUrl}/settings`, workRota).subscribe(
    //   (val) => {
    //     console.log('Rota creation was successful');
    //     return val;
    //   },
    //   (error) => {
    //     console.log('Error', error);
    //     return error;
    //   }
    // );
    // return true;
    return API.post('prod-users-api', '/rotas', workRota);
  }

  public updateRotaBluePrint(workRota: WorkRotaSettings) {

  }

  public deleteRota(id: string) {

  }

  public getRotasForCurrentUser() {
    return this.http.get(this.apiUrl);
  }

  public getRotaByWeek(id: string, weekNo: string) {

  }

  public updateRotaWeek(workRota: WorkRotaSettings) {

  }

}
