import { Injectable } from '@angular/core';
import { Pro } from '../../../node_modules/@ionic/pro';
import { App } from "ionic-angular";
import { PAGES } from '../../pages/pages';


@Injectable()
export class ProUpdateProvider {
  public message: string
  public progress: number;

  public constructor(private app: App) {
    this.progress = 0;
  }

  public async update(): Promise<any> {
    let nav = this.app.getActiveNav();
    const update = await Pro.deploy.checkForUpdate();

    if(update.available) {
      nav.setRoot(PAGES.UPDATE);
      this.message = "Actualizando aplicación";
      await Pro.deploy.downloadUpdate((progress: number) => {
        this.progress += progress;
      });
      this.progress = 0;
      this.message = "Aplicando actualización";
      await Pro.deploy.extractUpdate((progress) => {
        this.progress += progress
      })
      this.progress = 0;
      await Pro.deploy.reloadApp();
    } else {
      nav.setRoot(PAGES.HOME);
    }
  }


}
