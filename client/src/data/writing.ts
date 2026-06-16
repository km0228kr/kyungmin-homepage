import { unlearningEssayPosts } from "./unlearningEssayPosts";

export type WritingPost = {
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  sourceTitle?: string;
  sourceUrl?: string;
  content: string;
};

export const writingPosts: WritingPost[] = [
  ...unlearningEssayPosts,
  {
    slug: "ai-direction-loss",
    date: "2025.04",
    title: "AI 시대 인간은 왜 방향을 잃는가",
    description:
      "GPS가 공간 기억을 약화시키듯, LLM은 사고의 방향감각을 대체하기 시작했다. 이것이 인지적 퇴화인가, 아니면 새로운 형태의 지능인가.",
    tags: ["AI & Cognition", "Direction"],
    category: "Essay",
    content: `초안 준비 중.`
  },
  {
    slug: "machine-unlearning-memory",
    date: "2025.03",
    title: "Machine Unlearning과 지워지지 않는 기억",
    description:
      "모델에서 특정 지식을 제거하는 것은 인간의 망각과 어떻게 다른가. 그리고 왜 완전한 망각은 불가능에 가까운가.",
    tags: ["Machine Unlearning", "Memory"],
    category: "Essay",
    content: `초안 준비 중.`
  },
  {
    slug: "bias-finite-representation",
    date: "2025.02",
    title: "편향은 무한을 유한에 담을 때 생긴다",
    description:
      "벡터 공간의 차원 축소는 필연적으로 정보를 잃는다. 편향은 그 손실이 균등하지 않을 때 발생한다.",
    tags: ["Bias", "Representation"],
    category: "Essay",
    content: `초안 준비 중.`
  },
  {
    slug: "student-dropout-signal",
    date: "2025.01",
    title: "학생은 언제 포기하는가",
    description:
      "이탈은 사건이 아니라 과정이다. 포기의 전조 신호는 행동 데이터 안에 이미 존재한다.",
    tags: ["Learning", "Dropout Signal"],
    category: "Essay",
    content: `초안 준비 중.`
  },
  {
    slug: "ai-tutor-failure",
    date: "2024.12",
    title: "AI 튜터가 실패하는 이유",
    description:
      "대부분의 AI 튜터는 콘텐츠 전달 문제를 풀려 한다. 진짜 문제는 학습자의 상태 감지와 개입 타이밍이다.",
    tags: ["EdTech", "Intervention"],
    category: "Essay",
    content: `초안 준비 중.`
  },
  {
    slug: "gpt-thinking-delegation",
    date: "2024.11",
    title: "GPT는 사고를 확장시키는가, 약화시키는가",
    description:
      "LLM이 사고의 보조 도구가 될 때, 우리는 무엇을 얻고 무엇을 잃는가. 인지 부하와 사고 위임의 경계.",
    tags: ["LLM", "Cognition", "AI & Human"],
    category: "Essay",
    content: `초안 준비 중.`
  },
  {
    slug: "multi-agent-minority-opinion",
    date: "2024.10",
    title: "Multi-agent 시스템에서 소수 의견은 살아남는가",
    description:
      "여러 LLM이 상호작용할 때, 집단적 편향이 어떻게 형성되고 소수 의견이 어떻게 억압되는지.",
    tags: ["Multi-agent", "Social Conformity"],
    category: "Essay",
    content: `초안 준비 중.`
  },
  {
    slug: "hidden-failure-state",
    date: "2024.09",
    title: "Hidden Failure State: 시스템은 어떻게 조용히 무너지는가",
    description:
      "명시적 오류 없이 시스템이 서서히 실패하는 상태. 이를 감지하고 개입하는 방법.",
    tags: ["Hidden Failure", "System Design"],
    category: "Essay",
    content: `초안 준비 중.`
  },
];

export function getWritingPost(slug?: string) {
  return writingPosts.find((post) => post.slug === slug);
}
