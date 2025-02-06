type Rupes = {
  id: string;
  n_referencia: string;
  n_gpt: string;
  data_expiracao: string;
  situacao: string;
  usado: boolean;
  data_cadastro: Date;
  data_pagamento: Date;
  pago: boolean;
  id_tipo_rupe: string;
  tipo_rupe?: TipoRupe;
};
type RupesToCreate = Omit<
  Rupes,
  "id" | "usado" | "data_cadastro" | "data_pagamento" | "pago" | "tipo_rupe"
>;

type RupesToUpdate = Partial<Omit<Rupes, "id" | "tipo_rupe">>;

type EstatisticaRupe = {
  total: number;
  pagos: number;
  Nao_pagos: number;
  Indisponiveis: number;
  disponivel: number;
  expirados: number;
};
