import React, { useState, useEffect } from "react";
import { WorkPlanInterface, TasksType, ToolsType, MaterialsType } from '../../../server/interfaces/WorkPlan';
import "./style.scss";

interface WorkPlanBlankInterface extends WorkPlanInterface {
  writeChange: any,
  getNew: any,
  onPostMode: boolean,
  loading: boolean
}

type ListsType = {
  lists: {
    tasks: TasksType[],
    tools: ToolsType[],
    materials: MaterialsType[]
  }
}

export const Box = ({writeChange, getNew, onPostMode, loading, ...props}: WorkPlanBlankInterface) => {
  const maxLengthInput = 18;

  const [dataUpdated, setDataUpdated] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);

  //Inicializamos datos principales y completar listas con registros en blanco para inputs vacios.
  const [data, setData] = useState(() => {
    let initialData: WorkPlanInterface = { ...props };
    let finalData: WorkPlanInterface = { ...props, tasks:[], tools:[], materials: [] };
    initialData.tasks.map(item => (
      finalData.tasks[item.index] = item
    ));
    initialData.tools.map(item => (
      finalData.tools[item.index] = item
    ));
    initialData.materials.map(item => (
      finalData.materials[item.index] = item
    ));
    for(let index = 0; index < 14; index++) {
      if(finalData.tasks[index] === undefined) {
        finalData.tasks[index] = { id: undefined, title: undefined, breakpoint: false, workplanid: initialData.id, index: index }
      }
      if(finalData.tools[index] === undefined) {
        finalData.tools[index] = { id: undefined, name: undefined, breakpoint: false, fix: false, workplanid: initialData.id, index: index }
      }
      if(finalData.materials[index] === undefined) {
        finalData.materials[index] = { id: undefined, name: undefined, fix: false, workplanid: initialData.id, index: index }
      }
    }
    return (finalData);
  });

  //Timer para auto guardado
  useEffect(() => {
    let intervalId: any;
    let lapse = 2;
    const startTimer = () => {
      let seconds = 0;  

      intervalId = setInterval(() => {
        if (seconds > lapse) {
          setResetTimer(true);
          if(dataUpdated) {
            if(!onPostMode) {
              writeChange(data).then(({ lists }: ListsType) => {
                lists.tasks.map(item => {
                  let newData = data;
                  newData.tasks[item.index].id = item.id;
                  setData(newData);
                })
                lists.tools.map(item => {
                  let newData = data;
                  newData.tools[item.index].id = item.id;
                  setData(newData);
                })
                lists.materials.map(item => {
                  let newData = data;
                  newData.materials[item.index].id = item.id;
                  setData(newData);
                })
              });
            }
            else {
              getNew(data);
            }
            setDataUpdated(false);
          }
        } else {
          seconds++;
        }
      }, 1000);
    };
  
    if (resetTimer) {
      clearInterval(intervalId);
      startTimer();
      setResetTimer(false);
    } else {
      startTimer();
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [resetTimer]);

  type handleChangeListType = {
    event: React.ChangeEvent<HTMLInputElement>,
    model: 'tasks' | 'tools' | 'materials',
    index: number
  }

  const handleChangeList = ({event, model, index}: handleChangeListType) => {
    let newData = {...data};
    switch(model) {
      case 'tasks':
        newData.tasks[index].title = event.target.value;
      break;
      case 'tools':
        newData.tools[index].name = event.target.value;
      break;
      case 'materials':
        newData.materials[index].name = event.target.value;
      break;
    }
     
    setData(newData);
    setDataUpdated(true);
  };

  type handleChangeStatsType = {
    event: React.ChangeEvent<HTMLInputElement>,
    propStat: 'totalTime' | 'workDays' | 'fidelityPercentage',
  }

  const handleChangeStats = ({event, propStat}: handleChangeStatsType) => {
    let value = parseInt(event.target.value);
    switch(propStat) {
      case 'totalTime':
        setData({...data, totaltime: value}); 
      break;
      case 'workDays':
        setData({...data, workdays: value});
      break;
      case 'fidelityPercentage':
        setData({...data, fidelitypercentage: value});
      break;
    }
    setDataUpdated(true);
  }

  const handleChangeSimple = (event: React.ChangeEvent<HTMLInputElement>, prop: keyof WorkPlanInterface) => {
    console.log(event.target.value)
    setData({...data, [prop]: event.target.value});
    setDataUpdated(true);
  }

  return (
    <div className="box">
      <div className="form">
        {
          !loading && (
            <div className="fields">
              <header className="header">
                <div className="label">
                  <div className="name">
                    <input className="paper-input" value={data.workname} onChange={(event) => handleChangeSimple(event, "workname" as keyof WorkPlanInterface)}/>
                  </div>
                  <div className="lots">
                    <div className="lot-wrapper">{ 1 }</div>
                    <div className="lot-wrapper">{ 1 }</div>
                  </div>
                </div>
                <div className="date">
                  <div className="start">
                    <div className="day">{  }</div>
                    <div className="mounth">{  }</div>
                    <div className="year">{  }</div>
                  </div>
                  <div className="limit">
                    <div className="day">{  }</div>
                    <div className="mounth">{  }</div>
                    <div className="year">{  }</div>
                  </div>
                </div>
              </header>
              <div className="content">
                <div className="tasks flex-list">
                  {
                    data.tasks.map((item, index) => (
                      <div className="input-wrapper">
                        <input key={index} className="paper-input" type="text" value={item.title} onChange={(event) => handleChangeList({event, model: "tasks", index: item.index})} maxLength={maxLengthInput} />
                      </div>
                    ))                    
                  }
                </div>
                <div className="tools flex-list">
                  {
                    data.tools.map((item, index) => (
                      <div className="input-wrapper">
                        <input key={index} className="paper-input" type="text" value={item.name} onChange={(event) => handleChangeList({event, model: "tools", index: item.index})} maxLength={maxLengthInput} />
                      </div>
                    ))
                  }
                </div>
                <div className="flex-list">
                  {
                    data.materials.map((item, index) => (
                      <div className="input-wrapper">
                        <input key={index} className="paper-input" type="text" value={item.name} onChange={(event) => handleChangeList({event, model: "materials", index: item.index})} maxLength={maxLengthInput} />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="stats">
                <div className="time fill-wrapper">
                  <input className="paper-input" type="text" value={data.totaltime} onChange={(event) => handleChangeStats({event, propStat: "totalTime"}) }/>
                </div>
                <div className="journeys fill-wrapper">
                  <input className="paper-input" type="text" value={data.workdays} onChange={(event) => handleChangeStats({event, propStat: "workDays"}) }/>
                </div>
                <div className="fidelity fill-wrapper">
                  <input className="paper-input" type="text" value={data.fidelitypercentage} onChange={(event) => handleChangeStats({event, propStat: "fidelityPercentage"}) }/>
                </div>
              </div>
              <div className="notes">
                <input className="paper-input text-area" type="text" value={data.note} onChange={ (event) => handleChangeSimple(event, "note" as keyof WorkPlanInterface) }/>
              </div>
            </div>
        )}
      </div> 
    </div>
  );
};

export default Box;