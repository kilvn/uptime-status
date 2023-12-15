import ReactTooltip from 'react-tooltip';
import { useEffect, useState } from 'react';
import { GetMonitors } from '../common/uptimerobot';
import { formatDuration, formatNumber } from '../common/helper';
import Link from './link';

function UptimeRobot({ apikey }) {

  const status = {
    ok: '正常',
    down: '无法访问',
    unknow: '未知'
  };

  const { CountDays, ShowLink } = window.Config;

  const [monitors, setMonitors] = useState();

  useEffect(() => {
    GetMonitors(apikey, CountDays).then(setMonitors);
  }, [apikey, CountDays]);

  if (monitors) {
      let dataLength = monitors.length,
          okNodeNum = 0;
      return monitors.map((site, indexKey) => (
          <div key={site.id} className='site'>
              <div className='meta'>
                  {(!ShowLink || (ShowLink && !site.url.length)) && <span className='name' dangerouslySetInnerHTML={{__html: site.name}}/>}
                  {ShowLink && site.url.length && <Link className='link' to={site.url} text={site.name}/>}
                  <span className='status'><span className={'status-icon ' + site.status} aria-hidden="true"></span> {status[site.status]}</span>
              </div>
              <div className='timeline'>
              {site.daily.map((data, index) => {
                      let status = '';
                      let text = data.date.format('YYYY-MM-DD ');
                      if (data.uptime >= 100) {
                          okNodeNum += 1
                          status = 'ok';
                          text += `可用率 ${formatNumber(data.uptime)}%`;
                      } else if (data.uptime <= 0 && data.down.times === 0) {
                          status = 'none';
                          text += '无数据';
                      } else {
                          status = 'down';
                          text += `故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${formatNumber(data.uptime)}%`;
                      }
                      return (<i key={index} className={status} data-tip={text}/>)
                  })}
              </div>
              <div className='summary'>
                  <span>今天</span>
                  <span>
          {site.total.times
              ? `最近 ${CountDays} 天故障 ${site.total.times} 次，累计 ${formatDuration(site.total.duration)}，平均可用率 ${site.average}%`
              : `最近 ${CountDays} 天可用率 ${site.average}%`}
        </span>
                  <span>{site.daily[site.daily.length - 1].date.format('YYYY-MM-DD')}</span>
              </div>
              <ReactTooltip className='tooltip' place='top' type='dark' effect='solid'/>
              {indexKey + 1 < dataLength && <div className='topbar'>
                  <div className='bar-item bar1'></div>
                  <div className='bar-item bar2'></div>
                  <div className='bar-item bar3'></div>
                  <div className='bar-item bar4'></div>
              </div>}
          </div>
      ));
  } else return (
      <div className='site'>
          <div className='loading'/>
      </div>
  );
}

export default UptimeRobot;
