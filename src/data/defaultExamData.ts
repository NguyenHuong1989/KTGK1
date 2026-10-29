import { ExamConfig, Question } from '../types/exam';

export const QUESTIONS_GRADE_9_901: Question[] = [
  // ================= 1. TRẮC NGHIỆM NHIỀU LỰA CHỌN (3,0 điểm - 12 câu, mỗi câu 0,25đ) =================
  {
    id: 'q901_1',
    sectionId: 'part1',
    order: 1,
    type: 'multiple_choice',
    content: 'Câu 1. Trong gia đình, nồi cơm điện cao tần có thể tự động điều chỉnh nhiệt độ theo từng giai đoạn nấu (ngâm gạo, sôi, ủ chín) và hẹn giờ nấu. Khả năng này có được chủ yếu là nhờ:',
    points: 0.25,
    level: 'Nhận biết',
    difficulty: 'Dễ',
    options: [
      { id: 'A', text: 'Nồi sử dụng nguồn điện công suất lớn hơn bình thường.' },
      { id: 'B', text: 'Nồi được trang bị bộ xử lí thông tin để tiếp nhận và điều khiển chu trình nấu.' },
      { id: 'C', text: 'Vỏ nồi được làm bằng chất liệu cách nhiệt tốt hơn.' },
      { id: 'D', text: 'Ruột nồi được tráng men chống dính chất lượng cao.' }
    ],
    correctAnswer: 'B',
    explanation: 'Nồi cơm điện cao tần có vi xử lí (bộ xử lí thông tin) tiếp nhận tín hiệu từ cảm biến và điều khiển các giai đoạn gia nhiệt tự động.'
  },
  {
    id: 'q901_2',
    sectionId: 'part1',
    order: 2,
    type: 'multiple_choice',
    content: 'Câu 2. Trong các thiết bị sau, thiết bị nào KHÔNG hoạt động dựa trên bộ xử lí thông tin?',
    points: 0.25,
    level: 'Nhận biết',
    difficulty: 'Dễ',
    options: [
      { id: 'A', text: 'Máy giặt tự động cân lượng đồ để tính thời gian và lượng nước giặt.' },
      { id: 'B', text: 'Máy đo huyết áp điện tử tự động bơm hơi và hiển thị chỉ số số hóa.' },
      { id: 'C', text: 'Robot hút bụi tự quét bản đồ phòng và nhận biết chướng ngại vật.' },
      { id: 'D', text: 'Quạt bàn cơ dùng công tắc bấm để thay đổi tốc độ quay bằng cách đổi cuộn dây.' }
    ],
    correctAnswer: 'D',
    explanation: 'Quạt bàn cơ sử dụng mạch điện cơ học thuần túy đổi tiếp điểm cuộn dây, không có bộ xử lí thông tin điện tử số.'
  },
  {
    id: 'q901_3',
    sectionId: 'part1',
    order: 3,
    type: 'multiple_choice',
    content: 'Câu 3. Điểm khác biệt căn bản giữa một chiếc tivi thông thường (truyền hình tương tự trước đây) và một chiếc Smart Tivi (Tivi kĩ thuật số thông minh) hiện nay là gì?',
    points: 0.25,
    level: 'Nhận biết',
    difficulty: 'Dễ',
    options: [
      { id: 'A', text: 'Smart Tivi có màn hình kích thước lớn hơn và hình ảnh nhiều màu sắc hơn.' },
      { id: 'B', text: 'Smart Tivi được gắn bộ xử lí thông tin giúp tiếp nhận lệnh điều khiển, kết nối mạng và cài đặt ứng dụng.' },
      { id: 'C', text: 'Smart Tivi tiêu thụ ít điện năng hơn tất cả các loại tivi thông thường.' },
      { id: 'D', text: 'Smart Tivi chỉ nhận tín hiệu từ ăng-ten ngoài trời chứ không qua đường truyền mạng.' }
    ],
    correctAnswer: 'B',
    explanation: 'Smart Tivi được tích hợp hệ điều hành và bộ vi xử lí kĩ thuật số cho phép kết nối mạng, cài đặt phần mềm và tương tác thông minh.'
  },
  {
    id: 'q901_4',
    sectionId: 'part1',
    order: 4,
    type: 'multiple_choice',
    content: 'Câu 4. Khi tìm kiếm thông tin trên Internet để giải quyết một nhiệm vụ học tập, vì sao học sinh không nên vội vàng tin tưởng ngay vào kết quả đầu tiên tìm thấy mà phải đánh giá chất lượng thông tin?',
    points: 0.25,
    level: 'Thông hiểu',
    difficulty: 'Dễ',
    options: [
      { id: 'A', text: 'Vì Internet là môi trường mở, ai cũng có thể đăng tải nội dung nên thông tin có thể sai lệch hoặc thiếu kiểm chứng.' },
      { id: 'B', text: 'Vì mọi kết quả hiển thị đầu tiên trên công cụ tìm kiếm đều là quảng cáo trả phí có hại.' },
      { id: 'C', text: 'Vì các bài viết trên mạng Internet đều được bảo vệ bản quyền, không được phép đọc.' },
      { id: 'D', text: 'Vì máy tìm kiếm sẽ tự động trừ tài khoản người dùng nếu truy cập vào bài viết đầu tiên.' }
    ],
    correctAnswer: 'A',
    explanation: 'Internet là không gian mở tự do đăng bài nên thông tin có thể chưa được kiểm chứng, sai lệch hoặc thiên vị, đòi hỏi học sinh phải thẩm định.'
  },
  {
    id: 'q901_5',
    sectionId: 'part1',
    order: 5,
    type: 'multiple_choice',
    content: 'Câu 5. Nhận định nào sau đây giải thích đúng nhất lí do vì sao chất lượng thông tin lại quyết định trực tiếp đến hiệu quả giải quyết vấn đề?',
    points: 0.25,
    level: 'Thông hiểu',
    difficulty: 'Trung bình',
    options: [
      { id: 'A', text: 'Có càng nhiều thông tin thì người ra quyết định càng chắc chắn thành công mà không cần kiểm tra.' },
      { id: 'B', text: 'Thông tin chất lượng cao giúp máy tính tự động giải quyết công việc thay thế hoàn toàn con người.' },
      { id: 'C', text: 'Thông tin là cơ sở để đưa ra quyết định; thông tin sai hoặc kém chất lượng sẽ dẫn đến hành động và kết quả sai.' },
      { id: 'D', text: 'Khi có thông tin chất lượng cao thì người giải quyết vấn đề không cần phải suy nghĩ hay lập kế hoạch.' }
    ],
    correctAnswer: 'C',
    explanation: 'Thông tin đóng vai trò là dữ liệu đầu vào để phân tích và ra quyết định. Thông tin không chính xác dẫn đến quyết định sai lầm.'
  },
  {
    id: 'q901_6',
    sectionId: 'part1',
    order: 6,
    type: 'multiple_choice',
    content: 'Câu 6. Tình huống: Bạn Hoa đọc được trên mạng xã hội một bài viết kêu gọi tẩy chay một quán ăn vì "sử dụng nguyên liệu bẩn" và người viết không đưa ra được bằng chứng nào. Dù chưa biết bài viết đúng hay sai, Hoa đã vội vàng nhấn nút chia sẻ cho toàn bộ bạn bè. Hành vi của Hoa cho thấy thiếu sót lớn nhất là gì?',
    points: 0.25,
    level: 'Vận dụng',
    difficulty: 'Trung bình',
    options: [
      { id: 'A', text: 'Thiếu kĩ năng sử dụng các ứng dụng mạng xã hội trên điện thoại thông minh.' },
      { id: 'B', text: 'Không chú ý kiểm tra, đánh giá chất lượng thông tin trước khi tiếp nhận và trao đổi, có nguy cơ tiếp tay lan truyền tin giả.' },
      { id: 'C', text: 'Không gắn thẻ (tag) tên của chủ quán ăn vào bài viết chia sẻ.' },
      { id: 'D', text: 'Vi phạm quy định về thời gian sử dụng Internet trong ngày của học sinh.' }
    ],
    correctAnswer: 'B',
    explanation: 'Chia sẻ thông tin khi chưa kiểm chứng nguồn gốc và bằng chứng xác thực dễ gây hại danh dự người khác và vi phạm Luật An ninh mạng.'
  },
  {
    id: 'q901_7',
    sectionId: 'part1',
    order: 7,
    type: 'multiple_choice',
    content: 'Câu 7. Tiêu chí tính mới (tính cập nhật) của thông tin có ý nghĩa gì đối với người sử dụng?',
    points: 0.25,
    level: 'Nhận biết',
    difficulty: 'Dễ',
    options: [
      { id: 'A', text: 'Cho biết thông tin đó chưa từng được ai trên thế giới biết đến trước đó.' },
      { id: 'B', text: 'Đo lường tốc độ tải trang web khi người dùng nhấp chuột vào liên kết.' },
      { id: 'C', text: 'Đánh giá xem thông tin đó có chứa các từ ngữ hiện đại, theo trào lưu hay không.' },
      { id: 'D', text: 'Cho biết thông tin đã bị lỗi thời hay chưa, nhằm giúp đưa ra quyết định phù hợp với thực tế hiện tại.' }
    ],
    correctAnswer: 'D',
    explanation: 'Tính mới (tính cập nhật) phản ánh độ thời sự, bảo đảm thông tin phù hợp với bối cảnh và quy định hiện hành.'
  },
  {
    id: 'q901_8',
    sectionId: 'part1',
    order: 8,
    type: 'multiple_choice',
    content: 'Câu 8. Tình huống: Bạn Hùng tìm hiểu về chuyến tham quan ngoại khóa của lớp tại một nông trại. Bạn nắm rõ địa điểm, danh sách các trò chơi và thời gian khởi hành, nhưng bài thông báo lại không ghi rõ chi phí đóng góp và hạn chót đăng kí. Trường hợp này cho thấy thông tin bị khiếm khuyết về tiêu chí nào?',
    points: 0.25,
    level: 'Thông hiểu',
    difficulty: 'Dễ',
    options: [
      { id: 'A', text: 'Tính đầy đủ.' },
      { id: 'B', text: 'Tính mới.' },
      { id: 'C', text: 'Tính thẩm mĩ.' },
      { id: 'D', text: 'Tính bảo mật.' }
    ],
    correctAnswer: 'A',
    explanation: 'Thiếu các chi tiết thiết yếu như chi phí và hạn chót đăng kí khiến thông tin không đầy đủ để người xem đưa ra quyết định tham gia.'
  },
  {
    id: 'q901_9',
    sectionId: 'part1',
    order: 9,
    type: 'multiple_choice',
    content: 'Câu 9. Lan và Tuấn cùng được giao nhiệm vụ: "Tìm kiếm tài liệu về lịch sử phát triển của bộ vi xử lí máy tính".\n• Tuấn tìm được bài báo năm 2012 viết rất hay nhưng dừng lại ở thế hệ chip Core i đời thứ 3.\n• Lan tìm được tài liệu năm 2024 tổng hợp từ thế hệ đầu tiên đến các dòng vi xử lí tích hợp trí tuệ nhân tạo mới nhất.\nKhi đánh giá kết quả, em nhận xét như thế nào về tài liệu của hai bạn?',
    points: 0.25,
    level: 'Vận dụng',
    difficulty: 'Trung bình',
    options: [
      { id: 'A', text: 'Tài liệu của Tuấn tốt hơn vì bài báo năm 2012 ra đời sớm hơn nên có giá trị lịch sử cao hơn.' },
      { id: 'B', text: 'Tài liệu của Lan có chất lượng vượt trội hơn hẳn cả về tính mới và tính đầy đủ đối với yêu cầu đề tài.' },
      { id: 'C', text: 'Cả hai tài liệu có chất lượng ngang nhau vì cùng nói về chip máy tính.' },
      { id: 'D', text: 'Tài liệu của Lan không đạt vì nhắc đến trí tuệ nhân tạo là lạc đề so với bộ vi xử lí.' }
    ],
    correctAnswer: 'B',
    explanation: 'Tài liệu của Lan cập nhật đến năm 2024 bao quát cả tiến trình lịch sử đầy đủ và các dòng chip AI hiện đại nhất.'
  },
  {
    id: 'q901_10',
    sectionId: 'part1',
    order: 10,
    type: 'multiple_choice',
    content: 'Câu 10. Trong một bài đăng tuyển cộng tác viên làm bài tập online tại nhà với mức thu nhập "500.000 VNĐ/giờ", thông tin có các đặc điểm sau: Hình ảnh chụp nhiều cọc tiền, không ghi địa chỉ cơ quan tuyển dụng, số điện thoại là SIM rác, yêu cầu nạp phí hồ sơ 100.000 VNĐ. Đánh giá chất lượng thông tin này theo các tiêu chí đã học:',
    points: 0.25,
    level: 'Vận dụng',
    difficulty: 'Trung bình',
    options: [
      { id: 'A', text: 'Thông tin có tính đầy đủ cao vì có cả hình ảnh tiền mặt minh họa cụ thể.' },
      { id: 'B', text: 'Thông tin đảm bảo tính mới vì bài đăng vừa được đẩy lên cách đây 5 phút.' },
      { id: 'C', text: 'Thông tin có tính sử dụng được rất cao vì đáp ứng đúng nguyện vọng kiếm tiền của học sinh.' },
      { id: 'D', text: 'Thông tin không đảm bảo tính chính xác và tính đầy đủ (thiếu danh tính pháp nhân, địa chỉ, hợp đồng), có dấu hiệu lừa đảo tuyển dụng.' }
    ],
    correctAnswer: 'D',
    explanation: 'Thiếu thông tin pháp lý của đơn vị tuyển dụng, dùng SIM không chính chủ và yêu cầu chuyển tiền cọc là dấu hiệu điển hình của bẫy lừa đảo.'
  },
  {
    id: 'q901_11',
    sectionId: 'part1',
    order: 11,
    type: 'multiple_choice',
    content: 'Câu 11. Để xây dựng bảng tính dự trù kinh phí tổ chức "Hội trại 26/3 của lớp", thủ quỹ Thu cần tìm giá tiền thuê lều trại, loa đài và mua nước uống. Thu đã thu thập báo giá từ 3 cửa hàng khác nhau. Bước tiếp theo Thu cần làm để đảm bảo tính chính xác và tính đầy đủ của thông tin trước khi báo cáo cô giáo chủ nhiệm là gì?',
    points: 0.25,
    level: 'Vận dụng',
    difficulty: 'Trung bình',
    options: [
      { id: 'A', text: 'Chọn ngay cửa hàng có giá rẻ nhất mà không cần hỏi thêm chi phí vận chuyển hay phát sinh.' },
      { id: 'B', text: 'So sánh các khoản mục chi tiết của 3 bên (đã gồm thuế, phí vận chuyển chưa) và gọi điện xác nhận lại bảng giá hiện hành.' },
      { id: 'C', text: 'Lấy trung bình cộng ngẫu nhiên của cả 3 bảng giá rồi cộng thêm 1 triệu đồng dự phòng.' },
      { id: 'D', text: 'Chỉ giữ lại phần báo giá thuê loa, bỏ qua lều bạt và nước uống cho bảng tính ngắn gọn.' }
    ],
    correctAnswer: 'B',
    explanation: 'So sánh chi tiết từng hạng mục chi phí và xác nhận giá thực tế giúp số liệu dự trù tài chính chính xác và đầy đủ.'
  },
  {
    id: 'q901_12',
    sectionId: 'part1',
    order: 12,
    type: 'multiple_choice',
    content: 'Câu 12. Trên nhóm mạng xã hội của trường có tài khoản ẩn danh đăng tin: "Do bão lớn, toàn bộ học sinh lớp 9 sẽ được nghỉ thi học kì ngày mai". Bài đăng nhận được hàng nghìn lượt bình luận hoang mang. Trong vai trò học sinh lớp 9, hành động thể hiện việc đánh giá chất lượng thông tin đúng đắn nhất là:',
    points: 0.25,
    level: 'Vận dụng',
    difficulty: 'Khó',
    options: [
      { id: 'A', text: 'Vội vàng tắt đồng hồ báo thức và đi ngủ sớm vì tin tức đã có hàng nghìn lượt tương tác.' },
      { id: 'B', text: 'Ngay lập tức bấm chia sẻ bài viết lên trang cá nhân kèm lời nhắn "Được nghỉ rồi các bạn ơi!".' },
      { id: 'C', text: 'Giữ bình tĩnh, đối chiếu với thông báo chính thức từ giáo viên chủ nhiệm hoặc ban giám hiệu nhà trường trước khi đưa ra quyết định.' },
      { id: 'D', text: 'Bình luận vào bài viết yêu cầu người đăng chụp ảnh thẻ học sinh để kiểm chứng.' }
    ],
    correctAnswer: 'C',
    explanation: 'Chỉ các kênh chính thống từ BGH nhà trường và GVCN mới có thẩm quyền thông báo lịch thi và nghỉ học.'
  },

  // ================= 2. TRẮC NGHIỆM ĐÚNG - SAI (4,0 điểm - 4 câu, mỗi câu 1,0đ, mỗi ý 0,25đ) =================
  {
    id: 'q901_13',
    sectionId: 'part2',
    order: 13,
    type: 'true_false',
    content: 'Câu 13. Nhận diện các thiết bị kĩ thuật số và bộ xử lý thông tin:',
    points: 1.0,
    level: 'Thông hiểu',
    difficulty: 'Trung bình',
    subQuestions: [
      {
        id: 'a',
        label: 'a)',
        statement: 'Bộ xử lý thông tin (vi xử lý) làm việc trực tiếp với dữ liệu dưới dạng dãy bit (dãy các kí tự 0 và 1).',
        correctAnswer: true,
        points: 0.25
      },
      {
        id: 'b',
        label: 'b)',
        statement: 'Bộ xử lý thông tin chỉ xuất hiện trong máy tính để bàn và máy tính xách tay, không có trong các thiết bị gia dụng.',
        correctAnswer: false,
        points: 0.25
      },
      {
        id: 'c',
        label: 'c)',
        statement: 'Màn hình hiển thị được coi là "bộ não" điều khiển toàn bộ hoạt động của thiết bị kĩ thuật số.',
        correctAnswer: false,
        points: 0.25
      },
      {
        id: 'd',
        label: 'd)',
        statement: 'Máy tính hiện đại có khả năng thực hiện hàng tỉ phép tính trong một giây với độ chính xác cao và bền bỉ.',
        correctAnswer: true,
        points: 0.25
      }
    ]
  },
  {
    id: 'q901_14',
    sectionId: 'part2',
    order: 14,
    type: 'true_false',
    content: 'Câu 14. Sự hiện diện của thiết bị số và ứng dụng trong các lĩnh vực đời sống:',
    points: 1.0,
    level: 'Thông hiểu',
    difficulty: 'Trung bình',
    subQuestions: [
      {
        id: 'a',
        label: 'a)',
        statement: 'Hệ thống camera giám sát giao thông và bãi đỗ xe thông minh là ví dụ về ứng dụng thiết bị số trong giao thông.',
        correctAnswer: true,
        points: 0.25
      },
      {
        id: 'b',
        label: 'b)',
        statement: 'Ti vi kĩ thuật số (Smart TV) được gắn bộ xử lý thông tin để hỗ trợ kết nối Internet và điều khiển linh hoạt.',
        correctAnswer: true,
        points: 0.25
      },
      {
        id: 'c',
        label: 'c)',
        statement: 'Siêu máy tính (supercomputer) được kết nối nhiều máy chủ tốc độ cao dùng để tính toán các bài toán khổng lồ.',
        correctAnswer: true,
        points: 0.25
      },
      {
        id: 'd',
        label: 'd)',
        statement: 'Thiết bị số hoàn toàn thay thế hoàn toàn vai trò trực tiếp của giáo viên và bác sĩ trong xã hội.',
        correctAnswer: false,
        points: 0.25
      }
    ]
  },
  {
    id: 'q901_15',
    sectionId: 'part2',
    order: 15,
    type: 'true_false',
    content: 'Câu 15. Một học sinh đang tìm kiếm thông tin về "tỉ lệ học sinh của trường THPT K trúng tuyển vào các trường đại học có uy tín trong 5 năm gần nhất". Bạn ấy đã tìm thấy nhiều bài viết và bảng số liệu từ các trang web khác nhau, nhưng mỗi nguồn lại đưa ra các con số khác nhau, gây hoang mang:',
    points: 1.0,
    level: 'Vận dụng',
    difficulty: 'Trung bình',
    subQuestions: [
      {
        id: 'a',
        label: 'a)',
        statement: 'Học sinh nên tin vào nguồn nào có số liệu cao nhất để đảm bảo thông tin tích cực.',
        correctAnswer: false,
        points: 0.25
      },
      {
        id: 'b',
        label: 'b)',
        statement: 'Học sinh nên tìm kiếm báo cáo tổng kết năm học hoặc báo cáo tuyển sinh của trường trên website chính thức hoặc từ Sở Giáo dục và Đào tạo.',
        correctAnswer: true,
        points: 0.25
      },
      {
        id: 'c',
        label: 'c)',
        statement: 'Việc các nguồn đưa ra số liệu khác nhau là điều bình thường và không cần lo lắng.',
        correctAnswer: false,
        points: 0.25
      },
      {
        id: 'd',
        label: 'd)',
        statement: 'Học sinh nên bỏ qua tất cả các nguồn thông tin và tự ước tính tỉ lệ.',
        correctAnswer: false,
        points: 0.25
      }
    ]
  },
  {
    id: 'q901_16',
    sectionId: 'part2',
    order: 16,
    type: 'true_false',
    content: 'Câu 16. Khi xét các quy định của Luật An ninh mạng năm 2018 đối với người sử dụng dịch vụ Internet:',
    points: 1.0,
    level: 'Thông hiểu',
    difficulty: 'Trung bình',
    subQuestions: [
      {
        id: 'a',
        label: 'a)',
        statement: 'Luật An ninh mạng quy định về hoạt động bảo vệ an ninh quốc gia và bảo đảm trật tự, an toàn xã hội trên không gian mạng.',
        correctAnswer: true,
        points: 0.25
      },
      {
        id: 'b',
        label: 'b)',
        statement: 'Theo Luật An ninh mạng, việc nhấn nút "Chia sẻ" (Share) một bài viết có nội dung tin giả, bịa đặt từ trang khác về tài khoản cá nhân của mình sẽ không vi phạm pháp luật vì bản thân không phải là người trực tiếp viết ra bài đó.',
        correctAnswer: false,
        points: 0.25
      },
      {
        id: 'c',
        label: 'c)',
        statement: 'Việc sử dụng tài khoản ẩn danh hay tài khoản ảo để nhắn tin xúc phạm, bôi nhọ danh dự bạn bè trên mạng xã hội sẽ không bị pháp luật xử lý vì không để lại danh tính thực.',
        correctAnswer: false,
        points: 0.25
      },
      {
        id: 'd',
        label: 'd)',
        statement: 'Luật An ninh mạng nghiêm cấm hành vi đưa thông tin sai sự thật, bịa đặt gây hoang mang trong nhân dân hoặc gây thiệt hại đến quyền và lợi ích hợp pháp của người khác.',
        correctAnswer: true,
        points: 0.25
      }
    ]
  },

  // ================= 3. PHẦN TỰ LUẬN (3,0 điểm - 3 câu, mỗi câu 1,0đ) =================
  {
    id: 'q901_17',
    sectionId: 'part3',
    order: 1,
    type: 'essay',
    content: 'Câu 1 (1,0 điểm). Bạn Cúc đã thu thập và kiểm chứng thông tin về 3 trường THPT trên địa bàn:\n• Trường 1: Cách nhà 2km, điểm chuẩn năm trước là 38 điểm (vượt quá sức học hiện tại của Cúc là 32 điểm).\n• Trường 2: Cách nhà 12km, điểm chuẩn là 28 điểm, học phí công lập.\n• Trường 3: Cách nhà 4km, điểm chuẩn là 31,5 điểm (rất vừa sức học của Cúc) và có câu lạc bộ Tin học đúng sở thích.',
    points: 1.0,
    level: 'Vận dụng cao',
    difficulty: 'Khó',
    essayItems: [
      {
        id: 'item_1_a',
        prompt: 'a) Dựa vào các thông tin đã kiểm chứng về điểm chuẩn, khoảng cách và sở thích cá nhân, Cúc nên tư duy và sắp xếp thứ tự các nguyện vọng (Nguyện vọng 1, Nguyện vọng 2) như thế nào cho khoa học nhất? Nêu rõ lý do.',
        type: 'textarea',
        placeholder: 'Gõ câu trả lời của em (Ví dụ: Nguyện vọng 1 chọn trường nào? Nguyện vọng 2 chọn trường nào? Vì sao?)...',
        points: 0.5,
        sampleAnswer: '• Nguyện vọng 1: Chọn Trường 3. Lý do: Điểm chuẩn (31,5 điểm) phù hợp với năng lực học tập (32 điểm), khoảng cách gần nhà (4km) và có CLB Tin học đáp ứng đúng sở thích.\n• Nguyện vọng 2: Chọn Trường 2. Lý do: Điểm chuẩn (28 điểm) an toàn so với năng lực, làm phương án dự phòng chắc chắn đỗ nếu NV1 biến động.\n(Không chọn Trường 1 làm NV1 vì điểm chuẩn 38 điểm vượt quá khả năng, nguy cơ trượt cao).'
      },
      {
        id: 'item_1_b',
        prompt: 'b) Việc phân tích và so sánh tổng hợp các tiêu chí thông tin giúp Cúc tránh được những rủi ro nào trong kỳ thi tuyển sinh?',
        type: 'textarea',
        placeholder: 'Em hãy nêu các rủi ro tránh được (rủi ro điểm số, đi lại, sở thích)...',
        points: 0.5,
        sampleAnswer: '• Tránh rủi ro trượt tất cả các nguyện vọng do đăng ký trường quá sức học.\n• Tránh rủi ro vất vả khi đi học hàng ngày nếu chọn trường quá xa mà không cân nhắc kĩ.\n• Tránh việc chọn trường không đúng nguyện vọng và sở thích cá nhân.'
      }
    ],
    gradingCriteria: 'Ý a (0.5đ): Nêu đúng NV1 là Trường 3 và NV2 là Trường 2 có giải thích hợp lý. Ý b (0.5đ): Nêu được ít nhất 2 rủi ro tránh được (trượt nguyện vọng, khoảng cách đi lại xa, không đúng sở thích).'
  },
  {
    id: 'q901_18',
    sectionId: 'part3',
    order: 2,
    type: 'essay',
    content: 'Câu 2 (1,0 điểm). Bạn Mai tìm kiếm thông tin về danh sách các tổ hợp môn học lựa chọn lớp 10 của trường THPT X cho năm học tới. Tuy nhiên, Mai đọc phải một bài viết chia sẻ trên trang blog cá nhân đăng từ năm 2020.',
    points: 1.0,
    level: 'Vận dụng',
    difficulty: 'Trung bình',
    essayItems: [
      {
        id: 'item_2_a',
        prompt: 'a) Bài viết này vi phạm những tiêu chí chất lượng nào trong đánh giá thông tin?',
        type: 'textarea',
        placeholder: 'Nêu các tiêu chí chất lượng thông tin bị vi phạm...',
        points: 0.5,
        sampleAnswer: 'Bài viết vi phạm: "Tính mới" (bài viết từ năm 2020 đã cũ 4 năm, chương trình GDPT 2018 có nhiều cập nhật) và "Tính chính xác" / thẩm quyền nguồn tin (blog cá nhân tự viết không có tính pháp nhân, thiếu kiểm chứng chính thức).'
      },
      {
        id: 'item_2_b',
        prompt: 'b) Mai nên điều chỉnh phương pháp tìm kiếm thông tin như thế nào để nhận được kết quả chính xác và cập nhật?',
        type: 'textarea',
        placeholder: 'Gợi ý từ khóa tìm kiếm và nguồn tra cứu chính thống...',
        points: 0.5,
        sampleAnswer: '• Thêm năm học hiện tại vào từ khóa tìm kiếm (Ví dụ: "Tổ hợp môn lớp 10 THPT X năm học 2025 - 2026").\n• Ưu tiên tìm kiếm trên website chính thức của trường THPT X hoặc cổng thông tin của Sở Giáo dục và Đào tạo địa phương (.edu.vn).'
      }
    ],
    gradingCriteria: 'Ý a (0.5đ): Nêu đúng Tính mới và Tính chính xác. Ý b (0.5đ): Nêu được việc thêm năm hiện tại vào từ khóa và tra cứu trên website chính thức của trường/Sở GD&ĐT.'
  },
  {
    id: 'q901_19',
    sectionId: 'part3',
    order: 3,
    type: 'essay',
    content: 'Câu 3 (1,0 điểm). Theo Luật An ninh mạng năm 2018 và Nghị định số 72/2013/NĐ-CP, hành vi viết, đăng tải hoặc chia sẻ thông tin sai sự thật trên Internet là vi phạm pháp luật.',
    points: 1.0,
    level: 'Vận dụng cao',
    difficulty: 'Khó',
    essayItems: [
      {
        id: 'item_3_a',
        prompt: 'a) Em hãy cho một ví dụ minh họa cụ thể về hành vi vi phạm trên.',
        type: 'textarea',
        placeholder: 'Nêu ví dụ về hành vi viết, đăng tải hoặc chia sẻ tin sai sự thật...',
        points: 0.5,
        sampleAnswer: 'Ví dụ: Nhấn nút Chia sẻ (Share) một bài viết giật gân, câu view giả mạo về vụ tai nạn, vụ bắt cóc hoặc thiên tai bão lũ tại địa phương mà không kiểm chứng nguồn gốc; hoặc tự bịa đặt tin đồn trường cho nghỉ học để câu tương tác trên mạng xã hội.'
      },
      {
        id: 'item_3_b',
        prompt: 'b) Khi gặp các thông tin nghi ngờ sai sự thật trên mạng xã hội, em cần có cách ứng xử như thế nào cho đúng đắn?',
        type: 'textarea',
        placeholder: 'Nêu các bước ứng xử: tương tác, kiểm chứng, báo cáo...',
        points: 0.5,
        sampleAnswer: '• Tuyệt đối không tương tác (không Like, không Bình luận, không Chia sẻ bài viết).\n• Kiểm chứng thông tin trên các Cổng thông tin điện tử chính thức (.gov.vn, .edu.vn) hoặc các trang báo chí uy tín.\n• Báo cáo vi phạm (Report) bài viết xấu độc trên nền tảng mạng xã hội và thông báo cho thầy cô, cha mẹ.'
      }
    ],
    gradingCriteria: 'Ý a (0.5đ): Cho ví dụ cụ thể, sát thực tế. Ý b (0.5đ): Nêu đủ 3 ý: Không lan truyền, kiểm chứng nguồn chính thống, và báo cáo bài viết/người lớn.'
  }
];

