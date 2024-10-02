import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBlurText]',
  standalone: true,
})
export class BlurTextDirective {
  @Input() range: 'full' | 'half' = 'full';

  constructor(private el: ElementRef) {
    
  }

  ngAfterViewInit() {
    this.blurText();
  }

  private blurText() {
    const text = this.el.nativeElement.textContent;
    let blurredText: string;

    switch (this.range) {
      case 'full':
        blurredText = text.replace(/\S/g, '●');
        break;
      case 'half':
        blurredText = this.replaceAllButFirstChar(text)
        break;
      default:
        throw new Error('Invalid range value for appBlurText directive');
    }
    console.log(blurredText);
    this.el.nativeElement.textContent = blurredText;
  }

  replaceAllButFirstChar(str:string, replacementChar = '●') {
    // Split the string into words while preserving spaces
    let words = str.split(/(\s+)/);
    
    // Process each word
    let result = words.map(word => {
      if (word.trim() === '') {
        // If the word is just whitespace, return it as is
        return word;
      } else {
        // Replace all but the first character of the word
        return word[0] + replacementChar.repeat(word.length - 1);
      }
    });
    
    // Join the words back into a single string
    return result.join('');
  }
}
