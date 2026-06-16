import type { WritingPost } from "./writing";

export const unlearningSprintPosts: WritingPost[] = [
  {
    slug: "unlearning-sprint-05-sae-feature-unlearning",
    date: "2026.06",
    title: "[Unlearning Sprint 05] Sparse Autoencoder로 지식을 feature 단위에서 지운다는 것",
    description:
      "weight를 바로 건드리는 대신, hidden state 안의 sparse feature를 찾아 target concept만 줄이는 방향.",
    tags: ["SAE", "Feature Editing", "Machine Unlearning", "VLM"],
    category: "Unlearning Sprint Log",
    content: `Paper note: Sparse Autoencoder Features for Interpretable Unlearning (2026)

핵심 아이디어 5문장

1. Transformer hidden state를 sparse autoencoder, SAE로 분해해서 해석 가능한 feature를 뽑는다.
2. 특정 knowledge나 target concept와 연결된 sparse feature를 activation level에서 찾는다.
3. 그 feature를 suppression하거나 projection해서 selective unlearning을 수행한다.
4. parameter 전체를 수정하지 않으니까 catastrophic forgetting 위험이 줄어든다.
5. 결국 unlearning을 weight editing이 아니라 feature-level intervention 문제로 바꾼다.

내 연구에 적용

이 방향이 중요한 이유는 단순하다. 지금까지 많은 LLM unlearning은 weight를 업데이트해서 특정 데이터의 영향을 줄이려고 한다. 그런데 weight는 너무 얽혀 있다. 하나를 지우겠다고 전체 distribution을 흔들면, 그건 unlearning이라기보다 모델 성능 훼손에 가깝다.

SAE는 hidden representation을 sparse하고 비교적 disentangled된 feature로 풀어낸다. 그러면 특정 factual knowledge나 target concept를 직접 겨냥할 수 있다. multimodal model에서는 visual feature와 language feature가 alignment space 안에서 결합된다. 여기서 SAE를 쓰면 어떤 visual concept가 어떤 textual reasoning path로 이어지는지 볼 수 있다.

코드 50분 기록: Sliding Window Maximum

from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()
    result = []
    for i, num in enumerate(nums):
        while dq and dq[0] <= i - k:
            dq.popleft()
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result

복잡도: O(n), O(k)
엣지 케이스: k = 1, 중복 최대값, 증가 배열, 감소 배열, nums 길이 = k
커밋 메시지: feat: implement sliding window maximum using monotonic deque

오늘 핵심: Unlearning의 미래는 weight 삭제가 아니라 feature disentanglement다.`,
  },
  {
    slug: "unlearning-sprint-06-sae-project-variants",
    date: "2026.06",
    title: "[Unlearning Sprint 06] SAE 논문을 내 프로젝트로 변형하는 3가지 계획",
    description:
      "이번 주 베스트 방향은 sparse feature 기반 unlearning. 이걸 CLIP, LLaVA, privacy forgetting으로 바로 쪼갰다.",
    tags: ["SAE", "CLIP", "LLaVA", "Research Plan"],
    category: "Unlearning Project Plan",
    content: `Weekly Best Paper 기록

Paper: Sparse Autoencoder Features for Interpretable Unlearning

Why best

1. 기존 weight-level unlearning 대신 feature-level intervention이라는 방향을 제시한다.
2. Mechanistic interpretability와 machine unlearning을 직접 연결할 수 있다.
3. Multimodal alignment space, 특히 CLIP과 LLaVA까지 확장 가능성이 크다.

변형 계획 #1: SAE 기반 Multimodal Concept Forgetting

가설: CLIP embedding을 sparse feature로 분해하면 target visual concept를 selective forgetting할 수 있다.
데이터: MM-SafetyBench, COCO subset, target concept synthetic image set
방법: CLIP ViT hidden state 추출, SAE 학습, target concept와 high-activation feature 매핑, feature suppression 후 retrieval/captioning 평가
성공판정: target concept retrieval accuracy 70% 이상 감소, 일반 caption 성능 5% 이하 감소

변형 계획 #2: Cross-Attention Route Unlearning in LLaVA

가설: target visual-text alignment는 일부 cross-attention head에 집중되어 있을 가능성이 높다.
데이터: LLaVA-Instruct-150K, ObjectHalBench, custom QA set
방법: causal tracing으로 response attention route 추적, 중요한 cross-attention head masking/suppression, response 변화와 reasoning degradation 측정
성공판정: target response rate 50% 이상 감소, MMBench score 감소 3% 이하 유지

변형 계획 #3: Representation Projection for Privacy Forgetting

가설: identity-related information은 latent subspace 형태로 존재한다.
데이터: CelebA, synthetic identity-caption dataset, face-name paired retrieval benchmark
방법: identity-correlated latent direction 추출, orthogonal projection으로 representation surgery 수행, retrieval leakage와 caption leakage 측정
성공판정: identity retrieval leakage 80% 이상 감소, zero-shot classification 성능 유지율 95% 이상

Notion 보드

Idea: SAE 기반 Multimodal Concept Forgetting / Cross-Attention Route Unlearning in LLaVA / Representation Projection for Privacy Forgetting
Experiment: CLIP sparse feature extraction pipeline / causal tracing + attention masking baseline / latent projection 실험용 retrieval benchmark
Paper Draft: Feature-Level Multimodal Unlearning / Mechanistic Attention Suppression for VLM Safety / Representation Surgery for Privacy Forgetting

내 결론: 가장 먼저 할 건 SAE 기반 Multimodal Concept Forgetting이다. 최소 실험 루프가 가장 명확하다.`,
  },
];
