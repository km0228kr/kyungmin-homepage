import type { WritingPost } from "./writing";

export const unlearningResearchPosts02: WritingPost[] = [
  {
    slug: "unlearning-research-07-knowledge-circuit-rewiring",
    date: "2026.06",
    title: "[Unlearning Research 07] Unlearning은 삭제가 아니라 knowledge circuit 재배선이다",
    description:
      "Knowledge Neurons와 ROME을 unlearning 관점에서 다시 읽으면, 잊기의 핵심은 손실 증가가 아니라 회로 차단이다.",
    tags: ["Circuit", "Knowledge Neurons", "ROME", "Unlearning"],
    category: "Unlearning Research Essay",
    sourceTitle: "Knowledge Neurons in Pretrained Transformers",
    sourceUrl: "https://arxiv.org/abs/2104.08696",
    content: `기준 논문
- Knowledge Neurons in Pretrained Transformers — https://arxiv.org/abs/2104.08696
- Locating and Editing Factual Associations in GPT — https://arxiv.org/abs/2202.05262
- MEMIT: Mass-Editing Memory in a Transformer — https://arxiv.org/abs/2210.07229

나는 요즘 unlearning을 단순 삭제 문제가 아니라 circuit 문제로 보고 있다. 이유는 분명하다. 모델이 어떤 답을 하는 건 parameter 하나 때문이 아니다. input이 들어오고, 특정 activation이 켜지고, attention과 MLP를 지나면서 answer logit이 형성된다. 그러면 줄여야 할 것은 데이터 자체가 아니라 그 데이터가 출력으로 변환되는 경로일 수 있다.

Knowledge Neurons 논문은 factual knowledge가 pretrained transformer 내부의 특정 neuron activation과 연결될 수 있다는 가능성을 보여줬다. ROME은 한 발 더 나아가 factual association을 middle-layer feed-forward module에서 찾고, rank-one update로 바꿔본다. MEMIT은 이런 memory editing을 대량으로 확장한다. 이 논문들은 원래 unlearning 논문은 아니다. 하지만 내 입장에서는 여기서 unlearning의 강한 힌트가 나온다. 모델이 지식을 꺼내는 위치와 경로를 찾을 수 있다면, 삭제도 더 정밀하게 설계할 수 있다.

다만 editing과 unlearning은 다르다. editing은 A를 B로 바꾸는 것이다. unlearning은 A를 덜 꺼내게 만드는 것이다. 이 차이가 크다. A를 B로 바꾸면 대체 answer가 생긴다. 하지만 unlearning에서는 지정 answer를 막으면서도 주변 지식과 일반 능력은 살아 있어야 한다. 그래서 ROME/MEMIT을 그대로 삭제 방향으로 쓰면 부족하다. 내 연구에서는 weight edit 전에 circuit-level diagnostic을 먼저 해야 한다.

Multimodal setting에서는 이 문제가 더 선명해진다. LLaVA 같은 모델에서 image는 vision tower를 거쳐 language token space로 들어간다. 지정 visual concept가 answer로 나오는 과정은 vision feature, projection layer, decoder hidden state, final logits를 모두 지난다. 여기서 어느 layer가 retrieval을 실제로 밀어 올리는지 찾아야 한다. 그 다음에야 masking, activation steering, low-rank adapter 같은 intervention이 의미를 갖는다.

내가 새로 밀어볼 아이디어는 Retain Shadow Test다. 지정 circuit을 약화시킨 뒤, 지정 concept와 가장 가까운 retain example들을 shadow set으로 둔다. 예를 들어 특정 entity를 줄이면 같은 category, 비슷한 속성, 비슷한 배경의 다른 entity들을 shadow retain으로 둔다. 이 shadow set이 무너지면 method는 실패다. 기존 unlearning 평가는 retain set이 너무 멀리 있어서 쉬운 경우가 많다. 진짜 어려운 평가는 바로 옆 지식이 살아 있는지 보는 것이다.

바로 할 실험은 다음이다. 지정 image-text pair를 넣고 LLaVA의 layer별 activation을 저장한다. 지정 answer가 나오는 경우와 shadow retain answer가 나오는 경우를 비교한다. activation patching으로 어떤 layer 또는 head가 answer를 바꾸는지 찾는다. 해당 route를 약하게 만들고 지정 복원 여부와 shadow retain utility를 같이 평가한다. 마지막으로 SAE feature와 circuit path를 연결해 feature to route to answer 구조를 만든다.

이 글의 결론은 단순하다. Unlearning은 무작정 loss를 올리는 일이 아니다. 모델이 지정 정보를 꺼내는 회로를 찾고, 그 회로만 재배선하는 일이다. 이 관점으로 가야 내 연구가 단순한 benchmark paper가 아니라 mechanism paper가 된다.`,
  },
  {
    slug: "unlearning-research-08-latent-space-editing",
    date: "2026.06",
    title: "[Unlearning Research 08] Latent Space Editing으로 Multimodal Unlearning 만들기",
    description:
      "RepE와 concept erasure를 연결하면, unlearning은 weight 업데이트가 아니라 latent direction control 문제가 된다.",
    tags: ["Latent Editing", "RepE", "CLIP", "Representation Surgery"],
    category: "Unlearning Research Essay",
    sourceTitle: "Representation Engineering: A Top-Down Approach to AI Transparency",
    sourceUrl: "https://arxiv.org/abs/2310.01405",
    content: `기준 논문
- Representation Engineering: A Top-Down Approach to AI Transparency — https://arxiv.org/abs/2310.01405
- Erasing Concepts from Diffusion Models — https://arxiv.org/abs/2303.07345
- Unified Concept Editing in Diffusion Models — https://arxiv.org/abs/2308.14761

Latent space editing이 중요한 이유는 간단하다. 모델을 다시 학습시키기 전에, 모델 내부 representation에서 지정 direction을 먼저 잡을 수 있기 때문이다. 내가 지금 보는 unlearning의 미래는 full fine-tuning이 아니다. 모델이 어떤 concept를 표현하는 방향을 찾고, 그 방향을 조작하는 것이다.

Representation Engineering은 neuron 하나가 아니라 population-level representation을 본다. 특정 고수준 현상이 activation space의 방향으로 나타날 수 있다는 관점이다. 이걸 unlearning에 적용하면 질문이 바뀐다. 어떤 데이터를 지울까가 아니라 어떤 representation direction을 약화시킬까가 된다.

Diffusion의 concept erasure 연구도 같은 방향을 보여준다. 특정 visual concept나 style은 단일 이미지 몇 장이 아니라 text condition과 visual manifold 사이의 연결로 존재한다. 그래서 concept를 지운다는 것은 sample을 지우는 것이 아니라 latent mapping을 바꾸는 일이다. 이 관점은 VLM에도 그대로 온다. CLIP이나 LLaVA는 image-text alignment를 shared latent space에 만든다. 지정 concept는 이미지 쪽에만 있지 않고, text prompt, caption, retrieval, answer generation 사이를 오간다.

내 프로젝트에서 latent space editing은 가장 빠른 baseline이 될 수 있다. 지정 set과 retain set을 넣고 layer별 activation mean difference를 구한다. 그 방향을 지정 direction으로 잡는다. 이후 inference 중 특정 layer에서 projection subtraction을 적용한다. 평가할 것은 세 가지다. 지정 prompt에서 복원이 줄었는가, retain prompt에서 성능이 유지되는가, semantic neighbor concept가 같이 죽지 않았는가.

내가 새로 제안하고 싶은 아이디어는 Modal Escape Test다. Multimodal unlearning에서 정보는 한 modality에서 줄어도 다른 modality로 도망갈 수 있다. text prompt에서는 줄었는데 image prompt에서는 살아 있거나, image recognition에서는 줄었는데 caption paraphrase에서는 다시 나온다. 그래서 평가는 text-only, image-only, image-plus-text, retrieval-to-generation 네 경로를 모두 돌아야 한다. unlearning은 한 방에서 쫓아내는 게 아니라, 모든 출구를 막는 문제다.

이 아이디어를 실험으로 만들면 다음과 같다. 하나의 지정 concept에 대해 네 가지 probe를 만든다. text probe, image probe, image-caption probe, retrieval-augmented probe. 같은 latent direction intervention을 적용한 뒤 네 probe에서 복원 가능성이 어떻게 달라지는지 본다. 어떤 방향은 text에는 잘 먹히지만 image에는 약할 수 있다. 그 차이가 바로 논문의 분석 포인트가 된다.

내가 붙이고 싶은 이름은 Representation Firewall이다. 지정 representation이 modality 사이를 넘어갈 때 통과하는 shared subspace를 firewall처럼 제어하는 방식이다. 이건 단순 latent projection보다 더 좋은 스토리다. direction 하나를 지우는 게 아니라, modality 간 복원 경로를 막는 것이다. Multimodal Unlearning에서 이 방향은 특히 강하다.`,
  },
];
