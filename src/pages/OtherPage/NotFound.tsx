import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import errorImage from "../../assets/images/common/castify404.png";

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Castify 404 - Online Voting Platform"
        description="Castify - A secure and efficient online voting platform"
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <img src={errorImage} alt="404" />
          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            We can't seem to find the page you are looking for!
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    </>
  );
}
