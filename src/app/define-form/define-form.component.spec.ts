import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CreateForm } from '../shared/create-form.class';
import { TemplateFormService } from '../shared/template-form.service';
import { Template } from '../shared/template.class';
import { Observable, of } from 'rxjs';

import { DefineFormComponent } from './define-form.component';

describe('DefineFormComponent', () => {
  let component: DefineFormComponent;
  let template: Template;
  let h1: HTMLElement;

  let fixture: ComponentFixture<DefineFormComponent>;
//public popoverController: PopoverController, private templateFormService: TemplateFormService
  beforeEach(async(() => {
    const templateFormService = jasmine.createSpyObj('TemplateFormService', ['getRecentTemplateForm']);

    TestBed.configureTestingModule({
      declarations: [ DefineFormComponent ],
      imports: [IonicModule.forRoot()],
      providers: [ { provide: TemplateFormService, useValue: templateFormService } ],
    }).compileComponents();

    template = new Template('template', new CreateForm());
    templateFormService.getRecentTemplateForm = jasmine.createSpy().and.returnValue(of(template));

    fixture = TestBed.createComponent(DefineFormComponent);
    h1 = fixture.nativeElement.querySelector('ion-title');

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set template name', () => {
    expect(h1.textContent).toContain('Create form ' + component.template.templateName);
  });
  
  it('should intialize data', () => {
    
    let templateFormService = TestBed.inject(TemplateFormService);
    templateFormService.getRecentTemplateForm().subscribe(data => {
        data.templateName = 'test';
    });
  //  template.templateName = 'test';
    expect(component.template.templateName).toBe('test');
  });

});
