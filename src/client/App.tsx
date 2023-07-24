import './App.scss';
import React, { useState, useEffect, useContext } from "react";
import WorkPlanBlank from './components/WorkPlanBlank'
import { WorkPlanInterface, WorkPlanModelInterface } from '../server/interfaces/WorkPlan';
import FullScreenSheet from './components/FullScreenSheet';
import { AppContext } from './context/AppContext'
import { startAutoActionTimer } from './resources/timer';

function App() {
  const { data, postNewData, modeSheet, setModeSheet, getAllData, newData, setNewData, nextSheetView, previousSheetView, indexSheetView, saveAllNewData, deleteDataBySheet } = useContext(AppContext);
 
  const sheet = data[indexSheetView];

  useEffect(()=> {
    getAllData();
  }, []);
  
  useEffect(()=> {
    const timer = startAutoActionTimer(5, handleSaveData);
    timer.startTimer();
    return () => timer.stop();
  }, [newData]);

  const handleSaveData = async () => {
    newData.length != 0 &&
    await saveAllNewData();
  };

  function getListNameData() {
    let allNames: Array<{ name: string, index: number }> = []
    Array.isArray(data) &&
    data.forEach((value, index) => {
      allNames.push({
        index: index,
        name: value.workname,
      });
    });
    return allNames;
  };

  const setOnNewData = (value: WorkPlanInterface) => {
    const indexOfOrigin: number = newData.findIndex((itemOfOrigin: WorkPlanInterface) => itemOfOrigin.id === value.id);
    if (indexOfOrigin !== -1) {
      const updatedNewData = [...newData];
      updatedNewData[indexOfOrigin] = value;
      setNewData(updatedNewData);
    }
    else {
      setNewData(newData.concat(value));
    }
  }

 
  return (
    <div className="App">
      <FullScreenSheet deleteSheet={ deleteDataBySheet } stateAutoSave={ modeSheet == 'Post' ? false : !newData.length } next={ nextSheetView } previous={ previousSheetView } setPostModeSheet={ () => { setModeSheet('Post') } } savePostSheet={ postNewData } listSheet={ (getListNameData()) }> 
        { modeSheet == 'Post'  && 
        <WorkPlanBlank getOutNewData={ (value: WorkPlanModelInterface) => setNewData(value) } isPostMode = { true }
        id={ -1 } workname='' startdate='2023-05-25' 
        expirationdate='2023-05-25' tasks={ [] } tools={ [] } materials={ [] } 
        totaltime= { 0 } workdays={ 0 } fidelitypercentage={ 0 } note=''/>
        }
        { modeSheet == 'Edit' && sheet &&
        <WorkPlanBlank key={sheet.id} getOutNewData={ (value: WorkPlanInterface) => setOnNewData(value) } isPostMode = { false }
        id={ sheet.id } workname={ sheet.workname} startdate={ sheet.startdate } 
        expirationdate={ sheet.expirationdate } tasks={ sheet.tasks } tools={ sheet.tools } materials={ sheet.materials } 
        totaltime= { sheet.totaltime } workdays={ sheet.workdays } fidelitypercentage={ sheet.fidelitypercentage } note={ sheet.note }/>
        }
      </FullScreenSheet>
    </div>
  );
}

export default App;