import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DefineFormComponent } from '../define-form/define-form.component';
import { CreateForm } from '../shared/create-form.class';
import { FormStorageService } from '../shared/form-storage.service';
import { TemplateFormService } from '../shared/template-form.service';
import { Template } from '../shared/template.class';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  protected templates : Template[];

  constructor(public modalController: ModalController, private router: Router, 
    private templateFormService: TemplateFormService, private formStorage: FormStorageService) {}

  ngOnInit() {
    this.templateFormService.getTemplateForms().subscribe(data => {
      this.templates = data;
    });
  }

  async defineFormTemplate() {
    this.templateFormService.generateNewTemplate();

    const modal = await this.modalController.create({
      component: DefineFormComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  startForm(tmp: Template){
    this.formStorage.generateNewForm(tmp);
    this.router.navigate(['/form']);
  }
  delete(tmp: Template){
    this.templateFormService.delete(tmp);

  }
  async edit(tmp: Template){
    this.templateFormService.setRecentTemplateForm(tmp);
    const modal = await this.modalController.create({
      component: DefineFormComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();

  }

 
}
