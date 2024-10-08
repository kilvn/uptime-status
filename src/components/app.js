import { useMemo } from 'react';
import Link from './link';
import Header from './header';
import UptimeRobot from './uptimerobot';
import moment from 'moment';
import FetchAll from "./fetchAll";
import OverallStatus from "./overall";

function App() {
  const apikeys = useMemo(() => {
    const { ApiKeys } = window.Config;
    if (Array.isArray(ApiKeys)) return ApiKeys;
    if (typeof ApiKeys === 'string') return [ApiKeys];
    return [];
  }, []);

  const { CountDays, ShowLink } = window.Config;

  let monitors = [],
      upSiteNum = 0,
      upSiteStatus = 'ok';

  apikeys.map((key) => {
    let data = FetchAll({ apikey: key, CountDays })
    data.map((site) => {
      monitors.push(site);

      // 统计全局在线数量
      if (site.status === 'ok') upSiteNum++;
    });
  });

  if (upSiteNum < monitors.length) upSiteStatus = 'warn';
  if (upSiteNum === 0) upSiteStatus = 'unknow';

  return (
      <>
        <Header/>
        <div className='container'>
          {monitors.length > 0 && (
              <div id='overall'>
                {<OverallStatus key='0' upSiteStatus={upSiteStatus}/>}
              </div>
          )}

          <div id='uptime' className={monitors.length === 0 ? 'loading' : ''}>
            {<UptimeRobot key='0' monitors={monitors} CountDays={CountDays} ShowLink={ShowLink}/>}
          </div>

          <div id='footer'>
            <p>
              <Link className='other-link' to='https://www.kilvn.cn/' text='服务器状态'/>
              &copy; {moment().format('YYYY')} <Link to='https://www.kilvn.com/' text='逆天西瓜'/> Corp.
            </p>
          </div>
        </div>
      </>
  );
}

export default App;
