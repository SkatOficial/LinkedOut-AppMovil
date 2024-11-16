import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Job } from '../models/job';
import { Postulation } from '../models/postulation';
import { ApiService } from './api.service';
import { Company } from '../models/company';
import { Position } from '../models/position';
import { Experience } from '../experience';
import { Institution } from '../models/institution';
import { Career } from '../models/career';
import { Education } from '../models/education';
import { Question } from '../models/question';


@Injectable({
  providedIn: 'root'
})

export class ServiceBDService {
  public database !: SQLiteObject;

  //variables de creación de tablas
  tableRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY AUTOINCREMENT,nombre_rol VARCHAR(100) NOT NULL)";

  tableUser: string = "CREATE TABLE IF NOT EXISTS user(id_user INTEGER PRIMARY KEY AUTOINCREMENT,password_user varchar(50) NOT NULL,name_user VARCHAR(100) NOT NULL,lastname_user VARCHAR(100), photo_user BLOB,description_user VARCHAR(220),about_user TEXT,address_user varchar(100), email_user varchar(250) UNIQUE NOT NULL, phone_user VARCHAR(20), id_rol INTEGER NOT NULL, FOREIGN  KEY (id_rol) REFERENCES rol(id_rol))";

  tableQuestion: string = "CREATE TABLE IF NOT EXISTS security_question(id_question INTEGER PRIMARY KEY AUTOINCREMENT,question_text VARCHAR(50) NOT NULL)"

  tableAnswer: string = "CREATE TABLE IF NOT EXISTS security_answer(id_user INTEGER PRIMARY KEY NOT NULL, id_question INTEGER NOT NULL, answer TEXT NOT NULL,FOREIGN KEY (id_user) REFERENCES users(id_user),FOREIGN KEY (id_question) REFERENCES security_question(id_question))"

  tableJob: string = "CREATE TABLE IF NOT EXISTS job(id_job INTEGER PRIMARY KEY AUTOINCREMENT, title_job VARCHAR(100) NOT NULL, description_job VARCHAR(1000), status_job VARCHAR(20) DEFAULT 'publicado',id_company INTEGER, FOREIGN  KEY (id_company) REFERENCES user(id_user))";

  tablePostulation: string = "CREATE TABLE IF NOT EXISTS postulation(id_post INTEGER PRIMARY KEY AUTOINCREMENT, status_post varchar(20), id_user INTEGER NOT NULL, id_job INTEGER NOT NULL, FOREIGN  KEY (id_user) REFERENCES user(id_user), FOREIGN  KEY (id_job) REFERENCES job(id_job))";

  tableInstitution: string = "CREATE TABLE IF NOT EXISTS institution(id_inst INTEGER PRIMARY KEY AUTOINCREMENT, name_inst VARCHAR(100) NOT NULL)";

  tableCareer: string = "CREATE TABLE IF NOT EXISTS career(id_career INTEGER PRIMARY KEY AUTOINCREMENT, name_career VARCHAR(100) NOT NULL)";

  tableEducation: string = "CREATE TABLE IF NOT EXISTS education(id_educ INTEGER PRIMARY KEY AUTOINCREMENT, startDate_educ TEXT NOT NULL, endDate_educ TEXT, otherInstitution varchar(100), otherCareer VARCHAR(100), id_inst INTEGER , id_career INTEGER , id_user INTEGER NOT NULL, FOREIGN  KEY (id_inst) REFERENCES institution(id_inst),FOREIGN  KEY (id_career) REFERENCES career(id_career), FOREIGN  KEY (id_user) REFERENCES user(id_user))";

  tableCompany: string = "CREATE TABLE IF NOT EXISTS company(id_comp INTEGER PRIMARY KEY AUTOINCREMENT, name_comp VARCHAR(100) NOT NULL)";

  tablePosition: string = "CREATE TABLE IF NOT EXISTS position(id_position INTEGER PRIMARY KEY AUTOINCREMENT, name_position VARCHAR(100) NOT NULL)";

  tableExperience: string = "CREATE TABLE IF NOT EXISTS experience (id_exp INTEGER PRIMARY KEY AUTOINCREMENT,startDate_exp TEXT NOT NULL, endDate_exp TEXT, otherPosition varchar(100), otherCompany VARCHAR(100), id_comp INTEGER, id_position INTEGER, id_user INTEGER NOT NULL, FOREIGN  KEY (id_comp) REFERENCES company(id_comp),FOREIGN  KEY (id_position) REFERENCES position(id_position), FOREIGN  KEY (id_user) REFERENCES user(id_user))";

  //variables de insert iniciales de las tablas
  registroRols: any = [
    { insert: "INSERT OR IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'Compañia')" },
    { insert: "INSERT OR IGNORE INTO rol(id_rol,nombre_rol) VALUES (2,'Trabajador')" }
  ]

  registroUsers: any = [{
    insert: "INSERT OR IGNORE INTO user(id_user,password_user,name_user,lastname_user, email_user, phone_user,id_rol) VALUES (1,'prueba123','prueba','prueba','prueba@duocuc.cl','981502867',2)"
  }]

  registroQuestions: any = [
    { insert: "INSERT OR IGNORE INTO security_question(id_question, question_text) VALUES (1, '¿Cuál es el nombre de tu primera mascota?')" },
    { insert: "INSERT OR IGNORE INTO security_question(id_question, question_text) VALUES (2, '¿Cuál es el nombre de la ciudad donde naciste?')" },
    { insert: "INSERT OR IGNORE INTO security_question(id_question, question_text) VALUES (3, '¿Cuál fue el modelo de tu primer automóvil?')" },
    { insert: "INSERT OR IGNORE INTO security_question(id_question, question_text) VALUES (4, '¿Cuál es el nombre de tu escuela primaria?')" },
    { insert: "INSERT OR IGNORE INTO security_question(id_question, question_text) VALUES (5, '¿Cuál es el segundo nombre de tu padre?')" }
];

  registroAnswer: any = [
    { insert: "INSERT OR IGNORE INTO security_answer(id_user,id_question, answer) VALUES (1,1,'Pan')" },
];

  registrocompanys: any[] = []

  registroPositions: any =[
    {insert: "INSERT OR IGNORE INTO position(id_position,name_position) VALUES (1,'Reponedor')"},
    {insert: "INSERT OR IGNORE INTO position(id_position,name_position) VALUES (2,'Conserje')"},
    {insert: "INSERT OR IGNORE INTO position(id_position,name_position) VALUES (3,'Cajero')"},
    {insert: "INSERT OR IGNORE INTO position(id_position,name_position) VALUES (4,'Secretario')"},
    {insert: "INSERT OR IGNORE INTO position(id_position,name_position) VALUES (5,'Subgerente')"}
  ]

  registroInstitution: any =[
    {insert: "INSERT OR IGNORE INTO institution(id_inst,name_inst) VALUES (1,'Universidad Nacional del Almohadón')"},
    {insert: "INSERT OR IGNORE INTO institution(id_inst,name_inst) VALUES (2,'Instituto Superior de la Cafeína')"},
    {insert: "INSERT OR IGNORE INTO institution(id_inst,name_inst) VALUES (3,'Academia Internacional de Memelogía')"},
    {insert: "INSERT OR IGNORE INTO institution(id_inst,name_inst) VALUES (4,'Facultad del Desorden Espontáneo')"},
    {insert: "INSERT OR IGNORE INTO institution(id_inst,name_inst) VALUES (5,'Escuela Técnica de Autoexpresión')"}
  ]

  registroCareer: any =[
    {insert: "INSERT OR IGNORE INTO career(id_career,name_career) VALUES (1,'Arquitectura de Siestas')"},
    {insert: "INSERT OR IGNORE INTO career(id_career,name_career) VALUES (2,'Ciencias del Café')"},
    {insert: "INSERT OR IGNORE INTO career(id_career,name_career) VALUES (3,'Filosofía del Meme')"},
    {insert: "INSERT OR IGNORE INTO career(id_career,name_career) VALUES (4,'Matemáticas del Caos')"},
    {insert: "INSERT OR IGNORE INTO career(id_career,name_career) VALUES (5,'Ingeniería del Selfie')"}
  ]


  //observables para guardar las consultas de las tablas
  listUsers = new BehaviorSubject([]);
  listQuestions = new BehaviorSubject([]);
  listJobs = new BehaviorSubject([]);
  userById = new BehaviorSubject<User | null>(null);
  listUserByIdAux = new BehaviorSubject<User | null>(null);
  listJobsById = new BehaviorSubject([]);
  listPostulationById = new BehaviorSubject([]);
  listCompanys = new BehaviorSubject([]);
  listPositions = new BehaviorSubject([]);
  listExperience = new BehaviorSubject([]);
  listInstitutions = new BehaviorSubject([]);
  listCareers = new BehaviorSubject([]);
  listEducations = new BehaviorSubject([]);
  listPostulationByIdCompany = new BehaviorSubject([]);
  listPostulations  = new BehaviorSubject([]);


  //Contenedor de Apis externas
  apiArray: any[] = [];

  //observable para manipular el estado de la base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController, private api: ApiService) {
    this.api.getUsers().subscribe((res) => {
      this.apiArray = [];  // Inicializamos apiArray

      for (let item of res) {
        this.apiArray.push(item.company.name);
      }
      //genera los inserts de los company de la Api a la base de datos
    }, (error) => {
      this.presentAlert("Error Api", "No se pudo obtener los datos");
    });

    this.crearConexion();
  }

  dbReady() {
    return this.isDBReady.asObservable();
  }

  crearConexion() {
    //verificar si la plataforma esta lista
    this.platform.ready().then(() => {
      //crearmos la BD
      this.sqlite.create({
        name: 'prueba31.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardar la conexion
        this.database = db;
        //llamar a la funcion de creación de tablas
        this.crearTablas();

        //indicar que la BD esta lista
        this.isDBReady.next(true);
      }).catch(e => {
        this.presentAlert('Crear Conexion', 'Error en crear BD: ' + JSON.stringify(e));
      })

    })
  }

  async crearTablas() {
    try {
      //Ejecutar la creación de las tablas
      await this.database.executeSql(this.tableRol, []);
      await this.database.executeSql(this.tableUser, []);
      await this.database.executeSql(this.tableQuestion,[]);
      await this.database.executeSql(this.tableAnswer,[]);
      await this.database.executeSql(this.tableJob, []);
      await this.database.executeSql(this.tablePostulation, []);
      await this.database.executeSql(this.tableInstitution,[]);
      await this.database.executeSql(this.tableCareer,[]);
      await this.database.executeSql(this.tableEducation,[]);
      await this.database.executeSql(this.tableCompany, []);
      await this.database.executeSql(this.tablePosition,[]);
      await this.database.executeSql(this.tableExperience,[]);
      
      //Ejecutar los inserts en caso que existan

      for (let registro of this.registroRols) {
        await this.database.executeSql(registro.insert, []);
      }

      for (let registro of this.registroUsers) {
        await this.database.executeSql(registro.insert, []);
      }

      for (let registro of this.registroQuestions) {
        await this.database.executeSql(registro.insert, []);
      }

      for (let registro of this.registroAnswer) {
        await this.database.executeSql(registro.insert, []);
      }

      for (let i = 0; i < this.apiArray.length; i++) {
        let registro = this.apiArray[i];
        let query = `INSERT OR IGNORE INTO company(id_comp, name_comp) VALUES (?,?)`;
        await this.database.executeSql(query, [i+1,registro]);
      }

      for (let registro of this.registroPositions) {
        await this.database.executeSql(registro.insert, []);
      }

      for (let registro of this.registroInstitution) {
        await this.database.executeSql(registro.insert, []);
      }

      for (let registro of this.registroCareer) {
        await this.database.executeSql(registro.insert, []);
      }

    } catch (e) {
      this.presentAlert('Crear Tabla', 'Error en crear tabla: ' + JSON.stringify(e));
    }
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  resetObservables(){
    this.listUsers.next([]);
    this.listQuestions.next([]);
    this.listJobs.next([]);
    this.userById.next(null);
    this.listUserByIdAux.next(null);
    this.listJobsById.next([]);
    this.listPostulationById.next([]);
    this.listCompanys.next([]);
    this.listPositions.next([]);
    this.listExperience.next([]);
    this.listInstitutions.next([]);
    this.listCareers.next([]);
    this.listEducations.next([]);
    this.listPostulationByIdCompany.next([]);
    this.listPostulations.next([]);
  }
  //funciones de retorno de observable para las variables de los selects
  fetchUsers(): Observable<User[]> {
    return this.listUsers.asObservable();
  }

  fetchQuestions(): Observable<Question[]> {
    return this.listQuestions.asObservable();
  }

  fetchJobs(): Observable<Job[]> {
    return this.listJobs.asObservable();
  }

  fetchUserById(): Observable<User | null> {
    return this.userById.asObservable();
  }

  fetchUserByIdAux(): Observable<User | null> {
    return this.listUserByIdAux.asObservable();
  }

  fetchJobsById(): Observable<Job[]> {
    return this.listJobsById.asObservable();
  }

  fetchPostulationById(): Observable<Postulation[]> {
    return this.listPostulationById.asObservable();
  }

  fetchCompanys(): Observable<Company[]> {
    return this.listCompanys.asObservable();
  }

  fetchPositions(): Observable<Position[]> {
    return this.listPositions.asObservable();
  }

  fetchExpById(): Observable<Experience[]> {
    return this.listExperience.asObservable();
  }

  fetchInstitutions(): Observable<Institution[]> {
    return this.listInstitutions.asObservable();
  }

  fetchCareers(): Observable<Career[]> {
    return this.listCareers.asObservable();
  }

  fetchEducById(): Observable<Education[]> {
    return this.listEducations.asObservable();
  }

  fetchPostulationByIdCompany(): Observable<Postulation[]> {
    return this.listPostulationByIdCompany.asObservable();
  }

  fetchPostulations(): Observable<Postulation[]> {
    return this.listPostulations.asObservable();
  }

  //INSERTS
  async insertUserCompany(password_user: string, name_user: string, email_user: string, id_rol: number): Promise<void> {
    try {
      const res = await this.database.executeSql('INSERT INTO user(password_user,name_user, email_user, id_rol) VALUES(?,?,?,?)', [password_user, name_user, email_user, id_rol])
      return res.insertId
    } catch (error) {
      throw new Error('Error al insertar usuario');
    }
  }

  async insertUserWorker(password_user: string, name_user: string, lastname_user: string, email_user: string, id_rol: number): Promise<void> {
    try {
      const res = await this.database.executeSql('INSERT INTO user(password_user,name_user,lastname_user,email_user, id_rol) VALUES(?,?,?,?,?)', [password_user, name_user, lastname_user, email_user, id_rol])

      return res.insertId
    } catch (error) {
      throw new Error('Error al insertar usuario');
    }
  }

  async insertAnswer(id_user: number,id_question:number,answer:string): Promise<void> {
    try {
      const res = await this.database.executeSql('INSERT INTO security_answer(id_user,id_question,answer) VALUES(?,?,?)', [id_user,id_question,answer])

      return res.insertId;
    } catch (error) {
      throw new Error('Error al insertar pregunta para recuperar contraseña');
    }
  }

  async insertJob(title_job: string, description_job: string, id_company: number): Promise<any> {
    try {
      const res = await this.database.executeSql('INSERT INTO job(title_job,description_job,id_company) VALUES(?,?,?)', [title_job, description_job, id_company])

      return res.rowsAffected > 0
        
    } catch (error) {
      throw new Error('Error al insertar usuario');
    }
  }

  async insertPostulation(id_user: number, id_job: number): Promise<any> {
    try {
      // verifica si ya existe una postulacion con ese usuario y ese trabajo
      const checkRes = await this.database.executeSql(
        'SELECT * FROM postulation WHERE id_user = ? AND id_job = ?',
        [id_user, id_job]
      );

      //restricciones
      if (checkRes.rows.length > 0) {
        return false;
      }

      //Agrega la postulacion
      const res = await this.database.executeSql('INSERT INTO postulation(id_user, id_job) VALUES(?,?)', [id_user, id_job])

      //verifica si se agrego correctamente
      if (res.rowsAffected > 0) {
        return true;
      }

      return false;
    } catch (error) {
      this.presentAlert("ERROR AL CREAR POSTULACION", 'Error: ' + JSON.stringify(error));
    }
  }

  async insertExp(startDate_exp:string, endDate_exp:string, otherPosition:string, otherCompany:string, id_comp:number, id_position:number,id_user:number): Promise<any> {
    try {
      const res = await this.database.executeSql('INSERT INTO experience(startDate_exp, endDate_exp, otherPosition, otherCompany, id_comp, id_position ,id_user) VALUES(?,?,?,?,?,?,?)', [startDate_exp, endDate_exp, otherPosition, otherCompany, id_comp, id_position,id_user])

      if (res.rowsAffected > 0) {

        return true;
      }
    } catch (error) {
      throw new Error('Error al insertar experience');
    }
  }

  async insertEduc(startDate_educ:string, endDate_educ:string, otherCareer:string, otherInstitution:string, id_inst:number, id_career:number,id_user:number): Promise<any> {
    try {
      const res = await this.database.executeSql('INSERT INTO education(startDate_educ, endDate_educ, otherCareer, otherInstitution, id_inst, id_career ,id_user) VALUES(?,?,?,?,?,?,?)', [startDate_educ, endDate_educ, otherCareer, otherInstitution, id_inst, id_career,id_user])

      if (res.rowsAffected > 0) {
        return true;
      }
    } catch (error) {
      this.presentAlert('Error Insert Education', 'Error: ' + JSON.stringify(error));

    }
  }

  //UPDATE
  async UpdateUser(id_user: number, password_user: string, name_user: string, lastname_user: string, photo_user: any, description_user: any, about_user: any, address_user: any, email_user: string, phone_user: string): Promise<any> {
    try {
      const res = await this.database.executeSql('UPDATE user SET password_user = ?, name_user = ?, lastname_user =  ?, photo_user = ?,  description_user = ?, about_user = ?, address_user = ?, email_user = ?, phone_user = ?  WHERE id_user = ?', [password_user, name_user, lastname_user, photo_user, description_user, about_user, address_user, email_user, phone_user, id_user]);

      return res.rowsAffected > 0;
    } catch (error) {
      this.presentAlert("MODIFICACION ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al modificar el usuario');
    }
  }

  async UpdateExp(id_exp:number,startDate_exp:string, endDate_exp:string, otherPosition:string, otherCompany:string, id_comp:number, id_position:number): Promise<any> {
    try {
      const res = await this.database.executeSql('UPDATE experience SET startDate_exp = ?, endDate_exp = ?, otherPosition =  ?, otherCompany = ?,  id_comp = ?, id_position = ? WHERE id_exp = ?', [startDate_exp, endDate_exp, otherPosition, otherCompany, id_comp, id_position,id_exp]);

      return res.rowsAffected > 0;
    } catch (error) {
      this.presentAlert("MODIFICACION ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al modificar el Experience');
    }
  }

  async UpdateEduc(id_educ:number,startDate_educ:string, endDate_educ:string, otherCareer:string, otherInstitution:string, id_inst:number, id_career:number): Promise<any> {
    try {
      const res = await this.database.executeSql('UPDATE education SET startDate_educ = ?, endDate_educ = ?, otherCareer =  ?, otherInstitution = ?,  id_inst = ?, id_career = ? WHERE id_educ = ?', [startDate_educ, endDate_educ, otherCareer, otherInstitution, id_inst, id_career,id_educ]);

      return res.rowsAffected > 0;
    } catch (error) {
      this.presentAlert("MODIFICACION ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al modificar el education');
    }
  }

  async updatePassword(id_user:number, password_user:string){
    try {
      const res = await this.database.executeSql('UPDATE user SET password_user = ? WHERE id_user = ?', [password_user,id_user]);
      return res.rowsAffected > 0;
    } catch (error) {
      this.presentAlert("MODIFICACION ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al modificar la contraseña');
    }
  }
  
  async updateJob(title_job: string, description_job: string, id_company: number): Promise<any> {
    try {
      const res = await this.database.executeSql('UPDATE job SET title_job = ?,description_job = ? WHERE = id_company = ?', [title_job, description_job, id_company])

      return res.rowsAffected > 0
        
    } catch (error) {
      throw new Error('Error al modificar Job');
    }
  }

  async updatePostulationAccept(id_post:number){
    try {
      const res = await this.database.executeSql('UPDATE postulation SET status_post = "aceptado" WHERE  id_post = ?', [id_post])

      return res.rowsAffected > 0
        
    } catch (error) {
      this.presentAlert("UPDATE ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al modificar postualciob');
    }
  }

  async updatePostulationDecline(id_post:number){
    try {
      const res = await this.database.executeSql('UPDATE postulation SET status_post = "rechazado" WHERE  id_post = ?', [id_post])

      return res.rowsAffected > 0
        
    } catch (error) {
      throw new Error('Error al modificar Job');
    }
  }

  async updateFinishJob(id_job:number){
    try {
      // Actualiza el estado del trabajo
      await this.database.executeSql('UPDATE job SET status_job = "finalizado" WHERE id_job = ?', [id_job]);
  
      // Actualiza el estado de las postulaciones
      await this.database.executeSql('UPDATE postulation SET status_post = "rechazado" WHERE status_post IS NULL AND id_job = ?', [id_job]);
      
      // Si ambas operaciones se completan, retornar true
      return true;
    } catch (error) {
      // Manejo de errores
      this.presentAlert("ERROR", 'Error: ' + JSON.stringify(error));
      throw new Error('Error al finalizar Job o modificar postulación');
    }
  }
  
  //DELETE
  async deleteExp(id_exp:number): Promise<any> {
    try {
      const res = await this.database.executeSql('DELETE FROM experience WHERE id_exp = ?', [id_exp]);

      return res.rowsAffected > 0;
    } catch (error) {
      this.presentAlert("ELIMINACION ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al eliminar el Experience');
    }
  }

  async deleteEduc(id_educ:number): Promise<any> {
    try {
      const res = await this.database.executeSql('DELETE FROM education WHERE id_educ = ?', [id_educ]);

      return res.rowsAffected > 0;
    } catch (error) {
      this.presentAlert("ELIMINACION ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al eliminar el Education');
    }
  }

  async deletePost(id_post:number):Promise<any>{
    try {
      const res = await this.database.executeSql('DELETE FROM postulation WHERE id_post  = ?', [id_post]);

      return res.rowsAffected > 0;
    } catch (error) {
      this.presentAlert("ELIMINACION ERROR", 'Error: ' + JSON.stringify(error))
      throw new Error('Error al eliminar el Education');
    }
  }

  //SELECTS
  async selectUsers() {
    return await this.database.executeSql('SELECT * FROM user', []).then(res => {
      //variable para guardar el resultado de la consulta
      let items: User[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_user: res.rows.item(i).id_user,
            password_user: res.rows.item(i).password_user,
            name_user: res.rows.item(i).name_user,
            lastname_user: res.rows.item(i).lastname_user,
            photo_user: res.rows.item(i).photo_user,
            about_user: res.rows.item(i).about_user,
            address_user: res.rows.item(i).address_user,
            description_user: res.rows.item(i).description_user,
            email_user: res.rows.item(i).email_user,
            phone_user: res.rows.item(i).phone_user,
            id_rol: res.rows.item(i).id_rol
          })
        }
      } else {
        this.presentAlert("Usuarios vacios", "no se encontraron usuarios")
      }
      //actualizamos el observable de este select
      this.listUsers.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectJobs() {
    return await this.database.executeSql('SELECT * FROM job JOIN user ON user.id_user = job.id_company WHERE job.status_job = "publicado"', []).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Job[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_company,
            photo_company: res.rows.item(i).photo_user,
            name_company: res.rows.item(i).name_user,
            address_company: res.rows.item(i).address_user

          });
        }
      }
      //actualizamos el observable de este select
      this.listJobs.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectEmailExists(correo_user: string): Promise<any> {
    try {
      const res = await this.database.executeSql('SELECT email_user FROM user WHERE email_user = ?', [correo_user])

      return res.rows.length > 0;

    } catch (error) {
      throw new Error('Error al encontrar correo');
    }
  }

  async selectEmailExistsId(correo_user: string, id_user: number): Promise<any> {
    try {
      const res = await this.database.executeSql('SELECT email_user FROM user WHERE email_user = ? AND id_user != ?', [correo_user, id_user])

      return res.rows.length > 0;

    } catch (error) {
      throw new Error('Error al encontrar correo');
    }
  }

  async selectLogin(correo_user: string, password_user: string): Promise<any> {
    try {
      let user = {
        id_user: null,
        id_rol: null
      };
      const res = await this.database.executeSql('SELECT id_user,id_rol,email_user,password_user FROM user WHERE email_user = ? AND password_user = ?', [correo_user, password_user])

      if (res.rows.length > 0) {
        user.id_user = res.rows.item(0).id_user;
        user.id_rol = res.rows.item(0).id_rol;
        return user;
      }
      return null;
    } catch {
      throw new Error('Error al encontrar el usuario');
    }
  }

  async selectPasswordById(id_user: string, password_user: string): Promise<any> {
    try {
      const res = await this.database.executeSql('SELECT * FROM user WHERE id_user = ? AND password_user = ?', [id_user, password_user])

      return res.rows.length > 0;

    } catch {
      throw new Error('Error al encontrar el usuario');
    }
  }

  async selectUserById(id_user: number | any): Promise<any> {
    try {
      const res = await this.database.executeSql('SELECT * FROM user WHERE id_user = ?', [id_user])

      if (res.rows.length > 0) {
        const user: User = {
          id_user: res.rows.item(0).id_user,
          password_user: res.rows.item(0).password_user,
          name_user: res.rows.item(0).name_user,
          lastname_user: res.rows.item(0).lastname_user,
          photo_user: res.rows.item(0).photo_user,
          about_user: res.rows.item(0).about_user,
          address_user: res.rows.item(0).address_user,
          description_user: res.rows.item(0).description_user,
          email_user: res.rows.item(0).email_user,
          phone_user: res.rows.item(0).phone_user,
          id_rol: res.rows.item(0).id_rol
        };


        //actualizamos el observable de este select
        this.userById.next(user);

      } else {

      }
    } catch (error) {
      throw new Error('Error al encontrar el usuario');
    }
  }

  async selectIdUserByEmail(email: string | any): Promise<any> {
    try {
      const res = await this.database.executeSql('SELECT id_user FROM user WHERE email_user = ?', [email])
      const id_user = res.rows.item(0).id_user;

      return res.rows.item(0).id_user;
    } catch (error) {
      this.presentAlert("ERROR SELECT",'Error al encontrar el usuario por email');
    }
  }

  async selectUserByIdAux(id_user: number | any): Promise<any> {
    try {
      const res = await this.database.executeSql('SELECT * FROM user WHERE id_user = ?', [id_user])

      if (res.rows.length > 0) {
        const user: User = {
          id_user: res.rows.item(0).id_user,
          password_user: res.rows.item(0).password_user,
          name_user: res.rows.item(0).name_user,
          lastname_user: res.rows.item(0).lastname_user,
          photo_user: res.rows.item(0).photo_user,
          about_user: res.rows.item(0).about_user,
          address_user: res.rows.item(0).address_user,
          description_user: res.rows.item(0).description_user,
          email_user: res.rows.item(0).email_user,
          phone_user: res.rows.item(0).phone_user,
          id_rol: res.rows.item(0).id_rol
        };


        //actualizamos el observable de este select
        this.listUserByIdAux.next(user);

      } else {

      }
    } catch (error) {
      throw new Error('Error al encontrar el usuario');
    }
  }

  async selectQuestions(): Promise<any> {
    return await this.database.executeSql('SELECT * FROM security_question', []).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Question[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_question: res.rows.item(i).id_question,
            question_text: res.rows.item(i).question_text,
          });
        }
      }
      //actualizamos el observable de este select
      this.listQuestions.next(items as any);
    }).catch(e => {
      this.presentAlert('Select questions ERROR', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectAnswer(id_user:number , id_question:number, answer : string): Promise<any>{
    try {
      const res = await this.database.executeSql('SELECT * FROM security_answer WHERE id_user = ? AND id_question = ? AND answer = ?', [id_user,id_question,answer])

      return res.rows.length > 0;
      
    } catch (error) {
      throw new Error('Error al encontrar el usuario');
    }
  }

  async selectJobsById(id_company: number) {
    return await this.database.executeSql('SELECT * FROM job JOIN user ON user.id_user = job.id_company WHERE user.id_user = ?', [id_company]).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Job[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_user,
            photo_company: res.rows.item(i).photo_user,
            name_company: res.rows.item(i).name_user,
            address_company: res.rows.item(i).address_user
          });
        }
      }
      
      //actualizamos el observable de este select
      this.listJobsById.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectPostulationsById(id_user: number){ 
    return await this.database.executeSql('SELECT * FROM postulation JOIN job ON job.id_job = postulation.id_job JOIN user ON user.id_user = job.id_company  WHERE postulation.id_user = ?', [id_user]).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Postulation[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_post: res.rows.item(i).id_post,
            status_post: res.rows.item(i).status_post,
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_user,
            photo_company: res.rows.item(i).photo_user,
            name_company: res.rows.item(i).name_user,
            address_company: res.rows.item(i).address_user,
            id_user :  res.rows.item(i).id_user || 0,
            name_user : res.rows.item(i).name_user || ' ',
            lastname_user : res.rows.item(i).lastname_user || ' ', 
            description_user : res.rows.item(i).description_user || ' ', 
            address_user : res.rows.item(i).address || ' ',
            photo_user : res.rows.item(i).photo_user,
          });
        }
        //actualizamos el observable de este select
        this.listPostulationById.next(items as any);
        return true;
      }else{
        //actualizamos el observable de este select
        this.listPostulationById.next(items as any);
        return false;
      }

      
      
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectCompanys() {
    try {
      const res = await this.database.executeSql('SELECT * FROM company', []);
      let items: Company[] = [];

      // Verificar si la consulta trae registros
      if (res.rows.length > 0) {
        // Recorremos el cursor para almacenar los registros
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_comp: res.rows.item(i).id_comp,
            name_comp: res.rows.item(i).name_comp,
          });
        }
      } else {
        
      }

      // Actualizamos el observable con los resultados
      this.listCompanys.next(items as any);

    } catch (e) {
      this.presentAlert('Error al seleccionar companys', 'Error: ' + JSON.stringify(e));
    }
  }

  async selectPositions() {
    try {
      const res = await this.database.executeSql('SELECT * FROM position', []);
      let items: Position[] = [];

      // Verificar si la consulta trae registros
      if (res.rows.length > 0) {
        // Recorremos el cursor para almacenar los registros
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_position: res.rows.item(i).id_position,
            name_position: res.rows.item(i).name_position,
          });
        }
      } else {
       
      }

      // Actualizamos el observable con los resultados
      this.listPositions.next(items as any);

    } catch (e) {
      this.presentAlert('Error al seleccionar companys', 'Error: ' + JSON.stringify(e));
    }
  }

  async selectExpById(id_user:number) {
    try {
      const res = await this.database.executeSql('SELECT * FROM experience LEFT JOIN company ON company.id_comp = experience.id_comp LEFT JOIN position ON position.id_position = experience.id_position  WHERE id_user = ?', [id_user]);
      let items: Experience[] = [];

      // Verificar si la consulta trae registros
      if (res.rows.length > 0) {
        // Recorremos el cursor para almacenar los registros
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_exp :res.rows.item(i).id_exp ,
            startDate_exp :res.rows.item(i).startDate_exp ,
            endDate_exp :res.rows.item(i).endDate_exp ,
            otherPosition :res.rows.item(i).otherPosition ,
            otherCompany :res.rows.item(i).otherCompany ,
            comp :res.rows.item(i).name_comp ,
            position :res.rows.item(i).name_position ,
            id_comp :res.rows.item(i).id_comp ,
            id_position :res.rows.item(i).id_position ,
            id_user :res.rows.item(i).id_user,
          });
        }
      } 

      // Actualizamos el observable con los resultados
      this.listExperience.next(items as any);

    } catch (e) {
      this.presentAlert('Error al seleccionar experiences', 'Error: ' + JSON.stringify(e));
    }
  }

  async selectInstitutions() {
    try {
      const res = await this.database.executeSql('SELECT * FROM institution', []);
      let items: Institution[] = [];

      // Verificar si la consulta trae registros
      if (res.rows.length > 0) {
        // Recorremos el cursor para almacenar los registros
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_inst: res.rows.item(i).id_inst,
            name_inst: res.rows.item(i).name_inst,
          });
        }
      }

      // Actualizamos el observable con los resultados
      this.listInstitutions.next(items as any);

    } catch (e) {
      this.presentAlert('Error al seleccionar companys', 'Error: ' + JSON.stringify(e));
    }
  }

  async selectCareers() {
    try {
      const res = await this.database.executeSql('SELECT * FROM career', []);
      let items: Career[] = [];

      // Verificar si la consulta trae registros
      if (res.rows.length > 0) {
        // Recorremos el cursor para almacenar los registros
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_career: res.rows.item(i).id_career,
            name_career: res.rows.item(i).name_career,
          });
        }
      }

      // Actualizamos el observable con los resultados
      this.listCareers.next(items as any);

    } catch (e) {
      this.presentAlert('Error al seleccionar companys', 'Error: ' + JSON.stringify(e));
    }
  }

  async selectEducById(id_user:number) {
    try {
      const res = await this.database.executeSql('SELECT * FROM education LEFT JOIN institution ON institution.id_inst = education.id_inst LEFT JOIN career ON career.id_career = education.id_career  WHERE id_user = ?', [id_user]);
      let items: Education[] = [];

      // Verificar si la consulta trae registros
      if (res.rows.length > 0) {
        // Recorremos el cursor para almacenar los registros
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_educ :res.rows.item(i).id_educ ,
            startDate_educ :res.rows.item(i).startDate_educ ,
            endDate_educ :res.rows.item(i).endDate_educ ,
            otherCareer :res.rows.item(i).otherCareer ,
            otherInstitution :res.rows.item(i).otherInstitution ,
            inst :res.rows.item(i).name_inst ,
            career :res.rows.item(i).name_career ,
            id_inst:res.rows.item(i).id_inst ,
            id_career :res.rows.item(i).id_career ,
            id_user :res.rows.item(i).id_user,
          });

          
        }
      }

      // Actualizamos el observable con los resultados
      this.listEducations.next(items as any);

    } catch (e) {
      this.presentAlert('Error al seleccionar experiences', 'Error: ' + JSON.stringify(e));
    }
  }
  
  async selectFilterJobs(value:string){
    const formattedValue = `%${value.toLowerCase()}%`
    return await this.database.executeSql('SELECT * FROM job JOIN user ON user.id_user = job.id_company WHERE LOWER(job.title_job) LIKE ? AND job.status_job = "publicado"', [formattedValue]).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Job[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_company,
            photo_company: res.rows.item(i).photo_user,
            name_company: res.rows.item(i).name_user,
            address_company: res.rows.item(i).address_user
          });
        }
      }
      //actualizamos el observable de este select
      this.listJobs.next(items as any);
    }).catch(e => {
      this.presentAlert('Select Filtro de busqueda de Jobs', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectFilterPostulationsById(id_user: number,value:string){
    const formattedValue = `%${value.toLowerCase()}%`
    return await this.database.executeSql('SELECT * FROM postulation JOIN job ON job.id_job = postulation.id_job JOIN user ON user.id_user = job.id_company  WHERE postulation.id_user = ? AND job.title_job LIKE ?', [id_user,formattedValue]).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Postulation[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_post: res.rows.item(i).id_post,
            status_post: res.rows.item(i).status_post,
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_user,
            photo_company: res.rows.item(i).photo_user,
            name_company: res.rows.item(i).name_user,
            address_company: res.rows.item(i).address_user,
            id_user :  res.rows.item(i).id_user || 0,
            name_user : res.rows.item(i).name_user || ' ',
            lastname_user : res.rows.item(i).lastname_user || ' ', 
            description_user : res.rows.item(i).description_user || ' ', 
            address_user : res.rows.item(i).address || ' ',
            photo_user : res.rows.item(i).photo_user,
          });
        }
      } else {
        
      }
      //actualizamos el observable de este select
      this.listPostulationById.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectPostulationsByIdCompany(id_job: number) { 
    return await this.database.executeSql('SELECT p.id_post, p.status_post, p.id_job, j.title_job, j.description_job, j.status_job, c.id_user as id_company, c.photo_user as photo_company, c.name_user as name_company, c.address_user as address_company, w.id_user as id_worker, w.name_user as name_worker, w.lastname_user as lastname_worker, w.description_user as description_worker, w.address_user as address_worker, w.photo_user as photo_worker FROM postulation p JOIN job j ON j.id_job = p.id_job JOIN user c ON c.id_user = j.id_company JOIN user w ON p.id_user = w.id_user WHERE p.status_post IS NULL AND p.id_job = ?', [id_job]).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Postulation[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_post: res.rows.item(i).id_post,
            status_post: res.rows.item(i).status_post,
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_company,
            photo_company: res.rows.item(i).photo_company,
            name_company: res.rows.item(i).name_company,
            address_company: res.rows.item(i).address_company,
            id_user :  res.rows.item(i).id_worker  || 0,
            name_user : res.rows.item(i).name_worker  || ' ',
            lastname_user : res.rows.item(i).lastname_worker  || ' ', 
            description_user : res.rows.item(i).description_worker  || ' ', 
            address_user : res.rows.item(i).address_worker  || ' ',
            photo_user : res.rows.item(i).photo_worker
          });
        }
      } else {
        
      }
      //actualizamos el observable de este select
      this.listPostulationByIdCompany.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectPostulations() { 
    return await this.database.executeSql("SELECT p.id_post, p.status_post, p.id_job, j.title_job, j.description_job, j.status_job, c.id_user as id_company, c.photo_user as photo_company, c.name_user as name_company, c.address_user as address_company, w.id_user as id_worker, w.name_user as name_worker, w.lastname_user as lastname_worker, w.description_user as description_worker, w.address_user as address_worker, w.photo_user as photo_worker FROM postulation p JOIN job j ON j.id_job = p.id_job JOIN user c ON c.id_user = j.id_company JOIN user w ON p.id_user = w.id_user", []).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Postulation[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_post: res.rows.item(i).id_post,
            status_post: res.rows.item(i).status_post,
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_company,
            photo_company: res.rows.item(i).photo_company,
            name_company: res.rows.item(i).name_company,
            address_company: res.rows.item(i).address_company,
            id_user :  res.rows.item(i).id_worker  || 0,
            name_user : res.rows.item(i).name_worker  || ' ',
            lastname_user : res.rows.item(i).lastname_worker  || ' ', 
            description_user : res.rows.item(i).description_worker  || ' ', 
            address_user : res.rows.item(i).address_worker  || ' ',
            photo_user : res.rows.item(i).photo_worker
          });
        }
      } else {
        
      }
      //actualizamos el observable de este select
      this.listPostulations.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectAcceptedPostulationsByIdCompany(id_job: number) { 
    return await this.database.executeSql('SELECT p.id_post, p.status_post, p.id_job, j.title_job, j.description_job, j.status_job, c.id_user as id_company, c.photo_user as photo_company, c.name_user as name_company, c.address_user as address_company, w.id_user as id_worker, w.name_user as name_worker, w.lastname_user as lastname_worker, w.description_user as description_worker, w.address_user as address_worker, w.photo_user as photo_worker FROM postulation p JOIN job j ON j.id_job = p.id_job JOIN user c ON c.id_user = j.id_company JOIN user w ON p.id_user = w.id_user WHERE p.status_post = "aceptado" AND p.id_job = ?', [id_job]).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Postulation[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_post: res.rows.item(i).id_post,
            status_post: res.rows.item(i).status_post,
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_company,
            photo_company: res.rows.item(i).photo_company,
            name_company: res.rows.item(i).name_company,
            address_company: res.rows.item(i).address_company,
            id_user :  res.rows.item(i).id_worker  || 0,
            name_user : res.rows.item(i).name_worker  || ' ',
            lastname_user : res.rows.item(i).lastname_worker  || ' ', 
            description_user : res.rows.item(i).description_worker  || ' ', 
            address_user : res.rows.item(i).address_worker  || ' ',
            photo_user : res.rows.item(i).photo_worker
          });
        }
      } else {
        
      }
      //actualizamos el observable de este select
      this.listPostulationByIdCompany.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }

  async selectFilterJobsById(id_company: number,value:string) {
    const formattedValue = `%${value.toLowerCase()}%`
    return await this.database.executeSql('SELECT * FROM job JOIN user ON user.id_user = job.id_company WHERE user.id_user = ? AND job.title_job LIKE ?', [id_company,formattedValue]).then(res => {
      //variable para guardar el resultado de la consulta
      let items: Job[] = [];

      //verificar si la consulta trae registros
      if (res.rows.length > 0) {
        //recorro el cursor
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_job: res.rows.item(i).id_job,
            title_job: res.rows.item(i).title_job,
            description_job: res.rows.item(i).description_job,
            status_job: res.rows.item(i).status_job,
            id_company: res.rows.item(i).id_user,
            photo_company: res.rows.item(i).photo_user,
            name_company: res.rows.item(i).name_user,
            address_company: res.rows.item(i).address_user
          });
        }
      }
      
      //actualizamos el observable de este select
      this.listJobsById.next(items as any);
    }).catch(e => {
      this.presentAlert('Select', 'Error: ' + JSON.stringify(e));
    })
  }
}
