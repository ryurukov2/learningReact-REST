import { preChangeSteps } from "./HelperFunctions";

const PageButtons = ({ currentPage, numPages, setCurrentPage }) => {
  // console.log(numPages);
  const buttons = [...Array(numPages).keys()].map((_, i) => {
    return (
      <button key={i} onClick={() => {
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
            <button onClick={() => {
                preChangeSteps()
                setCurrentPage(currentPage - 1)}
            }>
                Previous
            </button>
        )}
        {buttons}
        {currentPage < numPages && (
            <button onClick={() => {
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
