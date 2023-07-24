import React, { createContext, useReducer,  useEffect } from 'react';
import { WorkPlanInterface } from '@server/interfaces/WorkPlan';

type ModelTypeMapping = {
    'WORK_PLAN_MODEL': WorkPlanInterface,
};

type ModelType = {
    type: keyof ModelTypeMapping;
    endpoint: string
};

const modelData: [ModelType] = [{   
    type: 'WORK_PLAN_MODEL',
    endpoint: '/api/planes-de-trabajo/'
}]

const port = process.env.REACT_APP_SERVER_PORT ?? '';
const host = process.env.REACT_APP_SERVER_HOST ?? '';
const url =  host + ':' + port;

const initialState = {
    filterModelData: modelData[0],
    data: [] as ModelTypeMapping[keyof ModelTypeMapping][],
    newData: [] as (ModelTypeMapping[keyof ModelTypeMapping] | ModelTypeMapping[keyof ModelTypeMapping][]),
    indexSheetView: 0,
    modeSheet: 'Edit' as 'Post' | 'Edit' | 'View'
};

type ActionType =
  | { type: 'SET_FILTER_MODEL_DATA'; payload: ModelType }
  | { type: 'SET_DATA'; payload: ModelTypeMapping[keyof ModelTypeMapping][] }
  | { type: 'SET_NEW_DATA'; payload: (ModelTypeMapping[keyof ModelTypeMapping] | ModelTypeMapping[keyof ModelTypeMapping][]) }
  | { type: 'SET_INDEX_SHEET_VIEW'; payload: number }
  | { type: 'SET_MODE_SHEET'; payload: 'Post' | 'Edit' | 'View' };

const reducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
      case 'SET_FILTER_MODEL_DATA':
        return {
          ...state,
          filterModelData: action.payload
        };
      case 'SET_DATA':
        return {
          ...state,
          data: action.payload
        };
      case 'SET_NEW_DATA':
        return {
          ...state,
          newData: action.payload
        };
      case 'SET_INDEX_SHEET_VIEW':
        return {
          ...state,
          indexSheetView: action.payload
        };
      case 'SET_MODE_SHEET':
        return {
          ...state,
          modeSheet: action.payload
        };
      default:
        return state;
    }
};

export const AppContext = createContext<any> (null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {    
    const [state, dispatch] = useReducer(reducer, initialState);     
    
    useEffect(() => {
        dispatch({ type: 'SET_NEW_DATA', payload: [] });
    }, [state.modeSheet]);

    const getAllData = async () => {
        try {
            const data = await fetch(url + state.filterModelData.endpoint);
            const jsonData: ModelTypeMapping[typeof state.filterModelData.type][]= await data.json();
            dispatch({ type: 'SET_DATA', payload: jsonData });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const postNewData = async () => {
        try {
            const response = await fetch(url + state.filterModelData.endpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(state.newData)
            });
            const jsonData: ModelTypeMapping[typeof state.filterModelData.type] = await response.json();
            dispatch({ type: 'SET_DATA', payload: [...state.data, jsonData] });
            dispatch({ type: 'SET_NEW_DATA', payload: [] });
            return jsonData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const saveAllNewData = async () => {
        Array.isArray(state.newData) && state.newData.length > 0 && 
        state.newData.forEach(async (item: ModelTypeMapping[keyof ModelTypeMapping]) => {
            try {
                const response = await fetch(url + state.filterModelData.endpoint + item.id, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                });
                const jsonData: ModelTypeMapping[typeof state.filterModelData.type] = await response.json();
                const indexOfState = state.data.findIndex((itemOfState) => itemOfState.id === jsonData.id);
                if (indexOfState !== -1) {
                    const updatedData = [...state.data];
                    updatedData[indexOfState] = jsonData;
                    dispatch({ type: 'SET_DATA', payload: updatedData });
                }          
                dispatch({ type: 'SET_NEW_DATA', payload: [] });
                return jsonData;
            } catch (error) {
                console.error('Error:', error);
            }
        })
    }

    const deleteDataBySheet = async () => {
        saveAllNewData();
        try {
          const response = await fetch(url + state.filterModelData.endpoint + state.data[state.indexSheetView].id, {
              method: 'DELETE',
              headers: {
              'Content-Type': 'application/json'
              },
          });
          const jsonData: any = await response.json();
          
          const updatedData = [...state.data];
          updatedData.splice(state.indexSheetView, 1);
          dispatch({ type: 'SET_INDEX_SHEET_VIEW', payload: 0 });
          dispatch({ type: 'SET_DATA', payload: updatedData });
          return jsonData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const nextSheetView = () => {
        let maxIndex = state.data.length - 1;
        state.indexSheetView < maxIndex && dispatch({ type: 'SET_INDEX_SHEET_VIEW', payload: state.indexSheetView + 1 });   
    }

    const previousSheetView = () => {
        let minIndex = 0;
        state.indexSheetView > minIndex && dispatch({ type: 'SET_INDEX_SHEET_VIEW', payload: state.indexSheetView - 1 });  
    }

    const contextValue = {
        filterModelData: state.filterModelData,
        setFilterModelData: (value: ModelType) => dispatch({ type: 'SET_FILTER_MODEL_DATA', payload: value }),
        data: state.data,
        newData: state.newData,
        setNewData: (value: (ModelTypeMapping[typeof state.filterModelData.type] | ModelTypeMapping[typeof state.filterModelData.type][])) =>
          dispatch({ type: 'SET_NEW_DATA', payload: value }),
        indexSheetView: state.indexSheetView,
        nextSheetView,
        previousSheetView,
        getAllData,
        saveAllNewData,
        postNewData,
        deleteDataBySheet,
        modeSheet: state.modeSheet,
        setModeSheet: (value: 'Post' | 'Edit' | 'View') => dispatch({ type: 'SET_MODE_SHEET', payload: value })
    };
    

    return <AppContext.Provider value={contextValue}> { children } </AppContext.Provider>
};