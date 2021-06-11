import { Component, OnInit } from '@angular/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus'
import { TuiDialogService } from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChooseItemDialogComponent } from '../components/choose-item-dialog/choose-item-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html', 
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dialogService: TuiDialogService,  private auth: AuthService) {}

  ngOnInit() {
    this.auth.userID.next(localStorage.getItem('uid'))    
  }
 
  logOut() {
    this.auth.signOut()
  }

  openDialog() {
    this.dialogService.open(
      new PolymorpheusComponent(ChooseItemDialogComponent), {
        size: 's'
      }
    ).subscribe()
  }
}