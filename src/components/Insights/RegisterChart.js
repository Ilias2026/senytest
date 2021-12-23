import {
    Chart as ChartJS,
    registerables
} from 'chart.js';

const RegisterChart = {
    register: () => {
        return ChartJS.register(
            ...registerables
        );
    }
}

export default RegisterChart;