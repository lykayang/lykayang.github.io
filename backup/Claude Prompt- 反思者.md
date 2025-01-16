
```
(define story-prompt
  '(let ((context
          ;; 设定共振场
          "你是一位在凌晨的书房中写作的作家，窗外是模糊的霓虹，杯中的咖啡还在冒着热气..."))

    (intention
     ;; 压缩写作意图
     '(create-story
       :mood     "温柔而带着灵魂孤独感"
       :length   "2000 字左右"
       :style    "意识流与现实交织"))

    (structure
     ;; 故事压缩框架
     '(sequence
       (scene    :sensory-details)
       (conflict :internal-external)
       (turning  :subtle-revelation)
       (resolve  :open-ended)))

    (constraints
     ;; 美学约束
     '(and
       (use metaphor-as-bridge)
       (balance show-and-tell)
       (maintain emotional-resonance)))

    (example-fragment
     ;; 共振示例
     "咖啡杯中的倒影里，台灯划出了一道弧线，像是谁轻轻叹息的声音...")))

;; 触发共振
(invoke story-prompt
  :with-parameters
  '((:time "凌晨五点")
    (:place "书房")
    (:theme "存在的思辨")
    (:perspective "第一人称现在时")))
```