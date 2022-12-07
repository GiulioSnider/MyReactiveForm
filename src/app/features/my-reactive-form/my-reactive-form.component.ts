import { Component, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ageValidator } from 'src/app/shared/Validators/customAge.validator';
import { cfValidator } from 'src/app/shared/Validators/fiscalCode.validator';
import { domicilio, employee } from 'src/app/shared/Models/employee.model';

@Component({
  selector: 'app-my-reactive-form',
  templateUrl: './my-reactive-form.component.html',
  styleUrls: ['./my-reactive-form.component.scss'],
})
export class MyReactiveFormComponent {
  isEditing = false;
  dipendenteDaInserire: employee = new employee();

  listaDipendenti: employee[] = [
    // {
    //   name: 'Gianni',
    //   lastName: 'Brera',
    //   birthDate: '1900-01-01',
    //   fiscalCode: 'BRRGNN80A01F839C',
    //   mainAddress: 'Via Bruta',
    //   workAddresses: [new domicilio()],
    // },
  ];

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [ageValidator]),
    fiscalCode: new FormControl('', [cfValidator]),
    mainAddress: new FormControl('', [Validators.required]),
    workAddresses: new FormArray<FormGroup>([]),
  });

  aggiungiDomicilio() {
    this.myForm.controls.workAddresses.push(
      new FormGroup({
        via: new FormControl(''),
        civico: new FormControl(''),
        citta: new FormControl(''),
        cap: new FormControl(''),
      })
    );
    this.dipendenteDaInserire.workAddresses.push(new domicilio());
  }

  aggiungiDipendente() {
    let dipendenteDaAggiungere = this.dipendenteDaInserire;
    let dipendenteNellaForm = this.myForm.controls;
    let workAddressesNellaForm = dipendenteNellaForm.workAddresses;

    dipendenteDaAggiungere.name = dipendenteNellaForm.name.value;
    dipendenteDaAggiungere.lastName = dipendenteNellaForm.lastName.value;
    dipendenteDaAggiungere.birthDate = dipendenteNellaForm.birthDate.value;
    dipendenteDaAggiungere.fiscalCode = dipendenteNellaForm.fiscalCode.value;
    dipendenteDaAggiungere.mainAddress = dipendenteNellaForm.mainAddress.value;

    if (workAddressesNellaForm.length != 0) 
    {
      for (let i = 0; i < workAddressesNellaForm.controls.length; i++) 
      {
        dipendenteDaAggiungere.workAddresses[i].via = workAddressesNellaForm.controls[i].controls['via'].value;
        dipendenteDaAggiungere.workAddresses[i].civico = workAddressesNellaForm.controls[i].controls['civico'].value;
        dipendenteDaAggiungere.workAddresses[i].citta = workAddressesNellaForm.controls[i].controls['citta'].value;
        dipendenteDaAggiungere.workAddresses[i].cap = workAddressesNellaForm.controls[i].controls['cap'].value;
      }
    }

    this.listaDipendenti.push(dipendenteDaAggiungere);
    this.resetForm();
  }

  modifica(dipendente: employee) {
    this.isEditing = true;
    let dipendenteNellaForm = this.myForm.controls;
    let workAddressesNellaForm = dipendenteNellaForm.workAddresses;
    let campiAddressNellaform = dipendenteNellaForm.workAddresses.controls;

    dipendenteNellaForm['name'].setValue(dipendente.name);
    dipendenteNellaForm['lastName'].setValue(dipendente.lastName);
    dipendenteNellaForm['birthDate'].setValue(dipendente.birthDate);
    dipendenteNellaForm['fiscalCode'].setValue(dipendente.fiscalCode);
    dipendenteNellaForm['mainAddress'].setValue(dipendente.mainAddress);

    for (let i = 0; i < dipendente.workAddresses.length; i++) 
    {
      workAddressesNellaForm.push(
        new FormGroup({
          via: new FormControl(''),
          civico: new FormControl(''),
          citta: new FormControl(''),
          cap: new FormControl(''),
        })
      );
    }

    if (dipendente.workAddresses.length != 0) 
    {
      for (let i = 0; i < dipendente.workAddresses.length; i++) 
      {
        campiAddressNellaform[i].controls['via'].setValue(dipendente.workAddresses[i].via);
        campiAddressNellaform[i].controls['civico'].setValue(dipendente.workAddresses[i].civico);
        campiAddressNellaform[i].controls['citta'].setValue(dipendente.workAddresses[i].citta);
        campiAddressNellaform[i].controls['cap'].setValue(dipendente.workAddresses[i].cap);
      }
    }
  }

  confermaModifiche(dipendenteDaModificare: employee) {
    let indexVecchioDipendente = this.listaDipendenti.indexOf(dipendenteDaModificare);

    let dipendenteDaAggiungere = this.dipendenteDaInserire;
    let dipendenteNellaForm = this.myForm.controls;

    dipendenteDaAggiungere.name = dipendenteNellaForm.name.value;
    dipendenteDaAggiungere.lastName = dipendenteNellaForm.lastName.value;
    dipendenteDaAggiungere.birthDate = dipendenteNellaForm.birthDate.value;
    dipendenteDaAggiungere.fiscalCode = dipendenteNellaForm.fiscalCode.value;
    dipendenteDaAggiungere.mainAddress = dipendenteNellaForm.mainAddress.value;

    if (dipendenteNellaForm.workAddresses.length != 0) 
    {
      for (let i = 0;i < dipendenteNellaForm.workAddresses.controls.length;i++) 
      {
        dipendenteDaAggiungere.workAddresses.push(new domicilio());
        dipendenteDaAggiungere.workAddresses[i].via = dipendenteNellaForm.workAddresses.controls[i].controls['via'].value;
        dipendenteDaAggiungere.workAddresses[i].civico = dipendenteNellaForm.workAddresses.controls[i].controls['civico'].value;
        dipendenteDaAggiungere.workAddresses[i].citta = dipendenteNellaForm.workAddresses.controls[i].controls['citta'].value;
        dipendenteDaAggiungere.workAddresses[i].cap = dipendenteNellaForm.workAddresses.controls[i].controls['cap'].value;
      }
    }

    this.listaDipendenti[indexVecchioDipendente] = dipendenteDaAggiungere;
    this.resetForm();
    this.isEditing = false;
  }

  mostraDomicili(dipendente: employee) {}

  resetForm() {
    this.dipendenteDaInserire = new employee();
    this.myForm.reset();
    this.myForm.controls.workAddresses.controls = [];
  }
}
