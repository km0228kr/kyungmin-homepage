import type { WritingPost } from "./writing";

export const unlearningResearchPosts01: WritingPost[] = [
  {
    slug: "unlearning-research-05-sae-feature-unlearning",
    date: "2026.06",
    title: "[Unlearning Research 05] SAE로 지식을 feature 단위에서 지운다는 것",
    description:
      "Sparse Autoencoder를 unlearning 도구로 읽으면, 삭제의 단위가 weight가 아니라 해석 가능한 feature로 바뀐다.",
    tags: ["SAE", "Feature Editing", "Machine Unlearning", "VLM"],
    category: "Unlearning Research Essay",
    sourceTitle: "Sparse Autoencoders Find Highly Interpretable Features in Language Models",
    sourceUrl: "https://arxiv.org/abs/2309.08600",
    content: `기준 논문
- Sparse Autoencoders Find Highly Interpretable Features in Language Models — https://arxiv.org/abs/2309.08600
- Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet — https://arxiv.org/abs/2605.29358

내가 이 글에서 잡고 싶은 질문은 하나다. 모델이 어떤 지식을 꺼내는 이유가 weight 전체에 퍼져 있다면, 우리는 도대체 무엇을 지운다고 말할 수 있나.

기존 LLM unlearning은 대체로 특정 데이터의 영향을 줄이도록 모델을 다시 조정한다. 문제는 이 방식이 너무 거칠다는 것이다. weight는 하나의 기능만 담고 있지 않다. 어떤 parameter는 지정 지식에도 관여하지만, 일반 추론, 문법, world knowledge에도 같이 관여한다. 그래서 하나를 줄이겠다고 전체 weight를 밀면 모델 전체가 흔들린다. 그건 정밀한 unlearning이라기보다 성능 훼손에 가깝다.

SAE가 중요한 이유는 여기서 나온다. Sparse Autoencoder는 transformer activation을 더 많은 수의 sparse feature로 분해한다. 하나의 neuron이 여러 의미를 동시에 담는 polysemantic 문제를, 더 세밀한 feature basis로 풀어보겠다는 접근이다. feature가 정말 해석 가능하고 조작 가능하다면, unlearning의 최소 단위는 weight가 아니라 feature가 된다.

내 연구로 가져오면 방향은 명확하다. LLM에서는 특정 factual association이나 반복적으로 나타나는 답변 패턴을 activation feature로 찾는다. Multimodal model에서는 여기에 visual feature가 추가된다. CLIP이나 LLaVA 계열에서 image token이 language decoder의 어떤 feature를 켜는지 추적하고, 지정 visual concept와 강하게 연결된 feature를 찾는다. 그 다음 할 일은 full fine-tuning이 아니다. feature activation을 낮추거나, feature direction을 projection으로 제거하거나, feature가 특정 경로로 넘어가지 못하게 gating하는 것이다.

내가 새로 밀어볼 아이디어는 Feature Half-Life Evaluation이다. intervention 직후 점수만 보지 않고, paraphrase prompt, 다른 modality, retrieval prompt, multi-turn prompt를 거치면서 지정 feature가 얼마나 빨리 다시 살아나는지 측정한다. 사람 기억처럼 모델의 feature에도 반감기가 있다고 보는 것이다. 어떤 unlearning은 첫 질문에서는 성공하지만 두 번째 질문, 이미지 힌트, 유사 caption을 주면 바로 복원된다. 이 복원 속도를 metric으로 만들 수 있다.

바로 가능한 실험은 이렇다. CLIP ViT 또는 LLaVA vision tower의 중간 activation을 모은다. 지정 concept image와 retain concept image를 나눠 SAE를 학습한다. 지정 set에서만 반복적으로 켜지는 sparse feature를 찾는다. 해당 feature를 낮췄을 때 retrieval, captioning, VQA가 어떻게 변하는지 본다. 마지막으로 Feature Half-Life를 측정한다. 한 경로에서 줄인 정보가 다른 경로에서 다시 돌아오는지 보는 것이다.

이 글의 결론은 단순하다. SAE는 unlearning의 완성된 답은 아니다. 하지만 unlearning을 진짜 연구 문제로 바꾸는 도구다. 지금까지의 질문이 어떻게 잊게 만들까였다면, SAE 이후의 질문은 모델 내부에서 무엇을 줄여야 하는지 먼저 찾을 수 있는가가 된다. 나는 이 방향이 훨씬 세다고 본다. Unlearning은 weight deletion이 아니라 feature disentanglement 문제로 가야 한다.`,
  },
  {
    slug: "unlearning-research-06-sae-project-variants",
    date: "2026.06",
    title: "[Unlearning Research 06] SAE 논문을 내 프로젝트로 바꾸는 3가지 실험",
    description:
      "SAE를 읽고 끝내지 않고, CLIP·LLaVA·representation projection으로 바로 쪼개는 연구 계획.",
    tags: ["SAE", "CLIP", "LLaVA", "Research Plan"],
    category: "Unlearning Project Plan",
    sourceTitle: "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet",
    sourceUrl: "https://arxiv.org/abs/2605.29358",
    content: `기준 논문
- Sparse Autoencoders Find Highly Interpretable Features in Language Models — https://arxiv.org/abs/2309.08600
- Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet — https://arxiv.org/abs/2605.29358
- Visual Instruction Tuning — https://arxiv.org/abs/2304.08485

이번 주 베스트 방향은 SAE다. 이유는 간단하다. 이건 논문 하나를 읽고 끝나는 주제가 아니라, 내 Multimodal Unlearning 프로젝트로 바로 변형할 수 있는 실험 축을 세 개나 만든다.

첫 번째는 SAE 기반 Multimodal Concept Forgetting이다. 가설은 CLIP embedding이나 LLaVA hidden state 안에 지정 visual concept를 담당하는 sparse feature cluster가 존재한다는 것이다. 데이터는 COCO subset, 지정 concept synthetic image set, retrieval/captioning 평가셋으로 시작하면 된다. 방법은 단순하다. CLIP ViT hidden state를 뽑고, SAE를 학습하고, 지정 image에서 반복적으로 켜지는 feature를 찾는다. 이후 그 feature를 낮추거나 projection subtraction으로 제거한다. 성공판정은 지정 concept retrieval score가 크게 떨어지면서 일반 captioning과 zero-shot classification은 거의 유지되는 것이다.

두 번째는 Cross-Modal Route Unlearning in LLaVA다. LLaVA는 vision encoder, projection layer, language model이 연결된 구조다. 지정 visual concept가 language answer로 변환되는 과정은 단순한 embedding similarity가 아니다. image token이 어떤 route를 타고 decoder의 다음 token distribution에 영향을 주는지 봐야 한다. 가설은 지정 concept의 영향이 일부 layer 또는 attention route에 집중되어 있다는 것이다. 실험은 activation patching, attention head masking, layer-wise ablation으로 시작할 수 있다.

세 번째는 Representation Projection for Concept Forgetting이다. 어떤 정보는 단일 sample이 아니라 latent subspace로 존재한다. 이름, 시각 단서, 장소, caption, 문맥이 하나의 semantic cloud를 만든다. 이걸 줄이려면 sample deletion이 아니라 subspace intervention이 필요하다. 데이터는 image-caption pair, entity-caption pair, paired retrieval benchmark로 구성할 수 있다.

내가 새로 추가하고 싶은 아이디어는 Forgetting Product Tree다. 하나의 방법을 바로 논문으로 만들려고 하지 말고, unlearning target을 세 층으로 쪼갠다. feature-level forgetting, route-level forgetting, behavior-level forgetting. feature-level은 SAE로 측정한다. route-level은 activation patching으로 측정한다. behavior-level은 output 복원 여부로 측정한다. 세 지표가 같이 움직이면 좋은 방법이고, 하나만 움직이면 가짜 unlearning일 가능성이 높다.

이 구조로 보면 내 첫 실험은 훨씬 선명해진다. 먼저 CLIP sparse feature extraction pipeline을 만든다. 그다음 LLaVA activation tracing baseline을 만든다. 마지막으로 paired retrieval benchmark를 만든다. 이 세 개가 모이면 논문 제목도 바로 나온다. Feature-Level Multimodal Unlearning, Mechanistic Routing Suppression for VLM Unlearning, Representation Surgery for Concept Forgetting.

내가 가장 먼저 할 것은 SAE 기반 Multimodal Concept Forgetting이다. 구현 루프가 가장 짧기 때문이다. CLIP activation 저장, SAE 학습, feature intervention, retrieval 평가까지 한 주 안에 최소 baseline을 만들 수 있다. 좋은 논문을 읽었다면 요약에서 끝내면 안 된다. 내 실험으로 바뀌어야 한다. SAE는 그 변환이 가능한 주제다.`,
  },
];
