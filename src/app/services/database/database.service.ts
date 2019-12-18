import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(
    private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient
  ) { }

  databaseObj: SQLiteObject; // Database instance object
  name_model: string = ''; // Input field model
  contatos: any = []; // Table rows
  readonly DATATABLE_NAME: string = 'localStoreAgenda.db'; // DB name
  readonly TABLE_CONTATOS: string = 'contatos';
  readonly TABLE_CONTATOS_ID: string = 'id';
  readonly TABLE_CONTATOS_NAME: string = 'name';
  readonly TABLE_CONTATOS_CELLPHONE: string = 'cellPhone';
  readonly TABLE_CONTATOS_PHONE: string = 'phone';
  readonly TABLE_CONTATOS_PHOTO: string = 'photo';


  createDB() {
    this.sqlite.create({
      name: this.DATATABLE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch(e => {
        //alert('error ' + JSON.stringify(e));
      });
  }

  createTableContatos() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.TABLE_CONTATOS + '( '
      + this.TABLE_CONTATOS_ID + ' INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      this.TABLE_CONTATOS_NAME + ' TEXT, ' +
      this.TABLE_CONTATOS_PHOTO + ' TEXT, ' +
      this.TABLE_CONTATOS_PHONE + ' TEXT )')
      .then(() => {
      })
      .catch(e => {
        // alert('error ' + JSON.stringify(e));
      });

  }


  insertRowContatos(name: string, phone: string, photo: string) {
    this.databaseObj.executeSql('INSERT INTO ' + this.TABLE_CONTATOS +
      '(' + this.TABLE_CONTATOS_NAME + ', ' + this.TABLE_CONTATOS_PHOTO
      + ' , ' + this.TABLE_CONTATOS_PHONE + '  ) ' +
      'VALUES ' +
      '(\'' + name + '\' , \'' + photo + '\', \'' + phone + '\')', [])
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario salvo com sucesso.',
          heightAuto: false,
        });
        this.getRows();
      })
      .catch(e => {
      
        Swal.fire({
          icon: 'error',
          title: 'Ocorreu um erro ao salvar o usuario',
          heightAuto: false,
        });
      });
  }

  getRows() {
    this.databaseObj.executeSql('SELECT * FROM ' + this.TABLE_CONTATOS, [])
      .then((res) => {
        this.contatos = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            this.contatos.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        // alert('error ' + JSON.stringify(e));
      });
  }

  searchContatos(search: string) {
    this.databaseObj.executeSql(' SELECT * FROM ' + this.TABLE_CONTATOS
      + ' WHERE ' + this.TABLE_CONTATOS_NAME + ' LIKE \'%' + search + '%\'', [])
      .then((res) => {
        this.contatos = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            this.contatos.push(res.rows.item(i));
          }
        }
        // console.log(this.contatos);
      })
      .catch(e => {
        //alert('error ' + JSON.stringify(e));
      });
  }


  deleteRow(contato) {
    this.databaseObj.executeSql('DELETE FROM ' + this.TABLE_CONTATOS + ' WHERE ' + this.TABLE_CONTATOS_ID + '= \'' + contato.id + '\'')
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Contato deletado com sucesso',
          heightAuto: false,
        });
        this.getRows();
      })
      .catch(e => {
        Swal.fire({
          icon: 'success',
          title: 'Contato deletado com sucesso',
          heightAuto: false,
        });
        this.getRows();
      });
  }


}


