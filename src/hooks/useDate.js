import { useContext } from 'react';
import { DateContext } from '../context/DateContext'

//just a hook wrapper for the date context
export default function useDate() {
    return useContext(DateContext)
}