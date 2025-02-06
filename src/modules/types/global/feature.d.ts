type Feature
 = {
    id: string;
    nome: string;
    descricao: string;
}
type FeatureToCreate= Omit<IFeature, "id">

type FeatureToUpdate = Partial<IFeatureToCreate>