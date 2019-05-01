import React from 'react';
import CriticalSection from '../CriticalSection';
import MutexLocks from '../MutexLocks';

const initialState = {
  criticalSection: `
    Hello, I am a critical section.\n
    Please, work carefully.
  `,
  userAContents: [
    {
      name: 'critical-section',
      content: this.criticalSection
    },
    {
      name: 'test-content',
      content: 'Testing one two three'
    },
    {
      name: 'personal-projects',
      content: 'Project list...'
    },
  ],
  userAText: '',
  userBContents: [
    {
      name: 'critical-section',
      content: this.criticalSection
    },
    {
      name: 'photos',
      content: 'photo list...'
    },
  ],
  userBText: '',
  selectedIndexByA: null,
  selectedIndexByB: null,
  criticalSectionProblem: true,
  mutualExclusion: false,
  flag: false,
  flagColor: 'green',
  userAinCriticalSection: false,
  userBinCriticalSection: false,
  userATextareaClassName: 'black-font',
  userBTextareaClassName: 'black-font',
  userAViewHeader: '',
  userBViewHeader: '',
  preSelectedOption: 'csp',
  btnSaveA: false,
  btnSaveB: false,
  userATextareaReadOnly: false,
  userBTextareaReadOnly: false,
}

type IMainProps = {
  selectOption: string,
};

type IMainState = typeof initialState;

