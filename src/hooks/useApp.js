import { useContext } from 'react';
import { AppContext } from '../context/AppContext'

//just a hook wrapper for the app context

export default function useApp() {
    return useContext(AppContext)
}