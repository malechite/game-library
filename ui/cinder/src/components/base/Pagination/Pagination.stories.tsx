import { centerStory } from "@storybook-decorators";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination";
import { usePagination } from "./usePagination";

const meta: Meta<typeof Pagination> = {
  title: "Cinder/Navigation/Pagination",
  decorators: [centerStory],
  component: Pagination
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationExample = ({ totalCount }: { totalCount: number }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pagination = usePagination({
    totalCount,
    pageIndex,
    onPageChange: setPageIndex
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
      <Pagination {...pagination.paginationProps} />
      <span style={{ fontSize: "0.875rem", opacity: 0.6 }}>
        Showing {pagination.startItem}–{pagination.endItem} of {pagination.totalCount}
      </span>
    </div>
  );
};

export const Default: Story = {
  render: () => <PaginationExample totalCount={100} />
};

export const FewPages: Story = {
  render: () => <PaginationExample totalCount={30} />
};

export const ManyPages: Story = {
  render: () => <PaginationExample totalCount={500} />
};

export const SinglePage: Story = {
  render: () => <PaginationExample totalCount={5} />
};
