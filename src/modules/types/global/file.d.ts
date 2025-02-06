type File
 = {
  id: string;
  nome: string;
  observacao: string | null;
  data_upload: Date;
  id_tipo_arquivo: string;
  caminho: string;
  tipo_arquivo: FileType;
}