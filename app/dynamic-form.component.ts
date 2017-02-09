import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { QuestionService } from './question.service';

@Component({
  moduleId: module.id,
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.component.html',
  providers: [ QuestionControlService, QuestionService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  errorMessage: string;
  mode = 'Observable';

  constructor(
    private qcs: QuestionControlService,
    private questionService: QuestionService
    ) {  }
  ngOnInit() {
    this.getQuestions();
    this.form = this.qcs.toFormGroup(this.questions);
  }
  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
  
  getQuestions() {
    this.questionService.getQuestions()
                   .subscribe(
                     questions => 
                     {
                       this.questions = questions;
                       this.form = this.qcs.toFormGroup(questions);
                     },
                     error =>  this.errorMessage = <any>error);
  }
}
