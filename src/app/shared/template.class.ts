//import { TemplateAst } from '@angular/compiler';
import { CreateForm } from './create-form.class';
import { ISerializable } from './iserializable';

export class Template implements ISerializable<Template>
{
    fromJSON(): Template {
        let tmp : Template = Object.assign(new Template('', new CreateForm()), this);
        let form : CreateForm = Object.assign(new CreateForm(), this.templateForm);

        tmp.templateForm = form.fromJSON();
        return tmp;
    }
    constructor(templateName:string, templateForm: CreateForm){
        this.templateForm = templateForm;
        this.templateName = templateName;
        this.templateId = '';
    }

    templateId: string;
    templateName: string;
    templateForm: CreateForm;
}