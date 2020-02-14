import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {connect} from 'react-redux';
import { deleteStream, fetchStream } from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions = () => {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className='ui button negative'>Delete</button>
                <button onClick={() => history.push('/')} className='ui button'>Cancel</button>
            </React.Fragment>
        );
    }

    renderContent = () => {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <React.Fragment>
                <Modal 
                    title='Delete Stream'
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={this.onDismiss}
                />
            </React.Fragment>
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return {stream: state.streams[id]}
}

export default connect(mapStateToProps, {deleteStream, fetchStream})(StreamDelete);