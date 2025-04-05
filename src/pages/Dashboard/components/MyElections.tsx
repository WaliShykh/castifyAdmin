import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Badge from "../../../components/ui/badge/Badge";
import Button from "../../../components/ui/button/Button";
import { useNavigate } from "react-router";

interface Product {
  id: number;
  name: string;
  date: string;
  time: string;
  status: "Voted" | "Pending" | "Canceled";
  action: string;
}

const tableData: Product[] = [
  {
    id: 1,
    name: "General Elections",
    date: "2025-10-09",
    time: "8:00pm",
    status: "Pending",
    action: "Vote Now",
  },
  {
    id: 2,
    name: "General Elections",
    date: "2025-10-09",
    time: "8:00pm",
    status: "Canceled",
    action: "Cancelled",
  },
  {
    id: 3,
    name: "General Elections",
    date: "2025-10-09",
    time: "8:00pm",
    status: "Voted",
    action: "Voted",
  },
  {
    id: 4,
    name: "General Elections",
    date: "2025-10-09",
    time: "8:00pm",
    status: "Canceled",
    action: "Cancelled",
  },
  {
    id: 5,
    name: "General Elections",
    date: "2025-10-09",
    time: "8:00pm",
    status: "Voted",
    action: "Voted",
  },
];

export default function MyElections() {
  const Navigate = useNavigate();

  return (
    <div className="overflow-y-auto rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.02] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            My Elections
          </h3>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
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
                Balloting Date
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-10 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Due Time
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
                  {product.date}
                </TableCell>
                <TableCell className="py-3 px-10 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.time}
                </TableCell>
                <TableCell className="py-3 px-10 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Voted"
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
                  {product.action === "Vote Now" ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        Navigate("/");
                      }}
                    >
                      Vote Now
                    </Button>
                  ) : product.action === "Cancelled" ? (
                    <Button size="sm" variant="outline" disabled>
                      Unavailable
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>
                      Voted
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
