import { React, useState, useEffect } from 'react';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import { Card } from '@material-ui/core';
import { Button } from 'devextreme-react/button';
import { PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import axios from 'axios';
import './userlist.scss';

const UserList = () => {

  const host = 'https://back.member.dst.technology';

  const columns = [
    { name: 'tableuserindex', title: 'USERINDEX' },
    { name: 'tableusername', title: 'USERNAME' },
    { name: 'tableusernick', title: 'USERNICK' },
    { name: 'tableuseremail', title: 'USEREMAIL' },
    { name: 'tableuseremailisverified', title: 'USEREMAILISVERIFIED' },
    { name: 'tableuserinitial', title: 'USERINITIAL' },
    { name: 'tableuserlastlogintimestamp', title: 'USERLASTLOGIN' },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let request = {
      "userindex": "USER21070000001",
      "username": "gunatah",
      "usertoken": "*F246D21236BFE4995F0DE501E8252F2A9A8976FC"
    };

    const fetchData = async () => {
      const response = await axios.post(host + '/api/user/list', request);
      setRows(response.data.result.tableuser);
    };
    fetchData();
  }, []);

  const GridView = () => (
    <Grid
      rows={rows}
      columns={columns}
    >
      <PagingState
        defaultCurrentPage={0}
        pageSize={5}
      />
      <IntegratedPaging />

      <Table />
      <TableHeaderRow />

      <PagingPanel />
    </Grid>
  );

  return (
    <Card>
      <h2 className={'content-block'}>Userlist</h2>
      <div className={'content-block'}>
        <a href="#/usernew">
          <Button
            icon="plus"
            text="NEW"
            type="success"
          />
        </a>
      </div>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <GridView />
        </div>
      </div>
    </Card>
  );
};

export default UserList;