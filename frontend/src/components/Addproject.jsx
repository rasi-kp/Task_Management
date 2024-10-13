import React, { useState } from 'react';
import { submitProject } from '../service/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProject = ({ tasks, closeAddPlan,refresh }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false); 
  const [parent_id, setMainTask] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = { title, completed, parent_id };
    try {
      const response = await submitProject(projectData);
      console.log('Project submitted successfully:', response);
      if (response) {
        toast.success("Successfully created new Project");
        refresh();
        setTimeout(() => {
          closeAddPlan();
        }, 1000);
      } else {
        toast.error(response.error || "User Already Exist");
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error(error.message || "An unknown error occurred");
    }
    
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white p-8 rounded-lg z-10" style={{ width: "500px" }}>
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Title:</label>
              <input
                className="border border-black ml-2 rounded-sm w-full"
                type="text"
                name="planName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Completed:</label>
              <select
                className="border border-black ml-2 rounded-sm w-full"
                value={completed}
                onChange={(e) => setCompleted(e.target.value === 'true')} // convert to boolean
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Main Task:</label>
              <select
                className="border border-black ml-2 rounded-sm w-full"
                value={parent_id}
                onChange={(e) => setMainTask(e.target.value)}
              >
                <option value="">Select Parent Task</option>
                {tasks.map((task, index) => (
                  <option key={task.id} value={task.id}>
                    {index + 1}. {task.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <button
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                type="submit">Add Project
              </button>
              <button
                className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg ml-2"
                type="button"
                onClick={closeAddPlan}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProject;
