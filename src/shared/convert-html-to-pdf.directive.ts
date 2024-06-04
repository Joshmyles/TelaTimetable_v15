import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Directive({
  selector: '[appConvertHtmlToPdf]',
})
export class ConvertHtmlToPdfDirective {
  @Input() filename: string = '';
  @Input() htmlContainerId: string = '';

  constructor(private elementRef: ElementRef) {}

  @HostListener('click')
  onClick() {
    this.convetHtmlToPDF(this.htmlContainerId, this.filename);
  }

  public convetHtmlToPDF(id: string, filename: string) {
    let page = document.getElementById(id);
    console.log(id, ' file ', filename);
    html2canvas(page as HTMLElement).then((canvas) => {
      // Few necessary setting options
      let imgWidth = 208;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`${filename}.pdf`); // Generated PDF
    });
  }
}
