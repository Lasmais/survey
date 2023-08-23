import { ReturnStatement } from '@angular/compiler';
import { QuestionCheckboxGroup } from './create-form.class';

export interface ISerializable<T> {
    fromJSON(): T;
}

interface NoParamConstructor<T> {
    new (): T;
}