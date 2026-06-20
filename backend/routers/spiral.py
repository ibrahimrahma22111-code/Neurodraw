from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from models.schemas import SpiralAnalyzeRequest, SpiralAnalysisResponse
from routers.auth import get_current_user_id
from services.ml_spiral_analyzer import analyze_image_bytes
from services.spiral_analyzer import analyze_points

router = APIRouter(prefix="/spiral", tags=["spiral"])


@router.post("/analyze", response_model=SpiralAnalysisResponse)
def analyze_spiral(
    payload: SpiralAnalyzeRequest,
    _user_id: str = Depends(get_current_user_id),
):
    return analyze_points(payload.points)


@router.post("/analyze/public", response_model=SpiralAnalysisResponse)
def analyze_spiral_public(payload: SpiralAnalyzeRequest):
    """Unauthenticated analysis for quick testing."""
    return analyze_points(payload.points)


@router.post("/analyze-image", response_model=SpiralAnalysisResponse)
async def analyze_image(
    file: UploadFile = File(...),
    _user_id: str = Depends(get_current_user_id),
):
    image_bytes = await file.read()
    try:
        return analyze_image_bytes(image_bytes)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=f"Model not available: {exc}") from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
