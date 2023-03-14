import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YandexMapsComponent } from './yandex-maps.component';

describe('YandexMapsComponent', () => {
  let component: YandexMapsComponent;
  let fixture: ComponentFixture<YandexMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YandexMapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YandexMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
