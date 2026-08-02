import { PolicyPage } from "@/components/content/policy-page";

export const metadata = { title: "Chính sách thanh toán" };
export default function PaymentPolicyPage() { return <PolicyPage eyebrow="Chính sách" title="Thanh toán." introduction="Phương thức được chọn tại checkout và được ghi nhận cùng đơn hàng." sections={[{ title: "Thanh toán khi nhận hoa", content: "Khách hàng thanh toán cho nhân viên giao hàng theo tổng giá trị đã xác nhận trong đơn." }, { title: "Chuyển khoản ngân hàng", content: "Thông tin chuyển khoản được cung cấp theo đơn. Vui lòng dùng đúng nội dung thanh toán để cửa hàng đối soát." }, { title: "Mã ưu đãi", content: "Mã ưu đãi được backend kiểm tra khi gửi đơn. Giá trị giảm, điều kiện và giới hạn sử dụng phụ thuộc mã đang áp dụng." }]} />; }
