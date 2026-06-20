-- Rename user_data table to users (as required by prisma-lint model-name-mapping-snake-case)
ALTER TABLE "user_data" RENAME TO "users";