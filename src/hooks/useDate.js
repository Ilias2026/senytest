import { useContext } from 'react';
import { DateContext } from '../context/DateContext'

export default function useDate() {
    return useContext(DateContext)
}