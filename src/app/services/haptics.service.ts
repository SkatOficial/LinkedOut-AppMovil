import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root'
})
export class HapticsService {

  constructor() { }

  async impactMedium() {
    await Haptics.impact({ style: ImpactStyle.Medium });
  }
}
