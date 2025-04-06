import { BoxIconLine, GroupIcon } from "../../../icons";
import Badge from "../../../components/ui/badge/Badge";

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.02] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Voting Status
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              Pending
            </h4>
          </div>
          <Badge color="error">Pending</Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.02] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Ongoing Elections
            </span>
            <h4
              title="General Elections"
              className="mt-2 font-bold w-40 line-clamp-1 text-wrap text-gray-800 text-title-sm dark:text-white/90"
            >
              General Elections
            </h4>
          </div>

          <Badge color="warning">Vote Now</Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.02] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Upcoming Elections
            </span>
            <h4
              title="President Elections"
              className="mt-2 font-bold w-40 line-clamp-1 text-wrap text-gray-800 text-title-sm dark:text-white/90"
            >
              President Elections
            </h4>
          </div>

          <Badge color="info">2025-10-02</Badge>
        </div>
      </div>
    </div>
  );
}
