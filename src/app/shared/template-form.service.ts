import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CreateForm, IQuestion, QuestionCheckboxGroup, QuestionRadioGroup } from './create-form.class';
import { StorageService } from './storage.service';
import { Template } from './template.class';

@Injectable({
  providedIn: 'root'
})
export class TemplateFormService extends StorageService<Template>  {

  private _templateForms: BehaviorSubject<Array<Template>> 
      = new BehaviorSubject<Array<Template>>([this.getDefault()]);
  private _recentFormTemplate: BehaviorSubject<Template> 
      = new BehaviorSubject<Template>(this.getDefault());

  constructor(){
    super('template');
    let tmps = this.localStorageGetArray<Template>();
    if(tmps.length == 0) {
      new CreateForm().CreateSampleForm2().subscribe(form2 => {
        let tmp2 = new Template(form2.title, form2);
        tmp2.templateId = this.getUniqueId(4);
        this.addOrUpdate(tmp2);
      });
      return;
    }
    this._templateForms.next(tmps);
  }

  getDefault(): Template {
    return new Template("Test", new CreateForm());
 }
  clear(): void {
    this._recentFormTemplate.next(this.getDefault());
    this._templateForms.next([this.getDefault()]);
    this.localStorageClear();
  }

  generateNewTemplate(): void{
    let tmp = this.getDefault();
    tmp.templateId = this.getUniqueId(4);
    this._recentFormTemplate.next(tmp);
  }
  resetRecentTemplateForm(): void{
    this._recentFormTemplate.next(this.getDefault());
  }
  getRecentTemplateForm() : Observable<Template>
  {
    return this._recentFormTemplate.asObservable();
  }
  setRecentTemplateForm(tmp: Template){
    this._recentFormTemplate.next(tmp);
  }

  getTemplateForms() : Observable<Template[]>
  {
    return this._templateForms.asObservable();
  }

  addOrUpdate(template: Template):void{
    if(!this.tryUpdateTemplate(template)){
      this.addTemplateForm(template);
    }
    this.localStorageSet(this._templateForms.getValue());
  }

  delete(template: Template):void{
    let temp = this._templateForms.getValue();
    let newTemps = temp.filter(function(t) {
      return t.templateId !== template.templateId
    });
    this._templateForms.next(newTemps); 
  }
  private tryUpdateTemplate(template: Template):boolean{
    let temp = this._templateForms.getValue();
    
    for (let i = 0; i < temp.length; i++) {
      if(temp[i].templateId == template.templateId){
        temp[i] = template;
        this._templateForms.next(temp); 
        return true;
      }
    }
    this._templateForms.next(temp); 
    return false; 
  }

  private addTemplateForm(template : Template) : void {
    var templateForms = this._templateForms.getValue();
    templateForms.push(template);
    this._templateForms.next(templateForms);
  }

}
