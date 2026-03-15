import GiayDeNghi from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormDeclaration/GiayDeNghi";
import GiayDeNghi2 from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormConfirmation/GiayDeNghi";
import GiayUyQuyen from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormDeclaration/GiayUyQuyen";
import GiayUyQuyen2 from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormConfirmation/GiayUyQuyen";

const additionalServices = [
    {
        title: "Đăng ký thay đổi",
        value: "dang_ky_thay_doi"
    },
    {
        title: "Tạm ngừng - tiếp tục KD",
        value: "tam_ngung_tiep_tuc_kd"
    },
    {
        title: "Giải thể",
        value: "giai_the"
    }
];

const typeCompanyOptions = [
    {
        title: "Công ty TNHH 1 thành viên",
        value: "cong_ty_tnhh_mot_thanh_vien",
        services: [
            {
                title: "Dịch vụ thành lập công ty",
                value: "dich_vu_thanh_lap_cong_ty",
                procedures: [
                    {
                        title: "Thành lập mới",
                        formsType: [
                            {
                                title: "Danh sách các cổ đông sáng lập",
                                component: "ListShareholder"
                            },
                            {
                                title: "Danh sách CSH hưởng lợi",
                                component: "ListBeneficiary"
                            },
                            {
                                title: "Điều lệ công ty",
                                component: "Charter"
                            }
                        ]
                    }
                ]
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "dich_vu_cap_nhat_thay_doi",
                procedures: [
                    {
                        title: "Cập nhật địa chỉ, Chủ sở hữu hưởng lợi, người đại diện, ngành nghề, email, số điện thoại",
                        formsType: [
                            {
                                title: "Quyết định của ĐHĐCĐ",
                                component: "ListShareholder",
                                type: "TH1. CMND chuyển thành căn cước"
                            },
                            {
                                title: "Danh sách CSH hưởng lợi",
                                component: "ListBeneficiary",
                                type: "TH1. CMND chuyển thành căn cước"
                            },
                            {
                                title: "Giấy đề nghị",
                                component: "Charter",
                                type: "TH1. CMND chuyển thành căn cước"
                            },
                            {
                                title: "Giấy uỷ quyền",
                                component: "Charter",
                                type: "TH1. CMND chuyển thành căn cước"
                            }
                        ]
                    }
                ]
            },
            ...additionalServices
        ]
    },
    {
        title: "Công ty TNHH 2 thành viên trở lên",
        value: "cong_ty_tnhh_hai_thanh_vien_tro_len",
        services: [
            {
                title: "Dịch vụ thành lập công ty",
                value: "dich_vu_thanh_lap_cong_ty"
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "dich_vu_cap_nhat_thay_doi"
            },
            ...additionalServices
        ]
    },
    {
        title: "Công ty cổ phần",
        value: "cong_ty_co_phan",
        services: [
            {
                title: "Dịch vụ thành lập công ty",
                value: "dich_vu_thanh_lap_cong_ty"
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "dich_vu_cap_nhat_thay_doi",
                procedures: [
                    {
                        title: "Cập nhật địa chỉ, Chủ sở hữu hưởng lợi, người đại diện, ngành nghề, email, số điện thoại",
                        value: "cap_nhat_dia_chi_chu_so_huu_huong_loi_nguoi_dai_dien_nganh_nghe_email_so_dien_thoai",
                        formsType: [
                            {
                                title: "TH1. Thay đổi NĐDPL, cập nhật DN, ngành nghề",
                                value: "th1_thay_doi_nddpl_cap_nhat_dn_nganh_nghe"
                            },
                            {
                                title: "TH2. Ban đầu có 2 NĐDPL, xóa 1 người đi còn 1, cập nhật DN, ngành nghề",
                                value: "th2_ban_dau_co_2_nddpl_xoa_1_nguoi_di_con_1_cap_nhat_dn_nganh_nghe"
                            }
                        ]
                    }
                ]
            },
            ...additionalServices
        ]
    },
    {
        title: "Doanh nghiệp tư nhân",
        value: "doanh_nghiep_tu_nhan",
        services: [
            {
                title: "Dịch vụ thành lập doanh nghiệp tư nhân",
                value: "dich_vu_thanh_lap_cong_ty"
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "dich_vu_cap_nhat_thay_doi"
            },
            ...additionalServices
        ]
    },
    {
        title: "Hộ kinh doanh",
        value: "ho_kinh_doanh",
        services: [
            {
                title: "Dịch vụ thành lập hộ kinh doanh",
                value: "dich_vu_thanh_lap_ho_kinh_doanh",
                procedures: [
                    {
                        title: "Đăng ký thành lập hộ kinh doanh",
                        formsType: [
                            {
                                title: "Giấy đề nghị đăng ký hộ kinh doanh",
                                declaration: GiayDeNghi,
                                confirmation: GiayDeNghi2
                            },
                            {
                                title: "Giấy uỷ quyền",
                                declaration: GiayUyQuyen,
                                confirmation: GiayUyQuyen2
                            }
                        ]
                    }
                ]
            },
        ]
    },
];

export default typeCompanyOptions;