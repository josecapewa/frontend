type Message = {
  id: string;
  texto: string;
  id_telefone: string;
  created_at: string;
  telefone: Phone;
};

type MessageToCreate = Pick<Message, 'texto'> & {
  destinatarios: {
    nome: string;
  }[];
};

type MessageToUpdate = Partial<MessageToCreate>;
