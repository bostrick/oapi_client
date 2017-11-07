
import {
  Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText,
  Button,
} from 'reactstrap';
import React from 'react';
// import PropTypes from 'prop-types';

class Mailings extends React.Component {
  render() {
    return (
      <div>
        <h1>Mailings</h1>
        <Card>
          <CardBlock>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
                Some quick example text to build on the card title
                and make up the bulk of the cards content.
            </CardText>
            <Button>Button</Button>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default Mailings;
