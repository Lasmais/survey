import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CreateForm } from '../shared/create-form.class';

import { FormQuestionsComponent } from './form-questions.component';

describe('FormQuestionsComponent', () => {
  let component: FormQuestionsComponent;
  let fixture: ComponentFixture<FormQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuestionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormQuestionsComponent);
    component = fixture.componentInstance;
    component.form = new CreateForm();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
