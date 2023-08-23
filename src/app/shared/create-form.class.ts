import { queueScheduler } from 'rxjs';
import { ISerializable } from './iserializable';
import { Template } from './template.class';
import { LanguageEnum } from './Language.enum';
import { Observable, of } from 'rxjs';
import { DisplayText } from './display-text';

export class CreateForm implements ISerializable<CreateForm>
{
  language: LanguageEnum;
  formId: string;
  title: string;
  questions: Array<IQuestion> = new Array<IQuestion>();

  fromJSON(): CreateForm {
    var form = Object.assign(new CreateForm(), this);
    for (let i = 0; i < this.questions.length; i++) {
      switch(form.questions[i].type){
        case "QuestionCheckboxGroup":
          form.questions[i] = Object.assign(new QuestionCheckboxGroup(), form.questions[i]);
          break;
        case "QuestionRadioGroup":
          form.questions[i] = Object.assign(new QuestionRadioGroup(), form.questions[i]);
          break;
        case "QuestionPhone":
          form.questions[i] = Object.assign(new QuestionPhone(), form.questions[i]);
          break;
        case "QuestionText":
          form.questions[i] = Object.assign(new QuestionText(), form.questions[i]);
          break;
          case "QuestionNumber":
            form.questions[i] = Object.assign(new QuestionNumber(), form.questions[i]);
            break;
        default:
          break;
      }
    }
    return form;
  }
  public CreateQuestionRadioGroup(quesiton: DisplayText, answer1: DisplayText = new DisplayText('tak','yes'), answer2: DisplayText = new DisplayText('nie','no')): QuestionRadioGroup {
    var q0 = new QuestionRadioGroup();
    q0.isRequired = false;
    q0.questionText = quesiton;
    q0.radiogroup.push(new Answer(answer1.textPolish, answer1.textEnglish));
    q0.radiogroup.push(new Answer(answer2.textPolish, answer2.textEnglish));
    return q0;
  }
  public CreateQuestionRadioGroupRating(quesiton: DisplayText,... answers: DisplayText[]): QuestionRadioGroup {
    var q0 = new QuestionRadioGroup();
    q0.isRequired = false;
    q0.questionText = quesiton;
    for (var i = 0; i < answers.length; i++) {  
        q0.radiogroup.push(new Answer(answers[i].textPolish,answers[i].textEnglish));
    }
    if(answers.length == 0){
      for(var i = 0; i < 5; i++){
        q0.radiogroup.push(new Answer((5-i).toString()));
      }
    }
    return q0;
  }
  public CreateNumber(quesiton: DisplayText, length: number, isRequired: boolean): QuestionNumber{
    var q01 = new QuestionNumber();
    q01.isRequired = isRequired;
    q01.questionText = quesiton;
    q01.lenght = length;
    q01.errorMessage = 'Fill required fields!';

    return q01;
  }
  public CreateQuestionText(quesiton: DisplayText, isRequired: boolean): QuestionText {
    var q01 = new QuestionText();
    q01.isRequired = isRequired;
    q01.questionText = quesiton;
    q01.errorMessage = 'Fill required fields!';
    return q01;
  }
  public CreateQuestionCheckBoxGroup(quesiton: DisplayText,... answers: DisplayText[]): QuestionCheckboxGroup {
    var q01 = new QuestionCheckboxGroup();
    q01.isRequired = false;
    q01.questionText = quesiton;
    for (var i = 0; i < answers.length; i++) {  
        q01.checkboxes.push(new Answer(answers[i].textPolish, answers[i].textEnglish));
    }
    return q01;
  }
 
