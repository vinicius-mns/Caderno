export interface IResponse {
  status: number
  data: string
}

/**
 * Classe base para criar uma entidade
 */
export abstract class BaseApi<T> {
  /**
   * Chave da entidade no localStorage
   */
  abstract key: string

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

  /**
   * Retorna todas entidades do localStorage
   * @returns Todos itens da lista
   */
  public abstract readAll(): IResponse

  /**
   * Atualiza uma entidade
   * @param ent - entidade a ser substituida
   * @param newEnt - nova entidade
   * @returns A resposta da requisicao
   */
  public abstract update(ent: T, newEnt: T): IResponse

  /**
   * Deleta uma entidade
   * @param id - Identicador da entidade
   * @returns - A resposta de requisicao
   */
  public abstract delete(obj: string): IResponse
}
