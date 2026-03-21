import GiayDeNghi from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormDeclaration/GiayDeNghi";
import GiayDeNghi2 from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormConfirmation/GiayDeNghi";
import GiayUyQuyen from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormDeclaration/GiayUyQuyen";
import GiayUyQuyen2 from "../components/Procedure/ProcedureTemplate/HoKinhDoanh/FormConfirmation/GiayUyQuyen";

const typeCompanyOptions = [
    {
        title: "Công ty TNHH 1 thành viên",
        value: "cong_ty_tnhh_mot_thanh_vien",
        services: [
            {
                title: "Dịch vụ thành lập công ty",
                value: "thanh_lap_cong_ty",
                procedures: [
                    {
                        title: "Thành lập mới",
                        value: "thanh_lap_moi",
                        formsType: [
                            {
                                title: "Danh sách các cổ đông sáng lập",
                                declaration: "ListShareholderDeclaration",
                                confirmation: "ListShareholderConfirmation",
                            },
                            {
                                title: "Danh sách CSH hưởng lợi",
                                declaration: "ListBeneficiaryDeclaration",
                                confirmation: "ListBeneficiaryConfirmation",
                            },
                            {
                                title: "Điều lệ công ty",
                                declaration: "CharterDeclaration",
                                confirmation: "CharterConfirmation",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "cap_nhat_thay_doi",
                procedures: [
                    {
                        title: "Cập nhật địa chỉ, Chủ sở hữu hưởng lợi, người đại diện, ngành nghề, email, số điện thoại",
                        value: "cap_nhat_dia_chi_chu_so_huu_huong_loi_nguoi_dai_dien_nganh_nghe_email_so_dien_thoai",
                        formsType: [
                            {
                                title: "Quyết định của ĐHĐCĐ",
                                declaration: "ListShareholderDeclaration",
                                confirmation: "ListShareholderConfirmation",
                                type: "TH1. CMND chuyển thành căn cước",
                                type_code: "th1_cmnd_chuyen_thanh_can_cuoc",
                            },
                            {
                                title: "Danh sách CSH hưởng lợi",
                                declaration: "ListBeneficiaryDeclaration",
                                confirmation: "ListBeneficiaryConfirmation",
                                type: "TH1. CMND chuyển thành căn cước",
                                type_code: "th1_cmnd_chuyen_thanh_can_cuoc",
                            },
                            {
                                title: "Giấy đề nghị",
                                declaration: "CharterDeclaration",
                                confirmation: "CharterConfirmation",
                                type: "TH1. CMND chuyển thành căn cước",
                                type_code: "th1_cmnd_chuyen_thanh_can_cuoc",
                            },
                            {
                                title: "Giấy uỷ quyền",
                                declaration: "CharterDeclaration",
                                confirmation: "CharterConfirmation",
                                type: "TH1. CMND chuyển thành căn cước",
                                type_code: "th1_cmnd_chuyen_thanh_can_cuoc",
                            },
                            {
                                title: "Quyết định của ĐHĐCĐ",
                                declaration: "ListShareholderDeclaration",
                                confirmation: "ListShareholderConfirmation",
                                type: "TH2. CMND chuyển thành căn cước",
                                type_code: "th2_cmnd_chuyen_thanh_can_cuoc",
                            },
                            {
                                title: "Danh sách CSH hưởng lợi",
                                declaration: "ListBeneficiaryDeclaration",
                                confirmation: "ListBeneficiaryConfirmation",
                                type: "TH2. CMND chuyển thành căn cước",
                                type_code: "th2_cmnd_chuyen_thanh_can_cuoc",
                            },
                            {
                                title: "Giấy đề nghị",
                                declaration: "CharterDeclaration",
                                confirmation: "CharterConfirmation",
                                type: "TH2. CMND chuyển thành căn cước",
                                type_code: "th2_cmnd_chuyen_thanh_can_cuoc",
                            },
                            {
                                title: "Giấy uỷ quyền",
                                declaration: "CharterDeclaration",
                                confirmation: "CharterConfirmation",
                                type: "TH2. CMND chuyển thành căn cước",
                                type_code: "th2_cmnd_chuyen_thanh_can_cuoc",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Đăng ký thay đổi",
                value: "dang_ky_thay_doi",
            },
            {
                title: "Tạm ngừng - tiếp tục KD",
                value: "tam_ngung_tiep_tuc_kd",
            },
            {
                title: "Giải thể",
                value: "giai_the",
            },
        ],
    },
    {
        title: "Công ty TNHH 2 thành viên trở lên",
        value: "cong_ty_tnhh_hai_thanh_vien_tro_len",
        services: [
            {
                title: "Dịch vụ thành lập công ty",
                value: "thanh_lap_cong_ty",
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "cap_nhat_thay_doi",
            },
            {
                title: "Đăng ký thay đổi",
                value: "dang_ky_thay_doi",
            },
            {
                title: "Tạm ngừng - tiếp tục KD",
                value: "tam_ngung_tiep_tuc_kd",
            },
            {
                title: "Giải thể",
                value: "giai_the",
            },
        ],
    },
    {
        title: "Công ty cổ phần",
        value: "cong_ty_co_phan",
        services: [
            {
                title: "Dịch vụ thành lập công ty",
                value: "thanh_lap_cong_ty",
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "cap_nhat_thay_doi",
                procedures: [
                    {
                        title: "Cập nhật địa chỉ, Chủ sở hữu hưởng lợi, người đại diện, ngành nghề, email, số điện thoại",
                        value: "cap_nhat_dia_chi_chu_so_huu_huong_loi_nguoi_dai_dien_nganh_nghe_email_so_dien_thoai",
                        formsType: [
                            {
                                title: "TH1. Thay đổi NĐDPL, cập nhật DN, ngành nghề",
                                value: "th1_thay_doi_nddpl_cap_nhat_dn_nganh_nghe",
                            },
                            {
                                title: "TH2. Ban đầu có 2 NĐDPL, xóa 1 người đi còn 1, cập nhật DN, ngành nghề",
                                value: "th2_ban_dau_co_2_nddpl_xoa_1_nguoi_di_con_1_cap_nhat_dn_nganh_nghe",
                            },
                        ],
                    },
                ],
            },
            {
                title: "Đăng ký thay đổi",
                value: "dang_ky_thay_doi",
            },
            {
                title: "Tạm ngừng - tiếp tục KD",
                value: "tam_ngung_tiep_tuc_kd",
            },
            {
                title: "Giải thể",
                value: "giai_the",
            },
        ],
    },
    {
        title: "Doanh nghiệp tư nhân",
        value: "doanh_nghiep_tu_nhan",
        services: [
            {
                title: "Dịch vụ thành lập doanh nghiệp tư nhân",
                value: "thanh_lap_cong_ty",
            },
            {
                title: "Dịch vụ cập nhật thay đổi",
                value: "cap_nhat_thay_doi",
            },
            {
                title: "Đăng ký thay đổi",
                value: "dang_ky_thay_doi",
            },
            {
                title: "Tạm ngừng - tiếp tục KD",
                value: "tam_ngung_tiep_tuc_kd",
            },
            {
                title: "Giải thể",
                value: "giai_the",
            },
        ],
    },
    {
        title: "Hộ kinh doanh",
        value: "ho_kinh_doanh",
        services: [
            {
                title: "Dịch vụ thành lập hộ kinh doanh",
                value: "thanh_lap_ho_kinh_doanh",
                procedures: [
                    {
                        title: "Thành lập mới",
                        value: "thanh_lap_moi",
                        formsType: [
                            {
                                title: "Giấy đề nghị đăng ký hộ kinh doanh",
                                declaration: GiayDeNghi,
                                confirmation: GiayDeNghi2,
                            },
                            {
                                title: "Giấy uỷ quyền",
                                declaration: GiayUyQuyen,
                                confirmation: GiayUyQuyen2,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export default typeCompanyOptions;
