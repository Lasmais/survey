import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Answer, CreateForm, IQuestion, QuestionCheckboxGroup, QuestionPhone, QuestionRadioGroup, QuestionText } from '../shared/create-form.class';
import { TemplateFormService } from '../shared/template-form.service';
import { Template } from '../shared/template.class';
import { DisplayText } from '../shared/display-text';

@Component({
  selector: 'app-define-form',
  templateUrl: './define-form.component.html',
  styleUrls: ['./define-form.component.scss'],
})
export class DefineFormComponent implements OnInit {
 // private templates : Template[];
  public template: Template;

  constructor(public popoverController: PopoverController, public templateFormService: TemplateFormService,
    public modalController: ModalController) { 

  }

  ngOnInit() {
    // this.templateFormService.getTemplateForms().subscribe(data => {
    //   this.templates = data;
    // });

    this.templateFormService.getRecentTemplateForm().subscribe(data => {
      this.template = data;
    });

  }
  dismissModal(){
    this.modalController.dismiss();
  }
  CreatePopover()
  {
    this.popoverController.create({component:PopoverQuestionSelectorComponent,
    componentProps: { template: this.template }, translucent: true}).then((popoverElement)=>
      {
        popoverElement.present();
      })
  }

  deleteQuestion(question: IQuestion){
    let questions = this.template.templateForm.questions;
    let newQuestions = questions.filter(function(q) {
      return q !== question;
    });
    this.template.templateForm.questions = newQuestions;
  }
  onHold(){
    alert('test');
  }
saveTemplate(template: Template){
  // if(template.templateName){
  //   //error if not unique
  // }
  this.templateFormService.addOrUpdate(template);
  this.templateFormService.setRecentTemplateForm(template);
  this.modalController.dismiss();

}
  isPhone(obj): boolean{
    return obj instanceof QuestionPhone;
  }
  isCheckBox(obj): boolean{
    return obj instanceof QuestionCheckboxGroup;
  }
  isRadioGroup(obj): boolean{
    return obj instanceof QuestionRadioGroup;
  }
}


@Component({
  selector: 'app-popover-question-selector',
  template: `<ion-list>
  <ion-list-header>Answer type</ion-list-header>
  <ion-item button (click)="addRadioButtonAnswer()">Add radio button</ion-item>
  <ion-item button (click)="addCheckboxAnswer()">Add checkbox</ion-item>
  <ion-item button (click)="addTextAnswer()">Add text</ion-item>
  <ion-item button (click)="addPhoneAnswer()">Add phone text</ion-item>
</ion-list>`,
  styles: [],
})
export class PopoverQuestionSelectorComponent implements OnInit {
  @Input('template') public template: Template;
  ngOnInit() {
  }
  addTextAnswer(): void{
    var q3 = new QuestionText();
    q3.questionText = new DisplayText('Zmien pytanie','Edit quetion');
    q3.answerText = '';
    this.template.templateForm.questions.push(q3);
  }
  addPhoneAnswer():void{
    var q3 = new QuestionPhone();
    q3.questionText = new DisplayText('Zmien pytanie','Edit quetion');
    q3.answerText = '';
    this.template.templateForm.questions.push(q3);
  }
  addRadioButtonAnswer() : void{
    var q3 = new QuestionRadioGroup();
    q3.questionText = new DisplayText('Zmien pytanie','Edit quetion');
    q3.radiogroup.push(new Answer('tak'));
    q3.radiogroup.push(new Answer('nie'));
    
    this.template.templateForm.questions.push(q3);
  }
  addCheckboxAnswer(): void{
    var q3 = new QuestionCheckboxGroup();
    q3.questionText = new DisplayText('Zmien pytanie','Edit quetion');
    q3.checkboxes.push(new Answer('tak'));
    q3.checkboxes.push(new Answer('nie'));
    q3.checkboxes.push(new Answer('do not know'));

    this.template.templateForm.questions.push(q3);

  }
}