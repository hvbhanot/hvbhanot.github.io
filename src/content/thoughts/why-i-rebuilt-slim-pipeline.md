---
title: "Why I rebuilt the SLiM pipeline three times"
description: "Notes on infrastructure for fine-tuning coding models on a domain-specific scripting language."
date: 2026-04-10
tags: ["slim", "fine-tuning", "infrastructure"]
---

The first version of the SLiM pipeline was 200 lines of glue. It read a CSV
of prompts, hit an API, dumped the responses to a folder. It worked, in the
sense that it produced files. It did not work in the sense that I could
actually use those files to make a decision about a model.

## What was wrong

The output was a folder of `.txt` blobs with no metadata. When I wanted to
compare two runs — same prompts, different model — I had to write a one-off
script every time. Worse, I couldn't tell *which* prompts a model failed on
without reading them by hand.

The lesson was obvious in retrospect: **the output format is the experiment**.
If you can't load all your runs into a single dataframe and group by the
right dimensions, you don't have an experiment, you have a graveyard of
artifacts.

## Version two

I rewrote it around an Excel workbook with one row per `(prompt, model, run)`
tuple. Columns for the generated code, the SLiM execution result, the
error if any, and a pass/fail flag from a second-pass error-correction loop.

This was better. I could actually look at it. But the pipeline itself was
still a single script with hardcoded paths, and every time I wanted to swap
out the model, I had to remember to change three things in two files.

## Version three

The current version is a proper Python package — `slim_pipeline` — with
configs, a CLI, and a benchmark suite of 32+ prompts across five tiers of
difficulty. The model is a parameter. The prompts are versioned. The output
schema is fixed. I can run the same benchmark against a base model, a LoRA
adapter, and an API model in three commands and diff the results.

The unsexy lesson here is that **fine-tuning is mostly plumbing**. The
training run itself is maybe 5% of the total time. Everything else is
dataset curation, evaluation harnesses, and convincing yourself the
numbers mean what you think they mean.
