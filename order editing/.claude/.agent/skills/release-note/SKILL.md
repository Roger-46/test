---
name: release-note
description: Viet release note tinh nang theo format chuan cua nhom #release Slack. Trigger khi Roger noi "viet release", "release note", "thong bao release". Sau khi Roger review OK va noi "dang release" thi post len #release channel.
---

# Skill: Viet Release Note

## Trigger

- Roger noi **"viet release [ten tinh nang]"** → tao file release note
- Roger noi **"dang release"** hoac **"post release"** → dang len #release Slack channel

---

## Format chuan (hoc tu #release channel)

### Cau truc tong quat

```
### [TEN APP] - [Ngay thang nam]  [emoji app]

[emoji feature] **[Loai: NEW FEATURE / IMPROVEMENT / GROWTH HACKING / BUG FIX] - [Tieu de ngan gon]**
• **Issue / Use case:** [Van de hoac nhu cau cua merchant — 1-2 cau]
• **Solution:** [Giai phap — mo ta ngan gon tinh nang moi]
• **Vi tri:** [Noi tim tinh nang trong app: Menu > Submenu > Section]
• **Description flow / Logic:**
    ◦ Buoc 1: [Mo ta]
    ◦ Buoc 2: [Mo ta]
    ◦ ...
• **Note:** [Ghi chu them cho CS/team — optional]
• **Demo:** [Link screenshot hoac video]

@channel Mo nguoi nam thong tin, neu can ho tro lien he <@U02HPQQEGBT> hoac <@U05U900QR0X> nhe a
```

### Cac loai release

| Loai | Khi nao dung | Prefix |
|------|-------------|--------|
| **NEW FEATURE** | Tinh nang hoan toan moi | `[NEW FEATURE]` |
| **IMPROVEMENT** | Cai thien tinh nang co | `[IMPROVEMENT]` |
| **GROWTH HACKING** | Tang conversion/revenue | `Growth hacking:` |
| **GOLIVE APP MOI** | App moi publish | `THONG BAO GOLIVE APP MOI:` |
| **BUG FIX** | Fix bug quan trong | `[BUG FIX]` |

### Nhieu tinh nang trong 1 release

Neu co nhieu feature/improvement cung ngay, dung format nhu Accessibility (12/02/2026):

```
### [TEN APP] - [Ngay]
[So] [LOAI] - [Tieu de chung]

[emoji] [LOAI 1] [Ten] - [Mo ta ngan]
• Issue: ...
• Solution: ...

[emoji] [LOAI 2] [Ten] - [Mo ta ngan]
• Issue: ...
• Solution: ...
```

---

## Vi du thuc te da hoc

### Vi du 1: Feature don (Survey - Omnisend integration)

```
### Survey - 22/12/2025
:0-sea: Feature: Survey x Omnisend
• Vi tri: Integration > Omnisend
• Omnisend la nen tang gui email tuong tu Klaviyo. MC co the setup email automation flow...
• Flow:
    ◦ Merchant tao API Key trong Omnisend app
    ◦ Trong SEA Survey, merchant:
        ▪︎ Paste API key
        ▪︎ Chon survey truyen response sang Omnisend
    ◦ Khi integration duoc bat: Moi response moi → App gui response sang Omnisend
• Tinh nang available cho plan `growth` tro len
• Demo: [link]
@channel ...
```

### Vi du 2: Improvement (Order Limits - Skip Quantity)

```
### AVADA ORDER LIMITS - 02/03/2026

:avada: [IMPROVEMENT] - Skip Quantity Values: Cho phep merchant chan so luong cu the khi ban theo boi so
• Issue / Use case: Merchant ban san pham theo boi so nhung co mot so so luong cu the khong the ban duoc...
• Solution: Them tinh nang "Skip quantity values" vao Sell in multiples...
• Vi tri: Limits management → Product limit → Limit conditions
• Description flow:
    ◦ Buoc 1: Vao Control Panel → Bat toggle "Enable skip quantity values for multiples"
    ◦ Buoc 2: Bat Sell in multiples → Field Skip quantity values hien thi
    ◦ Buoc 3: Nhap cac so luong muon block, phan cach bang dau phay
    ◦ Buoc 4: Save
```

### Vi du 3: Golive app moi (Age Verification)

```
:age-verify: THONG BAO GOLIVE APP MOI: SUN: Age Verification Popup
• Muc dich: Giup Merchant dap ung cac yeu cau ve gioi han do tuoi...
• Vi du: Cua hang ban sung yeu cau Customer tren 18 tuoi...
• Tong quan app: App cho phep merchant tao popup banner xac minh do tuoi...
• Mo ta chi tiet:
    ◦ Merchant view: ...
    ◦ Customer view: ...
• Url app: [link]
• Thoi gian publish du kien: [ngay]
```

