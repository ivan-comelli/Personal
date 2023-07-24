import React, { useState, useEffect } from "react";
import { WorkPlanInterface, TasksType, ToolsType, MaterialsType } from '../../../server/interfaces/WorkPlan';
import "./style.scss";

interface WorkPlanBlankInterface extends WorkPlanInterface {
  getOutNewData: any,
  isPostMode: boolean
}

type ListsType = {
  lists: {
    tasks: TasksType[],
    tools: ToolsType[],
    materials: MaterialsType[]
  }
}

export const Box = ({getOutNewData, isPostMode, ...props}: WorkPlanBlankInterface) => {
  const maxLengthInput = 18;

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
  const [onChangeData, setOnChangeData] = useState<boolean> (false);

  useEffect(() => {
    if(onChangeData == true) {
      setOnChangeData(false);
      getOutNewData(data);
    }
  }, [onChangeData, data]);

  type handleChangeListType = {
    event: React.ChangeEvent<HTMLInputElement>,
    model: 'tasks' | 'tools' | 'materials',
    index: number
  }

  const handleChangeList = ({event, model, index}: handleChangeListType) => {
    let newData = {...data};
    let newValue = event.target.value === "" ? undefined : event.target.value;
    switch(model) {
      case 'tasks':
        newData.tasks[index].title = newValue;
      break;
      case 'tools':
        newData.tools[index].name = newValue;
      break;
      case 'materials':
        newData.materials[index].name = newValue;
      break;
    }

    setOnChangeData(true);
    setData(newData);
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
        setOnChangeData(true);
      break;
      case 'workDays':
        setData({...data, workdays: value});
        setOnChangeData(true);
      break;
      case 'fidelityPercentage':
        setData({...data, fidelitypercentage: value});
        setOnChangeData(true);
      break;
    }
  }

  const handleChangeSimple = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> , prop: keyof WorkPlanInterface) => {
    setData({...data, [prop]: event.target.value});
    setOnChangeData(true);
  }

  return (
    <div className="box">
      <div className="form">
        {
          data && (
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
                <textarea className="paper-input text-area" rows={6} value={data.note} onChange={ (event) => handleChangeSimple(event, "note" as keyof WorkPlanInterface) }/>
              </div>
            </div>
        )}
      </div> 
    </div>
  );
};

export default Box;