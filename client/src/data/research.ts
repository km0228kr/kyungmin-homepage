export type ResearchItem = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  status: string;
  background: string;
  approach: string;
  progress: string;
};

export type Paper = {
  slug: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  fullAbstract: string;
  authors: string[];
  pdfUrl?: string;
  arxivUrl?: string;
};

export const currentResearch: ResearchItem[] = [
  {
    slug: "bias-geometry",
    title: "LLM 내부 편향의 기하학적 구조",
    description:
      "대형 언어 모델의 잠재 공간에서 편향이 어떤 방향 벡터로 인코딩되어 있는지 분석한다. Bias Direction을 식별하고, 이를 제거하거나 조작하는 방법을 연구한다.",
    keywords: ["Bias Geometry", "Representation Space", "Direction Vector"],
    status: "진행 중",
    background:
      "여기에 연구를 시작하게 된 배경, 기존 연구의 한계, 풀려는 핵심 질문 작성.",
    approach:
      "여기에 사용하는 방법론, 실험 설계, 데이터셋, 모델 아키텍처 등 작성.",
    progress:
      "여기에 현재까지의 결과, 다음 단계 작성.",
  },
  {
    slug: "machine-unlearning",
    title: "Machine Unlearning과 지식 구조",
    description:
      "특정 지식을 모델에서 제거할 때 인접 지식에 미치는 영향을 측정한다. 망각의 범위와 정확도 사이의 트레이드오프를 분석한다.",
    keywords: ["Machine Unlearning", "Knowledge Structure", "Forgetting"],
    status: "진행 중",
    background: "...",
    approach: "...",
    progress: "...",
  },
  {
    slug: "multi-agent-conformity",
    title: "Multi-agent 시스템의 사회적 동조 편향",
    description:
      "다수의 LLM 에이전트가 상호작용할 때 발생하는 집단적 편향 패턴을 연구한다. 소수 의견이 억압되는 메커니즘과 그 조건을 분석한다.",
    keywords: ["Social Conformity Bias", "Multi-agent", "Collective Behavior"],
    status: "설계 중",
    background: "...",
    approach: "...",
    progress: "...",
  },
];

export const papers: Paper[] = [
  {
    slug: "bias-geometry-llm",
    title: "Bias Geometry in Large Language Models: Mapping and Mitigation",
    venue: "준비 중",
    year: "2025",
    abstract:
      "LLM의 잠재 공간에서 편향의 기하학적 표현을 분석하고, 방향 벡터 기반 편향 제거 방법론을 제안한다.",
    fullAbstract:
      "여기에 긴 abstract 작성. 줄바꿈은 \\n 으로.",
    authors: ["김경민"],
  },
  {
    slug: "selective-forgetting",
    title:
      "Selective Forgetting: Precision Unlearning in Neural Language Models",
    venue: "준비 중",
    year: "2025",
    abstract:
      "Machine Unlearning의 정밀도를 높이면서 인접 지식 손상을 최소화하는 방법을 연구한다.",
    fullAbstract: "여기에 긴 abstract 작성.",
    authors: ["김경민"],
  },
];