---

## Quy trinh

### Buoc 1: Roger noi "viet release [feature]"

1. Doc PRD cua feature (neu co): `documents/roger/features/{feature}/PRD-{feature}.md`
2. Doc code changes / commit history (neu can)
3. **Chup screenshot tu app that** (BAT BUOC):
   - Dung Playwright MCP truy cap app staging/production
   - Di qua tung man hinh cua feature, chup screenshot
   - Luu anh vao: `documents/roger/features/{feature}/screenshots/`
   - Dat ten: `release-S1-forgot-password-page.png`, `release-S2-email-sent.png`, ...
   - Dinh kem link anh vao phan Demo trong release note
   - **KHONG dung UI mockup HTML** — mockup co the khac app that ve layout, color, style
4. Viet release note theo format chuan
5. Luu file tai: `documents/roger/features/{feature}/release-{feature}.md`

### Buoc 2: Noi dung file release

```markdown
*### AFFILY AFFILIATE MARKETING - [DD/MM/YYYY]*

:rocket::rocket: *[LOAI] - [Tieu de ngan gon]*
• *Issue / Use case:* [Van de — 1-2 cau]
• *Solution:* [Giai phap ngan gon]
• *Vi tri:* [Menu path trong app]
• *Mo ta chi tiet:*
    ◦ [Diem 1]
    ◦ [Diem 2]
    ◦ ...
• *Luong co ban:* [optional — khi feature co nhieu buoc]
    ◦ [Buoc 1]
    ◦ [Buoc 2]
• *Note:* [Ghi chu — optional]
• *Demo:* [Link screenshot tu app that]
<!channel> Moi nguoi nam thong tin a, neu can ho tro lien he <@U02HPQQEGBT> hoac anh <@U05U900QR0X> nhe a :rocket::rocket:
```

> File chi luu noi dung Slack message — KHONG co metadata header
> Noi dung nay SE DUOC POST NGUYEN VAN len #release khi Roger noi "dang release"

### Buoc 3: Roger review

- Roger doc file, chinh sua neu can
- Roger noi **"ok"** hoac **"dang release"**

### Buoc 4: Dang len Slack (gui DM cho Roger truoc)

**QUAN TRONG: KHONG dang truc tiep len #release. Gui vao DM cho Roger truoc de Roger review lan cuoi.**

1. Lay noi dung Slack message tu file
2. Post vao DM cua Roger (`D0ALPQJUDD3`) bang API:

```bash
curl -s -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"channel":"D0ALPQJUDD3","text":"[noi dung]","unfurl_links":true}' \
  "https://slack.com/api/chat.postMessage"
```

3. Bao Roger ket qua — Roger tu copy & forward len #release khi san sang

---

## Quy tac

- **Ngon ngu**: Tieng Viet (giong cac bai trong #release)
- **Emoji**: Dung emoji phu hop voi app (`:rocket:` cho Affiliate, hoac emoji custom neu co)
- **Lien he**: Luon tag Roger (`<@U02HPQQEGBT>`) va Son Nguyen Mike (`<@U05U900QR0X>`) — DA VERIFY DUNG
- **@channel**: Dung cu phap `<!channel>` (Slack API se render thanh @channel)
- **Demo link**: Chup tu app that bang Playwright MCP, KHONG dung UI mockup HTML
- **KHONG post len Slack** khi chua co su dong y cua Roger
- **Tone**: Chuyen nghiep, ngan gon, dang bullet points — khong viet paragraph dai
- **Ten app**: Affily Affiliate Marketing (KHONG dung Luna Affiliate)
- **File output**: Khong can metadata header (App, Ngay, Loai...) — chi luu noi dung Slack message truc tiep
- **Format mo dau**: `*### AFFILY AFFILIATE MARKETING - [DD/MM/YYYY]*` roi xuong dong emoji + feature title
- **Format ket thuc**: `<!channel> Moi nguoi nam thong tin a, neu can ho tro lien he <@U02HPQQEGBT> hoac anh <@U05U900QR0X> nhe a [emoji]`

---

## Slack Config

- **Channel**: `#release` — ID: `C032G5L0L1L`
- **Bot Token**: Doc tu skill `slack-bot`
- **Roger User ID**: `U02HPQQEGBT` (Dinh Xuan Hai | Roger)
- **Son Nguyen User ID**: `U05U900QR0X` (Nguyen Van Son | Son Nguyen Mike)
- **Roger DM Channel**: `D0ALPQJUDD3` (dung de test message truoc khi post)
