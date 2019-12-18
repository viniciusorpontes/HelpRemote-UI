import { TicketService } from './../../services/ticket.service';
import { Ticket } from './../../model/ticket.model';
import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  ticket = new Ticket('',0,'','','','',null,null,'',null);
  shared : SharedService;
  message : {};
  classCss : {};

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id:string){
    console.log('id --> ',id);
    this.ticketService.findById(id).subscribe((responseApi:ResponseApi) => {
      console.log('responseApi -->  ',responseApi);
      this.ticket = responseApi.data;
      this.ticket.data = new Date(this.ticket.data).toISOString();
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }
 
  register(){
    this.message = {};
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi:ResponseApi) => {
        this.ticket = new Ticket('',0,'','','','',null,null,'',null);
        let ticket : Ticket = responseApi.data;
        this.form.resetForm();
        this.showMessage({
          type: 'success',
          text: `Registered ${ticket.titulo} successfully`
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
      this.message = message;
      this.buildClasses(message.type);
      setTimeout(() => {
        this.message = undefined;
      }, 3000);
  }

  private buildClasses(type: string): void {
     this.classCss = {
       'alert': true
     }
     this.classCss['alert-'+type] =  true;
  }

  changeStatus(status:string): void{
    this.ticketService.changeStatus(status,this.ticket).subscribe((responseApi:ResponseApi) => {
        this.ticket = responseApi.data;
        this.ticket.data = new Date(this.ticket.data).toISOString();
        this.showMessage({
          type: 'success',
          text: 'Successfully changed status'
        });
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }
}

