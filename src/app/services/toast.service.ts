import { Injectable } from '@angular/core';

declare var Materialize: any;

@Injectable()
export class ToastService {

  constructor() {
  }

  toast(text: string, cb?) {
    Materialize.toast(text, 1500, '', cb);
  }

  warningToast(text: string, cb?) {
    Materialize.toast(text, 1500, '#f7b239', cb);
  }

  successToast(text: string, cb?) {
    Materialize.toast(text, 15000, '#9ad14b', cb);
  }

  errorToast(text: string, cb?) {
    Materialize.toast(text, 1500, '#e53935', cb);
  }
}
