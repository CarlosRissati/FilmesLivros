import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  public livros: any[] = [];
  public filmes: any[] = [];
  private db = inject(DatabaseService);

  constructor() {}

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async ionViewWillEnter() {
    this.livros = await this.db.getLivros();
    this.filmes = await this.db.getFilmes();
  }

  async onStatusChange(tipo: string, item: any, event: any){
    const novoStatus = event.detail.value;
    item.status = novoStatus;

    if (tipo === 'livro'){
      // atualizar a array de livros
      // let livrosAtualizados: any[] = [];
      const livrosAtualizados = this.livros.map((l) => {
        return l.nome === item.nome ? { ...l, status: novoStatus } : l;
      });
      // for (let i = 0; i < livrosAtualizados.length; i++){
      //   console.log(livrosAtualizados[i].nome);
      // }
      await this.db.set('livros', livrosAtualizados);
      console.log(`status atualiziado "${novoStatus}"` );
    } else if (tipo === 'filme'){
      //atualizar a array de filmes
      const filmesAtualizados = this.filmes.map((f) => {
        return f.nome === item.nome ? { ...f, status: novoStatus } : f;
      });
      await this.db.set('filmes', filmesAtualizados);
      console.log(`status atualiziado "${novoStatus}"` );
    }
  }

  public get hasLivros(): boolean{
    return this.livros.length > 0;
  }
  public get hasFilmes(): boolean{
    return this.filmes.length > 0;
  }
}
