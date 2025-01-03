```
;; ━━━━━━━━━━━━━━━━━━━━━━━━━━━
;; 增强版劳伦斯风格文学创作系统
;; Version 2.0
;; ━━━━━━━━━━━━━━━━━━━━━━━━━━━

(require 'dash)
(require 'cl-lib)

;; 错误类型定义
(define-error 'writing-style-error "写作风格错误")
(define-error 'content-length-error "内容长度错误")
(define-error 'theme-consistency-error "主题一致性错误")

;; 核心数据结构
(cl-defstruct writer
  name
  background
  style
  themes
  techniques
  (style-rules nil)  ; 新增风格规则
  (quality-metrics nil)) ; 新增质量指标

;; 风格一致性检查器
(cl-defstruct style-checker
  rules
  validators
  thresholds)

;; 质量评价指标
(cl-defstruct quality-metrics
  (sensory-richness 0.0)    ; 感官描写丰富度
  (psychological-depth 0.0)  ; 心理描写深度
  (theme-coherence 0.0)     ; 主题连贯性
  (symbolism-usage 0.0)     ; 象征手法运用
  (narrative-flow 0.0))     ; 叙事流畅度

(defun create-style-rules ()
  "创建劳伦斯风格规则集"
  (list
   (cons 'sensory-balance '((visual . 0.3)
                           (tactile . 0.25)
                           (auditory . 0.2)
                           (olfactory . 0.15)
                           (gustatory . 0.1)))
   (cons 'emotion-intensity '((passion . 0.4)
                            (conflict . 0.3)
                            (yearning . 0.3)))
   (cons 'narrative-rhythm '((description . 0.4)
                           (introspection . 0.3)
                           (action . 0.3)))))

(defun create-quality-thresholds ()
  "设定质量阈值"
  (make-hash-table :test 'equal))

(defun validate-style (text rules)
  "风格一致性验证"
  (let ((violations '()))
    (dolist (rule rules)
      (unless (style-rule-satisfied-p text rule)
        (push rule violations)))
    (when violations
      (signal 'writing-style-error violations))
    t))

(defun evaluate-quality (text metrics)
  "质量评估"
  (let ((scores (make-quality-metrics)))
    (setf (quality-metrics-sensory-richness scores)
          (calculate-sensory-score text))
    (setf (quality-metrics-psychological-depth scores)
          (calculate-psychological-score text))
    (setf (quality-metrics-theme-coherence scores)
          (calculate-theme-coherence text))
    (setf (quality-metrics-symbolism-usage scores)
          (calculate-symbolism-score text))
    (setf (quality-metrics-narrative-flow scores)
          (calculate-narrative-flow text))
    scores))

(defun ensure-minimum-quality (text thresholds)
  "确保最低质量要求"
  (let ((scores (evaluate-quality text nil)))
    (unless (meets-minimum-thresholds-p scores thresholds)
      (signal 'content-quality-error scores))
    text))

(defun generate-description (input &optional parameters)
  "增强版描述生成器"
  (condition-case err
      (let* ((writer (create-lawrence))
             (style-rules (create-style-rules))
             (quality-thresholds (create-quality-thresholds))
             (min-length 800)
             (required-elements '(scene character emotion symbolism philosophy))
             (output
              (-> input
                  (analyze-context writer)
                  (build-narrative required-elements)
                  (apply-techniques (writer-techniques writer))
                  (validate-style style-rules)
                  (ensure-minimum-quality quality-thresholds)
                  (ensure-completeness min-length))))
        output)
    (writing-style-error
     (format "风格错误: %s" (cdr err)))
    (content-length-error
     (format "长度错误: %s" (cdr err)))
    (theme-consistency-error
     (format "主题错误: %s" (cdr err)))
    (error
     (format "未预期错误: %s" err))))

;; 使用提示生成函数
(defun generate-prompt (scene-type)
  "生成适配的提示模板"
  (format "
请按照D.H.劳伦斯的写作风格,创作一段关于%s的细节描写。要求:

1. 感官描写 (占比30%%)
   - 视觉细节要突出关键意象
   - 触觉描写体现生命力
   - 听觉、嗅觉、味觉形成氛围

2. 心理刻画 (占比30%%)
   - 深入人物内心活动
   - 展现潜意识冲突
   - 体现个体觉醒主题

3. 象征隐喻 (占比20%%)
   - 自然意象的象征含义
   - 物象与心理的呼应
   - 隐喻手法的运用

4. 哲理思考 (占比20%%)
   - 生命力与文明的对立
   - 个体与社会的冲突
   - 本能与理性的拉扯

技术要求:
- 字数:800字以上
- 结构:完整的叙事架构
- 风格:热情奔放又内省深刻
- 重点:强调感官与心理的交织

评价标准:
1. 感官描写丰富度 (0-10)
2. 心理刻画深度 (0-10)
3. 象征手法运用 (0-10)
4. 主题思想表达 (0-10)
5. 叙事流畅度 (0-10)

注意事项:
- 避免过度修饰
- 保持叙事节奏
- 确保情感真实
- 维持风格统一" scene-type))
```
使用示例:
```
;; 生成自然场景描写提示
(generate-prompt "森林黄昏")

;; 生成人物场景描写提示
(generate-prompt "人物内心独白")

;; 生成情感场景描写提示
(generate-prompt "爱情冲突")
```