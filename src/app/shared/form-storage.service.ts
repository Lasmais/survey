import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CreateForm, QuestionCheckboxGroup, QuestionNumber, QuestionPhone, QuestionRadioGroup, QuestionText } from './create-form.class';
import { StorageService } from './storage.service';
import { Template } from './template.class';
import { cloneDeep } from "lodash";
import { DisplayText } from './display-text';

@Injectable({
  providedIn: 'root'
})
export class FormStorageService extends StorageService<Template> {

  private _surveyForms: BehaviorSubject<Array<Template>> = new BehaviorSubject<Array<Template>>(new Array<Template>());
  private _recentForm: BehaviorSubject<Template> = new BehaviorSubject<Template>(null);

  constructor() {
    super('forms'); 
    let tmps = this.localStorageGetArray<Template>();
    if(tmps.length == 0) {
      return;
    }
    this._surveyForms.next(tmps);
   }
 
   getDefault(): Template {
     return new Template('', new CreateForm());
  }

  resetRecentForm(): void{
    this._recentForm.next(null);
  }
  clear(): void {
    this._recentForm.next(null);
    this._surveyForms.next(new Array<Template>());
    this.localStorageClear();
  }
  generateNewForm(form: Template){
    let template = cloneDeep(form);
    template.templateForm.formId = this.getUniqueId(4);

    this._recentForm.next(template);
  }
  getRecentForm() : Observable<Template>
  {
    return this._recentForm.asObservable().pipe(map((template)=>
    {
      if(template != null){
        initializeObject(template)
      }
      return template;
    }));
  }
  setRecentForm(template: Template):void{
    this._recentForm.next(template);
  }
  getForms() : Observable<Template[]>
  {
    return this._surveyForms.asObservable().pipe(map((templates)=>
    {
      templates.forEach(template => {
        if(template != null){
          initializeObject(template)
        }
      });
      return templates;
    }));
  }

  updateTemplate(template: Template):boolean{
    let result = false;
    let temp = this._surveyForms.getValue();
    
    this.localStorageSet(temp);
    this._surveyForms.next(temp);  
    return result;
  }

  addForm(surverForm : Template) : void {
    var surveyForms = this._surveyForms.getValue();
    surveyForms.push(surverForm);
    this.localStorageSet(surveyForms);

    //this._recentForm.next(surverForm);
    this._surveyForms.next(surveyForms);
    // var forms = this.getForms();
    // forms.push(surverForm);
  }

}
function initializeObject(template: Template) {
  for(let i = 0; i< template.templateForm.questions.length; i++){
    let question = template.templateForm.questions[i];
    question.questionText = new DisplayText(question.questionText.textPolish, question.questionText.textEnglish);
    
    if(question instanceof QuestionPhone){
      template.templateForm.questions[i] = question as QuestionPhone;
    }    
    else if(question instanceof QuestionCheckboxGroup){
      let questionCheckboxGroup = template.templateForm.questions[i] = question as QuestionCheckboxGroup;
      for(let i = 0; i < questionCheckboxGroup.checkboxes.length; i++){
        let displayText = questionCheckboxGroup.checkboxes[i].answerText;
        questionCheckboxGroup.checkboxes[i].answerText =  new DisplayText(displayText.textPolish, displayText.textEnglish);
      }
    }    
    else if(question instanceof QuestionRadioGroup){
      let questionRadioGroup = template.templateForm.questions[i] = question as QuestionRadioGroup;
      for(let i = 0; i < questionRadioGroup.radiogroup.length; i++){
        let displayText = questionRadioGroup.radiogroup[i].answerText;
        questionRadioGroup.radiogroup[i].answerText =  new DisplayText(displayText.textPolish, displayText.textEnglish);
      }
    }
    else if(question instanceof QuestionText){
      template.templateForm.questions[i] = question as QuestionText;
    }
    else if(question instanceof QuestionNumber){
      template.templateForm.questions[i] = question as QuestionNumber;
    } 
  }

}

