import { useEffect } from 'react';
import Link from './link';

function Header() {

  useEffect(() => {
    document.title = window.Config.SiteName;
    if (window.Config.SubSiteName.length) {
        document.title += ' - ' + window.Config.SubSiteName
    }
  }, []);

  return (
    <div id='header'>
      <div className='container'>
        <h1 className='logo'>{window.Config.SiteName}</h1>
        <p className='subtitle'>检测频率 {window.Config.DetectionFrequency} 分钟</p>
        {/*<div className='navi'>*/}
        {/*  {window.Config.Navi.map((item, index) => (*/}
        {/*    <Link key={index} to={item.url} text={item.text} />*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default Header;
