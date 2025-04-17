import { Component } from 'react';
import "../Policy/style.css";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Đã xảy ra lỗi khi tải trang.</h2>
          <p>Vui lòng làm mới trang hoặc liên hệ hỗ trợ.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;