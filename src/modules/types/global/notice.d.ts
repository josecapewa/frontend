type Notice = {
  id: string;
  title: string;
  conteudo: string;
};
type NoticeToCreate = Omit<Notice, "id">;
type NoticeToUpdate = Partial<NoticeToCreate>;
