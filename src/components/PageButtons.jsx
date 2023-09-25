import { preChangeSteps } from "../HelperFunctions";

const PageButtons = ({ currentPage, numPages, setCurrentPage }) => {
  const buttons = [...Array(numPages).keys()].map((_, i) => {
    return (
      <button className="px-2 py-0 m-0.5 bg-gray-500 text-white rounded-lg focus:outline-none hover:bg-gray-700" key={i} onClick={() => {
        preChangeSteps()
        setCurrentPage(i + 1)
      }}>
        {i + 1}
      </button>
    );
  });

  return (
    <div>
        {currentPage > 1 && (
            <button className="px-2 py-0 m-0.5 bg-gray-500 text-white rounded-lg focus:outline-none hover:bg-gray-700" onClick={() => {
                preChangeSteps()
                setCurrentPage(currentPage - 1)}
            }>
                Previous
            </button>
        )}
        {buttons}
        {currentPage < numPages && (
            <button className="px-2 py-0 m-0.5 bg-gray-500 text-white rounded-lg focus:outline-none hover:bg-gray-700" onClick={() => {
                preChangeSteps()
                setCurrentPage(currentPage + 1)}
            }>
                Next
            </button>
        )}
    </div>
);
};

export default PageButtons;
