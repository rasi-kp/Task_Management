import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import SidePanel from "./SidePanel"
import TheBody from "./TheBody"
import { useNavigate } from "react-router-dom"

import { fetchTasks } from "../service/service"


const Main = () => {
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetchTasks();
        console.log(response);
        setPlans(response.tasks)
      } catch (error) {
        console.error(error);
      }
    }
    fetching()

  }, [refresh])
  // Function to refresh
  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };
  return (
    <>
      <Navbar />
      <div className="">
        {/* <SidePanel/> */}
        <TheBody refresh={handleRefresh} plans={plans} />
      </div>

    </>
  )
}

export default Main