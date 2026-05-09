# 권경민 홈페이지 디자인 아이디어

## 핵심 제약
- 흑백 기반 미니멀
- Muted blue-gray 포인트 컬러
- 차갑고 선명, 지적이고 깊게
- 감성적 과장 금지, 귀여운 느낌 금지
- 타이포그래피 중심, 여백 크게

---

<response>
<text>

## 아이디어 A: Cold Manifesto

**Design Movement**: Swiss International Typographic Style + Cold War-era scientific publication

**Core Principles**:
1. 텍스트가 곧 디자인이다. 장식은 없다.
2. 정보 위계는 크기와 무게로만 표현한다.
3. 여백은 침묵이 아니라 압력이다.
4. 수직 리듬이 모든 섹션을 관통한다.

**Color Philosophy**:
- 배경: 거의 흰색(#F5F5F3) — 완전한 흰색보다 차가운 오프화이트
- 텍스트: 거의 검정(#0D0D0D) — 순수 검정보다 약간 따뜻한 잉크 느낌
- 포인트: Steel Blue-Gray (#5B7FA6) — 감정 없이 정확한 색
- 구분선: 얇은 1px 선만 사용

**Layout Paradigm**:
- 비대칭 2단 그리드: 왼쪽 20% 레이블, 오른쪽 80% 콘텐츠
- 홈 히어로는 전체 뷰포트, 텍스트만 존재
- 섹션 간 전환은 얇은 수평선 하나

**Signature Elements**:
1. 대형 세리프 숫자 (01, 02, 03) — 섹션 인덱스
2. 모노스페이스 폰트로 연구 키워드 태그
3. 밑줄 없는 링크, 호버 시 색상만 변환

**Interaction Philosophy**:
- 스크롤 시 텍스트 페이드인 (opacity + translateY, 매우 미세하게)
- 클릭 가능한 요소는 색상 변화만으로 표현
- 마우스 커서 변화 없음

**Animation**:
- 진입: opacity 0→1, translateY 20px→0, duration 0.6s, ease-out
- 섹션 전환: 없음 (즉각적)
- 카드 호버: border-color 변화만, 0.2s

**Typography System**:
- 헤딩: Playfair Display Bold — 고전적 권위감
- 본문: IBM Plex Sans Regular — 기술적 명확함
- 코드/키워드: IBM Plex Mono — 연구자 정체성

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## 아이디어 B: Architectural Void

**Design Movement**: Brutalist Web Design + Japanese Ma (間) — 여백의 철학

**Core Principles**:
1. 첫 화면은 이름과 문장 하나만 존재한다.
2. 스크롤은 발견의 행위다. 정보를 숨기지 않되 드러내지도 않는다.
3. 색은 의미를 가질 때만 사용한다.
4. 구조가 곧 내러티브다.

**Color Philosophy**:
- 배경: 순수 검정(#080808) — 다크모드 기본
- 텍스트: 차가운 흰색(#E8E8E8)
- 포인트: Slate Blue (#7B9EC7) — 신호등처럼 명확하게
- 경계: 없음. 공간으로만 구분.

**Layout Paradigm**:
- 전체 너비 사용, 중앙 정렬 없음
- 홈: 왼쪽 정렬 대형 타이포그래피
- 연구/창업: 수직 스택, 각 항목이 독립된 블록
- 네비게이션: 상단 고정, 텍스트 링크만

**Signature Elements**:
1. 섹션 구분: 대형 알파벳 이니셜 (R, S, W) — 배경 텍스처처럼
2. 연구 키워드: 얇은 테두리 태그
3. 수평 스크롤 없음, 모든 것은 수직

**Interaction Philosophy**:
- 네비게이션 링크 호버: 텍스트 언더라인이 왼쪽에서 오른쪽으로 그려짐
- 카드 호버: 배경 미세하게 밝아짐 (0.05 opacity)
- 링크는 항상 외부 표시 없이 색상으로만

**Animation**:
- 페이지 진입: 텍스트 줄 단위로 아래에서 위로 슬라이드 (stagger 0.1s)
- 스크롤 트리거: IntersectionObserver, threshold 0.2
- 전환: 없음. 순간 전환.

**Typography System**:
- 헤딩: Neue Haas Grotesk / DM Sans Bold — 현대적 권위
- 본문: DM Sans Regular
- 강조: DM Mono — 연구 용어, 코드, 날짜

</text>
<probability>0.07</probability>
</response>

<response>
<text>

## 아이디어 C: Signal & Noise

**Design Movement**: Scientific Paper Aesthetic + Minimal Editorial Design

**Core Principles**:
1. 연구자의 사고방식을 레이아웃으로 표현한다.
2. 정보는 계층적으로, 감정은 절제되게.
3. 포인트 컬러는 '신호'처럼 — 필요한 곳에만, 정확하게.
4. 타이포그래피 스케일이 유일한 시각적 리듬이다.

**Color Philosophy**:
- 라이트: #FAFAFA 배경, #111111 텍스트
- 다크: #0A0A0A 배경, #EBEBEB 텍스트
- 포인트: Muted Steel (#6B8CAE) — 차갑고 정확한 파랑
- 보조: #888888 — 날짜, 레이블, 메타 정보

**Layout Paradigm**:
- 왼쪽 고정 세로 네비게이션 (데스크탑)
- 콘텐츠 영역: 최대 너비 720px, 좌측 정렬
- 홈 히어로: 전체 뷰포트, 수직 중앙 정렬 없이 상단 1/3 지점에 텍스트 배치
- 카드: 테두리 없음, 패딩과 배경색 차이로만 구분

**Signature Elements**:
1. 섹션 헤더: 작은 대문자 레이블 + 긴 수평선
2. 연구 논문 스타일 인용 블록
3. 날짜/메타 정보는 항상 모노스페이스, 회색

**Interaction Philosophy**:
- 모든 인터랙션은 0.15-0.3s 이내
- 호버: 색상 변화 + 미세한 이동 (2-4px)
- 포커스: 파란 아웃라인 (접근성)

**Animation**:
- 페이지 로드: 전체 페이드인 (0.4s)
- 스크롤: 각 섹션 opacity + translateY (0.5s, ease-out)
- 카드 호버: translateY -2px + box-shadow 강화 (0.2s)

**Typography System**:
- 헤딩: Fraunces (Variable) — 학술적이면서 개성 있는 세리프
- 본문: Geist Sans — 현대적이고 읽기 좋은 산세리프
- 코드/메타: Geist Mono

</text>
<probability>0.09</probability>
</response>

---

## 선택: 아이디어 A (Cold Manifesto) + C (Signal & Noise) 혼합

**최종 방향**: 
- 레이아웃: A의 비대칭 2단 그리드 + C의 좌측 고정 네비게이션
- 타이포그래피: Playfair Display (헤딩) + Geist Sans (본문) + IBM Plex Mono (코드)
- 색상: C의 팔레트 (라이트/다크 모두 지원)
- 애니메이션: A의 절제된 페이드인
- 포인트: Muted Steel (#6B8CAE)
