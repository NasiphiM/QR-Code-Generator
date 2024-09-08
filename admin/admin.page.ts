import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels, QrcodeComponent} from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  text: string = '';
  codes: string[] = [];
  errorCorrectionLevel: NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels.HIGH;
  @ViewChild('qrGrid', {static: true}) qrGrid : HTMLElement;
  protected readonly NgxQrcodeElementTypes = NgxQrcodeElementTypes;
  protected readonly NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels;
  printing: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  downloadImage(data, filename = 'untitled.jpeg') {
    let a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }



  onClick_CreateQRCodes() {
    this.codes =
      this.text.trim().split('\n').map(text => text.trim()).filter((line) => line.length > 0);
  }

  qrCode_onClick(qrCode: QrcodeComponent, qrText: string) {
    // @ts-ignore
    qrCode.toDataURL().then((url: string) => {
      this.downloadImage(url, qrText + '.png');
    });
  }

  onClick_Print() {
    this.printing = true;

    setTimeout(() => {
      window.print();
      this.printing = false;

    }, 100);

  }
}
