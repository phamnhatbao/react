import { ColumnDef, getCoreRowModel, SortingState, useReactTable, flexRender } from '@tanstack/react-table';
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react';

function Table<T>({
  data,
  columns,
  onSelectedChange,
  onSortingChange,
}: {
  data: T[];
  columns: ColumnDef<T, string>[];
  onSelectedChange?: any;
  onSortingChange?: any;
}): JSX.Element {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const cols: ColumnDef<T, string>[] = useMemo(() => {
    if (onSelectedChange) {
      columns.unshift({
        id: 'select',
        header: ({ table }: any) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }: any) => (
          <div className='pr-1'>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      });
    }

    return columns;
  }, [columns]);

  const table = useReactTable<T>({
    data,
    cols,
    state: {
      rowSelection,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    ...(onSelectedChange && { onRowSelectionChange: setRowSelection }),
    ...(onSortingChange && { onSortingChange: setSorting }),
  });

  const { getHeaderGroups, getRowModel, getSelectedRowModel } = table;

  useEffect(() => {
    if (!onSelectedChange) return;
    onSelectedChange(getSelectedRowModel().flatRows.map((flatRow) => flatRow.original));
  }, [rowSelection]);

  useEffect(() => {
    if (!onSortingChange) return;
    onSortingChange(sorting);
  }, [sorting]);

  return (
    <>
      <table className='w-full'>
        <thead>
          {getHeaderGroups().map((headerGroup) => (
            <tr className='border border-gray-300 border-r-0 border-l-0' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className='py-2 text-left first:pl-4' key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: (
                          <svg
                            className='ml-1 inline-block'
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='12'
                            viewBox='0 0 16 12'
                            fill='currentColor'
                          >
                            <path id='Polygon' data-name='Polygon' d='M8,0l8,12H0Z' transform={`translate(16 12) rotate(180)`} fill='currentColor' />
                          </svg>
                        ),
                        desc: (
                          <svg
                            className='ml-1 inline-block'
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='12'
                            viewBox='0 0 16 12'
                            fill='currentColor'
                          >
                            <path id='Polygon' data-name='Polygon' d='M8,0l8,12H0Z' transform={`translate(0) rotate(0)`} fill='currentColor' />
                          </svg>
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr className='border border-gray-300 border-r-0 borlder-l-0 h-10' key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className='first:pl-4' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current!.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type='checkbox' ref={ref} className={`${className} cursor-pointer`} {...rest} />;
}

export default Table;
