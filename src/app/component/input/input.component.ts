import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  inputForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.inputForm = this.formBuilder.group({
      telephone: ['',Validators.required],
      manhanvien: ['',Validators.required],
      contactnumber:['', Validators.required]
    });
  }

  onKey(event:any) {
    if(event.target.value === "VNW0013736"){
      this.inputForm.get("contactnumber").setValue("123456");
    }
  }
  get f(){
    return this.inputForm.controls;
  }
  /**
   * goto back
   */
  onBack(){
    this.onPopState(event);
  }
/**
 * on back
 * @param event 
 */
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    alert('Back button pressed');
  }
}
