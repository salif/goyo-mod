+++
title = "Collapse"
weight = 1
+++

`collapse`

- `collapse`: 접을 수 있는 섹션을 보여줍니다.  
  파라미터:  
  - `title`: 섹션의 제목  
  - `content`: 섹션 내부의 내용

```jinja
{{/* collapse(title="계정을 어떻게 만들 수 있나요?", content="오른쪽 상단의 '회원가입' 버튼을 클릭하고 안내에 따라 등록하세요.") */}}
```

{{ collapse(title="계정을 어떻게 만들 수 있나요?", content="오른쪽 상단의 '회원가입' 버튼을 클릭하고 안내에 따라 등록하세요.") }}

