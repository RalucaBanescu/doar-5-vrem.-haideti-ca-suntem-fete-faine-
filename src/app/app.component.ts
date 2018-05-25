import { DataStorageService } from './shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  constructor(private dataStorageService : DataStorageService){

  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyC6xBoHLdgzf4EEQpJpxeI9GKWTqbzm4bU",
      authDomain: "proiectbdd-549ee.firebaseapp.com",
      databaseURL: "https://proiectbdd-549ee.firebaseio.com",
      projectId: "proiectbdd-549ee",
      storageBucket: "",
      messagingSenderId: "583267224058"
    });

    this.dataStorageService.getRecipes();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
