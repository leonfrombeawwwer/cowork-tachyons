import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from 'actions'
// import { Editor,Plain } from 'slate'
import 'draft-js/dist/Draft.css'

//使用draft-js暂时代替slate，slate的中文输入有bug
import { Editor, EditorState, ContentState } from 'draft-js'

const Plain = {
  deserialize: text => EditorState.createWithContent(ContentState.createFromText(text)),
  serialize: state => state.getCurrentContent().getPlainText(),
}
////////////////////////////////////////

class ContentEditor extends React.Component {
  state = {
    titleState: Plain.deserialize(''),
    detailState: Plain.deserialize(''),
  } //for slate to work

  componentDidMount() {
    const { task } = this.props
    if (task.id) {
      this.setState({
        titleState: Plain.deserialize(task.title || ''),
        detailState: Plain.deserialize(task.detail || ''),
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { task } = this.props
    const { task: nextTask } = nextProps
    if (nextTask.id && nextTask.title !== task.title && document.activeElement.type === 'text') {
      //当taskTable里修改title时，要同步
      this.setState({
        titleState: Plain.deserialize(nextTask.title || ''),
      })
    }
    if (nextTask.id && nextTask.id !== task.id) {
      //只有当换task的时候才同步
      this.setState({
        titleState: Plain.deserialize(nextTask.title || ''),
        detailState: Plain.deserialize(nextTask.detail || ''),
      })
    }
  }

  render() {
    const { canEdit, task } = this.props
    return (
      <div
        className={`ph3 pv2 ${task.completed === 'completed' ? 'black-50' : ''}`}
        data-component="Editor"
      >
        <div className={`f3 w-90 pa2 ba b--white lh-title mb3 ${canEdit ? 'hover-b' : ''}`}>
          <Editor
            placeholder="标题"
            editorState={this.state.titleState}
            onChange={this.onTitleChange}
            // onDocumentChange={this.handleTitleChange}
            onBlur={this.handleTitleBlur}
          />
        </div>
        <div className={`w-90 pa2 ba b--white min-h-text ${canEdit ? 'hover-b' : ''}`}>
          <Editor
            placeholder="内容"
            editorState={this.state.detailState}
            onChange={this.onDetailChange}
            // onDocumentChange={this.handleDetailChange}
            onBlur={this.handleDetailBlur}
          />
        </div>
      </div>
    )
  }

  onTitleChange = state => {
    //this is for slate.js to work
    const title = Plain.serialize(state)
    const { editTaskTitle, currentTask, canEdit, changeMainWarning } = this.props
    if (canEdit) {
      this.setState({ titleState: state })
      editTaskTitle(title, currentTask)
    } else {
      changeMainWarning('不可编辑')
    }
  }

  handleTitleBlur = () => {
    const title = Plain.serialize(this.state.titleState)
    const { currentTask, saveTaskTitle, canEdit } = this.props
    if (canEdit) {
      saveTaskTitle(title, currentTask)
    }
  }

  onDetailChange = state => {
    //this is for slate.js to work
    const detail = Plain.serialize(state)
    const { editTaskDetail, currentTask, canEdit, changeMainWarning } = this.props
    if (canEdit) {
      this.setState({ detailState: state })
      editTaskDetail(detail, currentTask)
    } else {
      changeMainWarning('不可编辑')
    }
  }

  handleDetailBlur = () => {
    const detail = Plain.serialize(this.state.detailState)
    const { currentTask, saveTaskDetail, canEdit } = this.props
    if (canEdit) {
      saveTaskDetail(detail, currentTask)
    }
  }
}

ContentEditor.propTypes = {
  task: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired,
  //redux
  currentTask: PropTypes.string,
  completed: PropTypes.string,
  search: PropTypes.object,
  editTaskTitle: PropTypes.func.isRequired,
  saveTaskTitle: PropTypes.func.isRequired,
  editTaskDetail: PropTypes.func.isRequired,
  saveTaskDetail: PropTypes.func.isRequired,
  changeMainWarning: PropTypes.func.isRequired,
}

ContentEditor.defaultProps = {
  task: {},
  canEdit: false,
}

const mapStateToProps = ({ completed, search }, { match }) => {
  return {
    currentTask: match.params.taskId,
    completed,
    search,
  }
}

const ConnectedContentEditor = withRouter(connect(mapStateToProps, actions)(ContentEditor))

export default ConnectedContentEditor
