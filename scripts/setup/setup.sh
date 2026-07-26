#!/usr/bin/env bash
# TwinForge AI — Development Environment Setup Script
# Run this once after cloning the repository.
# Usage: bash scripts/setup/setup.sh

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()    { echo -e "${GREEN}[TwinForge]${NC} $1"; }
warn()    { echo -e "${YELLOW}[TwinForge]${NC} $1"; }
error()   { echo -e "${RED}[TwinForge]${NC} $1"; exit 1; }
section() { echo -e "\n${GREEN}══════════════════════════════════${NC}"; echo -e "${GREEN} $1${NC}"; echo -e "${GREEN}══════════════════════════════════${NC}\n"; }

section "TwinForge AI — Setup"
info "Starting development environment setup..."

# ── Check prerequisites ────────────────────────────────────────────────
section "Checking prerequisites"

command -v node  >/dev/null 2>&1 || error "Node.js not found. Install from https://nodejs.org (v20+)"
command -v npm   >/dev/null 2>&1 || error "npm not found."
command -v python3 >/dev/null 2>&1 || error "Python 3 not found. Install from https://python.org (v3.12+)"
command -v pip3  >/dev/null 2>&1 || error "pip3 not found."
command -v docker >/dev/null 2>&1 || warn "Docker not found. Required for database. Install from https://docker.com"
command -v git   >/dev/null 2>&1 || error "Git not found."

NODE_VER=$(node -v | cut -c2- | cut -d. -f1)
[ "$NODE_VER" -lt 18 ] && error "Node.js v18+ required. Found: $(node -v)"

PY_VER=$(python3 -c "import sys; print(sys.version_info.minor)")
[ "$PY_VER" -lt 11 ] && warn "Python 3.12+ recommended. Found: $(python3 --version)"

info "✅ Node $(node -v) · Python $(python3 --version) · npm $(npm -v)"

# ── Environment file ───────────────────────────────────────────────────
section "Environment configuration"

if [ ! -f .env ]; then
    cp .env.example .env
    info "Created .env from .env.example"
    warn "⚠️  Edit .env and set your ANTHROPIC_API_KEY and database credentials"
else
    info ".env already exists — skipping"
fi

# ── Frontend dependencies ──────────────────────────────────────────────
section "Installing frontend dependencies"

cd frontend
npm install
info "✅ Frontend dependencies installed"
cd ..

# ── Backend (Python virtual environment) ──────────────────────────────
section "Setting up Python environment"

if [ ! -d ".venv" ]; then
    python3 -m venv .venv
    info "Created .venv virtual environment"
fi

source .venv/bin/activate
pip install --upgrade pip --quiet
pip install -r backend/requirements.txt --quiet
info "✅ Backend Python dependencies installed"

# ── AI dependencies ────────────────────────────────────────────────────
section "Installing AI dependencies"

pip install pandas numpy scikit-learn shap anthropic joblib scipy --quiet
info "✅ AI dependencies installed"

# ── Database ───────────────────────────────────────────────────────────
section "Starting PostgreSQL"

if command -v docker >/dev/null 2>&1; then
    if ! docker ps | grep -q twinforge-postgres; then
        docker-compose up -d postgres
        info "Waiting for PostgreSQL to be ready..."
        sleep 5
    fi

    # Run schema
    docker exec twinforge-postgres psql -U twinforge -d twinforge_db \
        -f /docker-entrypoint-initdb.d/001_initial_schema.sql 2>/dev/null || true
    info "✅ PostgreSQL running and schema applied"
else
    warn "Docker not available. Start PostgreSQL manually and run:"
    warn "  psql -U twinforge -d twinforge_db -f database/schema/001_initial_schema.sql"
fi

# ── Synthetic dataset ─────────────────────────────────────────────────
section "Generating AI training dataset"

source .venv/bin/activate
python3 ai/datasets/generate_synthetic.py --output ai/datasets/motor_synthetic.csv
info "✅ Synthetic dataset generated"

# ── Final summary ──────────────────────────────────────────────────────
section "Setup complete!"

echo ""
echo "  Start the full stack:"
echo "    docker-compose up -d"
echo ""
echo "  Or start services individually:"
echo "    Frontend:  cd frontend && npm run dev    → http://localhost:3000"
echo "    Backend:   cd backend && uvicorn app.main:app --reload  → http://localhost:8000"
echo "    API docs:  http://localhost:8000/docs"
echo ""
echo "  Run tests:"
echo "    Backend:   pytest tests/"
echo "    Frontend:  cd frontend && npm test"
echo ""
warn "Remember to set ANTHROPIC_API_KEY in .env for Factory Assistant AI"
echo ""
info "Happy building! 🚀"
