import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CreateProductApiService } from './services/create-product-api.service';
import { useAnimation } from '@angular/animations';
import { CreateProductService } from './services/create-product.service';
import { Product } from '../../../types/product.inteface';
import { BASE64_IMAGE } from '../../../shared/mocks/base64-image-mock';

const productMock: Product = {
  id: 1,
  title: 'Produto',
  description: 'Descrição',
  category: 'Categoria',
  price: '10',
  image: BASE64_IMAGE,
}

const dialogRefMock = {
  close: jasmine.createSpy('close')
}

class MockCreateProductService {
  getAllCategories() {
    return of(['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing']);
  }
}

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let createProductService: CreateProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        HttpClientTestingModule,
        CreateProductComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        CreateProductService,
        CreateProductApiService,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: productMock },
      ]
    }).compileComponents();

    TestBed.overrideComponent(CreateProductComponent, {
      set: {
        providers: [
          { provide: CreateProductApiService, useClass: MockCreateProductService }
        ]
      }
    });

    createProductService = TestBed.inject(CreateProductService);

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list categories', () => {

    const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

    component.categories$.subscribe((remoteCategories) => {
      expect(categories).toEqual(remoteCategories);
    });

  });

  it('should check if form is filled with product data', () => {
    expect(component.formGroup.get('id')?.value).toEqual(productMock.id);
    expect(component.formGroup.get('title')?.value).toEqual(productMock.title);
    expect(component.formGroup.get('description')?.value).toEqual(productMock.description);
    expect(component.formGroup.get('category')?.value).toEqual(productMock.category);
    expect(component.formGroup.get('price')?.value).toEqual(productMock.price);
  });

  it('should call close method when cancel button is clicked', () => {
    component.onCancelClick();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should call CreateProductService.save method when submit form', () => {
    spyOn(createProductService, 'save').and.returnValue(Promise.resolve());

    const myEvent = {
      target: {
        files: [new File([''], 'imagem.jpeg', { type: 'image/jpeg' })]
      }
    }

    component.onImageSelected(myEvent);

    component.onSubmitForm();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(createProductService.save).toHaveBeenCalled();
    });
  });
});
