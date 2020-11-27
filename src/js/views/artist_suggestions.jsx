import * as React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import Utilities from '../utilities';
import Alerter from '../services/alerter';

export default class ArtistSuggestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this._loadArtists();
  }

  render() {
    return (
      <div className='intro'>
        <h1>Select Artists to Follow</h1>
        { this.state.loading &&
          <React.Fragment>
            <p>Loading songs...</p>
            <Spinner />
          </React.Fragment>
        }
        { this.state.artists &&
          <Row>
            { this.state.artists.map(artist => (
              <Col key={artist.artistId} md={3}>
                <Image onClick={this._follow.bind(this, artist)} className='artistImage' src={artist.artistCover} />
                <h4 className='artistText'>{artist.artistName}</h4>
              </Col>
            )) }
          </Row>
        }
      </div>
    );
  }

  _follow(artistToFollow) {
    Alerter.success(`Followed ${ artistToFollow.artistName }`);

    this.setState({
      artists: this.state.artists.filter(artist => artist !== artistToFollow),
    });
    return fetch('/artists/follow', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        artist: artistToFollow
      })
    });
  }

  _loadArtists() {
    fetch('/suggest/artists')
    .then(Utilities.fetchToJson)
    .then(responseJson => {
      if (!responseJson.error) {
        this.setState({
          loading: false,
          artists: responseJson
        });
      }
    });
  }
}