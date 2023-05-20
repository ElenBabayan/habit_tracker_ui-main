import { useContext } from 'react'
import HabitContext from "../contexts/HabitContext";
const useHabit = () => useContext(HabitContext)

export default useHabit
