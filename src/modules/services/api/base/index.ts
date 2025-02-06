import { createSearchParamsByObject } from "@/modules/helpers/search-params";
import { api } from "../config";

/**
 * Classe genérica para gerenciar operações CRUD em recursos da API.
 * @type `T` - Tipo principal do recurso.
 * @type `TToCreate` - Tipo dos dados para criar um novo registro. Padrão: `T`.
 * @type `TToUpdate` - Tipo dos dados para atualizar um registro. Padrão: `Partial<T>`.
 * @type `TGetAllParams` - Tipo dos parâmetros aceitos no método `getAll`. Padrão: `GetAllParams`.
 */
class BaseService<
  T,
  TToCreate = Omit<T, "id">,
  TToUpdate = Partial<TToCreate>,
  TGetAllParams = GetAllParams,
  TOriginal = undefined
> {
  private baseRoute: string; // Rota base para chamadas da API (ex.: '/users').

  /**
   * Inicializa a instância da classe com a rota base do recurso.
   * @param baseRoute - A rota base para as chamadas da API.
   */
  constructor(baseRoute: string) {
    this.baseRoute = baseRoute;
  }

  async getAllSimple(params?: TGetAllParams) {
    const queryString = params ? createSearchParamsByObject(params) : undefined;

    const { data } = await api.get<DataPage<TOriginal[]>>(
      `${this.baseRoute}${queryString ? `?${queryString}` : ""}`
    );
    return data;
  }

  /**
   * Recupera uma lista de registros do recurso com suporte a paginação e filtros.
   * @param params - Objeto contendo parâmetros para paginação, filtros, etc.
   * @returns Um objeto contendo os registros encontrados (com paginação).
   */
  async getAll(params?: TGetAllParams) {
    const queryString = params ? createSearchParamsByObject(params) : undefined;

    const { data } = await api.get<DataPage<T[]>>(
      `${this.baseRoute}${queryString ? `?${queryString}` : ""}`
    );
    return data;
  }

  /**
   * Recupera um registro único pelo identificador.
   * @param id - O identificador único do registro.
   * @returns O registro correspondente ao ID fornecido.
   */
  async getById(id: string) {
    const { data } = await api.get<T>(`${this.baseRoute}/${id}`);
    return data;
  }

  /**
   * Cria um novo registro no recurso associado.
   * @param payload - Os dados necessários para criar o registro.
   * @returns O registro recém-criado.
   */
  async create(payload: TToCreate) {
    const { data } = await api.post<T>(`${this.baseRoute}`, payload);
    return data;
  }

  /**
   * Atualiza os dados de um registro existente.
   * @param id - O identificador único do registro a ser atualizado.
   * @param payload - Os dados a serem atualizados no registro.
   * @returns O registro atualizado.
   */
  async update(id: string, payload: TToUpdate) {
    const { data } = await api.put<T>(`${this.baseRoute}/${id}`, payload);
    return data;
  }

  /**
   * Deleta um registro do recurso pelo identificador.
   * @param id - O identificador único do registro a ser deletado.
   * @returns O registro deletado.
   */
  async delete(id: string) {
    const { data } = await api.delete<T>(`${this.baseRoute}/${id}`);
    return data;
  }
}

export default BaseService;
