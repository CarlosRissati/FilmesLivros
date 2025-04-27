import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addFilme(novoFilme: { nome: string; diretor: string; status: string }){

    //recupera a array de filmes caso n tenha alguma no banco, inicia uma vazia.
    const filmes = await this.get('filmes') || [];

    //adicionar o novo elemento a array
    filmes.push(novoFilme);

    //salva a anova array de filmes
    await this.set('filmes', filmes);
  }

  async addLivro(novoLivro: { nome: string;  autor: string; status: string }){

    //recupera a array de livros
    const livros = await this.get('livros') || [];

    //adicionar o novo livro a array
    livros.push(novoLivro);

    //salvar a array atualizada no storage (toda vez que faz o método set, ele apaga e coloca, em vez de atualizar)
    this.set('livros', livros);

  }

  public async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  public async getLivros(): Promise<any[]> {
    return await this._storage?.get('livros') || [];
  }

  public async getFilmes(): Promise<any[]> {
    return await this._storage?.get('filmes') || [];
  }

  public async clear(): Promise<void> {
    await this._storage?.clear();
  }

  public async getLength(): Promise<any>{
    return await this._storage?.length();
  }
}
