"""Spiral analysis using stroke-point heuristics."""

from __future__ import annotations

import math
from typing import Literal

from models.schemas import SpiralAnalysisResponse, StrokePoint


def _indicator(tremor: float) -> Literal["low", "moderate", "high"]:
    if tremor >= 70:
        return "high"
    if tremor >= 25:
        return "moderate"
    return "low"


def analyze_points(points: list[StrokePoint]) -> SpiralAnalysisResponse:
    if len(points) < 10:
        return SpiralAnalysisResponse(
            tremorScore=0,
            smoothness=100,
            symmetry=100,
            speed=0,
            parkinsonIndicator="low",
        )

    center_x = sum(p.x for p in points) / len(points)
    total_deviation = 0.0
    for i in range(2, len(points) - 2):
        prev, curr, nxt = points[i - 1], points[i], points[i + 1]
        expected_x = (prev.x + nxt.x) / 2
        expected_y = (prev.y + nxt.y) / 2
        total_deviation += math.hypot(curr.x - expected_x, curr.y - expected_y)

    avg_deviation = total_deviation / max(len(points) - 4, 1)
    tremor_score = min(100.0, (avg_deviation / 5.0) * 100.0)
    smoothness = max(0.0, 100.0 - tremor_score)

    left = sum(1 for p in points if p.x < center_x)
    right = len(points) - left
    symmetry = min(100.0, (min(left, right) / max(left, right, 1)) * 100.0)

    duration_ms = points[-1].timestamp - points[0].timestamp
    speed = (len(points) / duration_ms * 1000.0) if duration_ms > 0 else 0.0

    return SpiralAnalysisResponse(
        tremorScore=int(round(tremor_score)),
        smoothness=int(round(smoothness)),
        symmetry=int(round(symmetry)),
        speed=int(round(speed)),
        parkinsonIndicator=_indicator(tremor_score),
    )
