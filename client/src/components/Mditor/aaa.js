import React, { Component } from 'react'

export default class A extends Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={this.props.content}>
                
            </div>
        )
    }
}
