import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-10">
        <div className="animate-spin rounded-full h-[200px] w-[200px] border-t-4 border-blue-500 border-solid border-opacity-30 border-t-opacity-100"></div>
      </div>
    </div>);
};

export default Spinner;
