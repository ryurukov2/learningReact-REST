const PageButtons = ({ currentPage, numPages, setCurrentPage, preChange }) => {
//   console.log(currentPage);
  const buttons = [...Array(numPages).keys()].map((_, i) => {
    return (
      <button key={i} onClick={() => {
        preChange()
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
                preChange()
                setCurrentPage(currentPage - 1)}
            }>
                Previous
            </button>
        )}
        {buttons}
        {currentPage < numPages && (
            <button onClick={() => {
                preChange()
                setCurrentPage(currentPage + 1)}
            }>
                Next
            </button>
        )}
    </div>
);
};

export default PageButtons;
