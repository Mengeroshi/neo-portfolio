"use client";
import React from "react";

import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { ContentTypeIcon } from "../icons/ContentTypeIcon";
import { DifficultyIcon } from "../icons/DifficultyIcon";
import Link from "next/link";
import {
  EditIcon,
  EllipsisHorizontalIcon,
  LaunchIcon,
  TrashIcon,
} from "@sanity/icons";
import { type TAlbumBySlug } from "@/server/queries/Album";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "../Dropdowns/Dropdown";
import { usePathname, useRouter } from "next/navigation";

export type TAlbumSongs = Pick<TAlbumBySlug, "Songs">["Songs"];

const columnHelper = createColumnHelper<
  TAlbumSongs[number] & { number: number }
>();

const ActionsDropdown = ({
  id,
  songName,
}: {
  id: number;
  songName: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="outline-none">
          <button
            className="items-center justify-center"
            aria-label="songs table actions"
          >
            <EllipsisHorizontalIcon className="size-8" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent sideOffset={-2} className="tracking-wide">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                router.push(`${pathname}/edit?id=${id}`);
              }}
            >
              <EditIcon />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              className="data-[highlighted]:bg-red-900/40 data-[disabled]:text-red-900/20 data-[highlighted]:text-red-200"
              onClick={() => {
                router.push(`?delete=${id}&songName=${songName}`);
              }}
            >
              <TrashIcon /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

const columns = [
  columnHelper.accessor("number", {
    header: () => <div className="w-full pl-4 text-left">#</div>,
    cell: ({ getValue }) => <div className="pl-4">{getValue()}</div>,
    maxSize: 20,
    size: 20,
  }),
  columnHelper.accessor("ContentInfo.name", {
    id: "name",
    header: () => <div className="w-full text-left">Name</div>,
    cell: ({ getValue, row }) => (
      <Link
        target="_blank"
        href={row.original.ContentInfo.url ?? ""}
        className="flex items-center font-normal hover:underline"
      >
        {getValue()}
        <LaunchIcon className="opacity-0 group-hover:opacity-100" />
      </Link>
    ),
    minSize: 300,
  }),
  columnHelper.accessor("typeContent", {
    header: "Content Type",
    cell: (info) => {
      return (
        <div className="flex items-center justify-center">
          <ContentTypeIcon
            className="size-7"
            ContentType={info.row.original.typeContent}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor("difficulty", {
    header: "Difficulty",
    cell: (info) => (
      <div className="flex items-center justify-center">
        <DifficultyIcon difficulty={info.row.original.difficulty} />
      </div>
    ),
  }),
  {
    accessorKey: "actions",
    id: "actions",
    header: "Actions",
    cell: ({
      row: {
        original: {
          id,
          ContentInfo: { name },
        },
      },
    }: {
      row: { original: TAlbumSongs[0] };
    }) => <ActionsDropdown id={id} songName={name} />,
  },
];

export const SongsTable = ({ songs }: { songs: TAlbumSongs }) => {
  const table = useReactTable({
    data: songs.map((song, i) => ({ ...song, number: i + 1 })),
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false,
    autoResetExpanded: false,
  });

  return (
    <table
      cellSpacing={0}
      className="w-full border-separate border-y border-blue-900/60 text-blue-900/60"
    >
      <thead className="text-blue-900/40">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ position: "relative", width: header.getSize() }}
                  className="border-b border-blue-900/60 bg-blue-200 text-sm font-light tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    ></div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="">
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id} className="group tracking-wider hover:bg-blue-200">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    className="border-y border-transparent group-hover:border-blue-900/60 group-hover:text-blue-900"
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
