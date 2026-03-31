# BA Research Skill - Hướng dẫn Research Tính Năng

## Khi nào dùng?
Khi Roger yêu cầu **research** một tính năng, phải gọi skill này để:
- Phân tích requirement từ Shopify/đối thủ
- Tìm hiểu user flow
- Thu thập ý kiến từ team
- Định nghĩa feature scope rõ ràng

## Quy trình Research

### 1. Gather Information
- **Competitor Analysis**: Xem competitor apps có feature gì, làm thế nào
- **Shopify Requirements**: Check Shopify guidelines, App Store requirements
- **Team Input**: Hỏi developers, testers về technical constraints
- **User Feedback**: Review từ merchants, affiliates

### 2. Define Scope
- **Must-haves**: Core features cho MVP
- **Nice-to-haves**: Future iterations
- **Out-of-scope**: Cái gì sẽ làm sau
- **Effort Estimate**: Rough hours estimate

### 3. User Flow
- Map user journey từ entry → completion
- Identify edge cases, error states
- List all screens/pages needed

### 4. Technical Feasibility
- Check existing codebase patterns
- Identify new APIs/integrations needed
- Security considerations
- Performance requirements

## Folder Structure
Khi bắt đầu research feature mới, luôn tạo folder:
```
documents/roger/tài liệu/{tên-feature}/
├── README.md                    # Index & navigation
├── research/
│   ├── competitor-analysis.md
│   └── requirements.md
├── prd/
│   └── PRD-{FEATURE}-MVP.md
├── tài-liệu/
│   ├── technical-specs.md
│   └── user-flows.md
├── test-case/
│   ├── test-plan.md
│   └── test-cases.md
└── UI/
    ├── wireframes.html
    └── ui-specs.md
```

## Output Formats
Bạn nên có:
1. **research/** - Competitor & requirement gathering
2. **prd/** - PRD MVP đơn giản, tiếng Việt
3. **tài-liệu/** - Technical specs, implementation guide
4. **test-case/** - Test plan, test cases
5. **UI/** - Wireframes, design specs

## Lưu ý
- ✅ Luôn hỏi rõ requirement trước khi research
- ✅ Document everything - cái gì không có doc sẽ bị quên
- ✅ Kết quả research phải có concrete deliverable (không abstract)
- ✅ Nếu không chắc → hỏi Roger thay vì đoán
- ❌ Không bắt đầu implement ngay, phải research xong → PRD → dev approval
