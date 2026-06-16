import type { WritingPost } from "./writing";

export const unlearningEssayPosts: WritingPost[] = [
  {
    slug: "unlearning-essay-01-tofu",
    date: "2026.06",
    title: "TOFU를 읽고: 모델이 정말 잊었다는 걸 어떻게 확인할까",
    description:
      "TOFU는 새로운 unlearning 방법보다 먼저, 우리가 무엇을 성공으로 부르고 있는지 묻는 논문이다. 이 질문은 LLM보다 multimodal model에서 더 어려워진다.",
    tags: ["Machine Unlearning", "LLM", "Evaluation", "TOFU"],
    category: "Unlearning Essay",
    sourceTitle: "TOFU: A Task of Fictitious Unlearning for LLMs",
    sourceUrl: "https://arxiv.org/abs/2401.06121",
    content: `TOFU를 읽기 전에 먼저 정리해야 할 게 있다.

unlearning은 생각보다 이름이 위험하다. 단어만 보면 모델 안에 있는 특정 정보를 깔끔하게 지워내는 일처럼 들린다. 그런데 실제로는 그렇게 단순하지 않다. 모델이 어떤 질문에 답을 못 한다고 해서, 그 정보를 정말 배우지 않은 상태가 된 것은 아니다.

TOFU는 이 차이를 보기 위해 만든 benchmark다. 논문은 실제 사람 정보를 쓰지 않고, 가상의 작가 프로필 200개를 만든다. 각 작가마다 20개의 질문-답변 쌍을 붙인다. 그리고 일부 작가를 forget 대상으로 둔다. 모델은 그 작가들에 대한 답변은 약해져야 하지만, 나머지 작가나 일반 언어 능력은 유지해야 한다.

여기서 좋은 점은 문제를 너무 크게 만들지 않았다는 것이다. 개인정보 삭제, 저작권, 모델 내부 기억 같은 이야기는 금방 추상적으로 흘러간다. TOFU는 그것을 작가 프로필이라는 작은 단위로 잘라낸다. 한 사람에 대한 이름, 경력, 작품, 주변 설명이 묶여 있을 때, 모델이 그 묶음을 얼마나 덜 꺼내는지 보는 것이다.

논문이 보는 것도 단순한 정답률이 아니다. forget set에서 답을 못 하게 만드는 것만으로는 부족하다. retain set은 살아 있어야 하고, 모델이 모든 질문을 회피하는 식으로 변해도 안 된다. 가장 중요한 기준은 이것이다. unlearning된 모델이 처음부터 그 데이터를 학습하지 않은 모델과 얼마나 비슷하게 행동하는가.

이 지점이 꽤 중요하다. 기존 방법 중에는 겉으로 보기에는 성공처럼 보이는 경우가 많다. 특정 prompt에서는 답이 줄어든다. 하지만 모델의 일반 성능이 함께 떨어지거나, 다른 표현으로 물었을 때 정보가 다시 나올 수 있다. 그러면 그건 망각이라기보다 특정 접근 경로가 약해진 것에 가깝다.

내가 이 논문을 multimodal unlearning으로 가져가고 싶은 이유도 여기에 있다.

LLM에서는 주로 텍스트로 묻는다. 그런데 vision-language model에서는 정보가 텍스트 하나로만 들어오지 않는다. 이미지를 줄 수도 있고, 이미지에 대한 설명을 붙일 수도 있고, 둘을 함께 줄 수도 있다. 어떤 정보는 텍스트 질문에서는 약해졌는데 이미지가 들어오면 다시 활성화될 수 있다. 반대로 이미지만으로는 애매한데 짧은 caption 하나가 붙으면서 다시 살아날 수도 있다.

그래서 multimodal unlearning에서는 평가를 세 갈래로 나눠야 한다.

텍스트만 줬을 때.
이미지만 줬을 때.
이미지와 텍스트를 같이 줬을 때.

세 번째가 특히 중요하다. multimodal model에서 정보는 한쪽에만 저장되어 있지 않다. 이미지 표현과 언어 표현이 서로를 보강한다. 한 경로에서 약해진 정보가 다른 경로를 통해 다시 보강될 수 있다. 그래서 텍스트에서만 조용해진 모델을 보고 충분히 잊었다고 말하면 위험하다.

실험은 작게 시작할 수 있다. 특정 image-text concept bundle을 만든다. 예를 들어 어떤 인물, 장소, 로고, 물체처럼 이미지와 설명이 함께 붙어 있는 단위다. 일부 bundle은 forget 대상으로 두고, 비슷하지만 남겨야 하는 bundle은 retain 대상으로 둔다. 이후 text-only, image-only, image-text 조건에서 재식별률과 답변 품질을 따로 본다.

여기서 내가 보고 싶은 것은 하나다. 모델이 정말 그 정보를 덜 꺼내는가. 아니면 우리가 확인한 한 가지 질문 방식에서만 조용해진 것인가.

TOFU는 LLM unlearning 논문이지만, 내가 보기에 더 큰 가치는 평가 태도에 있다. 방법을 만들기 전에 먼저 성공의 기준을 조심스럽게 세운다. 이 기준이 약하면 어떤 방법도 쉽게 좋아 보인다. 특히 multimodal model에서는 더 그렇다. 입력 경로가 여러 개인 모델에서 한쪽만 확인하고 잊었다고 말할 수는 없다.

다음 단계에서 만들고 싶은 것은 Multimodal TOFU에 가깝다. 잊어야 하는 단위는 단일 문장이 아니라 이미지와 텍스트가 묶인 작은 기억 덩어리다. 그리고 그 기억 덩어리가 어느 입력 경로에서 다시 살아나는지 끝까지 확인해야 한다.

unlearning 연구에서 가장 먼저 필요한 것은 강한 방법이 아니라, 속지 않는 평가다. TOFU는 그 출발점으로 여전히 좋은 논문이다.`
  },
  {
    slug: "unlearning-essay-02-rome-memit",
    date: "2026.06",
    title: "ROME과 MEMIT: 지식은 어디에서 답변이 되는가",
    description:
      "ROME과 MEMIT은 unlearning 논문은 아니지만, 모델 내부에서 사실 지식이 계산되는 위치를 추적한다. 그래서 unlearning을 더 정밀하게 생각하게 만든다.",
    tags: ["ROME", "MEMIT", "Knowledge Editing", "LLM"],
    category: "Unlearning Essay",
    sourceTitle: "Locating and Editing Factual Associations in GPT / MEMIT",
    sourceUrl: "https://arxiv.org/abs/2202.05262",
    content: `ROME과 MEMIT을 unlearning 논문으로 읽으면 조금 어긋난다. 이 논문들은 기본적으로 지식을 지우기보다 고치는 쪽에 가깝다. 그런데도 unlearning을 생각할 때 계속 다시 보게 된다.

이유는 간단하다. 두 논문이 묻는 질문이 좋기 때문이다.

모델은 어떤 사실을 어디에서 꺼내는가.

ROME은 이 질문을 꽤 직접적으로 다룬다. 예를 들어 모델이 어떤 사람의 출생지나 어떤 기업의 본사를 예측한다고 하자. 논문은 이런 factual association이 모델의 어느 층, 어느 계산에서 결정되는지 causal tracing으로 추적한다. 그리고 중간층의 feed-forward module, 특히 subject token이 처리되는 구간이 사실 예측에 크게 관여한다는 증거를 보인다.

그 다음이 rank-one edit이다. 특정 사실 연결을 바꾸기 위해, 관련된 feed-forward layer의 weight를 작은 rank-one update로 수정한다. 핵심은 큰 fine-tuning이 아니다. 모델 전체를 흔드는 대신, 특정 factual association을 만드는 계산 지점을 찾아 아주 좁게 바꾸려는 시도다.

MEMIT은 이 아이디어를 확장한다. ROME이 하나의 association을 바꾸는 데 강했다면, MEMIT은 여러 사실을 한 번에 편집하려 한다. 논문은 수천 개의 memory edit을 대형 언어모델에 적용하는 실험을 보인다. 즉, 하나의 사실을 고치는 문제에서 여러 사실을 동시에 다루는 문제로 넘어간다.

여기서 unlearning 연구자가 봐야 할 지점은 따로 있다.

지식을 고칠 수 있다면, 지식이 답변으로 이어지는 길도 어느 정도 추적할 수 있다는 뜻이다. 물론 editing과 unlearning은 다르다. editing은 A를 B로 바꾸면 된다. unlearning은 더 애매하다. 특정 정보가 너무 쉽게 나오지 않게 해야 하지만, 그 주변 지식은 유지해야 한다. 새 답을 심는 것보다 기준이 더 까다롭다.

그래도 ROME과 MEMIT이 중요한 이유는 분명하다. 이 논문들은 모델을 단순히 거대한 확률 기계로만 두지 않는다. 어느 구간에서 어떤 association이 만들어지는지 찾고, 그 구간을 제한적으로 건드린다. unlearning도 결국 이 방향으로 가야 한다고 생각한다.

지금 많은 unlearning 방법은 loss를 조정해서 forget data에 대한 likelihood를 낮춘다. 이 방식은 직관적이지만 거칠다. 어떤 정보가 어느 경로로 나오는지 보지 않고, 결과만 낮추려 한다. 그러면 지워야 할 것과 남겨야 할 것이 같이 흔들릴 수 있다.

multimodal model에서는 이 문제가 더 커진다. LLaVA 같은 모델을 생각해보면, 이미지는 vision encoder를 지나고, projection layer를 거쳐, language model의 token 흐름 안으로 들어간다. 이때 특정 시각 정보가 언어 답변이 되는 과정은 한 지점에서 끝나지 않는다. image feature, projection, language decoder가 함께 관여한다.

그래서 질문을 바꿔야 한다.

특정 visual concept는 어느 순간 언어적 사실이 되는가.

예를 들어 모델이 이미지를 보고 어떤 사람, 장소, 브랜드, 장면을 말한다고 하자. 그 답이 vision encoder에서 이미 결정되는지, projection layer에서 언어 공간에 맞춰지는지, 아니면 language decoder의 중간층에서 최종적으로 굳어지는지 봐야 한다. 이걸 보지 않으면 unlearning은 계속 표면적인 조정에 머문다.

바로 가능한 실험은 activation 비교부터 시작할 수 있다. LLaVA 계열 모델에 forget 대상 이미지와 retain 이미지를 넣는다. 둘은 시각적으로 비슷하지만 답변은 달라야 한다. 이후 각 layer에서 activation을 저장하고, 답변이 갈라지는 구간을 찾는다. 그 구간을 아주 약하게 조정했을 때 forget 대상의 재식별률은 낮아지고 retain 대상은 유지되는지 본다.

여기서 좋은 실험은 모델을 세게 바꾸는 실험이 아니다. 먼저 길을 찾는 실험이다. 정보가 어떤 경로로 답변이 되는지 찾고, 그 다음에 조정한다.

내가 ROME과 MEMIT을 계속 가져가고 싶은 이유도 여기에 있다. 이 논문들은 모델 안의 지식이 완전히 안개처럼 퍼져 있기만 한 것은 아니라고 말한다. 어느 정도는 추적 가능한 계산으로 드러날 수 있다. 그렇다면 unlearning도 그 계산을 먼저 봐야 한다.

지식을 없애겠다고 말하기 전에, 그 지식이 어디서 답변이 되는지부터 봐야 한다. 이 순서가 바뀌면 unlearning은 쉽게 거칠어진다.`
  },
  {
    slug: "unlearning-essay-03-concept-erasure",
    date: "2026.06",
    title: "Concept Erasure: 데이터가 아니라 개념의 경계를 다루는 문제",
    description:
      "Diffusion model의 concept erasure는 multimodal unlearning이 결국 마주칠 문제를 먼저 보여준다. 하나의 샘플이 아니라 개념의 범위를 정해야 한다.",
    tags: ["Concept Erasure", "Diffusion", "Multimodal", "UCE"],
    category: "Unlearning Essay",
    sourceTitle: "Erasing Concepts from Diffusion Models / Unified Concept Editing",
    sourceUrl: "https://arxiv.org/abs/2303.07345",
    content: `Erasing Concepts from Diffusion Models를 읽으면 unlearning의 단위가 달라진다.

처음에는 데이터를 지운다고 생각한다. 어떤 이미지 몇 장, 어떤 문장 몇 개, 어떤 이름 몇 개. 그런데 text-to-image model에서는 문제가 그렇게 작지 않다. 모델이 배운 것은 파일 하나가 아니라, prompt와 이미지 패턴 사이의 연결이다.

이 논문은 Stable Diffusion 같은 text-to-image diffusion model에서 특정 concept나 artist style을 줄이는 방법을 제안한다. 흥미로운 점은 대규모 재학습을 하지 않고, 지우고 싶은 concept의 이름을 중심으로 모델을 조정한다는 것이다. 논문은 negative guidance를 teacher처럼 사용해서, 특정 style이나 visual concept가 prompt를 통해 다시 생성되는 정도를 낮추려 한다.

이 접근이 기존 inference-time filtering과 다른 점도 중요하다. 단순히 생성 결과를 막는 것이 아니라, 모델 weight 자체에 반영되도록 한다. 그래서 사용자가 model weights에 접근하더라도 단순 필터 우회처럼 쉽게 피해가기 어렵다는 문제의식을 가진다.

그 다음에 Unified Concept Editing을 같이 봐야 한다. 현실의 모델에는 문제가 하나만 있지 않다. 어떤 model은 특정 style을 과하게 재현할 수도 있고, 어떤 concept에 치우친 이미지를 만들 수도 있고, 배포 환경에서 피해야 하는 content를 만들 수도 있다. UCE는 이런 여러 concept editing을 하나의 closed-form 방식으로 다루려 한다. text-to-image projection을 편집해서 여러 concept를 동시에 조정하는 방향이다.

여기서 중요한 질문이 생긴다.

개념은 어디까지가 같은 개념인가.

특정 작가의 스타일을 줄인다고 할 때, 무엇을 줄이는 것인가. 색감인가. 구도인가. 붓질인가. 자주 등장하는 소재인가. 시대적 분위기인가. 너무 좁게 잡으면 쉽게 우회된다. 너무 넓게 잡으면 주변 표현까지 같이 손상된다.

이 문제는 multimodal unlearning에서도 그대로 온다.

예를 들어 특정 인물 정보를 줄이고 싶다고 하자. 이름만 줄이면 충분하지 않다. 얼굴, 직업, 주변 장소, 함께 등장하는 사람, 자주 붙는 설명까지 연결되어 있을 수 있다. 모델은 이름을 말하지 않더라도 이미지 특징을 보고 비슷한 설명을 만들 수 있다. 반대로 얼굴만 약해져도 텍스트 단서가 들어오면 다시 맞힐 수 있다.

그래서 multimodal unlearning에서는 샘플 단위보다 concept boundary가 중요하다. 무엇을 같은 개념으로 묶을 것인지, 무엇은 가까워도 남겨야 하는지 정해야 한다. 이 경계를 잘못 잡으면 두 가지 문제가 생긴다.

하나는 under-erasure다. 겉으로는 줄어든 것처럼 보이지만, 다른 표현이나 다른 modality로 들어오면 다시 나온다.

다른 하나는 over-erasure다. 지우려던 대상 주변의 정상적인 개념까지 같이 손상된다. 이 경우 모델은 조심스러워진 것이 아니라 둔해진 것이다.

내가 여기서 생각하는 실험은 Concept Boundary Map이다. 어떤 target concept를 하나 고르고, 그 주변에 가까운 concept들을 거리별로 둔다. 예를 들어 특정 style이면 비슷한 시대의 다른 style, 비슷한 색감의 다른 artist, 전혀 다른 style을 함께 둔다. 인물 정보라면 같은 직업, 비슷한 얼굴 특징, 같은 장소에 등장하는 다른 인물을 retain set으로 둔다.

그 다음 unlearning 후에 성능이 어떻게 떨어지는지 지도로 본다. 중심만 낮아졌는지, 주변까지 같이 무너졌는지, 아니면 중심은 남아 있고 바깥쪽만 흔들렸는지 본다.

이 실험은 단순한 accuracy 표보다 더 많은 것을 보여줄 수 있다. unlearning이 얼마나 정밀한지, 모델이 개념을 어느 정도 범위로 묶고 있는지, 그리고 어떤 modality에서 경계가 흐려지는지 볼 수 있기 때문이다.

바로 가능한 구현은 CLIP retrieval에서 시작할 수 있다. target concept와 가까운 image-text pair를 여러 단계로 만들고, unlearning 전후 embedding space의 변화를 본다. 이후 LLaVA에서 같은 concept를 질문했을 때 답변이 어떻게 달라지는지 비교한다. retrieval에서는 줄었는데 generation에서는 남아 있는지, 반대로 generation에서는 줄었는데 embedding space에서는 여전히 가까운지 볼 수 있다.

Concept erasure 논문들이 좋은 이유는 단순히 이미지 생성 안전성 때문이 아니다. 이 논문들은 unlearning이 결국 concept의 경계를 정하는 문제라는 걸 보여준다.

어떤 것을 줄일 것인가.
어디까지는 남길 것인가.
그 경계는 텍스트와 이미지에서 같은가.

multimodal unlearning은 결국 이 질문을 피할 수 없다.`
  },
  {
    slug: "unlearning-essay-04-sae",
    date: "2026.06",
    title: "Sparse Autoencoder: 지식을 feature 단위로 볼 수 있다면",
    description:
      "SAE 논문들은 neuron 하나를 해석하려는 시도에서 벗어나, activation space 안의 sparse feature를 찾는다. unlearning에서는 무엇을 조정할지 찾는 도구가 될 수 있다.",
    tags: ["Sparse Autoencoder", "Mechanistic Interpretability", "Feature", "Unlearning"],
    category: "Unlearning Essay",
    sourceTitle: "Sparse Autoencoders Find Highly Interpretable Features in Language Models",
    sourceUrl: "https://arxiv.org/abs/2309.08600",
    content: `Sparse Autoencoder 논문을 읽을 때 가장 먼저 봐야 하는 단어는 monosemanticity가 아니다. 그보다 앞에 있는 문제는 polysemanticity다.

신경망 안의 neuron 하나가 하나의 의미만 담당하면 해석은 쉬울 것이다. 그런데 실제 모델에서는 neuron 하나가 여러 맥락에서 켜진다. 어떤 neuron은 전혀 다른 종류의 입력에서 비슷하게 반응할 수 있다. 이것이 polysemanticity다. 한 단위가 여러 의미를 동시에 품고 있으면, 그 neuron을 보고 무엇을 하는지 말하기 어렵다.

SAE 논문은 이 문제를 neuron이 아니라 feature 방향의 문제로 본다. 모델이 실제로는 neuron 수보다 더 많은 feature를 activation space 안에 겹쳐서 표현하고 있을 수 있다는 것이다. 이 생각이 superposition이다. 그러면 우리가 봐야 할 것은 개별 neuron이 아니라, activation을 더 해석 가능한 sparse feature로 분해하는 방법이다.

Sparse Autoencoder는 모델의 hidden activation을 입력으로 받아, 더 큰 feature 공간으로 펼친 뒤, 아주 일부 feature만 켜지도록 학습한다. 그리고 다시 원래 activation을 복원한다. 잘 학습되면 각 feature는 비교적 특정한 맥락에서만 켜진다. 논문은 이렇게 얻은 feature들이 기존 neuron이나 PCA 방향보다 더 해석 가능하다고 보고한다. 또 indirect object identification 같은 task에서 특정 behavior에 causally 관여하는 feature를 더 세밀하게 찾을 수 있음을 보인다.

최근 Scaling Monosemanticity는 이 방향을 더 크게 밀어붙인다. Claude 3 Sonnet 같은 production-scale model에서도 sparse autoencoder로 수천만 개 규모의 feature를 뽑을 수 있음을 보인다. 흥미로운 점은 feature가 단순 단어 수준에 머물지 않는다는 것이다. 구체적인 entity, 장소, 코드 오류, sarcasm 같은 추상적 개념까지 feature로 잡히고, 일부 feature는 모델 행동을 조정하는 데에도 쓰일 수 있다.

이 흐름이 unlearning에 중요한 이유는 분명하다.

unlearning은 지금까지 주로 weight나 loss의 문제로 다뤄졌다. forget data에 대한 loss를 올리거나, gradient를 조정하거나, fine-tuning으로 특정 답변을 줄인다. 그런데 이 방식은 무엇을 건드리고 있는지 잘 보이지 않는다. 결과는 낮아졌는데, 내부적으로 어떤 표현이 바뀌었는지 알기 어렵다.

SAE는 여기서 다른 질문을 던지게 만든다.

지우기 전에, 먼저 어떤 feature가 그 정보를 들고 있는지 볼 수 없을까.

예를 들어 어떤 factual memory나 visual concept가 있을 때, 그것이 특정 sparse feature들의 조합으로 나타난다면 unlearning은 더 정밀해질 수 있다. 전체 weight를 흔드는 대신, 관련 feature의 activation을 낮추거나, 그 feature가 downstream generation으로 이어지는 경로를 조정할 수 있다.

물론 조심해야 한다. SAE feature가 곧바로 진짜 개념이라는 뜻은 아니다. feature 설명이 그럴듯해 보여도 실제 causal role이 약할 수 있다. 어떤 feature는 해석은 쉬운데 모델 행동에는 별 영향을 주지 않을 수 있다. 반대로 중요한 계산은 feature 하나가 아니라 여러 feature의 조합일 수 있다.

그래서 unlearning에 SAE를 쓰려면 두 단계를 분리해야 한다.

첫째, feature를 찾는다.
둘째, 그 feature를 조정했을 때 실제 답변이 바뀌는지 본다.

해석 가능성만으로는 부족하다. intervention이 필요하다.

내가 만들고 싶은 실험은 Feature Persistence Evaluation이다. 어떤 concept에 강하게 반응하는 SAE feature를 찾는다. 그 다음 unlearning 전후로 해당 feature의 activation이 얼마나 줄었는지 본다. 여기서 끝내면 안 된다. 같은 feature가 다른 표현, 다른 prompt, 다른 modality에서도 다시 켜지는지 확인해야 한다.

multimodal setting에서는 더 흥미로워진다. CLIP이나 LLaVA의 intermediate activation에 SAE를 붙이면, visual feature와 language feature가 어디서 만나는지 볼 수 있다. 어떤 visual concept가 특정 textual reasoning과 함께 켜지는 feature cluster를 만들 수 있다면, unlearning은 image-text alignment의 일부를 조정하는 문제가 된다.

바로 가능한 실험은 작게 할 수 있다. CLIP ViT의 hidden activation을 모으고, SAE를 학습한다. target concept 이미지와 retain 이미지에서 feature activation을 비교한다. target concept에서만 강하게 켜지는 feature를 찾고, 그 feature를 낮췄을 때 retrieval 결과와 captioning 결과가 어떻게 바뀌는지 본다.

평가해야 할 것은 세 가지다.

target concept는 충분히 약해졌는가.
retain concept는 유지되는가.
feature를 낮췄을 때 실제 output도 바뀌는가.

SAE가 unlearning의 답이라는 뜻은 아니다. 하지만 좋은 질문을 열어준다. 모델을 무작정 다시 학습시키기 전에, 어떤 feature가 문제의 정보를 들고 있는지 볼 수 있다면 unlearning은 훨씬 덜 거칠어진다.

이 논문들이 중요한 이유는 여기에 있다. 지식이 어디에 있는지 완벽히 알려주지는 않는다. 대신 지식이 보일 수 있는 좌표계를 하나 더 제공한다.`
  },
  {
    slug: "unlearning-essay-05-llava-repe",
    date: "2026.06",
    title: "LLaVA와 Representation Engineering: multimodal unlearning은 어디를 봐야 할까",
    description:
      "LLaVA는 이미지가 언어 답변으로 바뀌는 구조를 단순하게 보여준다. RepE는 그 중간 표현을 직접 읽고 조정하는 관점을 제공한다.",
    tags: ["LLaVA", "Representation Engineering", "VLM", "Multimodal Unlearning"],
    category: "Unlearning Essay",
    sourceTitle: "Visual Instruction Tuning / Representation Engineering",
    sourceUrl: "https://arxiv.org/abs/2304.08485",
    content: `LLaVA를 보면 vision-language model이 생각보다 단순한 방식으로 시작할 수 있다는 걸 알게 된다.

핵심은 bridge다. 이미지는 vision encoder를 지난다. LLaVA에서는 CLIP vision encoder를 사용한다. 여기서 나온 visual representation은 그대로 language model이 이해할 수 있는 형태가 아니다. 그래서 projection layer가 필요하다. 이 projection이 image feature를 language model이 받을 수 있는 token-like representation으로 바꾼다. 이후 language model은 그 image token과 text instruction을 함께 보고 답변한다.

Visual Instruction Tuning 논문이 흥미로운 이유는 여기에 있다. 논문은 GPT-4를 이용해 image-language instruction-following data를 만들고, 이를 통해 LLaVA를 학습한다. 즉, 모델이 단순히 이미지를 분류하는 것이 아니라, 이미지를 보고 대화하고 설명하고 추론하도록 만든다. ScienceQA에서도 GPT-4와 결합해 높은 성능을 보인다.

이 구조는 multimodal unlearning을 생각할 때 꽤 중요하다. 이미지 정보가 어디서 언어 답변으로 바뀌는지 비교적 선명하게 나뉘기 때문이다.

vision encoder가 있다.
projection layer가 있다.
language model이 있다.

그렇다면 unlearning도 이 셋을 구분해서 봐야 한다.

어떤 정보는 vision encoder 안에서 이미 강하게 잡힐 수 있다. 어떤 정보는 projection을 지나며 language space에 맞춰질 수 있다. 또 어떤 정보는 language model 내부의 reasoning 과정에서 답변으로 굳어질 수 있다. 이 세 지점을 구분하지 않고 모델 전체를 한꺼번에 조정하면, 어떤 부분이 바뀐 건지 알기 어렵다.

여기서 Representation Engineering을 같이 읽을 필요가 있다. RepE는 neuron 하나나 circuit 하나를 아래에서부터 추적하는 방식만이 아니라, population-level representation을 읽고 조정하는 top-down 접근을 제안한다. 모델 내부 표현에서 honesty, harmlessness, 특정 high-level behavior 같은 방향을 찾고, 이를 모니터링하거나 steering하는 식이다.

이 관점은 unlearning에 잘 맞는다. 특히 multimodal model에서는 개별 neuron 하나보다 중간 표현의 방향성이 더 실용적일 수 있다. 특정 visual concept가 답변으로 이어질 때, 그것이 하나의 neuron에 깔끔하게 들어 있을 가능성은 낮다. 대신 여러 token, 여러 layer, 여러 feature가 함께 만드는 representation direction으로 나타날 수 있다.

그러면 질문은 이렇게 바뀐다.

이미지를 본 뒤, 어떤 representation이 답변을 특정 방향으로 밀고 있는가.

예를 들어 어떤 이미지를 보고 모델이 특정 이름, 장소, 브랜드, 상황을 말한다고 하자. 그 답변이 나오기 전 중간 layer에서 이미 방향이 형성되어 있을 수 있다. 그 방향을 찾고 약하게 조정하면, 전체 모델을 다시 학습하지 않고도 특정 답변 경향을 낮출 수 있다.

하지만 여기에도 위험이 있다. representation direction은 편리하지만 넓다. 너무 넓게 잡으면 target concept뿐 아니라 비슷한 정상 개념까지 같이 약해진다. 그래서 direction을 찾는 것만큼 중요한 것이 retain check다. target과 가까운 retain example을 반드시 같이 둬야 한다.

내가 제안하고 싶은 실험은 세 단계다.

먼저 LLaVA에서 target image-text input과 retain input을 넣고 layer별 representation을 저장한다. 그 다음 target 답변이 강하게 나오는 sample과 그렇지 않은 sample의 차이 방향을 구한다. 마지막으로 그 방향을 약하게 조정했을 때 target 답변은 줄고 retain 답변은 유지되는지 본다.

여기서 실험 이름을 거창하게 붙일 필요는 없다. 중요한 건 분리해서 보는 것이다.

vision encoder에서 이미 구분되는가.
projection 이후에 강해지는가.
language model 중간층에서 답변으로 굳어지는가.

이 세 가지를 나눠 보면 multimodal unlearning이 훨씬 덜 막연해진다.

TOFU가 평가의 기준을 줬다면, ROME과 MEMIT은 지식이 계산되는 위치를 보게 만들었다. Concept erasure는 개념의 경계 문제를 보여줬고, SAE는 feature 단위의 관찰 가능성을 열었다. LLaVA와 RepE는 이 모든 것을 multimodal model의 실제 구조 안에 놓게 해준다.

내가 결국 보고 싶은 것은 이것이다. 모델이 이미지를 보고 언어로 답하기 전, 정보가 어떤 형태로 바뀌는가. 그리고 그 중간 표현을 아주 작게 조정했을 때, 필요한 정보는 남기고 특정 연결만 약하게 만들 수 있는가.

multimodal unlearning은 결국 이 질문으로 온다. 무엇을 지울지가 아니라, 어디에서 조정해야 가장 덜 망가지는가.`
  }
];
