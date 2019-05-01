import React from 'react';
import CriticalSectionProblem from '../CriticalSectionProblem';

const initialState = {
  selectOption: 'csp',
}

type IMainState = typeof initialState;


class Main extends React.Component<{}, IMainState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  public render() {
    return <div className='main'>
      <div className='main__header'>
        <h1>Critical Section Problem</h1>
        <select onChange={(e) => this.setState({
          selectOption: e.target.value,
        })} value={this.state.selectOption}>
          <option value='csp'>No Solution</option>
          <option value='me'>Mutex Locks</option>
        </select>
      </div>
      <CriticalSectionProblem selectOption={this.state.selectOption} />
    </div>;
  }
}

export default Main;
