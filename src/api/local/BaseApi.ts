export interface IResponse {
  status: number
  data: string
}

/**
 * Classe base para criar uma entidade
 */
export abstract class BaseApi<T> {
  /**
   * Aidiciona um nova entidade no localStorage
   * @param ent - Entidade a ser criada
   * @returns A resposta da requisição
   */
  public abstract create(ent: T): IResponse

  /**
   * Retorna uma entidade do localStorage
   * @param id - Identicador da entidade
   * @returns A resposta da requisição
   */
  public abstract readOne(id: string): IResponse
}
