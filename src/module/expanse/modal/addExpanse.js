import React, { Component } from "react";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { postRequest } from '../../../utils/request';
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 8 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 16 }
};
class AddExpanse extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  addExpanseApiCall = async (values) => {
    try {
      postRequest(`/addExpanse`, { ...values }).then(resp => {
        if (resp.status === 200) {
          this.props.modalExpanseVisibleFunc(false)
          message.success(resp.message);
        } else {
          cookie.remove("token")
        }

      });
    } catch (error) {
      console.log(error)
    }
  };

  handleSaveExpanse = async (e, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          await this.addExpanseApiCall(values)
          console.log("ljljljlj", values)
        } catch (error) {
          message.success(error);
        }
      }
    });
  };
  render() {
    const {
      form,
      categoryList = [],
      isexpanseModalVisible,
    } = this.props;
    // console.log(this.props)
    const FormItem = Form.Item;
    const { Option } = Select;
    const { getFieldDecorator } = form;
    console.log("categoryList", categoryList)
    return (
      <Modal
        visible={isexpanseModalVisible}
        destroyOnClose={true}
        onCancel={() => this.props.modalExpanseVisibleFunc(false)}
        title={
          'Add Expanse'
        }
        footer={[
          <Button
            // disabled={equipment.isBtnLoading}
            key="cancel"
            title="Cancel"
            onClick={() => this.props.modalExpanseVisibleFunc(false)}
          >
            {"cancel"}
          </Button>,
          <Button
            // loading={equipment.isBtnLoading}
            key="submit"
            type="primary"
            htmlType="submit"
            title="Submit"
            onClick={(e) => this.handleSaveExpanse(e, form)}
          >
            {"submit"}
          </Button>
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label={"Category"}>
            {getFieldDecorator("category_id", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Select Zone"
                }
              ]
            })(
              <Select
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                showSearch
                placeholder={"Select"}
              >
                {categoryList.map((item) => {
                  console.log(item)
                  return (
                    <Option key={item._id} value={item._id}>
                      {item.category_name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label={"Expanse Name"}>
            {getFieldDecorator("expanse_name", {
              initialValue: "",
              rules: [
                {
                  whitespace: true,
                  required: true,
                  message: "please"
                }
              ]
            })(<Input placeholder={"Enter expanse name"} />)}
          </FormItem>

          <FormItem {...formItemLayout} label={"Amount"}>
            {getFieldDecorator("amount", {
              initialValue: "",
              rules: [
                {
                  whitespace: true,
                  required: true,
                  message: "please"
                }
              ]
            })(<Input placeholder={"Enter category name"} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={"Description"}>
            {getFieldDecorator("description", {
              initialValue: "",
              rules: [
                {
                  whitespace: true,
                  required: false,
                  message: "please"
                }
              ]
            })(<Input.TextArea placeholder={"Enter here..."} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AddExpanse);