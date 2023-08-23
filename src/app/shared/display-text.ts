import { LanguageEnum } from "./Language.enum";

export class DisplayText {
    constructor(textPolish: string, textEnglish: string){
        this.textPolish = textPolish;
        this.textEnglish = textEnglish;
    }
    public textPolish : string;
    public textEnglish : string;
    public setText(language: LanguageEnum, text: string) {
        if(language === LanguageEnum.Polski){
            this.textPolish = text;
        } else{
            this.textEnglish = text;
        }
    }
    public displayText(language: LanguageEnum): string {
        if(language === LanguageEnum.Polski){
            return this.textPolish;
        } else{
            return this.textEnglish;
        }
    }
}