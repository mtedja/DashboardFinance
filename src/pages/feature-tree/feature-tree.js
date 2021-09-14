import { React, useState, useEffect } from 'react';
import TreeList, { Column, SearchPanel } from 'devextreme-react/tree-list';
import { Card } from '@material-ui/core';
import axios from 'axios';
import './feature-tree.scss';

const FeatureTree = () => {

  const [result, setResult] = useState([]);

  const host = 'https://back.member.dst.technology';

  useEffect(() => {
    let request = {
      "userindex": "USER21070000001",
      "username": "gunatah",
      "usertoken": "*E82E70836D1D20566BB8CD9508451EED71F5E430"
    };

    const fetchData = async () => {
      const response = await axios.post(host + '/api/feature/tree', request);
      setResult(response.data.result.tablefeature);
    };
    fetchData();
  }, []);

  return (
    <Card>
      <h2 className={'content-block'}>Feature Tree</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <TreeList
            dataSource={result}
            columnAutoWidth={true}
            keyExpr="tablefeaturecode"
            parentIdExpr="tablefeatureparentcode"
            id="tasks"
          >
            <SearchPanel visible={true} width={250} />

            <Column dataField="tablefeaturedescription" width={500} />
          </TreeList>
        </div>
      </div>
    </Card>
  );
};

export default FeatureTree;