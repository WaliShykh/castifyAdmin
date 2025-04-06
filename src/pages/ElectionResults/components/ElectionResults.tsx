import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Button from "../../../components/ui/button/Button";
import Badge from "../../../components/ui/badge/Badge";
import { useNavigate } from "react-router";

interface Product {
  id: number;
  name: string;
  date: string;
  winner: string;
  status: "Announced" | "Pending" | "Canceled";
  action: string;
}

const tableData: Product[] = [
  {
    id: 1,
    name: "General Elections",
    winner: "Wali",
    date: "2025-09-20",
    status: "Pending",
    action: "Pending",
  },
  {
    id: 2,
    name: "General Elections",
    winner: "Wali",
    date: "2025-09-20",
    status: "Canceled",
    action: "Canceled",
  },
  {
    id: 3,
    name: "General Elections",
    winner: "Wali",
    date: "2025-09-20",
    status: "Announced",
    action: "Announced",
  },
  {
    id: 4,
    name: "General Elections",
    winner: "Wali",
    date: "2025-09-20",
    status: "Canceled",
    action: "Unavailble",
  },
  {
    id: 5,
    name: "General Elections",
    winner: "Wali",
    date: "2025-09-20",
    status: "Announced",
    action: "Announced",
  },
];

export default function ElectionResults() {
  const Navigate = useNavigate();
  return (
    <div className="overflow-y-auto rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.02] sm:px-6">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Title
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-10 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Winner
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-10 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-10 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-10 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-10 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.winner}
                </TableCell>
                <TableCell className="py-3 px-10 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.date}
                </TableCell>
                <TableCell className="py-3 px-10 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Announced"
                        ? "success"
                        : product.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>

                <TableCell className="py-3 px-10 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.action === "Announced" ? (
                    <Button
                      onClick={() => {
                        Navigate("/viewResults");
                      }}
                      size="sm"
                    >
                      View
                    </Button>
                  ) : product.action === "Canceled" ? (
                    <Button size="sm" variant="outline" disabled>
                      Cancelled
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Pending
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
