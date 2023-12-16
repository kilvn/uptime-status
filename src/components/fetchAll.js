import { useEffect, useState } from 'react';
import { GetMonitors } from '../common/uptimerobot';

function FetchAll({ apikey, CountDays }) {
    const [monitors, setMonitors] = useState();

    useEffect(() => {
        GetMonitors(apikey, CountDays).then(setMonitors);
    }, [apikey, CountDays]);

    return monitors ?? [];
}

export default FetchAll;