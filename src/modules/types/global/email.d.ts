interface Email {
  id: string;
  email: string;
  id_pessoa: string;
  quota?: string;
  pessoa: Person;
}

interface IEmailToCreate extends Omit<Email, "id"> {}

interface IEmailToUpdate extends Partial<IEmailToCreate> {}