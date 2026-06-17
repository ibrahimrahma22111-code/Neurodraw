from fastapi import APIRouter, Depends, File, UploadFile

from models.schemas import SpiralAnalyzeRequest, SpiralAnalysisResponse
from routers.auth import get_current_user_id
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
    """Placeholder for image-based analysis — returns sample metrics until CV pipeline is added."""
    await file.read()
    return SpiralAnalysisResponse(
        tremorScore=35,
        smoothness=65,
        symmetry=70,
        speed=0,
        parkinsonIndicator="moderate",
    )
