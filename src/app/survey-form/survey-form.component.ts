import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormStorageService } from '../shared/form-storage.service';
import * as _ from 'lodash';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';  
import { Router } from '@angular/router';
import { CreateForm, QuestionPhone, QuestionCheckboxGroup, QuestionRadioGroup, ResultData, QuestionNumber } from '../shared/create-form.class';
import { Template } from '../shared/template.class';
import { Subscription } from 'rxjs';
import { LanguageEnum } from '../shared/Language.enum';
import { DisplayText } from '../shared/display-text';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
})
export class SurveyFormComponent implements OnInit, OnDestroy {

 @Input('surverForm') public surverForm: Template;
 @Input('hasCloseButton') public hasCloseButton: boolean;
 paramsSub: Subscription;
 selectedLanague : any;
  constructor(public modalController: ModalController, public loadingController: LoadingController, 
    private router: Router, private formStorage: FormStorageService, public alertCtrl: AlertController) { 

       this.surverForm = new Template("temp", new CreateForm());
 
  }
  onChangedLanague(event){
    if(event.detail.value == 'pl'){
      this.surverForm.templateForm.language = LanguageEnum.Polski;
    } else{
      this.surverForm.templateForm.language = LanguageEnum.English;
    }
  }
  isNumber(obj): boolean{
    return obj instanceof QuestionNumber;
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

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '',
      message: '<strong>Want to finish?</strong>',
      buttons: [
        {
          text: 'Nie',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Tak',
           handler: async () => {

            const loading = await this.loadingController.create({
              cssClass: 'my-custom-class',
              message: 'Thank You!',
              duration: 10000
            });
             await loading.present();
            // //await loading.dismiss();
             const { role, data } = await loading.onDidDismiss();
            this.router.navigate(['/tabs/tab1']) 
          }
        }
      ]
    });

    await alert.present();
  }
  
  isValid(surverForm: Template): ResultData {
    let requiredQuestions = surverForm.templateForm.questions.filter(q => q.isRequired == true);
    for(let required of requiredQuestions){
      let result = required.isValid();
      if(!result.isValid){
        return result;
      }
    }
    return new ResultData(true);
  }
  async sendForm() {
    let result = this.isValid(this.surverForm);
    if(!result.isValid){
      alert(result.message);
      return;
    }    
    this.formStorage.addForm(this.surverForm);

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Thank you!',
      duration: 10000
    });
     await loading.present();
     const { role, data } = await loading.onDidDismiss();
    this.router.navigate(['/tabs/tab1']) 

  }

  dismissModal(){
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.paramsSub = this.formStorage.getRecentForm().subscribe(data => {
      
      data.templateForm.questions.forEach(element => {
        element.questionText = new DisplayText(element.questionText.textPolish, element.questionText.textEnglish);
      });
      data.templateForm.language = LanguageEnum.Polski;
      this.surverForm = data;
    });
  }
  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    }
}


