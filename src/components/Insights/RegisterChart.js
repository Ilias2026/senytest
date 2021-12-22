import {
    Chart as ChartJS,
    registerables
} from 'chart.js';

import 'chartjs-adapter-date-fns'


const RegisterChart = {
    register: () => {
        return ChartJS.register(
            ...registerables
        );
    }
}

export default RegisterChart;