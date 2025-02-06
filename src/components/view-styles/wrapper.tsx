import { useAppStore } from "@/modules/services/stores/app";

type TViewStylesWrapperProps = Record<TPossibleViewStyles, React.ReactNode>;

export default function ViewStylesWrapper(
  data: Partial<TViewStylesWrapperProps>
) {
  const appState = useAppStore((state) => state);

  const dataToView = appState?.viewStyle ? data[appState.viewStyle] : null;
  return dataToView ? (
    dataToView
  ) : (
    <p className="text-center py-4 font-medium">
      Esta entidade não possuí este tipo de visualização. Peça à SOSOFT LDA que
      a adicione a esta entidade...
    </p>
  );
}
