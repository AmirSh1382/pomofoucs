import React from "react";

const TaskBody = () => {
  return (
    <div className="mt-5 pb-10">
      <button 
        className="border-2  border-dashed border-add-btn rounded-lg text-add-btn
          w-full transition bg-add-btn hover:bg-add-btn-hover py-3 "
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskBody;
