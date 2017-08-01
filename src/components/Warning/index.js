import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resetErrorMessage } from 'actions'

class Warning extends React.Component {
  render() {
    const { warning, className, resetErrorMessage } = this.props
    console.log(this.props)
    return warning
      ? <div data-component="Warning" className={`relative ${className}`}>
          <div
            className="absolute top-0 right-0 ma2 white dim f4 pointer"
            onClick={resetErrorMessage}
          >
            x
          </div>
          {warning}
        </div>
      : null
  }
}

Warning.propTypes = {
  className: PropTypes.string.isRequired
}

const mapStateToProps = ({ warning }) => ({ warning: warning.main })

Warning = connect(mapStateToProps, {
  resetErrorMessage
})(Warning)

export default Warning