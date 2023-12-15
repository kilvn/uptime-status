import { useMemo } from 'react';
import Link from './link';
import Header from './header';
import UptimeRobot from './uptimerobot';
import moment from 'moment';

function App() {

  const apikeys = useMemo(() => {
    const { ApiKeys } = window.Config;
    if (Array.isArray(ApiKeys)) return ApiKeys;
    if (typeof ApiKeys === 'string') return [ApiKeys];
    return [];
  }, []);

  return (
    <>
      <Header />
      <div className='container'>
        <div id='uptime'>
          {apikeys.map((key) => (
            <UptimeRobot key={key} apikey={key} />
          ))}
        </div>
        <div id='footer'>
          <p><Link className='other-link' to='https://www.kilvn.cn/' text='Server Status' /> &copy; {moment().format('YYYY')} <Link to='https://www.kilvn.com/' text='逆天西瓜' /> Corp.</p>
        </div>
      </div>
    </>
  );
}

export default App;