  constructor(){

    }
  public CreateSampleForm2(): Observable<CreateForm> {
      var form = new CreateForm();
    
    form.title = 'Test 2';
    form.language = LanguageEnum.English;
    form.questions.push(this.CreateQuestionCheckBoxGroup(new DisplayText('Test1','Test1 2'),new DisplayText('test1','test1 2'),new DisplayText('test2','test2 2'),new DisplayText('test3','test3 2'),new DisplayText('test4','test4 2')));
    form.questions.push(this.CreateQuestionRadioGroupRating(new DisplayText('Test2','Test2 2'),new DisplayText('test1','test1 2'),new DisplayText('test2','test22 2'),new DisplayText('test5','test5 2')));
    form.questions.push(this.CreateQuestionRadioGroup(new DisplayText('test3?','test3 2?')));
    form.questions.push(this.CreateQuestionText(new DisplayText('test4','test4 2'), true));
    form.questions.push(this.CreateNumber(new DisplayText('test5','test5 2'),4, true));


    var q10 = new QuestionRadioGroup();
    q10.errorMessage = 'Fill required fields!';
    q10.isRequired = true;
    q10.hasRequiredAnswer = true;
    q10.requiredAnswer = 'yes';
    q10.requiredAnswerErrorMessage = 'Fill field!'
    q10.questionText = new DisplayText('Required test1','test test1 2');
    q10.radiogroup.push(new Answer('tak','yes'));
    q10.radiogroup.push(new Answer('nie','no'));
    return of(form);
  }
}


export class ResultData {
  constructor(isValid: boolean){
    this.isValid = isValid;
  }
  isValid: boolean;
  message: string;
}
export interface IQuestion {
    questionText: DisplayText;
    answerText: string;
    type: string;
    isRequired: boolean;
    isValid(): ResultData;
  
}
export class QuestionBase implements IQuestion{
  constructor(){
    this.answerText = '';
    this.isRequired = false;
    this.hasRequiredAnswer = false;
  }
  public questionText: DisplayText;
  public answerText: string;
  public type: string;
  public isRequired: boolean;
  isValid(): ResultData {
    let result = new ResultData(true);
    if(this.isRequired == true){
      if(this.answerText == undefined || this.answerText == null || this.answerText == ''){
        result.isValid = false;
        result.message = this.errorMessage;
        return result;
      }
    }
    if(this.hasRequiredAnswer){
      if(this.requiredAnswer != this.answerText){
       result.isValid = false;
       result.message = this.requiredAnswerErrorMessage;
       return result;
     }
    }
    return result;
  }
  errorMessage: string;
  hasRequiredAnswer: boolean;
  requiredAnswer: string;
  requiredAnswerErrorMessage: string;

}
export class QuestionText extends QuestionBase {
  override type: string = 'QuestionText';
}
export class QuestionNumber extends QuestionBase {
  override type = 'QuestionNumber'
  lenght: number;
  override isValid(): ResultData {
    let result = new ResultData(true);

    if(this.isRequired == true){
        if(this.answerText?.length > 0){
          result.isValid = true;
        }else{
          result.isValid = false;
          result.message = this.errorMessage;
        }
    }
    return result;
  }
}
export class QuestionPhone extends QuestionBase {
  override type = 'QuestionPhone'
  extension : string;
}
export class QuestionMail extends QuestionText {
  override type = 'QuestionMail'
}
export class QuestionRadioGroup extends QuestionBase {
    radiogroup: Array<Answer> = new Array<Answer>();
    override type: string = 'QuestionRadioGroup';
}
export class QuestionCheckboxGroup extends QuestionBase {
  override isValid(): ResultData {
    let result = new ResultData(true);

    if(this.isRequired == true){
        let selectedAnser = this.checkboxes.filter(q => q.isChecked == true);
        if(selectedAnser.length == 0){
          result.isValid = false;
          result.message = this.errorMessage;
        }
    }
    return result;
  }
    checkboxes: Array<Answer> = new Array<Answer>();
    override type: string = 'QuestionCheckboxGroup';
    updateAnswer(){
      this.answerText = '';
      for(let i = 0; i < this.checkboxes.length; i++){
        if(this.checkboxes[i].isChecked){
          this.answerText += this.checkboxes[i].answerText.displayText(LanguageEnum.Polski);
          this.answerText += '&';
        }
      }
    }
}
export class Answer {
  constructor(answerText: string, answerEnglishText: string = null){
    this.answerText = new DisplayText(answerText, answerEnglishText);
    this.isChecked = false;
  }
  answerText: DisplayText;
  isChecked: boolean;
}
export class QuestionHelper
{
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