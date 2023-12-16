const overallStatus = {
    ok: '正常运行',
    wain: '部分运行',
    unknow: '状态未知'
};

function OverallStatus({ upSiteStatus }) {
    return (
        <div className="flex-parent">
            <div className="flex-left">
                {<div className={'status-icon ' + upSiteStatus + ' is-big'}></div>}
                <h2 className="text-item">
                    所有服务 <span className={'text-status ' + upSiteStatus}>{overallStatus[upSiteStatus]}</span>
                </h2>
            </div>
            <div className="flex-right">{window.Config.OverallStatusText}</div>
        </div>
    );
}

export default OverallStatus;