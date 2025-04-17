import { Form, Input, Rate, Button, message } from "antd";
import React, { useCallback, useState } from "react";
import api from "../../api";
import debounce from 'lodash/debounce';
const ReviewForm = ({ idProduct, idCustomer, onReviewSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const debouncedFetchReviews = useCallback(
    debounce(() => {
      // console.log('Calling debounced onReviewSuccess');
      onReviewSuccess();
    }, 1000),
    [onReviewSuccess]
  );

  const onFinish = async (values) => {
    if(!idProduct || !idCustomer) {
      message.error("Vui lòng đăng nhập để gửi đánh giá!");
      return;
    }
    try {
      setLoading(true);
      const reviewData = {
        idProduct,
        idCustomer,
        reviewText: values.reviewText,
        rating: values.rating,
      };
// console.log(reviewData);
      await api.post("/reviews", reviewData );
      message.success("Đánh giá của bạn đã được gửi!");
      form.resetFields();
      onReviewSuccess?.(); // gọi callback để reload lại review nếu cần
    } catch (err) {
      message.error("Gửi đánh giá thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="w-full mt-5"
    >
      <Form.Item
        name="reviewText"
        label="Đánh giá sản phẩm"
        rules={[{ required: true, message: "Vui lòng nhập đánh giá" }]}
      >
        <Input.TextArea rows={4} placeholder="Viết cảm nhận của bạn..." />
      </Form.Item>

      <Form.Item
        name="rating"
        label="Chấm điểm"
        initialValue={5}
        rules={[{ required: true, message: "Vui lòng chọn số sao" }]}
      >
        <Rate />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="btn-pri !text-[1.1rem] !py-4 !px-5 !font-americana"
        >
          Gửi đánh giá
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;
