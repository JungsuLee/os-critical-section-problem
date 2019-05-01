import React from 'react';

const initialState = {

};

type ICriticalSectionState = typeof initialState;
type ICriticalSectionProps = {
  criticalSection: string
};


class CriticalSection extends React.Component<ICriticalSectionProps, ICriticalSectionState> {
  constructor(props) {
    super(props);
  }

  public render() {
    return <div className='critical-section'>
      <h2>Critical Section</h2>
      <textarea className='critical-section-textarea' rows={8} value={this.props.criticalSection} readOnly={true}></textarea>
    </div>
  }
};


export default CriticalSection;
