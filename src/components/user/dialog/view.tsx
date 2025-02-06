import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { baseMenuOptions } from "@/lib/side-bar-options";

export default function UserViewDialog({
  user,
  onDialogCloseClick,
}: {
  user: User | null;
  onDialogCloseClick: () => void;
}) {
  const groupedPermissions = user?.permissoes_telas.reduce((acc, curr) => {
    if (!acc[curr.caminho_tela]) {
      acc[curr.caminho_tela] = [];
    }
    acc[curr.caminho_tela].push(curr.permissao);
    return acc;
  }, {} as Record<string, Permission[]>);

  const findLabelByPath = (caminhoTela: string) => {
    if (baseMenuOptions.path === caminhoTela) {
      return baseMenuOptions.label;
    } else {
      return baseMenuOptions.children?.reduce((acc, subMenu) => {
        if (subMenu.path === caminhoTela) {
          acc = subMenu.path.endsWith("/painel")
            ? `${subMenu.label} - Painel`
            : subMenu.label;
        } else if (subMenu.children) {
          subMenu.children.forEach((child) => {
            if (child.path === caminhoTela) {
              acc = `${subMenu.label} - ${child.label}`;
            }
          });
        }
        return acc;
      }, "");
    }
  };

  return (
    <Dialog open={!!user}>
      <DialogContent onDialogCloseClick={onDialogCloseClick}>
        <DialogTitle>Permissões do usuário {user?.pessoa.nome}</DialogTitle>
        <DialogDescription>
          Saiba quais são as permissões do usuário {user?.nome_usuario}
        </DialogDescription>
        <div className="flex flex-col gap-6">
          {user?.is_master ? (
            <div className="bg-orange-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-ipilOrangeLight">
                Acesso Total
              </h3>
              <p className="text-gray-700 mt-2">
                Este usuário possui acesso a todas as funcionalidades do
                sistema.
              </p>
            </div>
          ) : (
            groupedPermissions &&
            Object.entries(groupedPermissions).map(
              ([caminhoTela, permissoes]) => (
                <div key={caminhoTela} className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold text-ipilOrange">
                    {findLabelByPath(caminhoTela) ?? "Tela não encontrada"}
                  </h3>
                  <ul className="list-disc list-inside mt-2">
                    {permissoes.map((permissao, index) => (
                      <li key={index} className="text-gray-700">
                        {permissao}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
