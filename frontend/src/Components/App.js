import React from "react";
import "./App.css";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Axios from "axios";
import CustomizedTables from "./KPI_table";

function App() {
  const [emp_kpi, setEmpKpi] = React.useState(null);
  React.useEffect(() => {
    Axios.get("http://localhost:8000/getEmployeeDetails", {
      params: { token: reactLocalStorage.get("token") }
    })
      .then(res => {
        console.log("token sent to backned", res.data);
        setEmpKpi(res.data);
      })
      .catch(err => console.log("err", err));
  }, []);

  const allEmployees = () => {
    if (emp_kpi !== null) {
        return (
          <CustomizedTables emp_detail = {emp_kpi.employee_details} kpi={emp_kpi.kpi}/>
        )
    }
  };
 
  if (!reactLocalStorage.get("token")) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="App">
      <Header />
      
      { allEmployees()}
    </div>
  );
}

export default App;
