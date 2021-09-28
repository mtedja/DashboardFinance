import { React, useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from 'devextreme-react/switch';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import SaveIcon from '@material-ui/icons/Save';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useAuth } from '../../contexts/auth';
import notify from 'devextreme/ui/notify';
import axios from 'axios';
import base64 from 'base-64';
import utf8 from 'utf8';
import './usernew.scss';

import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const UserNew = () => {

  const { user } = useAuth();

  const host = 'https://back.member.dst.technology';

  const [idUser, setIdUser] = useState([]);
  const [detailUserId, setdetailUserId] = useState([]);
  const [detailUserIndex, setdetailUserIndex] = useState([]);
  const [detailUserName, setdetailUserName] = useState([]);
  const [detailUserNick, setdetailUserNick] = useState([]);
  const [detailUserEmail, setdetailUserEmail] = useState([]);
  const [detailUserInitial, setddetailUserInitial] = useState([]);
  const [detailUserNoteInternal, setdetailUserNoteInternal] = useState([]);
  const [detailUserIsActive, setdetailUserIsActive] = useState([]);
  const [detailUserLastEditTimestamp, setdetailUserLastEditTimestamp] = useState([]);
  const [detailUserLastEditUsername, setdetailUserLastEditUsername] = useState([]);
  const [detailUserCreateTimestamp, setdetailUserCreateTimestamp] = useState([]);
  const [detailUserCreateUsername, setdetailUserCreateUsername] = useState([]);

  useEffect(() => {
    let requestNew = {
      "userindex": localStorage.getItem('tableuserindex'),
      "username": localStorage.getItem('tableusername'),
      "usertoken": localStorage.getItem('tableusertoken')
    };

    const fetchData = async () => {
      await axios.post(host + '/api/user/new', requestNew)
        .then((responseNew) => {
          const status = JSON.stringify(responseNew.data.status.status);

          if (status == 1) {
            const idUsr = JSON.stringify(responseNew.data.status.id);
            setIdUser(idUsr);

            let requestDetail = {
              "userindex": localStorage.getItem('tableuserindex'),
              "username": localStorage.getItem('tableusername'),
              "usertoken": localStorage.getItem('tableusertoken'),
              "tempuserid": idUsr
            }

            axios.post(host + '/api/user/detail', requestDetail)
              .then((responseDetail) => {

                //Encrypt ID
                const userid = JSON.stringify(responseDetail.data.result.tempuser[0].tempuserid);
                const iduserutf8 = utf8.encode(userid);
                const iduserencode = base64.encode(iduserutf8);

                //Set switch is Active
                const isActive = JSON.stringify(responseDetail.data.result.tempuser[0].tempuserisactive);
                if (isActive == 1) {
                  setdetailUserIsActive(true);
                } else if (isActive == 0) {
                  setdetailUserIsActive(false);
                }

                setdetailUserId(iduserencode);
                setdetailUserIndex(responseDetail.data.result.tempuser[0].tempuserindex);
                setdetailUserName(responseDetail.data.result.tempuser[0].tempusername);
                setdetailUserNick(responseDetail.data.result.tempuser[0].tempusernick);
                setdetailUserEmail(responseDetail.data.result.tempuser[0].tempuseremail);
                setddetailUserInitial(responseDetail.data.result.tempuser[0].tempuserinitial);
                setdetailUserNoteInternal(responseDetail.data.result.tempuser[0].tempusernoteinternal);
                setdetailUserIsActive(responseDetail.data.result.tempuser[0].tempuserisactive);
                setdetailUserLastEditTimestamp(responseDetail.data.result.tempuser[0].tempuserlastedittimestamp);
                setdetailUserLastEditUsername(responseDetail.data.result.tempuser[0].tempuserlasteditusername);
                setdetailUserCreateTimestamp(responseDetail.data.result.tempuser[0].tempusercreatetimestamp);
                setdetailUserCreateUsername(responseDetail.data.result.tempuser[0].tempusercreateusername);
              })
          }
        })
    }
    fetchData();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, atr) => {
    switch (atr) {
      case "username":
        setdetailUserName(event);
        break

      case "nick":
        setdetailUserNick(event);
        break

      case "email":
        setdetailUserEmail(event);
        break

      case "initial":
        setddetailUserInitial(event);
        break

      case "noteinternal":
        setdetailUserNoteInternal(event);
        break

      case "isactive":
        setdetailUserIsActive(event);
        break

      default:
        return ""
    }
  }

  const handleSave = () => {
    let requestStore = {
      "userindex": localStorage.getItem('tableuserindex'),
      "username": localStorage.getItem('tableusername'),
      "usertoken": localStorage.getItem('tableusertoken'),
      "tableuserid": idUser,
      "tableusername": detailUserName,
      "tableusernick": detailUserNick,
      "tableuseremail": detailUserEmail,
      "tableuserinitial": detailUserInitial,
      "tableusernoteinternal": detailUserNoteInternal,
      "tableuseruserrole": ""
    }

    const fetchDataStore = async () => {
      await axios.post(host + '/api/user/store', requestStore)
        .then((responseStore) => {
          const status = JSON.stringify(responseStore.data.status.status);
          console.log('My status : ' + status);
          console.log(responseStore)

          if (status == 1) {
            const idUsr = JSON.stringify(responseStore.data.status.id);
            setIdUser(idUsr);
            console.log('Im here with iduser : ' + idUsr);

            let requestDetail = {
              "userindex": localStorage.getItem('tableuserindex'),
              "username": localStorage.getItem('tableusername'),
              "usertoken": localStorage.getItem('tableusertoken'),
              "tempuserid": idUsr
            }

            axios.post(host + '/api/user/detail', requestDetail)
              .then((responseDetail) => {
                setdetailUserIndex(responseDetail.data.result.tempuser[0].tempuserindex);
                setdetailUserName(responseDetail.data.result.tempuser[0].tempusername);
                setdetailUserNick(responseDetail.data.result.tempuser[0].tempusernick);
                setdetailUserEmail(responseDetail.data.result.tempuser[0].tempuseremail);
                setddetailUserInitial(responseDetail.data.result.tempuser[0].tempuserinitial);
                setdetailUserNoteInternal(responseDetail.data.result.tempuser[0].tempusernoteinternal);
                setdetailUserIsActive(responseDetail.data.result.tempuser[0].tempuserisactive);
                setdetailUserLastEditTimestamp(responseDetail.data.result.tempuser[0].tempuserlastedittimestamp);
                setdetailUserLastEditUsername(responseDetail.data.result.tempuser[0].tempuserlasteditusername);
                setdetailUserCreateTimestamp(responseDetail.data.result.tempuser[0].tempusercreatetimestamp);
                setdetailUserCreateUsername(responseDetail.data.result.tempuser[0].tempusercreateusername);
              })

            handleClose();
            notify('The user was saved successfully.', 'success');

          } else if (status == 0) {
            handleClose();
            notify('The user was not saved. Later this is the Message', 'error');
          }
        })
    }
    fetchDataStore();
  }

  const handleSaveAndNew = () => {
    let requestStore = {
      "userindex": localStorage.getItem('tableuserindex'),
      "username": localStorage.getItem('tableusername'),
      "usertoken": localStorage.getItem('tableusertoken'),
      "tableuserid": idUser,
      "tableusername": detailUserName,
      "tableusernick": detailUserNick,
      "tableuseremail": detailUserEmail,
      "tableuserinitial": detailUserInitial,
      "tableusernoteinternal": detailUserNoteInternal,
      "tableuseruserrole": ""
    }

    const fetchDataStore = async () => {
      await axios.post(host + '/api/user/store', requestStore)
        .then((responseStore) => {
          const status = JSON.stringify(responseStore.data.status.status);
          console.log('My status : ' + status);

          if (status == 0) {
            const idUsr = JSON.stringify(responseStore.data.status.id);
            setIdUser(idUsr);
            console.log('Im here with iduser : ' + idUsr);

            let requestDetail = {
              "userindex": localStorage.getItem('tableuserindex'),
              "username": localStorage.getItem('tableusername'),
              "usertoken": localStorage.getItem('tableusertoken'),
              "tempuserid": idUsr
            }

            axios.post(host + '/api/user/detail', requestDetail)
              .then((responseDetail) => {
                setdetailUserIndex(responseDetail.data.result.tempuser[0].tempuserindex);
                setdetailUserName(responseDetail.data.result.tempuser[0].tempusername);
                setdetailUserNick(responseDetail.data.result.tempuser[0].tempusernick);
                setdetailUserEmail(responseDetail.data.result.tempuser[0].tempuseremail);
                setddetailUserInitial(responseDetail.data.result.tempuser[0].tempuserinitial);
                setdetailUserNoteInternal(responseDetail.data.result.tempuser[0].tempusernoteinternal);
                setdetailUserIsActive(responseDetail.data.result.tempuser[0].tempuserisactive);
                setdetailUserLastEditTimestamp(responseDetail.data.result.tempuser[0].tempuserlastedittimestamp);
                setdetailUserLastEditUsername(responseDetail.data.result.tempuser[0].tempuserlasteditusername);
                setdetailUserCreateTimestamp(responseDetail.data.result.tempuser[0].tempusercreatetimestamp);
                setdetailUserCreateUsername(responseDetail.data.result.tempuser[0].tempusercreateusername);
              })
          }
        })
    }
    fetchDataStore();

    handleClose();

    window.location.reload();
  }

  return (
    <Card>
      <h2 className={'content-block'}>User </h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <div className="dx-fieldset">
            <div className="dx-field">
              <div className="dx-field-label">TempUserId</div>
              <div className="dx-field-value">
                <TextBox value={detailUserId.toString()}
                  disabled={true}
                />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserIndex</div>
              <div className="dx-field-value">
                <TextBox value={detailUserIndex.toString()}
                  disabled={true} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserName</div>
              <div className="dx-field-value">
                <TextBox value={detailUserName.toString()}
                  onValueChange={(event) => {
                    handleChange(event, "username");
                  }} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserNick</div>
              <div className="dx-field-value">
                <TextBox value={detailUserNick.toString()}
                  onValueChange={(event) => {
                    handleChange(event, "nick");
                  }} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserEmail</div>
              <div className="dx-field-value">
                <TextBox value={detailUserEmail.toString()}
                  onValueChange={(event) => {
                    handleChange(event, "email");
                  }} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserInitial</div>
              <div className="dx-field-value">
                <TextBox value={detailUserInitial.toString()}
                  onValueChange={(event) => {
                    handleChange(event, "initial");
                  }} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserNoteInternal</div>
              <div className="dx-field-value">
                <TextArea value={detailUserNoteInternal.toString()}
                  onValueChange={(event) => {
                    handleChange(event, "noteinternal");
                  }} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserIsActive</div>
              <div className="dx-field-label">
                {/* <TextBox value={detailUserIsActive.toString()}
                  onValueChange={(event) => {
                    handleChange(event, "isactive");
                  }} /> */}
                <Switch
                  value={detailUserIsActive}
                  disabled
                  onValueChange={(event) => {
                    handleChange(event, "isactive");
                  }}
                />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserLastedEditTimestamp</div>
              <div className="dx-field-value">
                <TextBox value={detailUserLastEditTimestamp.toString()}
                  disabled={true} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserLastedEditUsername</div>
              <div className="dx-field-value">
                <TextBox value={detailUserLastEditUsername.toString()}
                  disabled={true} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserCreateTimestamp</div>
              <div className="dx-field-value">
                <TextBox value={detailUserCreateTimestamp.toString()}
                  disabled={true} />
              </div>
            </div>
            <div className="dx-field">
              <div className="dx-field-label">TempUserCreateUsername</div>
              <div className="dx-field-value">
                <TextBox value={detailUserCreateUsername.toString()}
                  disabled={true} />
              </div>
            </div>
          </div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Action
            <ArrowDropDownIcon />
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleSave}>
              <ListItemIcon>
                <SaveIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Save" />
            </StyledMenuItem>
            <StyledMenuItem onClick={handleSaveAndNew}>
              <ListItemIcon>
                <SaveAltIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Save and New" />
            </StyledMenuItem>
            <a href="#/userlist">
              <StyledMenuItem>
                <ListItemIcon>
                  <FormatListBulletedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Back to List" />
              </StyledMenuItem>
            </a>
          </StyledMenu>
        </div>
      </div>
    </Card>
  );
};

export default UserNew;