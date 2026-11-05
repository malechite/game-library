"use client";

import * as React from "react";

import { cn } from "../../../lib/utils";
import {
  tableContainer,
  table as tableStyle,
  tableHeader as tableHeaderStyle,
  tableBody as tableBodyStyle,
  tableFooter as tableFooterStyle,
  tableRow as tableRowStyle,
  tableHead as tableHeadStyle,
  tableCell as tableCellStyle,
  tableCaption as tableCaptionStyle
} from "./Table.css";

const Table = ({ className, ...props }: React.ComponentProps<"table">) => (
  <div data-slot="table-container" className={tableContainer}>
    <table data-slot="table" className={cn(tableStyle, className)} {...props} />
  </div>
);

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => (
  <thead data-slot="table-header" className={cn(tableHeaderStyle, className)} {...props} />
);

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => (
  <tbody data-slot="table-body" className={cn(tableBodyStyle, className)} {...props} />
);

const TableFooter = ({ className, ...props }: React.ComponentProps<"tfoot">) => (
  <tfoot data-slot="table-footer" className={cn(tableFooterStyle, className)} {...props} />
);

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => (
  <tr data-slot="table-row" className={cn(tableRowStyle, className)} {...props} />
);

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => (
  <th data-slot="table-head" className={cn(tableHeadStyle, className)} {...props} />
);

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => (
  <td data-slot="table-cell" className={cn(tableCellStyle, className)} {...props} />
);

const TableCaption = ({ className, ...props }: React.ComponentProps<"caption">) => (
  <caption data-slot="table-caption" className={cn(tableCaptionStyle, className)} {...props} />
);

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
