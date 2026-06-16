import type { WritingPost } from "./writing";

export const unlearningResearchPosts03: WritingPost[] = [
  {
    slug: "unlearning-research-09-activation-patching-vlm",
    date: "2026.06",
    title: "[Unlearning Research 09] Activation Patching으로 VLM의 target pathway를 찾기",
    description:
      "VLM에서 지정 concept가 답으로 변하는 순간을 찾으려면, layer-wise activation patching이 가장 직접적인 진단 도구가 된다.",
    tags: ["Activation Patching", "VLM", "LLaVA", "Mechanistic Interpretability"],
    category: "Unlearning Research Essay",
    sourceTitle: "Visual Instruction Tuning",
    sourceUrl: "https://arxiv.org/abs/2304.08485",
    content: `기준 논문
- Visual Instruction Tuning — https://arxiv.org/abs/2304.08485
- Locating and Editing Factual Associations in GPT — https://arxiv.org/abs/2202.05262
- Representation Engineering — https://arxiv.org/abs/2310.01405

VLM unlearning에서 제일 먼저 해야 할 일은 모델을 지우는 게 아니다. 모델이 지정 answer를 만드는 경로를 찾는 것이다. 그 경로를 모르면 intervention은 운에 가깝다.

LLaVA 구조를 보면 문제는 더 분명해진다. image는 vision encoder를 통과하고, projection layer를 거쳐 language model의 token space에 들어간다. 이후 decoder가 image-conditioned text generation을 한다. 지정 concept가 answer로 나온다는 것은 단순히 image embedding이 비슷하다는 뜻이 아니다. vision feature가 language model 내부의 특정 hidden state를 바꾸고, 그 변화가 final logits까지 살아남는다는 뜻이다.

Activation patching은 이 과정을 진단하기 좋은 방법이다. 지정 input과 control input을 준비하고, 특정 layer의 activation만 서로 바꿔 넣는다. 만약 어떤 layer를 patch했을 때 지정 answer가 사라지거나 복원된다면, 그 layer가 pathway에 중요하다는 뜻이다. 이건 unlearning 전에 반드시 필요한 지도다. 어디를 건드릴지 모르면 fine-tuning은 너무 비싸고 너무 거칠다.

내 실험 설계는 이렇게 간다. 지정 image-text pair와 retain pair를 만든다. LLaVA에서 vision tower, projector, decoder layer activation을 저장한다. 지정 run과 control run 사이에 layer-wise patching을 수행한다. answer logit, caption specificity, retrieval score 변화를 본다. 중요한 layer 또는 head가 나오면 그 지점에서만 intervention을 적용한다.

내가 새로 추가하고 싶은 아이디어는 Pathway Triage다. 모든 layer를 똑같이 보지 말고, pathway를 세 구간으로 나눈다. perception 구간, alignment 구간, language realization 구간. perception 구간에서 지정 정보가 사라지면 visual feature 자체를 못 읽는 것이다. alignment 구간에서 사라지면 image-text mapping이 끊긴 것이다. language realization 구간에서 사라지면 말로 꺼내는 단계만 막힌 것이다. 이 세 가지는 전혀 다른 unlearning이다.

이 구분은 논문에서 강한 분석 도구가 된다. 어떤 방법은 perception을 망가뜨려서 지정 정보를 못 맞히게 만들 수 있다. 이건 별로다. 좋은 방법은 perception은 유지하고, 지정-specific alignment나 realization만 줄여야 한다. 그래서 나는 VLM unlearning 평가에 pathway-level diagnosis가 들어가야 한다고 본다.

한계도 있다. Activation patching은 진단 도구이지 최종 unlearning 방법은 아니다. patching으로 찾은 지점을 실제 배포 가능한 방법으로 바꾸려면 activation steering, adapter gating, feature intervention 중 하나로 구현해야 한다. 그래도 출발점은 명확하다. 먼저 route를 찾고, 그 다음 지운다. 이 순서를 지키는 것이 중요하다.`,
  },
  {
    slug: "unlearning-research-10-sparse-feature-circuits-vlm",
    date: "2026.06",
    title: "[Unlearning Research 10] Sparse Feature Circuit으로 VLM Unlearning 설계하기",
    description:
      "SAE feature와 circuit tracing을 합치면, 지정 concept가 feature에서 answer로 이동하는 과정을 추적할 수 있다.",
    tags: ["Sparse Feature", "Circuit", "VLM", "Mechanistic Unlearning"],
    category: "Unlearning Research Essay",
    sourceTitle: "Sparse Autoencoders Find Highly Interpretable Features in Language Models",
    sourceUrl: "https://arxiv.org/abs/2309.08600",
    content: `기준 논문
- Sparse Autoencoders Find Highly Interpretable Features in Language Models — https://arxiv.org/abs/2309.08600
- Scaling Monosemanticity — https://arxiv.org/abs/2605.29358
- Knowledge Neurons in Pretrained Transformers — https://arxiv.org/abs/2104.08696

SAE만으로는 부족하다. Circuit tracing만으로도 부족하다. 내가 진짜 보고 싶은 건 둘을 합친 구조다. 지정 concept가 어떤 sparse feature로 잡히고, 그 feature가 어떤 layer route를 타고, 마지막에 어떤 answer로 이어지는지 보는 것이다.

이걸 sparse feature circuit이라고 부를 수 있다. feature는 의미 단위에 가깝고, circuit은 computation path에 가깝다. unlearning이 제대로 되려면 둘 다 필요하다. feature만 알면 무엇을 줄여야 하는지는 보이지만, 그것이 실제 output을 어떻게 만드는지는 모른다. circuit만 알면 어디를 건드릴지는 보이지만, 그 경로가 어떤 의미를 담는지 설명하기 어렵다. 둘이 연결될 때 비로소 해석 가능한 unlearning이 된다.

VLM에서는 이 접근이 더 중요하다. image-text alignment는 하나의 vector similarity로 끝나지 않는다. image patch feature가 projection을 거쳐 language model의 residual stream에 들어가고, 특정 decoder layer에서 text generation으로 바뀐다. 지정 visual concept가 있다면, 그것은 vision feature, projection feature, decoder feature를 거쳐 answer behavior로 나타난다. 이 흐름을 끊어야 selective forgetting이 된다.

내가 제안하는 실험 파이프라인은 이렇다. CLIP 또는 LLaVA에서 지정/control activation을 수집한다. SAE로 layer별 sparse feature를 학습한다. 지정-specific feature를 찾고, feature attribution을 계산한다. activation patching으로 해당 feature가 downstream answer에 실제 영향을 주는지 확인한다. feature intervention과 circuit masking을 각각 적용해 어떤 방식이 utility를 더 잘 보존하는지 비교한다.

내가 새로 추가하고 싶은 아이디어는 Feature-Circuit Handshake Score다. 어떤 feature가 지정 concept와 관련 있어 보여도 output에 영향이 없으면 건드릴 필요가 없다. 반대로 어떤 circuit이 중요해 보여도 그 circuit이 어떤 semantic feature를 담는지 모르면 설명력이 떨어진다. 그래서 feature activation과 circuit causal effect가 동시에 높은 지점을 handshake point로 정의한다. Unlearning intervention은 이 handshake point만 겨냥한다.

이 metric은 꽤 쓸 만하다. feature interpretability score, causal effect score, retain damage score를 조합해서 intervention priority를 만들 수 있다. 그러면 방법론이 감으로 layer를 고르는 게 아니라, feature와 circuit이 만나는 지점을 점수화해서 선택하는 방식이 된다.

이 방향의 장점은 논문 스토리가 강하다는 것이다. 단순히 우리 방법이 수치가 좋다고 말하는 게 아니라, VLM에서 지정 concept는 sparse feature circuit으로 나타나고, 그 circuit을 약화시키면 selective unlearning이 가능하다고 말할 수 있다. 이건 내 연구가 가야 할 방향과 정확히 맞다.`,
  },
];
