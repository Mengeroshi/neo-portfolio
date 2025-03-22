"use client";
import React from "react";

import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { type TTSongTable } from "@/app/album/[slug]/page";
import { ContentTypeIcon } from "../icons/ContentTypeIcon";
import { DifficultyIcon } from "../icons/DifficultyIcon";
import Link from "next/link";
import { LaunchIcon } from "@sanity/icons";

const columnHelper = createColumnHelper<
  TTSongTable[number] & { number: number }
>();

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
];

export const SongsTable = ({ songs }: { songs: TTSongTable }) => {
  const table = useReactTable({
    data: songs.map((song, i) => ({ ...song, number: i + 1 })),
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
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
                  className="border-b border-blue-900/60 font-light tracking-wider"
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
