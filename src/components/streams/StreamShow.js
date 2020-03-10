import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';


class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer(id);
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    buildPlayer(id) {
        if(this.player || !this.props.stream) {
            return;
        }

        // this.flvPlayer = flv.createPlayer({
        //     type: 'flv',
        //     url: `http://techslides.com/demos/sample-videos/small.mp4`
        // });
        // this.flvPlayer.attachMediaElement(this.videoRef.current);
        // this.flvPlayer.load();
        // this.flvPlayer.play();

        this.videoRef.current.play();

    }

    render() {

        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        const {title='', description=''} = this.props.stream;

        return(
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls={true}>
                    <source src='http://techslides.com/demos/sample-videos/small.mp4' type="video/mp4"/>
                </video>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);