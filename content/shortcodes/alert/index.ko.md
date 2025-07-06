+++
title = "Alert Box"
weight = 1
+++

다양한 유형의 알림 메시지를 강조하여 중요한 정보, 상태, 경고 등을 효과적으로 전달할 수 있습니다. Info, Success, Warning, Error 등 상황에 맞는 알림 박스를 쉽게 추가하세요.

## Info

{% alert_info() %}
  Info alert
{% end %}

```jinja2
{%/* alert_info() */%}
  Info alert
{%/* end */%}
```

## Success

{% alert_success() %}
  Success alert
{% end %}

```jinja2
{%/* alert_success() */%}
  Success alert
{%/* end */%}
```

## Warnging

{% alert_warning() %}
  Warning alert
{% end %}

```jinja2
{%/* alert_warning() */%}
  Warning alert
{%/* end */%}
```

## Error

{% alert_error() %}
  Error alert
{% end %}

```jinja2
{%/* alert_error() */%}
  Error alert
{%/* end */%}
```
