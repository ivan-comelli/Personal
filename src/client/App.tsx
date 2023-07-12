import './App.scss';
import React, { useState, useEffect } from "react";
import WorkPlanBlank from './components/WorkPlanBlank'
import { WorkPlanInterface, WorkPlanModelInterface } from '../server/interfaces/WorkPlan';
import FullScreenSheet from './components/FullScreenSheet';

function App() {

  const [newData, setNewData] = useState<WorkPlanModelInterface>();
  const [data, setData] = useState<WorkPlanInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState<WorkPlanInterface>();
  const [index, setIndex] = useState<number>(0);
  const [postModeWorkPlan, setPostModeWorkPlan] = useState<boolean>(false)

  let port = process.env.REACT_APP_SERVER_PORT;
  port = port !== undefined ? ':' + port : '';
  let host = process.env.REACT_APP_SERVER_HOST;
  host = host !== undefined ? host : '';

  const endpoint =  host + port + '/api/planes-de-trabajo/';

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setSheet(data[index]);
  }, [index, data]);

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint);
      const jsonData = await response.json();
      setData(jsonData);
      setSheet(jsonData[index]);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const postData = async () => {      
    if(newData?.workname) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        });
        const jsonData: WorkPlanInterface = await response.json();
        setData([...data, jsonData]);
        setPostModeWorkPlan(false);
        return jsonData;
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const updateData = async (value: WorkPlanInterface) => {
    if(value.id) {
      try {
        const response = await fetch(endpoint + value.id, {
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
  }

  const setNextSheet = () => {
    let maxIndex = data.length - 1;
    index < maxIndex && setIndex(index + 1);        
  }
  const setPreviousSheet = () => {
    let minIndex = 0;
    index > minIndex && setIndex(index - 1);        
  }

  function getListNameData() {
    let allNames: Array<{ name: string, index: number }> = []
    data &&
    data.map((value, index) => {
      allNames.push({
        index: index,
        name: value.workname,
      });
    });
    return allNames;
  };
  
  return (
    <div className="App">
      <FullScreenSheet next={ setNextSheet } previous={ setPreviousSheet } getPostSheet={ () => { setPostModeWorkPlan(true) } } savePostSheet={ postData } listSheet={ (getListNameData()) }> 
        { postModeWorkPlan  && 
        <WorkPlanBlank getNew={ (value: WorkPlanModelInterface) => setNewData(value) } writeChange={ null } onPostMode = { postModeWorkPlan }
        loading={ loading } id={ -1 } workname='' startdate='2023-05-25' 
        expirationdate='2023-05-25' tasks={ [] } tools={ [] } materials={ [] } 
        totaltime= { 0 } workdays={ 0 } fidelitypercentage={ 0 } note=''/>
        }
        { !postModeWorkPlan && sheet &&
        <WorkPlanBlank key={sheet.id} getNew={null} writeChange={ updateData } onPostMode = { postModeWorkPlan }
        loading={ loading } id={ sheet.id } workname={ sheet.workname} startdate={ sheet.startdate } 
        expirationdate={ sheet.expirationdate } tasks={ sheet.tasks } tools={ sheet.tools } materials={ sheet.materials } 
        totaltime= { sheet.totaltime } workdays={ sheet.workdays } fidelitypercentage={ sheet.fidelitypercentage } note={ sheet.note }/>
        }
      </FullScreenSheet>
    </div>
  );
}

export default App;