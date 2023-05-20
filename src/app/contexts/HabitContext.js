import {createContext, useEffect, useReducer} from "react";
import axios from "../../axios";

const HabitContext = createContext({
    habitList: [],
    addHabit: () => {},
    addProgress: () => {},
    deleteHabit: () => {},
    updateHabit: () => {},
    getHabit: () => {}
})

export const ADD_HABIT = 'ADD_HABIT';
export const GET_HABIT = 'GET_HABIT';
export const ADD_PROGRESS = 'ADD_PROGRESS';

export const reducer = function (state = [], action) {
    switch (action.type) {
        case ADD_HABIT: {
            return {
                ...state,
                habitList: [action.payload, ...state.habitList],
            };
        }
        case GET_HABIT: {
            return {
                ...state,
                habitList: [...action.payload],
            };
        }
        case ADD_PROGRESS: {
            const { habitList } = state;
            const index = habitList.findIndex((it) => it.id === action.payload.id);
            habitList[index].progress = action.payload.progress
            return {
                ...state,
                habitList: [...state.habitList],
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export const HabitProvider = ({settings, children}) => {
    const [state, dispatch] = useReducer(reducer, [])
    const addHabit = async (data) => {
        const res = await axios.post('/habits', data)
        dispatch({
            type: ADD_HABIT,
            payload: res.data,
        });
    };

    const getHabit = async () => {
        const res = await axios.get('/habits/user');
        dispatch({
            type: GET_HABIT,
            payload: [...res.data],
        });
    }

    const addProgress = async (habitID) => {
        console.log('addProgress', habitID)
        const res = await axios.post(`/progress/${habitID}`);
        dispatch({
            type: ADD_PROGRESS,
            payload: res.data
        })
    }

    useEffect(() => {
        getHabit()
    },[]);

    return (
        <HabitContext.Provider
            value={{
                habitList: state.habitList,
                addHabit,
                getHabit,
                addProgress
            }}>
            {children}
        </HabitContext.Provider>
    )
}

export default HabitContext;