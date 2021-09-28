import React from 'react';
import './profile.scss';
import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyIcon from '@material-ui/icons/VpnKey';
// import { useAuth } from '../../contexts/auth';
import Form from 'devextreme-react/form';

export default function Profile() {
  // const { user } = useAuth();

  const users = {
    // Index: user.tableuserindex,
    // Username: user.tableusername,
    // Usernick: user.tableusernick,
    Index: localStorage.getItem('tableuserindex'),
    Username: localStorage.getItem('tableusername'),
    Usernick: localStorage.getItem('tableusernick'),
  };

  return (
    <React.Fragment>
      <Card>
        <h2 className={'content-block'}>Profile</h2>

        {/* <div className={'content-block dx-card responsive-paddings'}>
          <div className={'form-avatar'}>
            <img
              alt={''}
              src={''}
            />
          </div>
        </div> */}

        <div className={'content-block dx-card responsive-paddings'}>
          <Form
            id={'form'}
            defaultFormData={users}
            labelLocation={'top'}
            colCountByScreen={colCountByScreen}
          />
          <br/>
          <br/>
          <br/>
          <a href="#/changepassword">
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
            >
              <KeyIcon />
              Change Password
            </Button>
          </a>
        </div>
      </Card>
    </React.Fragment>
  );
}

const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4
};
