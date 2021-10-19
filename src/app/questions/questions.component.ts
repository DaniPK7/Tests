import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

//let nQstOptions= new Map<string, number>();

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})


export class QuestionsComponent implements OnInit {

  items: Observable<any[]>;
  options: Observable<any[]>;
  
  prueba: Observable<any[]>;
  sPrueba: Observable<any[]> | undefined;
  sPrueba2: Observable<any[]> | undefined;
  
  
  nQstOptions: Map<string, number> = new Map<string, number>();
  
  
  

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('questions').valueChanges();
  
    this.options = firestore.collection('options').valueChanges();
  
    this.prueba=firestore.collection('prueba').valueChanges();
    
    const QuerySnapshot=firestore.collection('prueba').get();

    QuerySnapshot.forEach(subPrueba=>
      {
        subPrueba.docs.forEach(async doc=>
          {
            //console.log(doc.id,"---",doc);
            let i=0;
            this.nQstOptions.set(doc.id,i);
            
            const subQuerySnapshot=firestore.collection('prueba').doc(doc.id).collection('subPrueba').get();
            subQuerySnapshot.forEach(o=>
              {
                
                o.docs.forEach(sO=>
                  {
                    i++;
                    this.nQstOptions.set(doc.id, i);
                  });
                  
                  console.log(doc.id,"---",this.nQstOptions.get(doc.id));
              });
             });
      }
    );
    
    this.sPrueba=firestore.collection('prueba').doc('Q1').collection('subPrueba').valueChanges();
    
  }

  ngOnInit(): void {
  }

}
