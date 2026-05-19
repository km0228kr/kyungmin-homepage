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
    slug: "signcv",
    title: "SignCV: Multi-Attribute Bias Geometry in LLMs",
    description:
      "여러 사회적 편향 축이 모델 내부에서 실제로 얼마나 공통된 방향을 공유하는지 측정한 연구. 같은 추출 파이프라인에서도 Mistral과 Llama는 전혀 다른 cross-axis geometry를 보였다.",
    keywords: ["LLM Bias", "Bias Geometry", "Model Editing", "EAI@KDD 2026"],
    status: "Submitted",
    background:
      "Direction-based debiasing은 여러 편향 축의 update direction을 하나의 공통 방향으로 합쳐 편집하는 경우가 많다. 이 가정은 편향 축들이 실제로 모델 내부에서 공유 방향을 가질 때만 성립한다. 그러나 기존 연구는 이 전제를 직접 검증하지 않고 사후 bias score만 보고했다.",
    approach:
      "각 편향 축마다 여러 LoRA adapter를 학습해 update direction을 수집한다. Within-axis sign consensus로 안정 좌표를 고르고, 축들 간 sign intersection으로 공유 좌표를 추린다. 남는 비율을 survivor rate로 정의하고, 이를 pre-edit geometry diagnostic으로 사용한다. 동일 파이프라인을 Mistral-7B-Instruct-v0.3와 Llama-2-7B-hf에 적용했다.",
    progress:
      "두 모델의 within-axis 안정성은 64~67%로 유사했다. 그러나 cross-axis survivor rate는 Mistral 7.05%, Llama 53.48%로 7.6배 차이가 났다. Projection edit의 downstream 결과는 모델과 편향 축에 따라 다르게 나타났다. EAI@KDD 2026 워크숍에 first author로 투고했다.",
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
    fullAbstract: "여기에 긴 abstract 작성. 줄바꿈은 \\n 으로.",
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
