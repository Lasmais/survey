import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateForm, QuestionCheckboxGroup, QuestionPhone, QuestionRadioGroup } from '../shared/create-form.class';
import { FormStorageService } from '../shared/form-storage.service';
import { Template } from '../shared/template.class';
import { SurveyFormComponent } from '../survey-form/survey-form.component';
import { DisplayText } from '../shared/display-text';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  latestTemplateForms: Template[];

  constructor(public modalController: ModalController, private formStorage: FormStorageService) {
  }

  ngOnInit() {
    this.formStorage.getForms().subscribe(data => {
      data.forEach(element => {
        element.templateForm.questions.forEach(element2 => {
          element2.questionText = new DisplayText(element2.questionText.textPolish, element2.questionText.textEnglish);
        });
      });
      this.latestTemplateForms = data.slice(Math.max(data.length - 10, 0)).reverse();
  });
  }

  async viewForm(tmp: Template){
    this.formStorage.setRecentForm(tmp);
    const modal = await this.modalController.create({
      component: SurveyFormComponent,
      cssClass: 'my-custom-class',
      componentProps: { 
        hasCloseButton: true
      }
    });
    return await modal.present();
  }

}
