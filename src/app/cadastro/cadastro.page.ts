import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AlertController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false,
})
export class CadastroPage implements OnInit {
  @ViewChild('nomeLivroInput', { static: false }) nomeLivroInput!: IonInput;
  @ViewChild('autorLivroInput', { static: false }) autorLivroInput!: IonInput;
  @ViewChild('statusLivroInput', { static: false }) statusLivroInput!: IonInput;

  @ViewChild('nomeFilmeInput', { static: false }) nomeFilmeInput!: IonInput;
  @ViewChild('diretorFilmeInput', { static: false }) diretorFilmeInput!: IonInput;
  @ViewChild('statusFilmeInput', { static: false }) statusFilmeInput!: IonInput;

  constructor(private alertController: AlertController) { }

  public nomeLivro: any;
  public autorLivro: any;
  public statusLivro: any;

  public nomeFilme: any;
  public diretorFilme: any;
  public statusFilme: any;

  ngOnInit() {
  }

  private db = inject(DatabaseService);

  async onClick(){
    const alert = await this.alertController.create({
      header: 'Tem certeza?',
      message: 'Você deseja limpar o banco de dados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: ' + blah);
          },
        },
        {
          text: 'Limpar',
          handler: async () => {
            await this.db.clear();
            console.log('banco limpo')
          },
        },
      ],
    });

    await alert.present();
    // await this.db.clear();
    // console.log('banco limpo')
  }

  async cadastrarLivro() {
    const nomeLivro = this.nomeLivroInput.value as string;
    const autorLivro = this.autorLivroInput.value as string;
    const statusLivro = this.statusLivroInput.value as string;

    if (nomeLivro && autorLivro && statusLivro) {
      const novoLivro = { nome: nomeLivro, autor: autorLivro, status: statusLivro };
      await this.db.addLivro(novoLivro);
      this.nomeLivroInput.value = '';
      this.autorLivroInput.value = '';
      this.statusLivroInput.value = '';
    } else {
      // console.error('Por favor, preencha todos os campos do livro.');
      const alert = await this.alertController.create({
        header: 'Atenção!',
        message: 'Por favor, preencha todos os campos do livro.',
        buttons: ['Entendi'],
      });

      await alert.present();
    }
  }

  async cadastrarFilme() {
    const nomeFilme = this.nomeFilmeInput.value as string;
    const diretorFilme = this.diretorFilmeInput.value as string;
    const statusFilme = this.statusFilmeInput.value as string;
    
    if (nomeFilme && diretorFilme && statusFilme) {
      const novoFilme = { nome: nomeFilme, diretor: diretorFilme, status: statusFilme};
      await this.db.addFilme(novoFilme);
      this.nomeFilmeInput.value = '';
      this.diretorFilmeInput.value = '';
      this.statusFilmeInput.value = '';
    } else {
      // console.error('Por favor, preencha todos os campos do filme.');
      const alert = await this.alertController.create({
        header: 'Atenção!',
        message: 'Por favor, preencha todos os campos do filme.',
        buttons: ['Entendi'],
      });

      await alert.present();
    }
  }

}
