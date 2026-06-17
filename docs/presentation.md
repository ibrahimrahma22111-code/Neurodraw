# NeuroDraw Presentation

## Slide 1 – Cover

**NeuroDraw**
Early Parkinson’s Disease Screening Using Spiral Drawing + AI

**Prepared by:**
Rahma Gamal Yousof – Miriam Bassem Boushra – Nouran Osama Ali

**New Mansoura University** | Faculty of Computer Science and Engineering | 2025–2026

---

## Slide 2 – Introduction

*   **Parkinson’s Disease (PD)** is a progressive neurological disorder affecting motor control
*   Early symptoms are subtle and often missed
*   Early screening supports timely follow-up and better outcomes

---

## Slide 3 – Problem Statement

*   Diagnosis depends mainly on clinical observation (subjective)
*   Limited access to specialists, especially in remote areas
*   Need for an accessible, non-invasive early screening support tool

---

## Slide 4 – Project Purpose

*   Support early PD screening using spiral drawing analysis
*   Provide a remote and low-cost decision-support solution
*   Assist doctors in review and patient follow-up (not replace diagnosis)

---

## Slide 5 – Objectives

*   Train a CNN model to classify spiral drawings (PD vs Healthy)
*   Achieve stable and reliable performance
*   Integrate the model into a web-based platform
*   Enable real-time doctor–patient communication and case tracking

---

## Slide 6 – Related Work

*   **Classical ML:** handcrafted features → limited generalization
*   **Deep learning (CNN):** automatic feature learning from images
*   **Our focus:** strong model + real system workflow integration

---

## Slide 7 – Proposed System (NeuroDraw)

*   **Patient** performs spiral test remotely
*   **ML model** predicts screening outcome
*   **Doctor** reviews results and manages follow-up
*   **Real-time chat** supports continuous monitoring

---

## Slide 8 – Dataset Overview

*   Spiral drawing images
*   Two classes: Parkinson’s / Healthy
*   Balanced split: training and testing
*   Binary image classification task

---

## Slide 9 – Preprocessing

*   Resize images to fixed CNN input size
*   Normalize pixels to [0,1]
*   Reduce noise/background artifacts for clearer patterns

---

## Slide 10 – Data Augmentation

*   Rotation, zooming, horizontal flipping
*   Increases data diversity
*   Reduces overfitting and improves generalization

---

## Slide 11 – CNN Architecture

*   **Convolution layers:** extract tremor/irregularity patterns
*   **Pooling layers:** reduce dimensions while preserving features
*   **Dense layers:** final classification
*   **Sigmoid output:** binary decision

---

## Slide 12 – Training Strategy

*   Trained over multiple epochs
*   Monitored training/validation accuracy and loss
*   Early stopping + regularization to prevent overfitting

---

## Slide 13 – System Architecture

*   **Front-End:** patient & doctor dashboards, drawing/upload, results, chat
*   **Back-End:** auth, storage, inference requests, notifications
*   **ML Service:** spiral image inference endpoint
*   **Database:** users, tests, results, chat history

---

## Slide 14 – Experimental Results

*   Training accuracy ≈ 95%
*   Validation accuracy ≈ 87–88%
*   Stable convergence and good generalization

---

## Slide 15 – Evaluation Metrics

*   Accuracy, Precision, Recall (Sensitivity), F1-score
*   Confusion matrix to analyze FP/FN
*   Medical screening priority: minimize false negatives

---

## Slide 16 – Result Interpretation

*   Spiral drawings reflect fine motor impairment
*   CNN captures tremor and irregularity patterns
*   Suitable for early screening decision-support

---

## Slide 17 – Discussion

*   Non-invasive and low-cost approach
*   Reduces subjectivity in manual assessment
*   **Limitations:** dataset size, device variability, need clinical validation

---

## Slide 18 – Future Work (Smart Pen)

*   Integrate smart pen/stylus signals: pressure, speed, tilt, acceleration
*   Extract tremor frequency features (time-series analysis)
*   **Multi-modal AI:** image + motion signals for higher robustness

---

## Slide 19 – Future Work (Clinical + Deployment)

*   Larger and more diverse datasets
*   Multi-center clinical validation
*   Explainable AI (Grad-CAM) to improve clinical trust
*   Mobile/tablet support and hospital system integration (EHR)

---

## Slide 20 – Conclusion

*   NeuroDraw demonstrates feasibility of AI-based spiral screening
*   Combines ML with a practical web platform
*   Supports doctors in early screening and follow-up

---

## Slide 21 – Thank You

**Thank You for Your Attention**
