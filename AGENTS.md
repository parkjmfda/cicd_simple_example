# Repository Guidelines

## Project Structure & Module Organization
Keep runtime modules in `src/` (for example, `src/pipelines/build.py`) and mirror them in `tests/` (`tests/pipelines/test_build.py`). Store GitHub Actions workflows in `.github/workflows/`, helper scripts in `scripts/`, and infrastructure manifests in `infra/`. Put anonymized fixtures or sample payloads in `tests/data/` so the application package stays lean.

## Build, Test, and Development Commands
- `python -m venv .venv && source .venv/bin/activate`: create an isolated environment.
- `pip install -r requirements.txt`: install dependencies.
- `python src/main.py`: run the demo pipeline locally.
- `pytest -q`: execute the test suite quickly.
- `ruff check src tests`: lint for style and common errors.
- `pip-compile requirements.in`: refresh lock files when dependencies change.
Re-run the test and lint commands after any dependency, workflow, or schema update.

## Coding Style & Naming Conventions
Follow PEP 8 with 4-space indentation and snake_case for files, modules, functions, and variables. Use PascalCase for classes and UPPER_SNAKE for constants. Format with `black --line-length 88`, sort imports with `isort`, and let `ruff` enforce additional rules. Prefer short, focused functions and pass dependencies explicitly instead of relying on module-level state.

## Testing Guidelines
Write tests with `pytest`, placing shared fixtures in `tests/conftest.py`. Name files `test_<module>.py` and functions `test_<behavior>` so reports are easy to scan. Target ≥85% branch coverage and measure it with `pytest --cov=src --cov-report=term-missing`. Mark slow suites with `@pytest.mark.slow` and keep default runs fast enough for every commit.

## Commit & Pull Request Guidelines
There is no existing history, so start with Conventional Commits (`feat: add deploy stage`, `fix: guard empty config`). Keep subjects imperative, include a short body when the change is subtle, and limit each commit to one concern. Pull requests should explain the change, link related issues, and describe the validation you ran (tests, lint, or manual checks). Attach logs or screenshots when workflow behaviour changes.

## CI/CD Notes
The primary automation belongs in `.github/workflows/ci.yml`; update it whenever you add or rename quality gates. Use encrypted repository secrets for credentials and provide mocked fallbacks for local testing. Do not commit `.env` files or cloud keys, and document any new pipeline stage in this guide before landing it.
