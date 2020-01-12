import { WorkRotaWeek, NewRotaWeek } from './../interfaces/WorkRotaWeek';
import { WorkRotaSettings } from './../interfaces/WorkRotaSettings';
import { Injectable } from '@angular/core';
import { API } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class WorkRotaService {
  apiName = 'prod-users-api';

  constructor() { }

  createRotaSettings(workRotaSettings: WorkRotaSettings): Promise<void> {
    return API.post(this.apiName, '/rotas/settings', {
      body: workRotaSettings
    });
  }

  updateRotaSettings(workRotaSettings: WorkRotaSettings): Promise<void> {
    const params = {
      body: workRotaSettings
    };
    return API.put(this.apiName, '/rotas/settings', params);
  }

  getRotaSettings(rotaId: string): Promise<WorkRotaSettings> {
    rotaId = rotaId.split('#')[1];
    return API.get(this.apiName, `/rotas/settings/${rotaId}`, '');
  }

  getRotasForCurrentUser(): Promise<object[]> {
    return API.get(this.apiName, '/rotas', '');
  }

  generateRotaWeek(newRota: NewRotaWeek): Promise<void> {
    const params = {
      body: newRota
    };
    return API.post(this.apiName, '/rotas/week', params);
  }

  updateRotaWeek(workRotaWeek: WorkRotaWeek): Promise<void> {
    const params = {
      body: workRotaWeek
    };
    return API.put(this.apiName, '/rotas/week', params);
  }
  
  getAllRotaWeeks(rotaId: string): Promise<WorkRotaWeek[]> {
    const id = this.splitRotaId(rotaId);
    return API.get(this.apiName, `/rotas/week/${id}`, '');
  }

  private splitRotaId(rotaId: string): string {
    return rotaId.split('#')[1];
  }
}
