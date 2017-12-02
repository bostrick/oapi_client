
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import {
  Card, CardBlock, CardTitle, Table,
} from 'reactstrap';
import { toJS } from 'mobx';

@observer
class RestListView extends React.Component {
  componentDidMount() {
    if (this.props.restStore.state !== 'loaded') {
      this.props.restStore.load();
    }
  }

  grokColumns(schema) {
    // const schema = toJS(oschema);
    const fieldProps = _.get(schema, 'properties', {});
    let colProps = _.get(schema, 'meta.forms.list');

    // if not meta.forms.list, use all properties
    if (!colProps) {
      colProps = _.mapValues(fieldProps, () => { });
    }

    // merge in schema properties ("fields"), if matching.
    _.each(fieldProps, (value, key) => {
      if (_.has(colProps, key)) {
        colProps[key].fieldSchema = fieldProps[key];
      }
    });

    const idAttr = _.get(schema, 'meta.id_attr', '');
    if (idAttr) {
      _.get(colProps, idAttr, {}).isIdAttr = true;
    }
    return colProps;
  }

  genTHead(colProp, key) {
    return <th key={key}>{key}</th>;
  }

  genTRow(rowData, idx, colProps) {
    return (
      <tr key={idx}>
        {_.map(colProps, (v, k) => this.genTCell(v, k, rowData))}
      </tr>
    );
  }

  genTCell(colProp, key, rowData) {
    let data = _.get(rowData, key, '');
    if (_.isPlainObject(data)) {
      data = <ReactJson name={key} collapsed="1" src={data} />;
    } else if (colProp.isIdAttr) {
      const path = _.get(this.context, 'router.route.match.path');
      global.log.warn({ path: this.context.router });
      data = <Link to={`${path}/${data}`}>{data}</Link>;
    }
    return <td key={key}>{data}</td>;
  }

  render() {
    const rs = this.props.restStore;
    const items = toJS(rs.items);
    const colProps = this.grokColumns(toJS(rs.schema));

    if (rs.state !== 'loaded') {
      return <p>loading...</p>;
    }

    return (
      <Card>
        <CardTitle> Items </CardTitle>
        <CardBlock>
          <Table>
            <thead>
              <tr>
                {_.map(colProps, this.genTHead)}
              </tr>
            </thead>
            <tbody>
              {_.map(items, (v, k) => this.genTRow(v, k, colProps))}
            </tbody>
          </Table>
          <div>
            <ReactJson name="colProps" collapsed="1" src={colProps} />
            <ReactJson name="schema" collapsed="1" src={rs.schema} />
            <ReactJson name="items" collapsed="1" src={items} />
          </div>
        </CardBlock>
      </Card>
    );
  }
}

RestListView.propTypes = {
  // openApiStore: PropTypes.instanceOf(OpenAPIState).isRequired,
  /* eslint react/forbid-prop-types: off */
  restStore: PropTypes.object.isRequired,
};

RestListView.contextTypes = {
  // openApiStore: PropTypes.instanceOf(OpenAPIState).isRequired,
  /* eslint react/forbid-prop-types: off */
  router: PropTypes.object.isRequired,
};

export default RestListView;
