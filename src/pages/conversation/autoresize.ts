import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: 'ion-textarea[autoresize]' // Attribute selector
})
export class Autoresize{
    @HostListener('keyup', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }
    @HostListener('focus', ['$event.target'])
    onFocus(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }
    constructor(public element: ElementRef) {
    }
    ngOnInit(): void {
        this.adjust();
    }
    
    public adjust(): void {
        let ta = this.element.nativeElement.querySelector('textarea');
        if (ta) {
            if (ta.value.length > 25) {
                ta.style.overflow = 'hidden';
                ta.style.height = 'auto';
                ta.style.height = ta.scrollHeight + 'px';
            } else {
                ta.style.height = '20px';
            }
        }
    }
}