import { Template } from './template.class';

export class TemplateGroup {
    templateId: string;
    templateName: string;
    forms: Template[];
    constructor(templateId: string, templateName: string){
      this.templateId = templateId;
      this.templateName = templateName;
      this.forms = new Array<Template>();
    }

    getColumn(id: number) : Array<string>{
        let temp :Array<string> = new Array<string>();

        for (let i = 0; i < this.forms.length; i++) {
            let question = this.forms[i].templateForm.questions[id];
        }

        return temp;
    }
  }