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
  {
    slug: "unlearning-log-01-tofu",
    date: "2026.06",
    title: "[Unlearning Log 01] TOFU는 왜 중요한가: LLM은 정말 잊었는가",
    description:
      "Unlearning을 한다고 말하는 건 쉽다. 어려운 건 모델이 진짜로 잊었는지, 아니면 대답만 피하는지 구분하는 일이다.",
    tags: ["Machine Unlearning", "LLM", "Evaluation"],
    category: "Unlearning Research Log",
    sourceTitle: "TOFU: A Task of Fictitious Unlearning for LLMs",
    sourceUrl: "https://arxiv.org/abs/2401.06121",
    content: `이 글은 내 Unlearning 기록의 첫 번째 글이다.

나는 요즘 LLM Unlearning과 Multimodal Unlearning을 같이 보고 있다. 그런데 계속 걸리는 지점이 있다. 지웠다고 말하는 건 쉬운데, 진짜 지웠는지는 어떻게 보나.

TOFU는 이 질문을 정면으로 건드린다. 모델에서 특정 데이터를 지우는 것처럼 튜닝했을 때, 그 모델이 정말 처음부터 그 데이터를 학습하지 않은 모델처럼 행동하는지 보는 벤치마크다. 여기서 중요한 건 단순히 정답률이 떨어졌는지가 아니다. 모델이 forget set에 대해서는 잊고, retain set에 대해서는 멀쩡해야 한다. 더 나아가 주변 지식, 일반 능력, 언어 능력이 무너지면 그건 unlearning이 아니라 그냥 모델을 망가뜨린 것이다.

내가 이 논문을 중요하게 보는 이유는 하나다. Unlearning 연구는 결국 평가가 없으면 전부 말장난이 된다. forget success만 높고 utility가 박살나면 의미 없다. 반대로 utility만 유지하고 target knowledge가 새어나오면 그것도 실패다. 이 둘 사이의 tension을 어떻게 재는지가 연구의 중심이 된다.

LLM Unlearning 관점에서는 TOFU가 기본 체력이다. 특정 author profile을 잊게 만드는 세팅은 privacy unlearning과 직결된다. 하지만 나는 여기서 멈추면 안 된다고 본다. 지금 모델들은 text-only가 아니라 image, audio, video까지 같이 먹는다. 그러면 forget target도 문장 하나가 아니라 image-text pair, identity, visual style, harmful visual concept가 된다.

Multimodal Unlearning으로 확장하면 문제가 더 빡세진다. 예를 들어 어떤 인물의 텍스트 정보는 잊었는데, 얼굴 이미지가 들어오면 다시 맞힌다. 또는 unsafe visual concept는 지웠다고 했는데 caption을 시키면 우회해서 설명한다. 이 경우 text-only TOFU식 평가는 부족하다. Forgetting은 modality마다 따로 보는 게 아니라, modality 사이에서 새는지를 봐야 한다.

내 프로젝트에서 바로 가져갈 지점은 이거다. TOFU의 forget/retain 구조를 multimodal로 바꾼다. forget set은 image-text paired concept로 만들고, retain set은 semantic neighbor로 둔다. 그리고 평가를 세 갈래로 본다. 첫째, text prompt에서 target 정보가 새는지. 둘째, image prompt에서 target 정보가 새는지. 셋째, image+text 조합에서 다시 복원되는지.

결론은 단순하다. Unlearning은 삭제 기술이 아니라 검증 기술부터 세워야 한다. 내가 앞으로 만들고 싶은 건 ‘잘 지웠다’고 주장하는 모델이 아니라, 어디서 새는지 끝까지 잡아내는 평가 프레임워크다. 진짜 연구는 거기서 시작된다.`,
  },
  {
    slug: "unlearning-log-02-rome-memit",
    date: "2026.06",
    title: "[Unlearning Log 02] ROME과 MEMIT: Knowledge Editing은 Unlearning이 될 수 있는가",
    description:
      "Knowledge editing은 지식을 고치는 기술이다. 그런데 지식을 고칠 수 있다면, 지울 수도 있는가. 여기서 Unlearning의 핵심 질문이 열린다.",
    tags: ["Knowledge Editing", "ROME", "MEMIT", "LLM"],
    category: "Unlearning Research Log",
    sourceTitle: "ROME / MEMIT",
    sourceUrl: "https://arxiv.org/abs/2202.05262",
    content: `ROME과 MEMIT을 보면 계속 같은 생각이 든다. 모델 안의 지식은 정말 어딘가에 저장되어 있는가. 그리고 저장되어 있다면, 그걸 찾아서 직접 바꿀 수 있는가.

ROME은 factual association이 transformer의 특정 middle-layer MLP 쪽에 강하게 관여한다고 보고, rank-one update로 지식을 바꾼다. MEMIT은 이걸 여러 개의 memory edit으로 확장한다. 둘 다 원래 목적은 unlearning이라기보다 model editing에 가깝다. 하지만 내 입장에서는 이게 훨씬 중요하다. 왜냐하면 unlearning도 결국 모델 내부의 특정 association을 약화시키거나 끊는 문제로 볼 수 있기 때문이다.

다만 여기서 조심해야 한다. editing은 A를 B로 바꾸는 문제고, unlearning은 A를 없애는 문제다. 둘은 비슷해 보이지만 다르다. editing은 새 답을 심으면 된다. unlearning은 새 답 없이 target knowledge retrieval 자체를 막아야 한다. 그래서 단순히 ROME/MEMIT을 가져와서 삭제 방향으로 쓰면 끝나는 문제가 아니다.

내가 보는 핵심은 locality다. 어떤 지식을 건드렸을 때 주변 지식이 얼마나 같이 흔들리는가. Unlearning은 target만 지우고 주변은 살려야 한다. 이 기준에서 ROME과 MEMIT은 좋은 출발점이지만, 그대로 답은 아니다. 특히 LLM에서는 factual association이 비교적 명확할 수 있어도, multimodal model에서는 knowledge가 더 지저분하게 섞인다. 이미지 token, text token, cross-attention, shared embedding이 같이 움직인다.

예를 들어 어떤 인물 identity를 지우고 싶다고 하자. 텍스트 이름만 지우면 부족하다. 얼굴 이미지, 직업 설명, 관련 장소, 스타일 정보가 다 우회 경로가 된다. 그러면 model editing의 위치 찾기 방식은 multimodal circuit tracing으로 확장되어야 한다. 어느 layer에서 image evidence가 text answer로 바뀌는지, 어떤 cross-attention head가 target identity를 밀어주는지 봐야 한다.

내 프로젝트 변형은 이렇다. ROME/MEMIT의 ‘where is knowledge stored?’ 질문을 VLM으로 가져간다. LLaVA나 CLIP-LLaMA 계열에서 특정 visual concept를 넣고, answer logit이 튀는 activation path를 찾는다. 그 다음 weight edit을 바로 하지 않고, 먼저 activation suppression이나 low-rank adapter로 reversible하게 막아본다. 삭제를 영구적으로 하기 전에 경로를 먼저 증명하는 것이다.

내 결론은 이거다. Knowledge editing은 unlearning의 답은 아니지만, unlearning을 mechanistic하게 만들 수 있는 강한 도구다. 내가 원하는 건 그냥 loss를 올려서 잊게 만드는 게 아니다. 모델이 target을 꺼내는 길을 찾아서, 그 길만 끊는 것이다.`,
  },
  {
    slug: "unlearning-log-03-concept-erasure",
    date: "2026.06",
    title: "[Unlearning Log 03] Concept Erasure는 왜 Multimodal Unlearning으로 이어지는가",
    description:
      "Diffusion model에서 concept를 지우는 문제는 단순 이미지 생성 문제가 아니다. Multimodal Unlearning이 결국 마주칠 미래형 문제다.",
    tags: ["Concept Erasure", "Diffusion", "Multimodal Unlearning"],
    category: "Unlearning Research Log",
    sourceTitle: "Erasing Concepts from Diffusion Models",
    sourceUrl: "https://arxiv.org/abs/2303.07345",
    content: `Concept erasure 논문을 보면 unlearning이 어디로 가야 하는지 보인다. 데이터 하나를 지우는 수준이 아니라, 모델이 어떤 concept 자체를 만들지 못하게 하는 문제다.

Diffusion model에서 특정 artist style이나 unsafe concept를 지우는 건 겉으로 보면 이미지 생성 safety 문제처럼 보인다. 그런데 더 깊게 보면 이건 multimodal unlearning 문제다. 왜냐하면 concept는 보통 텍스트 prompt와 visual pattern 사이에 걸쳐 있기 때문이다. 텍스트로 부르면 이미지가 나오고, 이미지에서 다시 텍스트 의미가 살아난다. 이 연결을 끊어야 진짜로 지운 것이다.

내가 여기서 보는 핵심은 ‘concept는 데이터보다 크다’는 점이다. 어떤 사람의 사진 몇 장을 지운다고 그 사람 identity가 사라지는 게 아니다. 이름, 얼굴, 장소, 맥락, 스타일, caption이 전부 연결되어 있다. 그래서 multimodal unlearning은 sample deletion보다 concept boundary를 어떻게 잡을지가 훨씬 중요하다.

LLM Unlearning에서는 forget target이 보통 문장, QA pair, document 단위로 정의된다. 하지만 Multimodal Unlearning에서는 target이 훨씬 애매하다. ‘이 사람을 잊어라’, ‘이 스타일을 잊어라’, ‘이 위험한 시각 개념을 생성하지 마라’ 같은 식이다. 이건 단일 데이터 포인트가 아니라 latent concept cluster다.

그래서 나는 concept erasure를 LLM unlearning과 VLM unlearning 사이의 다리로 본다. LLM에서는 harmful instruction이나 private fact를 지운다. Diffusion에서는 visual concept를 지운다. VLM에서는 둘을 동시에 봐야 한다. 이미지를 보고 말하는 모델은 concept를 생성하지 않아도 설명할 수 있다. 생성은 막았는데 인식은 남아 있을 수 있고, 인식은 막았는데 언어 추론으로 복원할 수도 있다.

내 프로젝트에서는 이걸 evaluation으로 가져가고 싶다. target concept에 대해 세 가지 leakage를 본다. 첫째, visual generation leakage. 둘째, visual recognition leakage. 셋째, text reasoning leakage. 이 셋 중 하나라도 살아 있으면 완전한 unlearning이 아니다.

방법은 representation-level로 가야 한다. CLIP embedding에서 target concept direction을 잡고, LLaVA의 vision-token to language-token 경로에서 그 방향이 어떻게 answer로 바뀌는지 본다. 그 다음 projection subtraction, attention route suppression, LoRA-based forget adapter를 비교한다. 중요한 건 모델을 무식하게 망가뜨리지 않고 target concept만 약화시키는 것이다.

결론은 명확하다. 앞으로의 unlearning은 데이터 삭제보다 concept control 싸움이다. 특히 multimodal model에서는 concept가 modality 사이를 타고 도망간다. 그 도망가는 경로를 잡는 게 내 연구의 핵심이 될 수 있다.`,
  },
  {
    slug: "unlearning-log-04-representation-surgery",
    date: "2026.06",
    title: "[Unlearning Log 04] Representation Surgery: weight가 아니라 latent를 지우는 쪽으로",
    description:
      "내가 지금 제일 강하게 보는 방향. 모델을 다시 학습시키는 게 아니라, target concept가 지나가는 latent path를 잡아서 끊는 것.",
    tags: ["Representation Surgery", "Activation Steering", "SAE", "VLM"],
    category: "Unlearning Research Log",
    content: `요즘 내가 제일 강하게 보는 방향은 representation surgery다. 정확히 말하면 weight를 바로 지우는 게 아니라, 모델 내부에서 target concept가 지나가는 latent path를 찾고 그 경로만 건드리는 방식이다.

왜 이게 중요하냐면, unlearning에서 제일 큰 문제는 모델을 망가뜨리는 것이다. target 하나 지우겠다고 전체 성능이 떨어지면 연구적으로도 실용적으로도 별 의미가 없다. 그래서 나는 parameter-level deletion보다 activation-level control이 더 좋은 출발점이라고 본다.

Activation steering은 이 생각과 잘 맞는다. 어떤 concept direction이 있으면 inference 중간에서 그 방향을 빼거나 약화시킬 수 있다. 이 방식의 장점은 reversible하다는 것이다. 껐다 켰다 할 수 있다. 영구 삭제 전에 먼저 이 direction이 정말 target behavior를 만든다는 걸 확인할 수 있다. 이건 실험 설계에서 엄청 중요하다.

Sparse Autoencoder도 여기서 들어온다. SAE는 복잡한 activation을 더 해석 가능한 sparse feature로 풀어준다. 만약 harmful visual concept나 private identity와 연결된 feature를 찾을 수 있다면, unlearning은 훨씬 정밀해진다. 전체 layer를 흔드는 게 아니라 특정 feature만 줄이는 방식으로 갈 수 있다.

Multimodal model에서는 이게 더 중요하다. LLaVA 같은 모델은 image token이 language model으로 들어가면서 cross-modal reasoning을 만든다. target concept는 vision encoder에만 있는 것도 아니고 language model에만 있는 것도 아니다. 중간에서 route를 탄다. 그래서 내가 보고 싶은 건 단순 hidden state가 아니라 routing이다. 어떤 attention head가 image evidence를 answer token으로 밀어주는지 봐야 한다.

내 프로젝트에서 바로 만들 수 있는 최소 실험은 이렇다. CLIP이나 LLaVA에서 target concept image/text pair를 넣고 activation을 저장한다. target과 non-target의 mean difference로 concept direction을 잡는다. 그 direction을 특정 layer에서 projection subtraction으로 제거한다. 그리고 VQA, captioning, harmful response, retrieval score가 어떻게 바뀌는지 본다.

성공 기준은 단순하다. target leakage는 줄어야 한다. retain utility는 유지되어야 한다. 그리고 intervention 위치를 바꿨을 때 어느 layer가 제일 효과적인지 보여야 한다. 그게 나오면 단순한 아이디어가 아니라 논문 실험이 된다.

내가 원하는 제목은 대충 이런 쪽이다. Interpretable Multimodal Unlearning via Sparse Latent Surgery. 핵심은 멋있는 이름이 아니다. 중요한 건 unlearning을 gradient로 밀어붙이는 게 아니라, 모델 내부의 길을 보고 정확히 자르는 것이다. 이 방향이 진짜 세다.`,
  },
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
