import React, { useState, useEffect} from 'react';
import Center from 'react-center';
import axios from 'axios';
import DropdownProviders from './components/dropdown.js';
import EmployeeList from './components/employeeList';

function App () {
  const [provider, setProvider] =useState('');
  const [employees, setEmployees] =useState({});
  const [company, setCompany] = useState({});
  const [tokenFetched, setTokenFetched] =useState(false);
  const [employeesLoaded, setEmployeesLoaded] = useState(false);
  const [isFetchingToken, setIsFetchingToken] =useState(false);
  const [isFetchingEmployees, setIsFetchingEmployees] =useState(false);
  const [isFetchingCompany, setIsFetchingCompany] =useState(false);

  const fetchToken = (passedProvider) => {
    setIsFetchingToken(true);
    setProvider(passedProvider);
    // console.log('this is the provider passed to the App Component: ', passedProvider);
    // console.log('this is the provider in the App state: ', provider);
    // console.log('this is the isFetchingToken in the App state: ', isFetchingToken);

    axios.post('http://localhost:5000/createToken', {
      provider: passedProvider
    })
    .then((response) => {
        console.log('*******THIS IS THE POST RESPONSE: ',response);
        if(response.status === 200) {
          setTokenFetched(true);
          // getEmployees();
          // console.log(`employees keys in the App state: ${Object.keys(employees)}`);
          // fetchCompany();
        }
    })
    .catch((error) => {
      console.log('post error: ', error);
    })
  }
   
   async function fetchCompany() {
    const response = await fetch(`http://localhost:5000/company/`);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    } 

    const company = await response.json();
    setCompany(company);
   }

    return (
      <Center>
            {
              <div>
                <DropdownProviders 
                  fetchToken={fetchToken}
                  />
                <EmployeeList
                  // employees={employees}
                  // employeeList={employeeList}
                  tokenFetched = {tokenFetched}
                  setTokenFetched={setTokenFetched}
                />
              </div>
            }
      </Center>
    )
}

export default App;