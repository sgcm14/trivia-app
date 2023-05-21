import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, StepperOrientation } from "@angular/material/stepper";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @ViewChild("rextiepayStepper") payStepper!: MatStepper;

  stepperOrientation: Observable<StepperOrientation> | any;

  firstFormGroup = new FormControl("");
  secondFormGroup = new FormControl("");
  option?: number;
  showStepThree: boolean = true;
  enabledButton: boolean = true;
  result: boolean = false;

  constructor(
    breakpointObserver: BreakpointObserver,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 700px)")
      .pipe(map(({ matches }) => (matches ? "vertical" : "horizontal")));

    this.setState(this.firstFormGroup, true);
    this.setState(this.secondFormGroup, true);
  }

  ngOnInit(): void {
  }

  setState(control: FormControl, state: boolean) {
    if (state) {
      control.setErrors({ required: true });
    } else {
      control.reset();
    }
  }

  choiceOption(id: number) {
    this.option = id;
    this.option === 1
      ? ((this.showStepThree = false))
      : ((this.showStepThree = true));
  }

  isCorrect(val: string) {
    if (val === 'yes') {
      this.enabledButton = false;
    }
  }


}
