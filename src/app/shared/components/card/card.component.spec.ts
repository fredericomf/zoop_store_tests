import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { Product } from '../../../types/product.inteface';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product in template', () => {

    const product: Product = {
      id: 1,
      title: 'IPhone 15',
      price: '1000',
      category: 'eletrônico',
      description: 'Smart Phone',
      image: 'src/assets/image.png'
    }

    // Passa para o componente o Mock do Product
    component.product = product;

    // Preciso fazer isso para que o componente seja atualizado com os novos valores fornecidos pelo Mock
    fixture.detectChanges();

    const productImg = fixture.debugElement.query(By.css('img')).nativeElement;
    const productTitle = fixture.debugElement.query(By.css('h2')).nativeElement;
    const productDescription = fixture.debugElement.query(By.css('p')).nativeElement;
    const productPrice = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(productImg.src).toContain(product.image);
    expect(productTitle.textContent).toContain(product.title);
    expect(productDescription.textContent).toContain(product.description);
    expect(productPrice.textContent).toContain(product.price);
  });

  it('should call onDelete event when delete is clicked', () => {
    const product: Product = {
      id: 2,
      title: 'Samsung S22',
      price: '950',
      category: 'eletrônico',
      description: 'Smart Phone',
      image: 'src/assets/image.png'
    }

    component.product = product;

    // Preciso fazer isso para que o componente seja atualizado com os novos valores fornecidos pelo Mock
    fixture.detectChanges();

    const spy = spyOn(component.onDelete, 'emit');

    component.isManagable = true;
    fixture.detectChanges();

    const manageableElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(manageableElement).not.toBeNull();

    component.onDeleteClick();
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call onEdit event when edit is clicked', () => {
    const product: Product = {
      id: 2,
      title: 'Samsung S22',
      price: '950',
      category: 'eletrônico',
      description: 'Smart Phone',
      image: 'src/assets/image.png'
    }

    component.product = product;

    // Preciso fazer isso para que o componente seja atualizado com os novos valores fornecidos pelo Mock
    fixture.detectChanges();

    const spy = spyOn(component.onEdit, 'emit');

    component.isManagable = true;
    fixture.detectChanges();

    const manageableElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(manageableElement).not.toBeNull();

    component.onEditClick();
    expect(spy).toHaveBeenCalledWith(product);
  });

});
