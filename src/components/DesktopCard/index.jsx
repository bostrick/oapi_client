// import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';
import { Card, CardText, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';

@observer
class DesktopCard extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.element,
  };

  static defaultProps = {
    title: 'I need a title',
    subtitle: '',
    content: (<CardText> I need content </CardText>),
  };

  render() {
    const { title, subtitle, content } = this.props;
    return (
      <Card className="mt-2 p-2">
        <CardTitle>
          { title }
        </CardTitle>
        <CardSubtitle>
          { subtitle }
        </CardSubtitle>
        { content }
      </Card>
    );
  }
}

export default DesktopCard;
