import { Component, OnInit } from '@angular/core';
import {Pet} from "../models/pet";
import {PetService} from "../services/pet.service";
import {AuthService} from "../services/auth.service";
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";
import {Service} from "../models/service";
import {Specialty} from "../models/specialty";
import {ServiceService} from "../services/service.service";
import {SpecialtyService} from "../services/specialty.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLogin: boolean = false;
  pets: Pet[] = [];
  services: Service[] = [];
  specialities: Specialty[] = [];
  transactions: Transaction[] = [];
  from = new  Date('December 25, 1995 13:30:00');
  upto =  new Date();
  selectPet: any;
  selectService: any;
  selectSpecialty: any;

  constructor(
    private _auth: AuthService,
    private petService: PetService,
    private transactionService: TransactionService,
    private serviceService: ServiceService,
    private specialtyService: SpecialtyService,
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
    this.getPets();
    this.getTransactions();
    this.getSpecialities();
    this.getServices();
    this.from = new  Date('December 25, 1995 13:30:00');
    this.selectPet = 'Todos';
    this.selectService = 'Todos';
    this.selectSpecialty = 'Todos';
  }

  getPets(): void{
    this.petService.getPets()
      .subscribe(pets=> this.pets = pets);
  }

  getServices(): void{
    this.serviceService.getServices()
      .subscribe(services=> this.services = services);
  }

  getSpecialities(): void{
    this.specialtyService.getSpecialitys()
      .subscribe(specialities=> this.specialities = specialities);
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => this.transactions = transactions);
  }

  isUserLogin(){
    if(this._auth.getToken() != null){
      this.isLogin = true;
    }
  }
}
