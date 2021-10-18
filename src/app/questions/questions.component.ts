import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  items: Observable<any[]>;
  options: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('questions').valueChanges();
  
    this.options = firestore.collection('options').valueChanges();
    
  }

  ngOnInit(): void {
  }

}
