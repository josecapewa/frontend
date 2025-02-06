import { Skeleton } from "@/components/ui/skeleton";
import CustomToolTip from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { MdDelete } from "react-icons/md";

interface DisplayProperty<T> {
  getValue: keyof T | ((item: T) => string | number | React.ReactNode);
  label?: string;
}

interface CustomViewCardProps<T> {
  data: T;
  getPrimaryProperty: (data: T) => string;
  displayProperties?: DisplayProperty<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  getId: (item: T) => string;
}

interface CustomCardsProps<T> {
  data?: T[];
  getPrimaryProperty: (data: T) => string;
  displayProperties?: DisplayProperty<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  getId: (item: T) => string;
  emptyMessage?: string;
}

export default function CustomViewCards<T>({
  data,
  getPrimaryProperty,
  displayProperties,
  onEdit,
  onDelete,
  getId,
  emptyMessage = "Nenhum item encontrado",
}: CustomCardsProps<T>) {
  return (
    <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data ? (
        data.length > 0 ? (
          data.map((item) => (
            <CustomViewCard
              key={getId(item)}
              data={item}
              getPrimaryProperty={getPrimaryProperty}
              displayProperties={displayProperties}
              onEdit={onEdit}
              onDelete={onDelete}
              getId={getId}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            {emptyMessage}
          </div>
        )
      ) : (
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-28 2xl:h-36 rounded-lg" />
        ))
      )}
    </div>
  );
}

export function CustomViewCard<T>({
  data,
  getPrimaryProperty,
  displayProperties,
  onEdit,
  onDelete,
  getId,
}: CustomViewCardProps<T>) {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
      <h3 className="text-lg 2xl:text-2xl font-semibold text-ipilOrange mb-2">
        {getPrimaryProperty(data)}
      </h3>
      {displayProperties &&
        displayProperties.map(({ getValue, label }, index) => (
          <p
            key={`${getId(data)}-${index}`}
            className="text-sm 2xl:text-base text-gray-600 mb-2"
          >
            <strong>{label || ""}:</strong>{" "}
            {typeof getValue === "function"
              ? getValue(data)
              : (data[getValue] as React.ReactNode)}
          </p>
        ))}

      <div className="flex justify-end gap-1.5">
        <CustomToolTip text="Editar">
          <Button
            size="sm"
            className="flex gap-1"
            onClick={() => onEdit?.(data)}
          >
            <Pencil size={15} />
          </Button>
        </CustomToolTip>

        <CustomToolTip text="Eliminar">
          <Button
            size="sm"
            variant="destructive"
            color="danger"
            className="flex gap-1"
            onClick={() => onDelete?.(getId(data))}
          >
            <MdDelete size={15} />
          </Button>
        </CustomToolTip>
      </div>
    </div>
  );
}
