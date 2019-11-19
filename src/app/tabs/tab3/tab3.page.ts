import { Component } from '@angular/core';
import { UserData } from '../../providers/user-data';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userIndex = 0;
  queryText = '';
  segment = 'all';
  groups: any = [];
  shownSessions: any = [];

  constructor(
    public userData: UserData
  ) {}

  ngOnInit(){
    this.update();
  }
  update(){
    this.userData.getInfo(this.userIndex , this.queryText, this.segment).subscribe((data:any)=>{
      this.shownSessions = data.shownSessions;
      console.log(this.shownSessions);
      this.groups = data.groups;
    });
  }

}
