import { React, useState } from 'react';
import './changepassword.scss';
import { Card } from '@material-ui/core';
import TextBox from 'devextreme-react/text-box';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/auth';
import notify from 'devextreme/ui/notify';
import axios from 'axios';


const ChangePassword = () => {

  const [defaultPass, setdefaultPass] = useState([]);
  const [NewPass, setNewPass] = useState([]);
  const [ConfirmNewPass, setConfirmNewPass] = useState([]);

  const { user } = useAuth();

  const host = 'https://back.member.dst.technology';

  const handleChange = (event, atr) => {
    switch (atr) {
      case "defaultpass":
        setdefaultPass(event);
        break

      case "newpass":
        setNewPass(event);
        break

      case "confirmnewpass":
        setConfirmNewPass(event);
        break

      default:
        return ""
    }
  }

  const handleSave = () => {
    let requestPass = {
      "userindex": user.tableuserindex,
      "username": user.tableusername,
      "usertoken": user.tableusertoken,
      "tableuserpassword": defaultPass,
      "tableuserpasswordnew1": NewPass,
      "tableuserpasswordnew2": ConfirmNewPass,
    }

    const fetchDataStore = async () => {
      await axios.post(host + '/api/user/changepassword', requestPass)
        .then((responsePass) => {
          console.log(responsePass);
          const status = JSON.stringify(responsePass.data.status.status);

          if (status == 1) {

            notify('The user was saved successfully.', 'success');

          } else if (status == 0) {
            notify('The user was not saved. Later this is the Message', 'error');
          }
        })
    }
    fetchDataStore();
  }

  return (
    <Card>
      <h2 className={'content-block'}>Change Password</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <div className="dx-fieldset">

            <div className="dx-field">
              <div className="dx-field-label">Default Password</div>
              <div className="dx-field-value">
                <TextBox
                  onValueChange={(event) => {
                    handleChange(event, "defaultpass");
                  }} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">New Password</div>
              <div className="dx-field-value">
                <TextBox
                  onValueChange={(event) => {
                    handleChange(event, "newpass");
                  }} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">Confirmation New Password</div>
              <div className="dx-field-value">
                <TextBox
                  onValueChange={(event) => {
                    handleChange(event, "confirmnewpass");
                  }} />
              </div>
            </div>
          </div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            SAVE
          </Button>
        </div>
      </div>
    </Card>
  )
};

export default ChangePassword;