import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "./Table";

const meta: Meta<typeof Table> = {
  title: "Cinder/Display/Table",
  decorators: [centerStory],
  component: Table
};
export default meta;
type Story = StoryObj<typeof Table>;

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" }
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map(({ invoice, status, method, amount }) => (
          <TableRow key={invoice}>
            <TableCell>{invoice}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{method}</TableCell>
            <TableCell style={{ textAlign: "right" }}>{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell style={{ textAlign: "right" }}>$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
};
