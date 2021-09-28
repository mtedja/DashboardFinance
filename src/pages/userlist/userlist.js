import { React, useState, useEffect } from 'react';
import { Grid, Table, TableHeaderRow, PagingPanel, SearchPanel, Toolbar } from '@devexpress/dx-react-grid-material-ui';
import { Card } from '@material-ui/core';
import { Button } from 'devextreme-react/button';
import { PagingState, IntegratedPaging, SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
// import { useAuth } from '../../contexts/auth';
import axios from 'axios';
import './userlist.scss';

const UserList = () => {

  // const { user } = useAuth();

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
      // "userindex": user.tableuserindex,
      // "username": user.tableusername,
      // "usertoken": user.tableusertoken
      "userindex": localStorage.getItem('tableuserindex'),
      "username": localStorage.getItem('tableusername'),
      "usertoken": localStorage.getItem('tableusernick')
    };
    console.log(request);

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
      <SearchState />
      <IntegratedFiltering />
      
      <PagingState
        defaultCurrentPage={0}
        pageSize={5}
      />
      <IntegratedPaging />

      <Table />
      <TableHeaderRow />

      <Toolbar />
      <SearchPanel />
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