class CriticalSectionProblem extends React.Component<IMainProps, IMainState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromProps(props, state) {
    if (state.preSelectedOption != props.selectOption) {
      switch (props.selectOption) {
        case 'csp':
          return {
            ...initialState,
            criticalSectionProblem: true,
            mutualExclusion: false,
            preSelectedOption: 'csp',
          }
        case 'me':
          return {
            ...initialState,
            criticalSectionProblem: false,
            mutualExclusion: true,
            preSelectedOption: 'me',
          }
        default:
          break;
      }
    } else {
      return null;
    }
  }

  public btnEnterHandler = (user: string, index: number) => {
    let userAText: string;
    let userBText: string;
    switch (user) {
      case 'A':
        if (!this.state.mutualExclusion) {
          if (index == 0) {
            userAText = this.state.criticalSection
          } else {
            userAText = this.state.userAContents[index].content
          }
          this.setState({
            selectedIndexByA: index,
            userAText,
            userAViewHeader: this.state.userAContents[index].name,
          });
        } else {
          if (index == 0 && !this.state.flag) {
            userAText = this.state.criticalSection;
            this.setState({
              flag: true,
              flagColor: 'red',
              userAinCriticalSection: true,
              userATextareaClassName: 'black-font',
            });
            this.unlockedTextareaHandler('A');
          } else if (index == 0 && this.state.flag && !this.state.userAinCriticalSection) {
            userAText = 'Locked!';
            this.blockedTextareaHandler('A');
          }
          else {
            userAText = this.state.userAContents[index].content;
            this.unlockedTextareaHandler('A');
            if (this.state.userAinCriticalSection && index != 0) {
              this.setState({
                flag: false,
                flagColor: 'green',
                userAinCriticalSection: false,
              });
            }
          }
          this.setState({
            selectedIndexByA: index,
            userAText,
            userAViewHeader: this.state.userAContents[index].name,
          });
        }
        break;
      case 'B':
        if (!this.state.mutualExclusion) {
          if (index == 0) {
            userBText = this.state.criticalSection
          } else {
            userBText = this.state.userBContents[index].content
          }
          this.setState({
            selectedIndexByB: index,
            userBText,
            userBViewHeader: this.state.userBContents[index].name,
          });
        } else {
          if (index == 0 && !this.state.flag) {
            userBText = this.state.criticalSection;
            this.setState({
              flag: true,
              flagColor: 'red',
              userBinCriticalSection: true,
              userBTextareaClassName: 'black-font',
            });
            this.unlockedTextareaHandler('B');
          } else if (index == 0 && this.state.flag && !this.state.userBinCriticalSection) {
            userBText = 'Locked!'
            this.blockedTextareaHandler('B');
          }
          else {
            userBText = this.state.userBContents[index].content;
            this.unlockedTextareaHandler('B');
            if (this.state.userBinCriticalSection && index != 0) {
              this.setState({
                flag: false,
                flagColor: 'green',
                userBinCriticalSection: false,
              });
            }
          }
          this.setState({
            selectedIndexByB: index,
            userBText,
            userBViewHeader: this.state.userBContents[index].name,
          });
        }
        break;
      default:
        break;
    }
  }

  public btnSaveHandler = (user) => {
    switch (user) {
      case 'A':
        if (this.state.selectedIndexByA == 0) {
          this.setState({
            selectedIndexByA: null,
            criticalSection: this.state.userAText,
            userAText: '',
            flag: false,
            flagColor: 'green',
            userAinCriticalSection: false,
            userAViewHeader: '',
          })
        } else {
          let userAContents = this.state.userAContents;
          userAContents[this.state.selectedIndexByA].content = this.state.userAText;
          this.setState({
            selectedIndexByA: null,
            userAContents,
            userAText: '',
            userAViewHeader: '',
          })
        }
        break;
      case 'B':
        if (this.state.selectedIndexByB == 0) {
          this.setState({
            selectedIndexByB: null,
            criticalSection: this.state.userBText,
            userBText: '',
            flag: false,
            flagColor: 'green',
            userBinCriticalSection: false,
            userBViewHeader: '',
          })
        } else {
          let userBContents = this.state.userBContents;
          userBContents[this.state.selectedIndexByB].content = this.state.userBText;
          this.setState({
            selectedIndexByB: null,
            userBContents,
            userBText: '',
            userBViewHeader: '',
          })
        }
        break;
      default:
        break;
    }
  }

  public flagHandler = () => {
    this.setState({
      flag: !this.state.flag,
    });
  }

  public blockedTextareaHandler = (user) => {
    switch (user) {
      case 'A':
        this.setState({
          userATextareaClassName: 'blocked',
          btnSaveA: true,
          userATextareaReadOnly: true,
        });
        break;
      case 'B':
        this.setState({
          userBTextareaClassName: 'blocked',
          btnSaveB: true,
          userBTextareaReadOnly: true,
        });
        break;

      default:
        break;
    }
  }

  public unlockedTextareaHandler = (user) => {
    switch (user) {
      case 'A':
        this.setState({
          userATextareaClassName: 'black-font',
          btnSaveA: false,
          userATextareaReadOnly: false,
        });
        break;
      case 'B':
        this.setState({
          userBTextareaClassName: 'black-font',
          btnSaveB: false,
          userBTextareaReadOnly: false,
        });
        break;

      default:
        break;
    }
  }

  public render() {
    return <div className='critical-section-problem__body'>
      <div className='user _a'>
        <h2>User A</h2>
        <div className='user-view__head'>
          {this.state.userAContents.map((val, index) =>
            <div className='user-contents' key={index}>{val.name} <button onClick={() => this.btnEnterHandler('A', index)}>Enter</button></div>
          )}
        </div>
        <label>{this.state.userAViewHeader}</label>
        <textarea className={this.state.userATextareaClassName} rows={8} value={this.state.userAText}
          readOnly={this.state.userATextareaReadOnly}
          onChange={(e) => this.setState({ userAText: e.target.value })}></textarea>
        <button className='btn-save' onClick={() => this.btnSaveHandler('A')} disabled={this.state.btnSaveA}>Save</button>
      </div>

      {this.state.criticalSectionProblem && <CriticalSection criticalSection={this.state.criticalSection} />}
      {this.state.mutualExclusion && <MutexLocks criticalSection={this.state.criticalSection} flagColor={this.state.flagColor} />}


      <div className='user _b'>
        <h2>User B</h2>
        <div className='user-view__head'>
          {this.state.userBContents.map((val, index) =>
            <div className='user-contents' key={index}>{val.name} <button onClick={() => this.btnEnterHandler('B', index)}>Enter</button></div>
          )}
        </div>
        <label>{this.state.userBViewHeader}</label>
        <textarea className={this.state.userBTextareaClassName} rows={8} value={this.state.userBText}
          readOnly={this.state.userBTextareaReadOnly}
          onChange={(e) => this.setState({ userBText: e.target.value })}></textarea>
        <button className='btn-save' onClick={() => this.btnSaveHandler('B')} disabled={this.state.btnSaveB}>Save</button>
      </div>
    </div>
  }
}

export default CriticalSectionProblem;