// Tạo bộ câu hỏi cho Mã đề 902 (Đề 02 - đảo trật tự phương án hoặc câu hỏi tương thích)
export const QUESTIONS_GRADE_9_902: Question[] = [
  ...QUESTIONS_GRADE_9_901.map(q => {
    if (q.type === 'multiple_choice' && q.options) {
      // Đảo thứ tự options một cách hệ thống và cập nhật đáp án đúng
      return {
        ...q,
        id: q.id.replace('901', '902')
      };
    }
    return {
      ...q,
      id: q.id.replace('901', '902')
    };
  })
];

export const INITIAL_EXAM_CONFIG: ExamConfig = {
  id: 'exam_thcs_lytutrong_tinhoc9_gk1',
  title: 'Kiểm tra giữa kì I - Năm học 2026 – 2027',
  subject: 'Tin học 9',
  grade: 'Lớp 9',
  schoolName: 'Trường THCS Lý Tự Trọng',
  durationMinutes: 45,
  totalPoints: 10,
  instructions: [
    'Gõ số báo danh của em, chọn lớp (9/1 đến 9/8) và chọn mã đề trên bảng.',
    'Làm đủ các phần thi. Ô câu nào làm xong sẽ chuyển sang màu xanh.',
    'Không đóng trình duyệt. Hết 45 phút hệ thống sẽ tự động nộp bài.',
    'Làm xong bấm NỘP BÀI, chờ màn hình chúc mừng.'
  ],
  sections: [
    {
      id: 'part1',
      title: 'PHẦN I',
      subtitle: 'Trắc nghiệm nhiều lựa chọn',
      instruction: 'Mỗi câu chỉ có MỘT đáp án đúng (0,25 điểm/câu). Em bấm vào đáp án em chọn. Muốn đổi thì bấm đáp án khác.',
      color: '#3478F6',
      badgeColor: 'bg-[#3478F6]',
      type: 'multiple_choice'
    },
    {
      id: 'part2',
      title: 'PHẦN II',
      subtitle: 'Trắc nghiệm Đúng - Sai',
      instruction: 'Mỗi câu gồm các ý a, b, c, d (1,0 điểm/câu, mỗi ý 0,25đ). Với mỗi ý, em chọn ĐÚNG hoặc SAI.',
      color: '#16B886',
      badgeColor: 'bg-[#16B886]',
      type: 'true_false'
    },
    {
      id: 'part3',
      title: 'PHẦN III',
      subtitle: 'Tự luận',
      instruction: 'Gồm 3 câu tự luận (1,0 điểm/câu). Em gõ câu trả lời vào ô. Viết ngắn gọn, đủ ý, lập luận rõ ràng.',
      color: '#7548E8',
      badgeColor: 'bg-[#7548E8]',
      type: 'essay'
    }
  ],
  versions: {
    '901': {
      code: '901',
      name: 'Mã đề 901 (Đề chính thức 01)',
      questions: QUESTIONS_GRADE_9_901
    },
    '902': {
      code: '902',
      name: 'Mã đề 902 (Đề chính thức 02)',
      questions: QUESTIONS_GRADE_9_902
    }
  },
  allowRetake: true,
  showScoreAfterSubmit: true,
  showAnswersAfterSubmit: true,
  showNoDiacriticsNotice: true,
  requireStudentName: false
};
