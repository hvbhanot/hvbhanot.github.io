---
title: LoRA rank as a bias–variance dial
date: 2026-05-01
tags: fine-tuning, statistics
summary: Treat LoRA rank as statistical capacity, not a magic number.
---

When we adapt a base model with LoRA, we write a low-rank update

$$
\Delta W = BA, \quad B \in \mathbb{R}^{d \times r},\; A \in \mathbb{R}^{r \times k}.
$$

The rank $r$ is not merely an implementation detail. It is a **capacity knob**: small $r$ biases the adapter toward the pretrained solution (high bias, low variance under limited data); large $r$ fits domain quirks more aggressively.

### A practical prior

1. Start with small $r$ (e.g. 8 or 16) when the target domain is close to pretraining.
2. Increase $r$ only while validation loss improves **and** the adapter remains cheaper than full fine-tuning.
3. Log $r$ next to learning rate and dataset size — the triple $(r, \eta, n)$ is the experiment identity.

### Takeaway

Rank selection is closer to choosing the dimension of a statistical model than to flipping a framework switch. Treat it like model order selection, and keep the trail reproducible.
