-- AlterTable
ALTER TABLE "users" RENAME CONSTRAINT "user_data_pkey" TO "users_pkey";

-- RenameIndex
ALTER INDEX "user_data_email_key" RENAME TO "users_email_key";
