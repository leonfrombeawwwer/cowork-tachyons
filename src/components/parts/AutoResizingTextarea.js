import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { editTaskDetail } from '../../actions'

class Textarea extends React.Component {
  state = {rows: 2};

  handleChange = e => {
  	// To cause proper recalc when deleting lines
    const oldRows = e.target.rows
  	e.target.rows = 2
    const newRows = ~~(e.target.scrollHeight/this.props.lineHeight)
    if (newRows === oldRows) {
    	e.target.rows = newRows
    }
  	this.setState({rows: newRows})
    this.props.editTaskDetail(e.target.value,this.props.currentTask)
  }

	render() {
    const { placeholder,className,lineHeight, currentTask,tasks } = this.props
    const { detail } = tasks.byId[currentTask] || ''

  	return <textarea
      placeholder={placeholder}
      className={className}
    	value={detail}
      rows={this.state.rows}
      onChange={this.handleChange}
      style={{lineHeight: `${lineHeight}px`}}
    />
  }
}

Textarea.propTypes = {
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  lineHeight: React.PropTypes.number.isRequired,
}

const mapStateToProps = ({ tasks },{ match }) => {
  const currentTask = match.params.taskId
  return {
    currentTask,
    tasks,
  }
}

Textarea = withRouter(
  connect(
    mapStateToProps,
    {editTaskDetail},
  )(Textarea)
)

export default Textarea
