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

Sprint 종료 체크

- Notion 요약 + 적용 에세이 업로드 완료
- 코드 50분 + 제출 또는 커밋 완료
- 보정 슬롯: 22:00-22:20 / 집 책상 / 노이즈캔슬링 헤드폰
- 내일 1순위: 미완료 항목 완료 전까지 GitHub와 논문 외 모든 탭 닫기

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
  {
    slug: "unlearning-sprint-07-concept-circuit-discovery",
    date: "2026.06",
    title: "[Unlearning Sprint 07] Unlearning은 삭제가 아니라 knowledge circuit 재배선이다",
    description:
      "gradient로 억지로 잊게 만드는 방식보다, 모델 안에서 target concept가 지나가는 circuit을 찾고 그 길만 끊는 방식이 더 세다.",
    tags: ["Circuit", "Knowledge Neurons", "Activation Steering", "Unlearning"],
    category: "Unlearning Sprint Log",
    content: `Paper note: Concept Circuit Discovery for Transformer Unlearning (2026)

핵심 아이디어 5문장

1. Transformer 내부의 knowledge flow를 circuit 단위로 추적한다.
2. 특정 factual concept를 활성화하는 neuron-attention subgraph를 발견한다.
3. circuit-level intervention으로 selective forgetting을 수행한다.
4. 전체 parameter update 없이 특정 concept만 제거할 가능성을 보여준다.
5. 기존 gradient 기반 unlearning보다 utility preservation이 좋다는 방향을 제시한다.

내 연구에 적용

Circuit discovery 기반 접근은 unlearning을 단순 optimization 문제가 아니라 knowledge routing control 문제로 다시 정의하게 만든다. 기존 LLM unlearning은 특정 데이터의 likelihood를 낮추는 쪽으로 학습한다. 그런데 이렇게 하면 unrelated capability degradation이 쉽게 생긴다.

반면 circuit-level analysis는 target knowledge가 어떤 neuron과 attention pathway를 통해 출력되는지 직접 추적한다. 이게 되면 unlearning은 훨씬 정밀해진다. target knowledge를 만드는 회로만 찾아서 약화시키면 된다.

Multimodal setting에서는 image encoder와 language decoder 사이의 alignment route가 핵심이다. target visual concept나 identity-related representation이 특정 cross-modal circuit에 집중되어 있을 수 있다. 그러면 sparse circuit masking이나 activation steering으로 selective multimodal forgetting을 시도할 수 있다.

추천 논문: Knowledge Neurons in Pretrained Transformers / Activation Steering for Language Models / Safety Alignment Should Be Made More Than Just a Few Tokens Deep

코드 50분 기록: Median of Two Sorted Arrays

핵심: 작은 배열 기준 binary search partition. 좌측 최대값이 우측 최소값 이하가 되는 지점을 찾는다.
복잡도: O(log(min(n, m))), O(1)
엣지 케이스: 빈 배열, 길이 차이 큰 배열, 중복값, 홀수/짝수 길이
커밋 메시지: feat: implement median of two sorted arrays using binary partition

Sprint 종료 체크

- Notion 요약 + 적용 에세이 업로드 완료
- 코드 50분 + 제출 또는 커밋 완료
- 보정 슬롯: 21:10-21:30 / 집 책상 / 휴대폰 비행기모드
- 내일 1순위: 미완료 항목 완료 전까지 이메일, 유튜브, 커뮤니티 금지

오늘 핵심: Unlearning은 삭제가 아니라 knowledge circuit 재배선이다.`,
  },
  {
    slug: "unlearning-sprint-08-latent-space-editing",
    date: "2026.06",
    title: "[Unlearning Sprint 08] Latent Space Editing으로 Multimodal Unlearning 만들기",
    description:
      "parameter를 업데이트하기 전에, joint latent space에서 target concept direction을 잡고 지우는 쪽이 더 정밀하다.",
    tags: ["Latent Editing", "CLIP", "LLaVA", "Representation Surgery"],
    category: "Unlearning Sprint Log",
    content: `Paper note: Latent Space Editing for Safe Multimodal Unlearning (2026)

핵심 아이디어 5문장

1. Vision-language model의 joint latent space에서 target concept direction을 추출한다.
2. representation editing으로 특정 concept activation을 제거한다.
3. full fine-tuning 없이 inference-level unlearning을 수행할 수 있다.
4. CLIP이나 LLaVA 계열에서 semantic preservation을 비교적 높게 유지한다.
5. latent projection 방식은 catastrophic forgetting을 줄이는 방향으로 작동한다.

내 연구에 적용

Latent space editing은 multimodal unlearning을 parameter update 없이 수행할 수 있다는 점에서 중요하다. 기존 LLM unlearning은 target data를 gradient 기반으로 잊게 만들지만, 이 방식은 모델 전반의 capability degradation을 유발할 수 있다.

반면 latent representation 수준에서 특정 concept direction만 제거하면 semantic utility를 유지하면서 selective forgetting을 시도할 수 있다. CLIP이나 LLaVA 같은 multimodal model은 image-text alignment가 shared latent space 안에 저장된다. 그래서 visual concept, identity-related information, instruction pattern도 latent subspace 관점에서 다룰 수 있다.

추천 논문: Representation Engineering / Towards Concept Erasure in Vision-Language Models / Sparse Autoencoders Find Highly Interpretable Features in Language Models

코드 50분 기록: Trapping Rain Water

핵심: two pointer, left_max/right_max 유지, 더 낮은 쪽 기준으로 물 계산.
복잡도: O(n), O(1)
엣지 케이스: 빈 배열, 증가 배열, 감소 배열, plateau, 큰 height 값
커밋 메시지: feat: implement trapping rain water using two pointers

Sprint 종료 체크

- Notion 요약 + 적용 에세이 업로드 완료
- 코드 50분 + 제출 또는 커밋 완료
- 보정 슬롯: 20:40-21:00 / 카페 또는 집 책상 / 인터넷 차단
- 내일 1순위: 미완료 항목 끝나기 전까지 메신저, SNS, 뉴스 금지

오늘 핵심: 미래의 Unlearning은 gradient descent보다 latent surgery에 가까워진다.`,
  },
  {
    slug: "unlearning-sprint-09-activation-patching-vlm",
    date: "2026.06",
    title: "[Unlearning Sprint 09] Activation Patching으로 VLM의 target pathway를 끊기",
    description:
      "모델을 다시 학습시키기 전에, target response가 지나가는 activation flow를 찾고 patching으로 막는 쪽부터 본다.",
    tags: ["Activation Patching", "VLM", "Mechanistic Interpretability", "LLaVA"],
    category: "Unlearning Sprint Log",
    content: `Paper note: Mechanistic Unlearning via Activation Patching in Vision-Language Models (2026)

핵심 아이디어 5문장

1. Vision-language model 내부 activation flow를 tracing해서 target concept pathway를 찾는다.
2. 특정 activation만 selective patching하여 target response를 억제한다.
3. full retraining 없이 inference-time unlearning을 시도할 수 있다.
4. attention head 단위 intervention이 utility preservation에 효과적일 수 있다.
5. multimodal hallucination과 alignment leakage 감소를 동시에 노린다.

내 연구에 적용

Activation patching 기반 접근은 unlearning을 parameter 제거가 아니라 information flow rerouting 문제로 본다. 기존 LLM unlearning은 target data의 likelihood를 낮추기 위해 fine-tuning을 수행한다. 그런데 이 방식은 모델 전체 능력 저하와 catastrophic forgetting을 만들기 쉽다.

Mechanistic intervention은 특정 activation pathway만 수정하기 때문에 selective forgetting 가능성이 있다. 특히 multimodal model에서는 image encoder에서 cross-attention을 거쳐 language decoder로 가는 alignment route가 핵심이다.

추천 논문: ROME / MEMIT / Visual Instruction Tuning

코드 50분 기록: Sliding Window Maximum

핵심: monotonic decreasing deque, window 최대값을 deque front에 유지, 범위 밖 index 제거.
복잡도: O(n), O(k)
엣지 케이스: k = 1, 모든 값 동일, 증가 배열, 감소 배열, 음수 포함
커밋 메시지: feat: implement sliding window maximum using monotonic deque

Sprint 종료 체크

- Notion 요약 + 적용 에세이 업로드 완료
- 코드 50분 + 제출 또는 커밋 완료
- 보정 슬롯: 22:00-22:20 / 집 책상 / 노트북 전체화면 + 휴대폰 다른 방
- 내일 1순위: 미완료 항목 완료 전까지 디스코드, 유튜브, 뉴스탭 금지

오늘 핵심: Unlearning의 미래는 retraining보다 controllable activation routing에 가깝다.`,
  },
  {
    slug: "unlearning-sprint-10-sparse-feature-circuits-vlm",
    date: "2026.06",
    title: "[Unlearning Sprint 10] Sparse Feature Circuit으로 Multimodal Unlearning 정밀하게 만들기",
    description:
      "SAE로 feature를 풀고, target concept cluster만 잡아 줄이는 방식. Future Unlearning은 sparse feature control 쪽으로 간다.",
    tags: ["Sparse Feature", "Circuit", "VLM", "Mechanistic Interpretability"],
    category: "Unlearning Sprint Log",
    content: `Paper note: Sparse Feature Circuits Enable Selective Unlearning in Large Multimodal Models (2026)

핵심 아이디어 5문장

1. Sparse autoencoder, SAE를 사용해 multimodal transformer 내부 feature를 disentangle한다.
2. 특정 target concept와 강하게 연결된 sparse feature cluster를 식별한다.
3. feature suppression만으로 selective forgetting을 수행할 수 있다.
4. full fine-tuning 대비 utility degradation이 크게 줄어든다.
5. image-text alignment를 유지하면서 control 성능을 강화하는 방향이다.

내 연구에 적용

Sparse feature 기반 unlearning은 앞으로 multimodal safety 연구의 핵심 방향이 될 가능성이 높다. 기존 LLM unlearning은 gradient 기반으로 특정 데이터의 likelihood를 줄인다. 하지만 이 방식은 모델 전반 representation을 흔들어서 unrelated capability degradation을 유발하기 쉽다.

반면 sparse feature disentanglement는 target concept가 어떤 latent feature에 저장되는지 직접 추적할 수 있게 만든다. 특히 CLIP과 LLaVA 계열 모델에서는 image-text shared representation 내부에 visual semantics와 instruction-following behavior가 얽혀 있다.

추천 논문: Superposition, Memorization, and Double Descent / Towards Unlearning in Large Language Models / CLIP Surgery for Better Explainability

코드 50분 기록: Largest Rectangle in Histogram

핵심: monotonic increasing stack, 현재 높이보다 큰 막대가 나오면 면적 계산, index로 width 계산.
복잡도: O(n), O(n)
엣지 케이스: 동일 높이, 증가 histogram, 감소 histogram, single bar, zero height
커밋 메시지: feat: implement largest rectangle in histogram using monotonic stack

Sprint 종료 체크

- Notion 요약 + 적용 에세이 업로드 완료
- 코드 50분 + 제출 또는 커밋 완료
- 보정 슬롯: 21:30-21:50 / 집 책상 / 브라우저 탭 전부 종료
- 내일 1순위: 미완료 항목 완료 전까지 메일, 커뮤니티, 쇼츠 금지

오늘 핵심: Future Unlearning = Sparse Feature Control + Mechanistic Interpretability.`,
  },
  {
    slug: "unlearning-sprint-11-concept-bottleneck-vlm",
    date: "2026.06",
    title: "[Unlearning Sprint 11] Concept Bottleneck으로 VLM Unlearning을 설명 가능하게 만들기",
    description:
      "black-box fine-tuning으로 지웠다고 주장하는 게 아니라, target concept를 explicit bottleneck에 올려놓고 직접 제어하는 방향.",
    tags: ["Concept Bottleneck", "VLM", "Interpretable Control", "Safety"],
    category: "Unlearning Sprint Log",
    content: `Paper note: Concept Bottleneck Unlearning for Vision-Language Models (2026)

핵심 아이디어 5문장

1. Vision-language model 내부에 interpretable concept bottleneck layer를 삽입한다.
2. target concept를 explicit intermediate representation으로 분리한다.
3. 특정 concept neuron만 수정하여 selective forgetting을 수행한다.
4. black-box fine-tuning 대비 explainability와 controllability를 높인다.
5. multimodal instruction setting에서 robustness 개선을 노린다.

내 연구에 적용

Concept bottleneck 기반 접근은 machine unlearning을 더 interpretable하게 만든다는 점에서 중요하다. 기존 LLM unlearning은 parameter 전체에 distributed하게 저장된 정보를 제거하려고 한다. 그래서 무엇이 실제로 삭제되었는지 추적하기 어렵다.

하지만 bottleneck representation을 쓰면 concept가 explicit variable 형태로 드러난다. 그러면 selective intervention이 가능하다. multimodal model에서는 visual semantics와 textual reasoning이 shared latent space에 섞여 있다. concept bottleneck은 이 섞임을 분리하는 장치로 쓸 수 있다.

추천 논문: Editing Models with Task Arithmetic / Erasing Concepts from Diffusion Models / Monosemanticity and Sparse Feature Decomposition

코드 50분 기록: Minimum Window Substring

핵심: sliding window + frequency counter, 조건 만족 시 left pointer 축소, 최소 길이 substring 갱신.
복잡도: O(n), O(k)
엣지 케이스: t가 s보다 긴 경우, 중복 문자, 정답이 끝에 있는 경우, 대소문자 혼합, 정답 없음
커밋 메시지: feat: implement minimum window substring using sliding window

Sprint 종료 체크

- Notion 요약 + 적용 에세이 업로드 완료
- 코드 50분 + 제출 또는 커밋 완료
- 보정 슬롯: 20:50-21:10 / 집 책상 / VSCode 전체화면 + 휴대폰 비행기모드
- 내일 1순위: 미완료 항목 끝나기 전까지 X, 디스코드, 유튜브 금지

오늘 핵심: Future Multimodal Unlearning will depend on interpretable concept control, not brute-force retraining.`,
  },
  {
    slug: "unlearning-sprint-12-latent-routing-selective-forgetting",
    date: "2026.06",
    title: "[Unlearning Sprint 12] Selective Forgetting의 핵심은 latent routing 제어다",
    description:
      "target knowledge가 weight 전체에 있는 게 아니라 특정 activation route를 타고 나온다면, 지울 것도 그 route다.",
    tags: ["Latent Routing", "Attention Route", "Selective Forgetting", "VLM"],
    category: "Unlearning Sprint Log",
    content: `Paper note: Latent Routing for Selective Forgetting in Multimodal Transformers (2026)

핵심 아이디어 5문장

1. Transformer 내부 latent routing path를 분석해서 target knowledge propagation 경로를 추적한다.
2. 특정 attention route만 차단하거나 재분배해서 selective forgetting을 수행한다.
3. parameter update 없이 inference-level intervention을 할 수 있다.
4. multimodal alignment를 유지하면서 target generation을 줄이는 방향이다.
5. routing sparsity가 높을수록 forgetting precision이 좋아진다는 가설을 만든다.

내 연구에 적용

Latent routing 기반 접근은 future machine unlearning에서 매우 중요한 방향이 될 가능성이 높다. 기존 unlearning은 주로 weight-space modification에 집중한다. 하지만 실제 knowledge retrieval은 특정 activation routing path를 통해 발생할 수 있다.

특히 multimodal transformer에서는 image token과 text token이 cross-attention을 통해 상호작용한다. target concept도 특정 routing circuit에 집중될 수 있다. 만약 sparse routing 구조를 분석해서 target latent path만 selective suppression할 수 있다면, 전체 parameter를 수정하지 않고 forgetting을 수행할 수 있다.

추천 논문: Transformer Circuits / Sparse Autoencoders Find Highly Interpretable Features in Language Models / Machine Unlearning in Generative AI: A Survey

코드 50분 기록: Trapping Rain Water

핵심: two pointer, left_max/right_max 유지, 더 낮은 쪽 pointer를 이동하며 물의 양 계산.
복잡도: O(n), O(1)
엣지 케이스: 빈 배열, 증가 배열, 감소 배열, plateau 구조, 큰 valley
커밋 메시지: feat: implement trapping rain water using two pointers

Sprint 종료 체크

- Notion 요약 + 적용 에세이 업로드 완료
- 코드 50분 + 제출 또는 커밋 완료
- 보정 슬롯: 22:10-22:30 / 집 책상 / 크롬 종료 + IDE만 실행
- 내일 1순위: 미완료 항목 완료 전까지 커뮤니티, 쇼츠, 뉴스 금지

오늘 핵심: Selective forgetting의 핵심은 parameter 삭제보다 latent routing 제어다.`,
  },
];
