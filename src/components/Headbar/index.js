import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import classnames from 'classnames'
import Searchform from './Searchform'
// import Warning from '../parts/Warning'
import * as actions from 'actions'
import { getAllSubtasks, getTaskStack } from 'reducers'
import UserSettings from './UserSettings'

class Headbar extends React.Component {
  onMyTaskClick = id => {
    this.props.updateUserTasks(id)
    this.props.changeCurrentTask()
  }

  onTaskTabClick = () => {
    const { history, match } = this.props
    history.push(`/${match.params.id}`)
  }

  onReportTabClick = () => {
    const { history, match, me } = this.props
    if (match.params.id !== me.id) {
      history.push(`/${match.params.id}/report`)
    }
  }

  // test = () => {
  //   const id = '42e483b3-8500-4d48-a9c7-b69db32212ab'
  //   console.log(this.props.stack(id))
  // }

  render() {
    const { me, isMe, toggleSidebar, match, sidebarHidden } = this.props
    return (
      <div className="relative shadow-1" data-component="headbar">
        <div
          className={classnames('absolute pa2 left-0 black-60 pointer dim', {
            dn: !sidebarHidden
          })}
          onClick={toggleSidebar}
        >
          <Icon name="content" />
        </div>
        <div className="h3rem flex w-100 justify-between border-box items-center bb b--black-20">
          <NavLink
            to={`/${me.id}`}
            onClick={() => this.onMyTaskClick(me.id)}
            className={`${isMe
              ? 'black-60'
              : 'black-30'} w5 tracked pl4 hover-thin-blue`}
          >
            我的任务
          </NavLink>
          <Searchform />
          <UserSettings />
          {/* <Warning className="absolute h2 w-100 bg-red" /> */}
        </div>
        <ul className="flex justify-center h2" data-component="tabs 任务/报表">
          <li
            className={`pa1 mh4 b bb bw1 ${match.params.taskId !== 'report'
              ? 'black-60 b--red'
              : 'black-40 b--white'} ${me.id === match.params.id
              ? ''
              : 'hover-black-60 hover-b--red pointer'}`}
            onClick={this.onTaskTabClick}
          >
            任务
          </li>
          <li
            className={`pa1 mh4 b bb bw1 ${match.params.taskId === 'report'
              ? 'black-60 b--red'
              : 'black-40 b--white'} ${me.id === match.params.id
              ? ''
              : 'hover-black-60 hover-b--red pointer'}`}
            onClick={this.onReportTabClick}
          >
            报表
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    sidebarHidden: state.visual.sidebarHidden,
    me: state.me,
    isMe: state.me.id === match.params.id,
    getSubs: id => getAllSubtasks(state, id),
    stack: id => getTaskStack(state, id)
  }
}

Headbar = connect(mapStateToProps, actions)(Headbar)

export default Headbar
