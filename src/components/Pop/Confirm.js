import React from 'react'
import PropTypes from 'prop-types'
import ClickOutside from 'react-click-outside'

class Pop extends React.Component {
  render() {
    const { hidden, children, onOKClick } = this.props
    return (
      !hidden &&
      <div
        className="absolute top-0 left-0 vw-100 vh-100 bg-black-20 z-2 flex-center"
        data-component="mask"
      >
        <ClickOutside
          className="w-30 min-w6 pa4 shadow-1 bg-white z-4 flex flex-wrap justify-end"
          data-component="Pop"
          onClickOutside={onOKClick}
        >
          <div className="w-100">
            {children}
          </div>
          <div
            className="ph3 pv2 dim tracked f5 br2 b--cyan bg-cyan white pointer"
            onClick={onOKClick}
          >
            确定
          </div>
        </ClickOutside>
      </div>
    )
  }
}

Pop.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onOKClick: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Pop
