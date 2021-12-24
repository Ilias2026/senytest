import {
    Chart as ChartJS,
    registerables
} from 'chart.js';

//we register the chartjs dependencies {we need to do this starting from chartjs 3.0.0}
const RegisterChart = {
    register: () => {
        return ChartJS.register(
            ...registerables
        );
    }
}

export default RegisterChart;