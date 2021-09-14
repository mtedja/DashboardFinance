import { React, useState, useEffect } from 'react';
import TreeList, { Column, ColumnChooser, HeaderFilter, SearchPanel, Selection, Lookup } from 'devextreme-react/tree-list';
import { Card } from '@material-ui/core';
import axios from 'axios';
import { employees, priorities, tasks } from './../../data';
import './feature-tree.scss';

const FeatureTree = () => {

  const dataSourceOptions = {
    store: tasks.map(function (task) {
      employees.forEach(function (employee) {
        if (task.Task_Assigned_Employee_ID === employee.ID) {
          task.Task_Assigned_Employee = employee;
        }
      });
      return task;
    })
  };

  const [result, setResult] = useState([]);

  const host = 'https://back.member.dst.technology';

  useEffect(() => {
    let request = {
      "userindex": "USER21070000001",
      "username": "gunatah",
      "usertoken": "*E9737409E1590CAF136F98E973FE8F172EFC8077"
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
            dataSource={dataSourceOptions}
            columnAutoWidth={true}
            keyExpr="Task_ID"
            parentIdExpr="Task_Parent_ID"
            id="tasks"
          >
            <SearchPanel visible={true} width={250} />

            <Column dataField="Task_Subject" width={500} />
          </TreeList>
        </div>
      </div>
    </Card>
  );
};

export default FeatureTree;