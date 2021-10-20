import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { SelectControlValueAccessor } from '@angular/forms';
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
  sPrueba3: Observable<any[]> | undefined;
  
  
  nQstOptions: Map<string, number> = new Map<string, number>();
  
  
  aaa: Map<string, Observable<any[]>> = new Map<string, Observable<any[]>>();
  BBB: Array<Map<any,any>>=new Array;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('questions').valueChanges();
  
    this.options = firestore.collection('options').valueChanges();
  
    this.prueba=firestore.collection('prueba').valueChanges();
    
    const QuerySnapshot=firestore.collection('prueba').get();

    QuerySnapshot.forEach(subPrueba=>
      {
        subPrueba.docs.forEach(async doc=>
          {
            if(doc.id=="Q1"){
              this.sPrueba=firestore.collection('prueba').doc(doc.id).collection('subPrueba').valueChanges();
            }
            else if(doc.id=="Q2"){
              this.sPrueba2=firestore.collection('prueba').doc(doc.id).collection('subPrueba').valueChanges();
            } 
            else if(doc.id=="Q3"){
              this.sPrueba3=firestore.collection('prueba').doc(doc.id).collection('subPrueba').valueChanges();
            }
            /* let i=0;
            this.nQstOptions.set(doc.id,i);
        
            const subQuerySnapshot=firestore.collection('prueba').doc(doc.id).collection('subPrueba').get();
            subQuerySnapshot.forEach(o=>
              {
                o.docs.forEach(sO=>
                  {
                    this.aaa.set(doc.id,firestore.collection('prueba').doc(doc.id).collection('subPrueba').valueChanges())
                    this.BBB.push(this.aaa);
                    i++;
                    this.nQstOptions.set(doc.id, i);
                  });
                  console.log(this.BBB);
                  console.log(doc.id,"---",this.nQstOptions.get(doc.id));
              }); */
            });
      }
    );
    
    //this.sPrueba=firestore.collection('prueba').doc('Q1').collection('subPrueba').valueChanges();
    
  }

  ngOnInit(): void {
  }
  ShowMsg()
  {
    let selected=new Array;
    var x= document.getElementsByClassName("chckBx");
    for(let i=0; i<x.length;i++)
    {
      var a= x[i] as HTMLInputElement;
      if(a.checked){selected.push(a);}
    } 
    //alert(selected.length);
    let b:string="";
    if(selected.length!=0)
    {
      for(let i=0; i<selected.length;i++)
      {
        b+selected[i].value+" ";
      }
      alert(b);
    }
    

  }
}
