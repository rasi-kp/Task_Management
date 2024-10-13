import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import AddProject from "./Addproject";
import Edittask from "./Edittask";
import { deleted } from "../service/service";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

// Function to recursively render children task
const renderTasks = (tasks, handleEditClick, handleDeleteClick) => {
  return tasks.map((task, index) => (
    <Card
      key={task.id}
      className=" border border-slate-950 p-3 rounded-md"
    >
      <CardBody>
        <div className="flex justify-between items-center mb-2">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Task {index + 1}: {task.title}
          </Typography>
          <div className="flex space-x-2">
            <FaEdit
              className="text-blue-500 cursor-pointer ml-7"
              onClick={() => handleEditClick(task.id)}
            />
           
            <FaTrashAlt
              className="text-blue-500 cursor-pointer ml-2"
              onClick={() => handleDeleteClick(task.id)}
            />
          </div>
        </div>
        <Typography className={task.completed ? "text-green-500 text-lg" : "text-red-500 text-lg"}>
          Completed: {task.completed ? "Yes" : "No"}
        </Typography>
        {task.children.length > 0 && (
          <div className="flex flex-col m-0 gap-2">
            <h4 className="bg-slate-400 m-2 p-1">Sub Tasks</h4>
            {renderTasks(task.children, handleEditClick, handleDeleteClick)}</div>
        )}
      </CardBody>
    </Card>
  ));
};

const TheBody = ({ refresh, plans }) => {
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [taskid, setTaskid] = useState(null);

  const closeAddPlan = () => {
    setAdd(!add); // Add task
  };

  const handleEditClick = (planId) => {
    setTaskid(planId);
    setEdit(!edit);
    console.log("clicked " + taskid);
  };
  useEffect(() => {
    if (taskid !== null) {
        console.log("clicked " + taskid); 
    }
}, [taskid]);

  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      try {
        const response = await deleted(id);
        if (response) {
          toast.success("Successfully deleted task");
          refresh(); // Trigger refresh 
        } else {
          toast.error(response.error || "Error occurred");
        }
      } catch (error) {
        toast.error("Error deleting task");
      }
    } else {
      console.log("Task deletion canceled");
    }
  };

  return (
    <div className="flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="mt-5 m-3 flex">
        <h2>All Tasks</h2>
        <button
          className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={closeAddPlan}
        >
          Create Task
        </button>
      </div>
      <hr className="border-black" />
      <div className="flex flex-wrap justify-center gap-10 mt-3">
        {renderTasks(plans, handleEditClick, handleDeleteClick)}
      </div>
      {add && <AddProject tasks={plans} closeAddPlan={closeAddPlan} refresh={refresh} />}
      {edit && <Edittask taskid={taskid} tasks={plans} closeAddPlan={handleEditClick} refresh={refresh} />}
      <ToastContainer />
    </div>
  );
};

export default TheBody;
