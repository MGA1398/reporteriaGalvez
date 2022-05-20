import {Component, OnInit, Input, NgZone} from '@angular/core';
import  { Pet } from '../models/pet';
import {ActivatedRoute, Router} from "@angular/router";
import {PetService} from "../services/pet.service";
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss']
})
export class PetDetailComponent implements OnInit {

  @Input() pet?: Pet;
  submitted = false;
  petForm: FormGroup;
  isAdmin: boolean = false;

  constructor(
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private location: Location,
    public fb: FormBuilder,
    private ngZone: NgZone,
  ) {
    this.petForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')!=null){
      this.getPet();
      this.isUserAdmin();
    }
  }

  isUserAdmin(){
    if(this._auth.getAdmin()=="true"){
      this.isAdmin = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (!this.petForm.valid) {
      return false;
    } else {
      return this.petService.addPet(this.petForm.value).subscribe({
        complete: () => {
          console.log('Patient successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/pets'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  get myForm() {
    return this.petForm.controls;
  }

  getPet(): void {
    const id= this.route.snapshot.paramMap.get('id');
    this.petService.getPet(id)
      .subscribe(pet=>  {
        this.pet =pet});
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.pet) {
      this.petService.updatePet(this.pet)
        .subscribe(() => this.goBack());
    }
  }

}
