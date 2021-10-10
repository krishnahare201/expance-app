import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Table, DatePicker, Button } from 'antd';
import AddCategory from './modal/addCategory';
import AddExpanse from './modal/addExpanse';
import { withRouter } from "react-router";
import { Cookies } from "react-cookie";
import { getRequest, postRequest } from '../../utils/request';
import moment from 'moment';
const cookie = new Cookies();
const { RangePicker } = DatePicker;
const columns = [
  {
    title: 'Expanse Name',
    dataIndex: 'expanse_name',
    key: 'expanse_name',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Category',
    dataIndex: 'lsg.category_name',
    key: 'lsg.category_name',
    render: lsg => <span>{lsg}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text => <span>{moment().format("DD/MM/YYYY")}</span>,
  },
];


class expanse extends Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
      expanseList: [],
      isCategoryModalVisible: false,
      isexpanseModalVisible: false,
      startDate: "",
      endDate: ""
    }
  }
  componentDidMount() {
    this.getExpanseApiCall()
    // this.getcategoryApiCall()
  }
  getExpanseApiCall = async (dateobj = {}) => {
    try {
      console.log("dataobj", dateobj)
      postRequest(`/getExpanse`, { ...dateobj }).then(resp => {
        console.log("getExpanse", resp)
        // const { props } = this;
        if (resp.status === 200) {
          this.setState({ expanseList: resp.data })
          // props.history.push("/login");
        } else {
          cookie.remove("token")
          this.props.history.push("/login");
        }

      });
    } catch (error) {
      console.log(error)
    }
  };
  getcategoryApiCall = async () => {

    try {
      getRequest(`/getCategory`, {}).then(resp => {
        console.log(resp)
        if (resp.status === 200) {
          this.setState({ categoryList: resp.data })
        } else {
          cookie.remove("token")
        }

      });
    } catch (error) {
      console.log(error)
    }
  };
  modalCategoryVisibleFunc = (visible) => {
    this.setState({ isCategoryModalVisible: visible });

  };
  modalexpanseVisibleFunc = (visible) => {
    this.setState({ isexpanseModalVisible: visible });
    if (visible) {
      this.getcategoryApiCall()
    }
    if (!visible) {
      this.getExpanseApiCall()
    }
  };
  logoutFunc = () => {
    cookie.remove("token")
    this.props.history.push("/login");
  };
  onChange = (date, dateString) => {
    let [startDate, endDate] = date || [];
    let dateobj = {
      startDate: moment(startDate).startOf("day"),
      endDate: moment(endDate).endOf("day")
    }
    this.getExpanseApiCall(dateobj)

  }
  render() {
    const { expanseList = [] } = this.state
    return (
      <div >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary"
            style={{ marginRight: 10, marginTop: 20, marginBottom: 20 }}
            onClick={(e) => {
              this.modalCategoryVisibleFunc(true);
            }}
          >Add Category</Button>
          <Button type="primary"
            style={{ marginRight: 10, marginTop: 20, marginBottom: 20 }}
            onClick={(e) => {
              this.modalexpanseVisibleFunc(true);
            }}
          >Add Expanse</Button>
          <Button type="danger"
            style={{ marginRight: 10, marginTop: 20, marginBottom: 20 }}
            onClick={(e) => {
              this.logoutFunc();
            }}
          >Logout</Button>
        </div>
        <div style={{ marginLeft: 10 }}>
          <RangePicker
            onChange={this.onChange}
          />
        </div>
        <div style={{ padding: 20 }}>

          <Table columns={columns} dataSource={expanseList || []} />
        </div>
        <AddCategory
          {...this.state}
          modalCategoryVisibleFunc={this.modalCategoryVisibleFunc}
        />
        <AddExpanse
          {...this.state}
          modalExpanseVisibleFunc={this.modalexpanseVisibleFunc}
        />
      </div>
    )
  }
}
export default (withRouter(expanse))