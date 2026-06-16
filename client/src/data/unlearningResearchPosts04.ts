import type { WritingPost } from "./writing";

export const unlearningResearchPosts04: WritingPost[] = [
  {
    slug: "unlearning-research-11-concept-bottleneck-vlm",
    date: "2026.06",
    title: "[Unlearning Research 11] Concept Bottleneck으로 VLM을 해석 가능하게 제어하기",
    description:
      "중간 concept layer를 두면 VLM의 변화가 output 표면이 아니라 concept 단위에서 설명된다.",
    tags: ["Concept Bottleneck", "VLM", "Interpretability", "Control"],
    category: "Unlearning Research Essay",
    sourceTitle: "Interpretable Generative Models through Post-hoc Concept Bottlenecks",
    sourceUrl: "https://arxiv.org/abs/2503.19377",
    content: `기준 논문
- Interpretable Generative Models through Post-hoc Concept Bottlenecks — https://arxiv.org/abs/2503.19377

Concept bottleneck을 VLM 연구 관점에서 보면 질문이 달라진다. 모델의 답변만 보는 것이 아니라, 그 답변 앞에 어떤 concept가 켜졌는지를 보게 된다.

내가 이 논문에서 가져가고 싶은 지점은 post-hoc 구조다. 모델을 처음부터 다시 설계하지 않아도, 중간 activation 위에 concept layer를 붙여서 해석 가능한 제어 지점을 만들 수 있다. 이건 내 연구에 잘 맞는다. 이미 학습된 LLaVA나 CLIP 기반 모델 위에 concept probe를 붙이고, 지정 concept와 retain concept를 나눠 읽을 수 있기 때문이다.

VLM에서는 이미지와 텍스트가 섞이는 순간이 핵심이다. 이미지에는 object, style, scene, entity 같은 concept가 있고, 텍스트에는 relation, instruction, attribute가 있다. 이 둘이 alignment space에서 합쳐진다. 따라서 좋은 제어는 output만 바꾸는 것이 아니라, 이 중간 concept 흐름을 설명할 수 있어야 한다.

내가 새로 붙이고 싶은 아이디어는 Concept Audit Layer다. 이 layer는 제어 장치이면서 동시에 기록 장치다. 어떤 concept가 얼마나 켜졌는지, 조정 이후 지정 concept는 줄었는지, 가까운 neighbor concept는 살아 있는지 보여준다. 이건 단순 성능표보다 강하다. 왜냐하면 모델 변화의 이유를 concept 단위로 보여주기 때문이다.

바로 가능한 실험은 단순하다. LLaVA hidden state 위에 concept classifier를 붙인다. 지정 concept, neighbor concept, retain concept를 각각 label로 둔다. 이후 지정 concept activation만 낮추는 작은 adapter를 붙이고, output 변화와 concept activation 변화를 같이 본다. 좋은 결과는 output score만 낮아지는 것이 아니라, 내부 concept activation도 같이 정돈되는 것이다.

내 결론은 이렇다. VLM을 제대로 제어하려면 답변 표면만 보면 안 된다. 중간 concept가 어떻게 움직이는지 봐야 한다. Concept bottleneck은 그걸 가능하게 하는 깔끔한 구조다.`,
  },
];
