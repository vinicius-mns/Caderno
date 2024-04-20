// import { z } from 'zod'

// export class ApiStorage<T> {
//   /**
//    * @constructor
//    * @param {string} key - A chave para a API.
//    * @param {z.AnyZodObject} _schema - O esquema a ser usado.
//    */
//   constructor(
//     public key: string,
//     protected _schema: z.AnyZodObject,
//     protected _initialValue: T
//   ) {}

//   /**
//    * Verifica se as regras de negocio correspondem
//    * @param ent entitdade a ser veficada
//    */
//   protected _validationSchema(ent: T) {
//     const verify = this._schema.safeParse(ent)
//     if (!verify.success) {
//       const erros = () => {
//         const zodErrors = JSON.parse(verify.error.message)
//         const minimizeErrors = zodErrors.map((e: { path: string; message: string }) => {
//           return { where: e.path, message: e.message }
//         })
//         return JSON.stringify(minimizeErrors)
//       }
//       throw new Error(erros())
//     }
//   }

//   public createOrUpdate(ent: T): void {
//     try {
//       this._validationSchema(ent)
//       localStorage.setItem(this.key, JSON.stringify(ent))
//     } catch (e) {
//       if (e instanceof Error) {
//         console.log(e)
//       }
//     }
//   }

//   public get(ent: T): T {
//     const storage = localStorage.getItem(this.key)
//     if (!storage) this.createOrUpdate(ent)
//     const panseEnt = JSON.parse(localStorage.getItem(this.key) as string) as T
//     return panseEnt
//   }

//   protected _checkLocalStorage = () => {
//     const data = localStorage.getItem(this.key)
//     if (data === null) {
//       this._validationSchema(this._initialValue)
//       localStorage.setItem(this.key, JSON.stringify(this._initialValue))
//     }
//   }

//   protected _getOnLocalStorage = () => {
//     this._checkLocalStorage()
//     const data = localStorage.getItem(this.key)
//     if (!data) throw new Error('Stoage vazio')
//     return JSON.parse(data) as T
//   }

//   public read = () => {
//     return this._getOnLocalStorage()
//   }

//   protected _update = (newValue: T) => {
//     this._validationSchema(newValue)
//     localStorage.setItem(this.key, JSON.stringify(newValue))
//   }

//   public delete() {
//     localStorage.removeItem(this.key)
//   }
// }
