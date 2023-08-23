import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormResultComponent } from '../form-result/form-result.component';
import { CreateForm } from '../shared/create-form.class';
import { FormStorageService } from '../shared/form-storage.service';
import { TemplateGroup } from '../shared/template-group';
import { Template } from '../shared/template.class';
import { SurveyFormComponent } from '../survey-form/survey-form.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  formsGrouped: Array<TemplateGroup>;

  constructor(public modalController: ModalController, private formStorage: FormStorageService) {}
  clear(){
    this.formStorage.clear();
  }
  ngOnInit() {
    this.formStorage.getForms().subscribe(data => {
      
      let tmpFormsGroups: Array<TemplateGroup> = new Array<TemplateGroup>();

      data.forEach(function (t) {
          let exists = tmpFormsGroups.find(g => g.templateId == t.templateId);
          if(exists == null){
            let tmpForms = new TemplateGroup(t.templateId, t.templateName);
            tmpForms.forms.push(t);
            tmpFormsGroups.push(tmpForms);

          } else{
            exists.forms.push(t);
          }
      });


      this.formsGrouped = tmpFormsGroups;
    })
  }
  async viewForm(tmp: TemplateGroup){
    const modal = await this.modalController.create({
      component: FormResultComponent,
      componentProps: { 
        templateGroup: tmp
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
