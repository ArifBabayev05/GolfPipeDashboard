import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Person",
        accessor: "marca"
      },
      {
        Header: "Organization",
        accessor: "modelo"
      },
      {
        Header: "Title",
        accessor: "segmento"
      },
      {
        Header: "Value",
        accessor: "anio"
      }
    ],
    []
  );

  return columns;
}
