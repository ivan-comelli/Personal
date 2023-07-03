import './App.scss';
import React, { useState, useEffect } from "react";
import WorkPlanBlank from './components/WorkPlanBlank'
import { WorkPlanInterface } from './interfaces/WorkPlan';



function App() {

  const [data, setData] = useState<WorkPlanInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/planes-de-trabajo');
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateData = async (value: WorkPlanInterface) => {
    try {
      const response = await fetch('http://localhost:3001/api/planes-de-trabajo/' + value.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (
    <div className="App">
      { !loading && data && (
        data.map((item: WorkPlanInterface) => {
          return (
            <WorkPlanBlank writeChange={ updateData }
            loading={ loading } key={ item.id } id={ item.id } workName={ item.workName} startDate={ item.startDate } 
            expirationDate={ item.expirationDate } tasks={ item.tasks } tools={ item.tools } materials={ item.materials } 
            totalTime= { item.totalTime } workDays={ item.workDays } fidelityPercentage={ item.fidelityPercentage } note="Nada para comentar"/>
          );
        })
      )}
    </div>
  );
}

export default App;