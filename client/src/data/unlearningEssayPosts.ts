import type { WritingPost } from "./writing";

export const unlearningEssayPosts: WritingPost[] = [
  {
    slug: "unlearning-essay-01-tofu",
    date: "2026.06",
    title: "TOFU를 읽고: 모델이 정말 잊었다는 걸 어떻게 확인할까",
    description:
      "TOFU는 unlearning을 방법 문제가 아니라 평가 문제로 다시 보게 만든다. 모델이 답을 피하는 것과 처음부터 배우지 않은 것처럼 행동하는 것은 다르다.",
    tags: ["Machine Unlearning", "LLM", "Evaluation", "TOFU"],
    category: "Unlearning Essay",
    sourceTitle: "TOFU: A Task of Fictitious Unlearning for LLMs",
    sourceUrl: "https://arxiv.org/abs/2401.06121",
    content: `TOFU 논문은 새 unlearning 알고리즘을 제안하는 글이라기보다, unlearning을 어떻게 평가해야 하는지 다시 묻는 글에 가깝다.

이게 중요했다.

unlearning을 처음 보면 문제는 단순해 보인다. 특정 데이터를 빼고 싶다. 그러면 모델이 그 데이터에 대한 답을 못 하게 만들면 된다. 그런데 논문을 읽다 보면, 이 생각이 금방 부족해진다. 모델이 대답을 못 하는 것과, 정말 그 정보를 처음부터 배우지 않은 것처럼 행동하는 것은 같지 않다.

TOFU는 이 차이를 보기 위해 실제 개인정보를 쓰지 않는다. 대신 200명의 가상 작가 프로필을 만들고, 각 작가마다 20개의 질문-답변 쌍을 구성한다. 그중 일부 작가를 forget set으로 두고, 나머지를 retain set으로 둔다. 모델은 forget set에 대해서는 약해져야 하지만, retain set에 대해서는 그대로 잘 답해야 한다. 전체 언어 능력도 무너지면 안 된다.

이 설정이 흥미로운 건, 개인정보 문제를 피하면서도 꽤 현실적인 상황을 만든다는 점이다. 사람 하나에 대한 정보는 보통 한 문장으로 존재하지 않는다. 이름, 직업, 배경, 작품, 주변 설명이 묶여 있다. 모델이 그중 하나만 못 말한다고 해서 정말 잊었다고 보기는 어렵다.

TOFU가 남기는 질문은 이거다.

모델이 정말 잊었는가. 아니면 우리가 확인한 질문 방식에서만 조용해진 것인가.

여기서 내 연구랑 연결된다. LLM에서는 주로 텍스트로 묻는다. 그런데 vision-language model에서는 정보가 한 통로로만 들어오지 않는다. 이름을 물을 수도 있고, 이미지를 줄 수도 있고, 이미지와 설명을 같이 줄 수도 있다. 텍스트에서는 약해졌는데 이미지를 주면 다시 맞히는 경우가 생길 수 있다. 반대로 이미지만으로는 애매한데 caption을 붙이면 다시 살아날 수도 있다.

그래서 multimodal unlearning에서는 평가를 더 잘게 쪼개야 한다.

내가 만들고 싶은 실험은 작게 시작할 수 있다. 특정 image-text 묶음을 만든다. 예를 들어 인물, 장소, 물체, 로고처럼 이미지와 설명이 함께 붙어 있는 단위다. 일부 묶음은 잊어야 할 대상으로 두고, 비슷하지만 남겨야 하는 묶음도 가까이에 둔다. 그런 다음 텍스트만 줬을 때, 이미지만 줬을 때, 이미지와 텍스트를 같이 줬을 때를 따로 본다.

중요한 건 세 번째다. 한쪽 경로가 약해져도 다른 경로가 정보를 다시 끌어올릴 수 있기 때문이다.

이 글에서 TOFU를 가져가는 이유는 benchmark 자체보다 관점에 있다. unlearning은 먼저 평가 문제다. 정말 지웠는지 확인하는 방식이 허술하면, 방법이 아무리 좋아 보여도 믿기 어렵다. 내가 multimodal unlearning에서 보고 싶은 것도 결국 이 지점이다. 모델이 특정 입력에서는 조용해졌는데, 다른 입력을 주면 다시 기억한다면 아직 충분하지 않다.`
  },
  {
    slug: "unlearning-essay-02-rome-memit",
    date: "2026.06",
    title: "ROME과 MEMIT: 지식을 고칠 수 있다면, 덜 꺼내게 만들 수도 있을까",
    description:
      "ROME과 MEMIT은 unlearning 논문은 아니지만, 모델 내부에서 지식이 어디서 계산되는지 묻는 방식 때문에 unlearning 연구에 중요하다.",
    tags: ["ROME", "MEMIT", "Knowledge Editing", "LLM"],
    category: "Unlearning Essay",
    sourceTitle: "Locating and Editing Factual Associations in GPT / Mass-Editing Memory in a Transformer",
    sourceUrl: "https://arxiv.org/abs/2202.05262",
    content: `ROME을 읽을 때 가장 먼저 봐야 하는 건 rank-one update 자체가 아니다. 더 앞에 있는 질문이다.

모델은 사실 지식을 어디서 꺼내는가.

ROME은 이 질문을 causal intervention으로 다룬다. 특정 factual association, 예를 들어 어떤 subject와 object 사이의 연결이 모델 안에서 언제 결정되는지 본다. 논문은 중간층 feed-forward module, 특히 subject token을 처리하는 구간이 factual prediction에 중요하게 관여한다는 증거를 제시한다. 그리고 그 계산을 직접 건드려 특정 사실을 다른 사실로 바꾸는 Rank-One Model Editing을 제안한다.

MEMIT은 이 생각을 더 크게 밀어붙인다. ROME이 하나의 association을 바꾸는 데 초점이 있었다면, MEMIT은 여러 memory edit을 한꺼번에 처리하려 한다. GPT-J, GPT-NeoX 같은 큰 모델에서 수천 개 단위의 factual association 편집을 실험한다.

둘 다 엄밀히 말하면 unlearning 논문은 아니다. 지식을 없애는 것보다, A라는 연결을 B로 바꾸는 model editing 쪽에 가깝다. 그런데도 이 논문들을 봐야 하는 이유가 있다. unlearning도 결국 모델 내부의 특정 연결을 다룬다. 다만 목표가 다르다.

editing은 새 답을 심는 일에 가깝다.

unlearning은 더 어렵다. 새 답을 넣으면 되는 게 아니라, 특정 정보가 과하게 쉽게 꺼내지는 상태를 줄여야 한다. 그러면서 주변 지식은 유지해야 한다. 여기서 문제가 생긴다. A를 B로 바꾸는 것보다, A가 필요 이상으로 나오지 않게 만드는 일이 더 애매하다.

내가 이 논문들에서 가져가고 싶은 건 방법보다 태도다. 모델을 그냥 거대한 블랙박스로 두고 loss만 조정하는 것이 아니라, 어느 구간에서 어떤 연결이 만들어지는지 먼저 본다. 그런 다음 그 구간을 아주 작게 건드린다.

이 관점은 multimodal model에서 더 중요해진다. LLaVA 같은 모델은 vision encoder에서 나온 image token을 language model 쪽으로 넘긴다. 특정 시각 개념이 답변으로 이어지는 과정에는 image representation, projection layer, language decoder가 모두 관여한다. 그렇다면 질문은 이렇게 바뀐다.

특정 visual concept는 어느 구간에서 언어적 답변으로 바뀌는가.

바로 할 수 있는 실험은 복잡하지 않다. LLaVA 계열 모델에서 특정 image-text pair를 넣고, 답변이 결정되는 구간의 activation을 저장한다. 그 다음 비슷한 이미지지만 다른 답을 가져야 하는 retain sample과 비교한다. 차이가 크게 나는 layer나 token 위치를 찾는다. 처음부터 weight를 바꾸기보다, 해당 구간의 activation을 약하게 조정했을 때 답변이 어떻게 변하는지 본다.

여기서 좋은 실험은 ‘지식이 사라졌는가’보다 먼저 ‘어느 길로 나오는가’를 묻는다.

ROME과 MEMIT이 내게 흥미로운 이유도 여기에 있다. 이 논문들은 모델 안의 지식이 완전히 퍼져 있기만 한 것이 아니라, 어느 정도는 추적 가능한 계산으로 드러날 수 있다고 보여준다. unlearning이 이 방향으로 가면 조금 더 정밀해질 수 있다. 그냥 모델을 전체적으로 흔드는 것이 아니라, 정보가 답변이 되는 길을 좁게 찾아보는 것이다.`
  },
  {
    slug: "unlearning-essay-03-concept-erasure",
    date: "2026.06",
    title: "Concept Erasure를 읽고: 데이터 하나가 아니라 개념의 경계를 다루는 문제",
    description:
      "Diffusion model의 concept erasure는 이미지 생성 안전성 문제처럼 보이지만, 사실 multimodal unlearning이 마주칠 가장 어려운 형태를 미리 보여준다.",
    tags: ["Concept Erasure", "Diffusion", "Multimodal", "UCE"],
    category: "Unlearning Essay",
    sourceTitle: "Erasing Concepts from Diffusion Models / Unified Concept Editing in Diffusion Models",
    sourceUrl: "https://arxiv.org/abs/2303.07345",
    content: `Erasing Concepts from Diffusion Models를 읽으면 unlearning의 단위가 흔들린다.

처음에는 데이터를 지운다고 생각한다. 어떤 이미지 몇 장, 어떤 문장 몇 개, 어떤 작가 이름 몇 개. 그런데 diffusion model에서 concept erasure를 보면 문제가 그렇게 작지 않다. 지워야 하는 것은 데이터 하나가 아니라, 텍스트 prompt와 이미지 패턴 사이에 생긴 연결이다.

논문은 Stable Diffusion 같은 text-to-image model에서 특정 concept나 artist style을 줄이는 방법을 제안한다. 흥미로운 점은 별도의 대규모 재학습 없이, 지우고 싶은 style 이름을 중심으로 model weight를 조정한다는 것이다. 논문은 특정 style이나 visual concept가 prompt를 통해 다시 생성되는 것을 줄이고, 이를 기존 safety 방법과 비교한다.

뒤이어 나온 Unified Concept Editing은 이 문제를 더 넓힌다. 현실의 모델에는 하나의 문제만 있는 게 아니다. bias, style, 부적절한 content 같은 문제가 동시에 나타난다. UCE는 text-to-image projection을 닫힌 형태의 해로 편집해서 여러 concept를 동시에 다루는 방향을 제안한다. 이 점이 꽤 중요하다. 하나씩 막는 방식으로는 실제 배포 환경을 따라가기 어렵기 때문이다.

내가 여기서 계속 생각한 건 concept의 경계다.

어떤 작가의 스타일을 줄인다고 할 때, 어디까지가 그 작가의 스타일인가. 색감인가, 구도인가, 붓질인가, 주제인가, 시대적 맥락인가. 너무 좁게 잡으면 우회가 쉽고, 너무 넓게 잡으면 주변 표현까지 같이 손상된다.

이 문제는 multimodal unlearning에서도 그대로 온다.

예를 들어 특정 인물에 대한 정보를 줄이고 싶다고 하자. 이름만 줄이면 충분하지 않다. 얼굴, 직업, 주변 사람, 장소, 말투, 자주 등장하는 문맥이 함께 연결되어 있을 수 있다. 이미지에서는 남아 있고 텍스트에서는 사라질 수도 있다. 반대로 텍스트 설명을 붙이면 이미지 쪽 정보가 다시 살아날 수도 있다.

그래서 나는 multimodal unlearning의 핵심이 concept boundary라고 본다.

바로 가능한 실험은 이런 식이다. 먼저 CLIP이나 LLaVA에서 특정 concept bundle을 만든다. 하나의 concept에 이미지, caption, 질문, 유사한 non-target concept를 같이 붙인다. 그 다음 concept를 줄이는 조작을 한 뒤, 세 가지를 본다. 첫째, 직접적인 재식별이 줄었는가. 둘째, 비슷한 주변 개념이 같이 무너지지 않았는가. 셋째, 이미지와 텍스트를 같이 줬을 때 다시 복원되지 않는가.

여기서 평가가 중요하다. 단순히 target prompt에서만 약해지면 부족하다. 다른 표현, 다른 이미지, 다른 caption에서도 안정적으로 낮아져야 한다. 동시에 가까운 retain concept는 유지되어야 한다.

이 논문들이 좋은 이유는 concept를 모델 안의 단순 단어가 아니라, 표현과 생성이 묶인 단위로 다룬다는 데 있다. 내 연구에서는 이 관점을 VLM으로 가져가고 싶다. 텍스트와 이미지가 함께 만든 concept가 어디서 이어지고, 어디서 끊을 수 있는지 보는 것이다.`
  },
  {
    slug: "unlearning-essay-04-sae",
    date: "2026.06",
    title: "Sparse Autoencoder를 읽고: 지식은 neuron 하나가 아니라 feature로 보일 수 있다",
    description:
      "SAE 논문은 모델 내부를 feature 단위로 다시 보게 만든다. unlearning도 weight를 크게 흔드는 대신, 어떤 feature가 행동을 만든 것인지 먼저 봐야 한다.",
    tags: ["Sparse Autoencoder", "Mechanistic Interpretability", "Feature", "SAE"],
    category: "Unlearning Essay",
    sourceTitle: "Sparse Autoencoders Find Highly Interpretable Features in Language Models",
    sourceUrl: "https://arxiv.org/abs/2309.08600",
    content: `Sparse Autoencoder 논문은 처음 보면 interpretability 논문이다. 그런데 조금 더 읽다 보면 unlearning에도 바로 연결된다.

핵심 문제는 polysemanticity다. 모델의 neuron 하나가 하나의 의미만 담당하면 좋겠지만, 실제로는 그렇지 않은 경우가 많다. 어떤 neuron은 서로 다른 맥락에서 동시에 반응한다. 그래서 neuron 하나를 보고 “이건 이런 의미다”라고 말하기 어렵다.

논문은 이 문제를 superposition 관점에서 본다. 모델은 표현해야 할 feature가 많고, neuron 수는 제한되어 있다. 그러면 여러 feature가 같은 activation space 안에 겹쳐 들어갈 수 있다. 겉으로 보면 neuron은 지저분해 보이지만, 사실 그 안에는 더 많은 feature가 겹쳐 있는 것일 수 있다.

SAE는 여기서 등장한다. 모델의 hidden activation을 sparse autoencoder로 재구성하고, 더 해석 가능한 sparse feature를 찾는다. 논문은 이렇게 얻은 feature들이 기존 neuron이나 PCA 방향보다 더 monosemantic하게 보인다고 보고한다. 또 indirect object identification task에서 특정 counterfactual behavior에 관여하는 feature를 더 세밀하게 짚을 수 있음을 보인다.

내가 이 논문에서 좋았던 부분은 “해석 가능하다”에서 끝나지 않는다는 점이다. feature를 찾았으면, 그 feature가 행동에 실제로 영향을 주는지도 봐야 한다. 이게 unlearning과 연결된다.

unlearning에서 가장 무서운 건 너무 크게 건드리는 것이다. 특정 정보를 줄이려다가 주변 능력까지 같이 손상되는 경우가 많다. 그런데 그 정보가 어떤 sparse feature 조합으로 나타나는지 볼 수 있다면, 조작 단위가 훨씬 작아진다.

물론 SAE가 답을 다 주는 것은 아니다. feature 설명이 그럴듯하다고 해서 실제 인과적 feature라는 뜻은 아니다. 자동으로 붙인 설명은 틀릴 수 있고, feature가 여러 맥락에서 다르게 쓰일 수도 있다. 그래서 unlearning에 쓰려면 반드시 intervention 평가가 필요하다.

내 프로젝트로 가져오면 순서는 이렇게 된다.

먼저 CLIP이나 LLaVA의 특정 layer activation을 모은다. target concept와 retain concept를 함께 넣는다. SAE를 학습하거나 공개된 SAE를 활용해 sparse feature를 뽑는다. 그 다음 target 쪽에서 자주 켜지는 feature를 찾는다. 여기서 끝내지 말고, 그 feature를 약하게 만들었을 때 실제 답변, retrieval, caption이 어떻게 바뀌는지 본다.

내가 특히 보고 싶은 건 feature의 수명이다.

한 layer에서 줄어든 feature가 다음 layer에서 다시 복원되는지, 다른 feature 조합으로 우회되는지 확인해야 한다. feature 하나를 눌렀는데 뒤에서 비슷한 표현이 다시 만들어지면, 그건 충분한 unlearning이 아니다.

그래서 실험 지표도 단순히 target accuracy만 보면 안 된다. feature activation 변화, downstream output 변화, retain concept 보존, 일반 성능 저하를 같이 봐야 한다.

SAE 논문이 내게 주는 메시지는 단순하다. 모델 내부를 neuron 단위로 보면 너무 흐릿하다. feature 단위로 다시 보면 조금 더 정밀하게 물어볼 수 있다. unlearning도 마찬가지다. 무엇을 줄일 것인지 모르면, 결국 모델 전체를 흔들게 된다.`
  },
  {
    slug: "unlearning-essay-05-llava-repe",
    date: "2026.06",
    title: "LLaVA와 Representation Engineering: multimodal unlearning은 어디를 봐야 할까",
    description:
      "LLaVA는 이미지와 언어가 만나는 구조를 보여주고, RepE는 activation space를 조작 가능한 대상으로 본다. 둘을 같이 보면 multimodal unlearning의 출발점이 보인다.",
    tags: ["LLaVA", "Representation Engineering", "VLM", "Multimodal Unlearning"],
    category: "Unlearning Essay",
    sourceTitle: "Visual Instruction Tuning / Representation Engineering",
    sourceUrl: "https://arxiv.org/abs/2304.08485",
    content: `LLaVA 논문을 보면 vision-language model이 생각보다 단순한 결합에서 출발했다는 게 보인다.

이미지를 이해하는 vision encoder가 있고, 언어를 처리하는 LLM이 있다. 둘 사이에 projection layer를 둬서 image feature를 language model이 읽을 수 있는 token 형태로 넘긴다. 그리고 GPT-4가 만든 multimodal instruction-following data로 학습시킨다. 논문은 이렇게 만든 LLaVA가 multimodal chat 능력을 보이고, ScienceQA에서도 강한 성능을 낸다고 보고한다.

여기서 내 관심은 성능보다 구조다.

이미지가 바로 답변이 되는 게 아니다. 이미지가 vision encoder를 지나고, projection을 지나고, language model 안에서 text token과 섞인다. 그러면 multimodal unlearning에서 질문은 자연스럽게 바뀐다.

무엇을 줄일 것인가보다 먼저, 그 정보가 어디서 언어가 되는가를 봐야 한다.

Representation Engineering 논문은 이 지점에서 같이 읽을 만하다. 이 논문은 neuron 하나나 circuit 하나보다 population-level representation을 중심에 둔다. 특정 고수준 현상, 예를 들어 honesty나 safety-related behavior 같은 것을 activation space의 방향으로 보고, 이를 관찰하거나 조정할 수 있는지 탐색한다.

둘을 같이 보면 한 가지 실험 방향이 생긴다.

LLaVA에서 특정 visual concept가 답변으로 이어지는 동안, 어느 representation이 반복적으로 나타나는지 본다. 그리고 그 representation을 inference 중에 약하게 만들었을 때 답변이 어떻게 바뀌는지 본다. 처음부터 weight를 바꾸지 않는다. 먼저 activation level에서 확인한다. 그래야 정말 그 방향이 행동과 관련 있는지 알 수 있다.

이 방식이 좋은 이유는 되돌릴 수 있기 때문이다. weight를 고쳐버리면 무엇이 깨졌는지 확인하기 어렵다. 반면 activation intervention은 일종의 실험 도구가 된다. 특정 방향을 줄였을 때 target response가 줄고 retain response가 유지된다면, 그 방향은 unlearning 후보가 된다.

바로 가능한 실험은 LLaVA에서 할 수 있다. target image-text pair와 retain pair를 만든다. image token이 projection을 지나 language model로 들어간 뒤, 몇 개 layer의 activation을 저장한다. target과 retain의 평균 차이를 구하고, 그 방향을 inference 중에 조금씩 빼본다. 그 다음 captioning, VQA, retrieval, 일반 질문 응답을 같이 본다.

여기서 중요한 건 한 번의 성공이 아니다. 같은 조작이 다른 prompt에서도 유지되는지 봐야 한다. 텍스트 질문만 바꿔도 결과가 뒤집히면, 그건 robust한 unlearning 방향이라고 보기 어렵다.

나는 multimodal unlearning을 weight update부터 시작하면 너무 빨리 복잡해진다고 생각한다. 먼저 representation을 관찰하고, 작은 조작으로 원인을 확인한 뒤, 그 다음 adapter나 fine-tuning으로 넘어가는 편이 낫다.

LLaVA는 이미지와 언어가 만나는 장소를 보여준다. RepE는 그 중간 표현을 조작 가능한 대상으로 본다. 둘을 같이 읽으면 multimodal unlearning의 첫 질문이 조금 더 선명해진다.

모델이 어떤 이미지를 보고 특정 말을 하게 되는 그 중간 지점은 어디인가.`
  }
];
