import React, { useEffect, useState, Fragment } from "react";
import { create } from 'zustand';

// const Employee = (props) => (
//   <tr>
//     <td>{props.employees.first_name} key={props.employees.id}</td>
//     <td>{props.employees.last_name} key={props.employees.id}</td>
//     <td>{props.employees.department.name} key={props.employees.id}</td>
//     <td>{props.employees.manager} key={props.employees.id}</td>
//     <td>{props.employees.is_active} key={props.employees.id}</td>
//   </tr>
//  );

export default function EmployeeList(props) {
  const [employees, setEmployees] =useState([]);
  const [employeesLoaded, setEmployeesLoaded] = useState(false);

  // const useEmployeeStore = create((set) => ({
  //   employees: props.employees,
  // }))
  // const [employees, setEmployees] = useState([]);
  // console.log(`this is the props.employees in the employeeList: ${props.employees}`)
  // useEffect(() =>{
  //   setEmployees(JSON.parse(window.localStorage.getItem('employees')));
  // }, []);

  async function getEmployees() {
    const response = await fetch(`http://localhost:5000/employees/`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    
    const employees = await response.json();
    console.log(`This is the GET Response: ${employees.individuals[2].first_name}`)
    setEmployees(employees.individuals);
    console.log(`the employees in Employee List: ${employees}`)
    setEmployeesLoaded(true);
  }

  // This method will map out the employees on the table
  function employeeList() {
    console.log('employeeList function: ', employees);
    return employees.map((employee) => {
      return (
        <tr>
          <td>{employee.first_name} key={employee.id}</td>
          <td>{employee.last_name} key={employee.id}</td>
          <td>{employee.department.name} key={employee.id}</td>
          <td>{employee.manager} key={employee.id}</td>
          <td>{employee.is_active} key={employee.id}</td>
        </tr>
      );
    });
  }

  if (employees.length > 1) {
    console.log('there are employees in the list component')
    console.log(employees)
  } else {
    getEmployees();
  }
  
 // This following section will display the table with the employee information.
 return (
   <div>
     <h3>Employee List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Department</th>
           <th>Manager</th>
           <th>Active?</th>
         </tr>
       </thead>
        <tbody>
          {employees.map((employee,i) => {
            return         
            <tr>
              <td>{employee.first_name} key={i}</td>
              <td>{employee.last_name} key={i}</td>
              <td>{employee.department.name} key={i}</td>
              <td>{employee.manager} key={i}</td>
              <td>{employee.is_active} key={i}</td>
          </tr>
          })}
        
        </tbody>

     </table>
   </div>
 );
}