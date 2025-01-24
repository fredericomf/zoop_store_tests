import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageProductsComponent } from './manage-products.component';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, of } from 'rxjs';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../../shared/services/products/products.service';
import { ProductsApiService } from '../../shared/services/products/products-api.service';
import { StorageService } from '../../shared/services/storage/storage.service';
import { Product } from '../../types/product.inteface';

const productsMock = [
  { id: 1, title: 'Produto A', category: 'eletronic', description: 'Product A', price: 50, image: 'image.png' },
  { id: 2, title: 'Produto B', category: `woman's clothes`, description: 'Product B', price: 80, image: 'image.png' }
];

const data = productsMock
const storageServiceMock = {

  getAll: function (): any {
    return Object.values(data);
  },
  setValue: function (key: any, value: any) {
    data[key] = value;
  },
  remove: function (key: any) {
    delete data[key];
  }
};

describe('ManageProductsComponent', () => {
  let dialog: MatDialog;
  let component: ManageProductsComponent;
  let fixture: ComponentFixture<ManageProductsComponent>;
  let productsService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BannerComponent,
        SearchComponent,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [ManageProductsComponent],
      providers: [
        MatDialog,
        ProductsService,
        ProductsApiService,
        { provide: StorageService, useValue: storageServiceMock }
      ]
    }).compileComponents();

    dialog = TestBed.inject(MatDialog);
    productsService = TestBed.inject(ProductsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open the product creation dialog when calling onSubscribeProduct', () => {
    component.onSubscribeProduct();

    spyOn(component.dialogRef as any, 'afterClosed').and.returnValue(of({}))

    component.dialogRef.close();

    expect(component.products()).not.toBeNull();
  });

  it('should delete the product when calling onDelete', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockProduct: Product = { id: 1, title: 'Produto A', category: 'eletronic', description: 'Product A', price: '50', image: 'image.png' };

    component.onDelete(mockProduct);

    expect(component.products()).not.toBeNull();
    expect(component.products().length).toEqual(1);
  });

  it('should update the list of products when calling onSearchText', () => {
    const searchText = 'A';
    component.onSearchText(searchText);

    expect(component.products()).not.toBeNull();
    expect(component.products()[0].title).toEqual('Produto A');
  });

  it('should maintain the list of products when the searchText is empty', () => {
    const searchText = '';
    component.onSearchText(searchText);

    expect(component.products()).not.toBeNull();
    expect(component.products().length).toBeGreaterThanOrEqual(1);
  });

  it('should open the product edition dialog when calling onEdit', () => {
    const mockProduct: Product = { id: 1, title: 'Produto Teste', category: 'Teste', description: 'Teste', price: '10', image: 'image.png' };
    component.onEdit(mockProduct);

    spyOn(component.dialogRef as any, 'afterClosed').and.returnValue(of({}));

    component.dialogRef.close();

    expect(component.products()).not.toBeNull();
  });
});