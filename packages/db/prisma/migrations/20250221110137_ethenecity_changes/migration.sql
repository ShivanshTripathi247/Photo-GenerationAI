/*
  Warnings:

  - The values [AsianAmerican,EastAsian,SouthEastAsian,SouthAsian,MiddleEastern] on the enum `ethnicityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ethnicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'South Asian', 'Middle Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Model" ALTER COLUMN "ethnicity" TYPE "ethnicityEnum_new" USING ("ethnicity"::text::"ethnicityEnum_new");
ALTER TYPE "ethnicityEnum" RENAME TO "ethnicityEnum_old";
ALTER TYPE "ethnicityEnum_new" RENAME TO "ethnicityEnum";
DROP TYPE "ethnicityEnum_old";
COMMIT;
