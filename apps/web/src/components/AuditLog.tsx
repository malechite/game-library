import { useState } from "react";
import { VStack, HStack, Spacer, Span } from "@game-library/armature";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Pagination, usePagination } from "@game-library/cinder";
import { vars } from "@game-library/cinder/theme";
import { useAuditLogs } from "@game-library/sdk";
import { PageHeader } from "./PageHeader";
import { EmptyState } from "./EmptyState";
import { PageLoader } from "./PageLoader";

const PER_PAGE = 20;

const formatWhen = (value: string): string => new Date(value).toLocaleString();

const truncate = { maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;

const mono = { fontFamily: "var(--font-mono, monospace)", fontSize: 13 } as const;

/** The audit log table: newest action first, with server-side pagination. */
export const AuditLog = () => {
  const [page, setPage] = useState(0); // 0-based

  const { data: result, isPending } = useAuditLogs({
    $sort: { createdAt: -1 },
    $limit: PER_PAGE,
    $skip: page * PER_PAGE
  });

  const pagination = usePagination({
    pageIndex: page,
    totalCount: result?.total ?? 0,
    pageSize: PER_PAGE,
    onPageChange: setPage
  });

  const entries = result?.data ?? [];

  return (
    <VStack padding={6} gap={5} full>
      <PageHeader title="Audit Log" subtitle="Every action performed against the API." icon="ClipboardText" />

      {isPending ? (
        <PageLoader label="Loading audit log…" />
      ) : entries.length === 0 ? (
        <EmptyState icon="ClipboardText" title="No activity yet" description="API actions will be recorded here." />
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Target</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell style={{ whiteSpace: "nowrap" }}>{formatWhen(entry.createdAt)}</TableCell>
                  <TableCell>{entry.userEmail ?? <Span style={{ color: vars.color.mutedForeground }}>system</Span>}</TableCell>
                  <TableCell style={{ textTransform: "capitalize" }}>{entry.method}</TableCell>
                  <TableCell>{entry.service}</TableCell>
                  <TableCell style={{ ...truncate, ...mono, color: vars.color.mutedForeground }}>
                    {entry.targetId ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <HStack center padding={0}>
            <Spacer />
            <Pagination {...pagination.paginationProps} />
          </HStack>
        </>
      )}
    </VStack>
  );
};
