import React, { ReactNode, useState } from "react";
import CustomToolTip from "@/components/custom/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowUp, Pencil } from "lucide-react";
import { MdDelete } from "react-icons/md";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { usePermissions } from "@/modules/hooks/use-permissions";

interface CustomTableProps<T> {
  data?: T[];
  headers: string[];
  columns: {
    align?: "left" | "center" | "right" | "justify" | "char";
    data: keyof T | ((item: T) => string | number | React.ReactNode);
    className?: string;
    isEditable?: boolean;
  }[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  addOperation?:
    | ((item: T) => React.ReactNode)
    | ((item: T) => React.ReactNode)[];
  getId?: (item: T) => string;
  emptyMessage?: string;
  caption?: string;
  useNumbering?: boolean;
  onRowClick?: (item: T) => void;
}

export default function CustomTable<T>({
  data,
  headers,
  columns,
  onEdit,
  onDelete,
  getId,
  emptyMessage = "Sem dados cadastrados",
  caption,
  useNumbering = true,
  onRowClick,
  addOperation,
}: CustomTableProps<T>) {
  const { hasPermission } = usePermissions();
  const canEdit = hasPermission("EDITAR") && onEdit !== undefined;
  const canDelete = hasPermission("ELIMINAR") && onDelete !== undefined;

  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (colIndex: number) => {
    if (sortColumn === colIndex) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(colIndex);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!data || sortColumn === null) return data;

    const { data: columnData } = columns[sortColumn];

    return [...data].sort((a, b) => {
      // Obtém os valores da coluna, que podem ser string, número ou React.ReactNode
      const aValue =
        typeof columnData === "function" ? columnData(a) : a[columnData];
      const bValue =
        typeof columnData === "function" ? columnData(b) : b[columnData];

      // Função para extrair texto de um React.ReactNode
      const getTextContent = (
        node:
          | string
          | number
          | boolean
          | ReactNode
          | Iterable<ReactNode>
          | T[keyof T]
          | null
          | undefined
      ): string => {
        if (typeof node === "string" || typeof node === "number") {
          return String(node);
        } else if (React.isValidElement(node)) {
          return node.props.children ? getTextContent(node.props.children) : "";
        } else if (Array.isArray(node)) {
          return node.map(getTextContent).join("");
        }
        return "";
      };

      // Extrai texto dos valores
      const aText = getTextContent(aValue);
      const bText = getTextContent(bValue);

      // Comparação dos valores extraídos
      if (aText == null && bText == null) return 0;
      if (aText == null) return sortOrder === "asc" ? 1 : -1;
      if (bText == null) return sortOrder === "asc" ? -1 : 1;

      return sortOrder === "asc"
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });
  }, [data, sortColumn, sortOrder, columns]);

  return (
    <Table className="mt-4 h-full rounded-t-md overflow-hidden">
      {caption && (
        <TableCaption className="font-bold">
          {caption} ({data?.length || 0})
        </TableCaption>
      )}
      <TableHeader className="bg-ipilOrange text-lg text-white select-none font-bold">
        <TableRow className="hover:bg-ipilOrange">
          {useNumbering && <TableHead className="text-center">Nº</TableHead>}
          {headers.map((header, index) => (
            <TableHead key={index} onClick={() => handleSort(index)}>
              <span className="hover:underline cursor-pointer flex items-center justify-center gap-2">
                {header}
                {sortColumn === index && (
                  <ArrowUp
                    size={15}
                    className={clsx("transition-all", {
                      "transform rotate-180": sortOrder === "asc",
                    })}
                  />
                )}
              </span>
            </TableHead>
          ))}
          {(canEdit || canDelete || addOperation) && (
            <TableHead className="text-center w-min">Operações</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="h-full text-base">
        {sortedData ? (
          sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <TableRow
                onClick={() => onRowClick?.(item)}
                key={getId?.(item)}
                className={cn(
                  "appear transition-all hover:bg-gray-200",
                  {
                    "bg-[#d96f3277] hover:bg-[#d96f3294]": index % 2 !== 0,
                  },
                  {
                    "cursor-pointer": onRowClick,
                  }
                )}
              >
                {useNumbering && (
                  <TableCell className="text-center font-medium">
                    {index + 1}
                  </TableCell>
                )}
                {columns.map(
                  ({ data, align = "center", className }, colIndex) => (
                    <TableCell
                      className={className}
                      align={align}
                      key={colIndex}
                    >
                      {typeof data === "function"
                        ? data(item)
                        : (item[data] as React.ReactNode)}
                    </TableCell>
                  )
                )}
                {(canEdit || canDelete || addOperation) && (
                  <TableCell className="flex items-center h-full gap-2 text-sm justify-center">
                    {typeof addOperation === "function"
                      ? addOperation(item)
                      : addOperation?.map((operation) => operation(item))}
                    {onEdit && (
                      <CustomToolTip text="Editar">
                        <Button
                          className="aspect-square"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit?.(item);
                          }}
                        >
                          <Pencil size={15} />
                        </Button>
                      </CustomToolTip>
                    )}
                    {onDelete && (
                      <CustomToolTip text="Eliminar">
                        <Button
                          className="aspect-square"
                          variant="destructive"
                          color="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (getId) onDelete?.(getId(item));
                          }}
                        >
                          <MdDelete size={15} />
                        </Button>
                      </CustomToolTip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length + 2} className="text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )
        ) : (
          <TableRow>
            <TableCell className="p-0" colSpan={headers.length + 2}>
              <Skeleton className="w-full h-12 rounded-none" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
