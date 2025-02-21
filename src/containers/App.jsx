import React, { useState } from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Homepage } from './Homepage/Homepage';
import { Workdesk } from './Workdesk/Workdesk';

export const userDataContext = React.createContext();
let username = null;
let data = null;
// NOTE: Data object is currently loaded in #userForm component

function App() {
  // Connect server and database here! if it returns null or undefined throw error wrong login, if it returns object then all is good
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [routes, setRoutes] = useState([]);

  // All authentication is done in userForm; f is called upon success
  const handleAuthentication = (newData) => {
    data = newData;
    setIsAuthenticated(true);
    generateRoutes(data);
    return `/${data.workdesks[data.lastOpenedWorkdesk].path}`;
  };

  const updateUserData = (newData) => {
    data = newData;
  };

  // Routes pass down setIsAuthenticated for signOut
  const generateRoutes = (data) => {
    const newRoutes = data.workdesks.map((element) => (
      <Route
        key={element.name}
        path={element.path}
        element={
          <userDataContext.Provider value={{ data, updateUserData }}>
            <Workdesk setIsAuthenticated={setIsAuthenticated} />
          </userDataContext.Provider>
        }
      />
    ));
    setRoutes(newRoutes);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate replace to='home' />} />
        <Route path='*' element={<Navigate to='home' replace />} />
        <Route
          path='home'
          element={
            <Homepage
              onAuthenticate={handleAuthentication}
              username={username}
              data={data}
              updateUserData={updateUserData}
            />
          }
        />
        {/* If user is authorized generate routes, else just show homepage */}
        {data ? routes : undefined}
      </Routes>
    </HashRouter>
  );
}

export default App;
