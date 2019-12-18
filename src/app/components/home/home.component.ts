import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/model/summary.model';
import { TicketService } from 'src/app/services/ticket.service';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  summary: Summary = new Summary();
  message: {};
  classCss: {};
  data: any;
  images: any[];

  constructor(
    private ticketService: TicketService
  ) {

  }

  ngOnInit() {
    this.carregaSumario();
    this.galeria();
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = "";
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

  private carregaSumario(){
    this.ticketService.summary().subscribe((responseApi: ResponseApi) => {
      this.summary = responseApi.data;
      this.grafico();
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private galeria() {
    this.images = [];
        this.images.push({source:'assets/galleria/galleria1.jpg', alt:'Descrição do anúncio 1', title:'Anúncio 1'});
        this.images.push({source:'assets/galleria/galleria2.jpg', alt:'Descrição do anúncio 2', title:'Anúncio 2'});
        this.images.push({source:'assets/galleria/galleria3.jpg', alt:'Descrição do anúncio 3', title:'Anúncio 3'});
        this.images.push({source:'assets/galleria/galleria4.jpg', alt:'Descrição do anúncio 4', title:'Anúncio 4'});
        this.images.push({source:'assets/galleria/galleria5.jpg', alt:'Descrição do anúncio 5', title:'Anúncio 5'});
        this.images.push({source:'assets/galleria/galleria6.jpg', alt:'Descrição do anúncio 6', title:'Anúncio 6'});
        this.images.push({source:'assets/galleria/galleria7.jpg', alt:'Descrição do anúncio 7', title:'Anúncio 7'});
        this.images.push({source:'assets/galleria/galleria8.jpg', alt:'Descrição do anúncio 8', title:'Anúncio 8'});
        this.images.push({source:'assets/galleria/galleria9.jpg', alt:'Descrição do anúncio 9', title:'Anúncio 9'});
        this.images.push({source:'assets/galleria/galleria10.jpg', alt:'Descrição do anúncio 10', title:'Anúncio 10'});
        this.images.push({source:'assets/galleria/galleria11.jpg', alt:'Descrição do anúncio 11', title:'Anúncio 11'});
        this.images.push({source:'assets/galleria/galleria12.jpg', alt:'Descrição do anúncio 12', title:'Anúncio 12'});
  }

  private grafico() {
    this.data = {
      labels: ['Novos', 'Assinados', 'Resolvidos', 'Aprovados', 'Fechados'],
      datasets: [
        {
          data: [this.summary.amountNovo,
          this.summary.amountAssinado,
          this.summary.amountResolvido,
          this.summary.amountAprovado,
          this.summary.amountFechado
          ],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#20B2AA",
            "#A020F0"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#20B2AA",
            "#A020F0"
          ]
        }]
    };
  }

}
