import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule],
  exports: [MatIconModule],
})
export class IconsModule {
  constructor(
    private _domSanitizer: DomSanitizer,
    private _matIconRegistry: MatIconRegistry
  ) {

    // Register icon sets
    this._matIconRegistry.addSvgIconSet(
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/material-twotone.sv'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'mat_outline',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/material-outline.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'mat_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/material-solid.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'feather',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/feather.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_outline',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/heroicons-outline.svg'
      )
    );
    this._matIconRegistry.addSvgIconSetInNamespace(
      'heroicons_solid',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'icons/heroicons-solid.svg'
      )
    );
  }
}
