import React, { useMemo } from 'react';
import { useHistory } from "react-router-dom";
import ContextMenu, { Position } from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import { useAuth } from '../../contexts/auth';
import './user-panel.scss';

export default function UserPanel({ menuMode }) {
  const { user, signOut } = useAuth();
  const history = useHistory();

  function navigateToProfile() {
    history.push("/profile");
  }
  const menuItems = useMemo(() => ([
    {
      text: 'Profile',
      icon: 'user',
      onClick: navigateToProfile
    },
    {
      text: 'Logout',
      icon: 'runner',
      onClick: signOut
    }
  ]), [signOut]);

  // console.log(user);

  return (
    <div className={'user-panel'}>
      <div className={'user-info'}>
        <div className={'image-container'}>
          <div
            style={{
              // background: `url(${user.avatarUrl}) no-repeat #fff`,
              background: `url(https://img.icons8.com/office/16/000000/user.png) no-repeat #fff`,
              backgroundSize: 'cover'
            }}
            className={'user-image'} />
        </div>
        {/* <div className={'user-name'}>{user.tableusernick}</div> */}
        <div className={'user-name'}>{localStorage.getItem('tableusernick')}</div>
      </div>

      {menuMode === 'context' && (
        <ContextMenu
          items={menuItems}
          target={'.user-button'}
          showEvent={'dxclick'}
          width={210}
          cssClass={'user-menu'}
        >
          <Position my={'top center'} at={'bottom center'} />
        </ContextMenu>
      )}
      {menuMode === 'list' && (
        <List className={'dx-toolbar-menu-action'} items={menuItems} />
      )}
    </div>
  );
}
