import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { baseMenuOptions } from "@/lib/side-bar-options";

export default function UserLevelViewDialog({
  userLevel,
  onDialogCloseClick,
}: {
  userLevel: UserLevel | null;
  onDialogCloseClick: () => void;
}) {
  const groupedPermissions = userLevel?.permissoes_telas.reduce((acc, curr) => {
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

          acc = subMenu.path.endsWith("/painel") ? `${subMenu.label} - Painel` : subMenu.label;
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
    <Dialog open={!!userLevel}>
      <DialogContent onDialogCloseClick={onDialogCloseClick}>
        <DialogTitle>
          Permissões do nível de usuário {userLevel?.nome}
        </DialogTitle>
        <DialogDescription>
          Saiba quais são as permissões do nível de usuário {userLevel?.nome}
        </DialogDescription>
        <div className="flex flex-col gap-6">
          {groupedPermissions &&
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
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
