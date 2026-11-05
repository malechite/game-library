-- Runs once on first container start (docker-entrypoint-initdb.d).
-- The dev database comes from POSTGRES_DB; the API test suite needs its own.
CREATE DATABASE game_library_test;
