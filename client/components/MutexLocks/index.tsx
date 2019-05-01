import React from 'react';

type ICriticalSectionProps = {
  criticalSection: string,
  flagColor: string,
};


class MutexLocks extends React.Component<ICriticalSectionProps, {}> {
  public render() {
    return <div className='critical-section'>
      <div className='mutual-exclusion__header'>
        <h2>Critical Section</h2>
        <div className={'mutual-exclusion-flag ' + this.props.flagColor}></div>
      </div>
      <textarea className='critical-section-textarea' rows={8} value={this.props.criticalSection} readOnly={true}></textarea>
    </div>
  }
};


export default MutexLocks;
