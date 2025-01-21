import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header in template', () => {
    const headerImg = fixture.debugElement.query(By.css('img')).nativeElement;
    const headerProductsLink = fixture.debugElement.query(By.css('a[href="/"]')).nativeElement;
    const headerToManageLink = fixture.debugElement.query(By.css('a[href="/gerenciar"]')).nativeElement;



    expect(headerImg.src).toContain('assets/images/zoop-store.svg');
    expect(headerProductsLink).not.toBeNull();
    expect(headerProductsLink.textContent).toContain('Produto');
    expect(headerToManageLink).not.toBeNull();
    expect(headerToManageLink.textContent).toContain('Gerenciar');
  });
});
