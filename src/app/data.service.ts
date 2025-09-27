import { Injectable } from '@angular/core';
import { ref, push, onValue, remove, get, update } from 'firebase/database';
import { database } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Save a new point
  savePoint(point: { name: string, coordinates: string }) {
    const pointsRef = ref(database, 'points');
    return push(pointsRef, point);
  }
  // Get all points
  getPoints() {
    const pointsRef = ref(database, 'points');
    return new Promise((resolve, reject) => {
      onValue(pointsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const pointsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          resolve(pointsArray);
        } else {
          resolve([]);
        }
      }, (error) => {
        reject(error);
      });
    });
  }

}
