import React from "react";
import styles from "./DieuLeCongTyConfirmation.module.css";
import { formatDate } from "@/utils/dateTimeUtils";
import { useGetFormDataJsonFromName } from "@/pages/User/ProcessProcedure/ProcessProcedure";
import CurrentDate from "@/components/Procedure/ProcedureTemplate/SharedFormComponents/CurrentDate/CurrentDate";

export default function DieuLeCongTyConfirmation({ dataJson }) {
    const coDongList = useGetFormDataJsonFromName("Danh sách cổ đông sáng lập")?.coDongList || [];

    if (!dataJson) return <div style={{ padding: "20px", textAlign: "center" }}>Không có dữ liệu!</div>;

    const coDongRows = dataJson.coDongRows || [];

    const addressToString = (soNha, xa, tinh) => {
        return [soNha, xa, tinh].filter(Boolean).join(", ");
    };

    return (
        <div className={styles.documentContainer}>
            <div className={styles.header}>
                <p className={styles.bold}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                <h3 className={styles.headerSubtitle}>Độc lập - Tự do - Hạnh phúc</h3>
                <br />
                <p className={styles.title}>ĐIỀU LỆ</p>
                <p className={styles.subTitle}>
                    CÔNG TY CỔ PHẦN {dataJson.tenCongTyVN?.toUpperCase() || "................................................"}
                </p>
            </div>

            <p>Chúng tôi, gồm những cổ đông sáng lập có tên như sau:</p>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>STT</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Tên cổ đông sáng lập</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Ngày, tháng, năm sinh đối với cổ đông sáng lập là cá nhân</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Giới tính</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Quốc tịch</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Địa chỉ liên lạc đối với cổ đông sáng lập là cá nhân hoặc địa chỉ trụ sở chính đối với cổ đông sáng lập là tổ chức</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Số định danh cá nhân</th>
                    </tr>
                </thead>
                <tbody>
                    {coDongList.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ border: "1px solid #000", padding: "10px", textAlign: "center" }}>
                                Chưa có dữ liệu cổ đông sáng lập.
                            </td>
                        </tr>
                    ) : (
                        coDongList.map((row, idx) => (
                            <tr key={idx}>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{idx + 1}</td>
                                <td style={{ border: "1px solid #000", padding: "5px" }}>{row.hoTen}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.ngaySinh}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.gioiTinh}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.quocTich}</td>
                                <td style={{ border: "1px solid #000", padding: "5px" }}>{row.diaChiLienLac}</td>
                                <td style={{ border: "1px solid #000", padding: "5px" }}>{row.giaTo}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Các cổ đông cùng đồng ý ký tên và chấp thuận thành lập CÔNG TY CỔ PHẦN {dataJson.tenCongTyVN?.toUpperCase() || "..................."} với Điều lệ được các cổ đông công ty thông qua theo quy định của Luật Doanh nghiệp số 59/2020/QH14 được Quốc hội thông qua ngày 17 tháng 06 năm 2020 được sửa đổi, bổ sung một số điều theo luật số 03/2022/QH15, luật số 76/2025/QH15 và các văn bản hướng dẫn thi hành Luật Doanh nghiệp, gồm các điều, khoản của Điều lệ này như sau:</p>

            <p className={styles.chapterTitle} style={{ textAlign: "center", marginTop: "16px", marginBottom: "6px", fontWeight: "bold" }}>Chương I</p>
            <p style={{ textAlign: "center", marginTop: "6px", marginBottom: "6px", fontWeight: "bold" }}>ĐIỀU KHOẢN CHUNG</p>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 1. Tư cách pháp nhân, phạm vi trách nhiệm, thời hạn hoạt động</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>1. Công ty là một pháp nhân độc lập và có tư cách pháp nhân theo Luật pháp Việt Nam. Tất cả hoạt động của Công ty được điều chỉnh bởi Luật pháp Việt Nam và theo các quy định tại Giấy chứng nhận đăng ký doanh nghiệp, Điều lệ này và bất kỳ giấy phép hoặc cấp phép của Cơ quan Nhà nước, cần thiết cho hoạt động kinh doanh của Công ty.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>2. Mỗi cổ đông chỉ chịu trách nhiệm về các khoản nợ và các nghĩa vụ tài sản khác của Công ty trong phạm vi số vốn đã góp vào Công ty.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>3. Thời hạn hoạt động của công ty là: 50 năm kể từ ngày được cơ quan đăng ký kinh doanh cấp Giấy chứng nhận đăng ký doanh nghiệp. Công ty có thể chấm dứt hoạt động trước thời hạn hoặc kéo dài thêm thời gian hoạt động theo quyết định của Đại hội đồng cổ đông hoặc theo quy định của pháp luật.</p>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 2. Tên Doanh nghiệp</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Tên công ty viết bằng tiếng Việt: <span>{dataJson.tenCongTyVN?.toUpperCase() || "................................................"}</span></p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Tên công ty viết bằng tiếng nước ngoài: {dataJson.tenCongTyEN || "................................................"}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Tên công ty viết tắt: {dataJson.tenCongTyVietTat || "................................................"}</p>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 3. Trụ sở chính và địa chỉ chi nhánh, văn phòng đại diện</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Địa chỉ trụ sở chính: {addressToString(dataJson.truSo_soNha, dataJson.truSo_xa, dataJson.truSo_tinh) || "........................................................................"}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Điện thoại: {dataJson.truSo_phone || "..................."}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Thư điện tử: {dataJson.truSo_email || "..................."}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Website: {dataJson.truSo_website || "..................."}</p>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 4. Ngành, nghề kinh doanh:</p>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th style={{ width: "40px", textAlign: "center", border: "1px solid #000", padding: "8px" }}>STT</th>
                        <th style={{ border: "1px solid #000", padding: "8px" }}>Tên ngành</th>
                        <th style={{ width: "100px", textAlign: "center", border: "1px solid #000", padding: "8px" }}>Mã ngành</th>
                        <th style={{ textAlign: "center", border: "1px solid #000", padding: "8px" }}>Ngành, nghề kinh doanh chính<br />(đánh dấu X để chọn một trong các ngành, nghề đã kê khai)</th>
                    </tr>
                </thead>
                <tbody>
                    {dataJson.nganhNgheList && dataJson.nganhNgheList.length > 0 ? (
                        dataJson.nganhNgheList.map((row, idx) => (
                            <tr key={idx}>
                                <td style={{ textAlign: "center", border: "1px solid #000", padding: "8px" }}>{idx + 1}</td>
                                <td style={{ border: "1px solid #000", padding: "8px" }}>{row.tenNganh}</td>
                                <td style={{ textAlign: "center", border: "1px solid #000", padding: "8px" }}>{row.maNganh}</td>
                                <td style={{ textAlign: "center", border: "1px solid #000", padding: "8px" }}>{row.laNganhChinh ? "X" : ""}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", border: "1px solid #000", padding: "8px" }}><i>Không có</i></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 5. Người đại diện theo pháp luật của công ty</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>1. Số lượng người đại diện theo pháp luật: Công ty có 01 người là người đại diện theo pháp luật, chức danh: {dataJson.nguoiDaiDien_chucDanh || "Giám đốc"}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Họ và tên người đại diện theo pháp luật: {dataJson.nguoiDaiDien_hoTen || "........................................."} &nbsp;&nbsp;&nbsp; Giới tính: {dataJson.nguoiDaiDien_gioiTinh || ".........."}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Sinh ngày: {formatDate(dataJson.nguoiDaiDien_ngaySinh) || "....................."} &nbsp;&nbsp;&nbsp; Dân tộc: {dataJson.nguoiDaiDien_danToc || "........"} &nbsp;&nbsp;&nbsp; Quốc tịch: {dataJson.nguoiDaiDien_quocTich || "Việt Nam"}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Số định danh cá nhân: {dataJson.nguoiDaiDien_cccd || ".........................................................."}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Địa chỉ thường trú: {addressToString(dataJson.nguoiDaiDien_thuongTru_soNha, dataJson.nguoiDaiDien_thuongTru_xa, dataJson.nguoiDaiDien_thuongTru_tinh) || ".........................................................."}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Địa chỉ liên lạc: {addressToString(dataJson.nguoiDaiDien_soNha, dataJson.nguoiDaiDien_xa, dataJson.nguoiDaiDien_tinh) || ".........................................................."}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>2. Quyền và nghĩa vụ của người đại diện theo pháp luật: Quyền và nghĩa vụ của người đại diện theo pháp luật quy định cụ thể tại Điều 28 Điều lệ công ty.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>3. Trách nhiệm của người đại diện theo pháp luật của doanh nghiệp</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Người đại diện theo pháp luật của doanh nghiệp có trách nhiệm sau đây:</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>a) Thực hiện quyền và nghĩa vụ được giao một cách trung thực, cẩn trọng, tốt nhất nhằm bảo đảm lợi ích hợp pháp của doanh nghiệp;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>b) Trung thành với lợi ích của doanh nghiệp; không lạm dụng địa vị, chức vụ và sử dụng thông tin, bí quyết, cơ hội kinh doanh, tài sản khác của doanh nghiệp để tư lợi hoặc phục vụ lợi ích của tổ chức, cá nhân khác;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>c) Thông báo kịp thời, đầy đủ, chính xác cho doanh nghiệp về doanh nghiệp mà mình, người có liên quan của mình làm chủ hoặc có cổ phần, phần vốn góp theo quy định của Luật Doanh nghiệp.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Người đại diện theo pháp luật của doanh nghiệp chịu trách nhiệm cá nhân đối với thiệt hại cho doanh nghiệp do vi phạm trách nhiệm quy định tại khoản 3 Điều này.</p>

            <p className={styles.chapterTitle} style={{ textAlign: "center", marginTop: "16px", marginBottom: "6px", fontWeight: "bold" }}>Chương II</p>
            <p style={{ textAlign: "center", marginTop: "6px", marginBottom: "6px", fontWeight: "bold" }}>VỐN ĐIỀU LỆ, CỔ ĐÔNG SÁNG LẬP, QUYỀN VÀ NGHĨA VỤ CỦA CÁC CỔ ĐÔNG SÁNG LẬP</p>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 6. Vốn điều lệ, cổ phần của cổ đông sáng lập</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>1. Vốn điều lệ của công ty cổ phần là tổng mệnh giá cổ phần các loại đã bán. Vốn điều lệ của công ty cổ phần khi đăng ký thành lập là tổng mệnh giá cổ phần các loại đã được đăng ký mua và được ghi trong Điều lệ công ty.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>- Vốn điều lệ của công ty là: {dataJson.vonDieuLe || "........................."} VNĐ (<em>{dataJson.vonDieuLe_bangChu || "........................................................."}</em>), trong đó:</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>- Tổng số cổ phần cổ đông sáng lập đăng ký mua: {dataJson.soCoPhanCoDongSangLap || "........................"}</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>- Mệnh giá cổ phần: {dataJson.menhGiaCoPhan_bangSo || "........................"} VNĐ (<em>{dataJson.menhGiaCoPhan_bangChu || "................."}</em>)/01 cổ phần</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>- Loại cổ phần: phổ thông</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>2. Cổ đông sáng lập, số cổ phần, giá trị cổ phần của từng cổ đông sáng lập, thời hạn góp vốn:</p>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th rowSpan={3} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>STT</th>
                        <th rowSpan={3} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Tên cổ đông sáng lập</th>
                        <th colSpan={8} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Vốn góp</th>
                        <th rowSpan={3} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Thời hạn góp vốn</th>
                    </tr>
                    <tr>
                        <th colSpan={2} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Tổng số cổ phần</th>
                        <th rowSpan={2} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Tỷ lệ (%)</th>
                        <th colSpan={4} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Loại cổ phần</th>
                        <th rowSpan={2} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Loại tài sản, số lượng, giá trị tài sản góp vốn</th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Số lượng</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Giá trị</th>
                        <th colSpan={2} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Phổ thông</th>
                        <th colSpan={2} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{dataJson.loaiCoPhanKhacTen || "Loại khác"}</th>
                    </tr>
                    <tr>
                        <th colSpan={5} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}></th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Số lượng</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Giá trị</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Số lượng</th>
                        <th style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>Giá trị</th>
                        <th colSpan={2} style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {coDongRows.length === 0 ? (
                        <tr>
                            <td colSpan={11} style={{ border: "1px solid #000", padding: "10px", textAlign: "center" }}>
                                Chưa có dữ liệu cổ đông sáng lập đăng ký góp vốn.
                            </td>
                        </tr>
                    ) : (
                        coDongRows.map((row, idx) => (
                            <tr key={idx}>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{idx + 1}</td>
                                <td style={{ border: "1px solid #000", padding: "5px" }}>{row.hoTen}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.tongSoCoPhan_soLuong}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.tongSoCoPhan_giaTri}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.tyLe}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.loaiCoPhan_phoThong_soLuong}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.loaiCoPhan_phoThong_giaTri}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.loaiCoPhan_khac_soLuong}</td>
                                <td style={{ border: "1px solid #000", padding: "5px", textAlign: "center" }}>{row.loaiCoPhan_khac_giaTri}</td>
                                <td style={{ border: "1px solid #000", padding: "5px" }}>{row.loaiTaiSan}</td>
                                <td style={{ border: "1px solid #000", padding: "5px" }}>{row.thoiHan}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 7. Thanh toán cổ phần đã đăng ký mua khi đăng ký thành lập doanh nghiệp</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>1. Các cổ đông phải thanh toán đủ số cổ phần đã đăng ký mua trong thời hạn 90 ngày kể từ ngày được cấp Giấy chứng nhận đăng ký doanh nghiệp, trừ trường hợp Điều lệ công ty hoặc hợp đồng đăng ký mua cổ phần quy định một thời hạn khác ngắn hơn. Trường hợp cổ đông góp vốn bằng tài sản thì thời gian vận chuyển nhập khẩu, thực hiện thủ tục hành chính để chuyển quyền sở hữu tài sản đó không tính vào thời hạn góp vốn này. Hội đồng quản trị chịu trách nhiệm giám sát, đôn đốc cổ đông thanh toán đủ và đúng hạn các cổ phần đã đăng ký mua.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>2. Trong thời hạn từ ngày công ty được cấp Giấy chứng nhận đăng ký doanh nghiệp đến ngày cuối cùng phải thanh toán đủ số cổ phần đã đăng ký mua quy định tại khoản 1 Điều này, số phiếu biểu quyết của các cổ đông được tính theo số cổ phần phổ thông đã được đăng ký mua.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>3. Trường hợp sau thời hạn quy định tại khoản 1 Điều này, cổ đông chưa thanh toán hoặc chỉ thanh toán được một phần số cổ phần đã đăng ký mua thì thực hiện theo quy định sau đây:</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>a) Cổ đông chưa thanh toán số cổ phần đã đăng ký mua đương nhiên không còn là cổ đông của công ty và không được chuyển nhượng quyền mua cổ phần đó cho người khác;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>b) Cổ đông chỉ thanh toán một phần số cổ phần đã đăng ký mua có quyền biểu quyết, nhận lợi tức và các quyền khác tương ứng với số cổ phần đã thanh toán; không được chuyển nhượng quyền mua số cổ phần chưa thanh toán cho người khác;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>c) Cổ phần chưa thanh toán được coi là cổ phần chưa bán và Hội đồng quản trị được quyền bán;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>d) Trong thời hạn 30 ngày kể từ ngày kết thúc thời hạn phải thanh toán đủ số cổ phần đã đăng ký mua theo quy định tại khoản 1 Điều này, công ty phải đăng ký điều chỉnh vốn điều lệ bằng mệnh giá số cổ phần đã được thanh toán đủ, trừ trường hợp số cổ phần chưa thanh toán đã được bán hết trong thời hạn này; đăng ký thay đổi cổ đông sáng lập.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>4. Cổ đông chưa thanh toán hoặc chưa thanh toán đủ số cổ phần đã đăng ký mua phải chịu trách nhiệm tương ứng với tổng mệnh giá cổ phần đã đăng ký mua đối với các nghĩa vụ tài chính của công ty phát sinh trong thời hạn trước ngày công ty đăng ký điều chỉnh vốn điều lệ theo quy định tại điểm d khoản 3 Điều này. Thành viên Hội đồng quản trị, người đại diện theo pháp luật phải chịu trách nhiệm liên đới về các thiệt hại phát sinh do không thực hiện hoặc không thực hiện đúng quy định tại khoản 1 và điểm d khoản 3 Điều này.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>5. Trừ trường hợp quy định tại khoản 2 Điều này, người góp vốn trở thành cổ đông của công ty kể từ thời điểm đã thanh toán việc mua cổ phần và những thông tin về cổ đông quy định tại các điểm b, c, d và đ khoản 2 Điều 122 của Luật Doanh nghiệp được ghi vào sổ đăng ký cổ đông.</p>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 8. Quyền của Cổ đông phổ thông</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>1. Cổ đông phổ thông có quyền sau đây:</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>a) Tham dự, phát biểu trong cuộc họp Đại hội đồng cổ đông và thực hiện quyền biểu quyết trực tiếp hoặc thông qua người đại diện theo ủy quyền hoặc hình thức khác do Điều lệ công ty, pháp luật quy định. Mọi cổ phần phổ thông có một phiếu biểu quyết;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>b) Nhận cổ tức với mức theo quyết định của Đại hội đồng cổ đông;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>c) Ưu tiên mua cổ phần mới tương ứng với tỷ lệ sở hữu cổ phần phổ thông của từng cổ đông trong công ty;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>d) Tự do chuyển nhượng cổ phần của mình cho người khác, trừ trường hợp quy định tại khoản 3 Điều 120, khoản 1 Điều 127 của Luật Doanh nghiệp và quy định khác của pháp luật có liên quan;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>đ) Xem xét, tra cứu và trích lục thông tin về tên và địa chỉ liên lạc trong danh sách cổ đông có quyền biểu quyết; yêu cầu sửa đổi thông tin không chính xác của mình;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>e) Xem xét, tra cứu, trích lục hoặc sao chụp Điều lệ công ty, biên bản họp Đại hội đồng cổ đông và nghị quyết Đại hội đồng cổ đông;</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>g) Khi công ty giải thể hoặc phá sản, được nhận một phần tài sản còn lại tương ứng với tỷ lệ sở hữu cổ phần tại công ty.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>...</p>
            <p style={{ textAlign: "justify", fontStyle: "italic", marginTop: "6px", marginBottom: "6px" }}>(Các thông tin cụ thể khác tham chiếu theo bản gốc điều lệ)</p>

            <p className={styles.chapterTitle} style={{ textAlign: "left", marginTop: "12px", marginBottom: "6px", fontWeight: "bold" }}>Điều 52. Điều khoản cuối cùng</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Bản điều lệ này đã được các cổ đông sáng lập xem xét từng chương từng điều và cùng ký tên chấp thuận.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Bản điều lệ này gồm 7 chương, 52 điều, được lập thành 6 bản có giá trị như nhau: 01 bản thực hiện thủ tục đăng ký doanh nghiệp tại cơ quan đăng ký kinh doanh, 01 bản lưu trữ tại trụ sở công ty, 01 bản cho mỗi cổ đông.</p>
            <p style={{ textAlign: "justify", marginTop: "6px", marginBottom: "6px" }}>Mọi sự sao chép, trích lục phải được ký xác nhận của thành viên Hội đồng quản trị công ty.</p>

            <p style={{ textAlign: "right", marginTop: "20px", marginBottom: "6px", fontStyle: "italic", paddingRight: "50px" }}>
                <CurrentDate />
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginTop: "20px" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "50%" }}>
                    <p style={{ textAlign: "center", marginBottom: "6px", marginTop: "10px", fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                        HỌ TÊN, CHỮ KÝ CỦA TẤT CẢ CÁC CỔ ĐÔNG SÁNG LẬP
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
                        {coDongList.map((row, idx) => {
                            const sigHoTen = dataJson[`chuKyCoDong_${idx}_hoTen`] || row.hoTen;
                            const sigTen = dataJson[`chuKyCoDong_${idx}_ten`] || "";
                            return (
                                <div key={idx} style={{ textAlign: "center", padding: "10px", minWidth: "250px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <p style={{ textTransform: "uppercase", textAlign: "center", fontWeight: "bold" }}>Chữ ký của {row.hoTen || `Cổ đông ${idx + 1}`}</p>
                                    <p style={{ fontWeight: "bold", textAlign: "center", minHeight: "20px" }}>{sigTen}</p>
                                    <p style={{ fontWeight: "bold", textAlign: "center", marginTop: "20px" }}>{sigHoTen}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", minWidth: "50%" }}>
                    <p className={styles.signatureName} style={{ textAlign: "center", whiteSpace: "nowrap" }}>HỌ TÊN, CHỮ KÝ CỦA NGƯỜI ĐẠI DIỆN PHÁP LUẬT</p>
                    <p style={{ fontWeight: "bold", textAlign: "center", minHeight: "20px" }}>{dataJson.chuKy_ten || ""}</p>
                    <p style={{ fontWeight: "bold", textAlign: "center", marginTop: "20px" }}>{dataJson.chuKy_hoTen || ""}</p>
                </div>
            </div>
        </div>
    );
}
