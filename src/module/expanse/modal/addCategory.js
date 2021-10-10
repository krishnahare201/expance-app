import React, { Component } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { postRequest } from '../../../utils/request';
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 8 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 16 }
};
class AddCategory extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  categoryApiCall = async (values) => {
    try {
      postRequest(`/addCategory`, { ...values }).then(resp => {
        console.log(resp)
        if (resp.status === 200) {
          this.props.modalCategoryVisibleFunc(false)
          message.success(resp.message);

        } else {
          cookie.remove("token")
        }

      });
    } catch (error) {
      message.success(error);
    }
  };

  handleSaveCategoryName = async (e, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          await this.categoryApiCall(values)
        } catch (error) {
          console.log(error)
        }
      }
    });
  };

  render() {
    const {
      form,
      isCategoryModalVisible,
    } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={isCategoryModalVisible}
        destroyOnClose={true}
        onCancel={() => this.props.modalCategoryVisibleFunc(false)}
        title={
          'Add Category'
        }
        footer={[
          <Button
            // disabled={equipment.isBtnLoading}
            key="cancel"
            title="Cancel"
            onClick={() => this.props.modalCategoryVisibleFunc(false)}
          >
            {"cancel"}
          </Button>,
          <Button
            // loading={equipment.isBtnLoading}
            key="submit"
            type="primary"
            htmlType="submit"
            title="Submit"
            onClick={(e) => this.handleSaveCategoryName(e, form)}
          >
            {"submit"}
          </Button>
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label={"Category Name"}>
            {getFieldDecorator("category_name", {
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



        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AddCategory);