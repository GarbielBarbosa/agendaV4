import { Component } from '@angular/core';
import { DatabaseService } from '../services/database/database.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private databaseService: DatabaseService,
    public domSanitizer: DomSanitizer
  ) {
    this.databaseService.getRows();
  }

  display(photo: string) {
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + photo);
  }

  public ionInput(search): void {
    if (search == '') {
      this.databaseService.getRows();
    } else {
      this.databaseService.searchContatos(search);
    }
  }

}
