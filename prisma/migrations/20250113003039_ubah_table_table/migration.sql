-- AlterTable
ALTER TABLE `books` MODIFY `publisher` VARCHAR(100) NULL,
    MODIFY `year` INTEGER NULL,
    MODIFY `total_pages` INTEGER NULL,
    MODIFY `first_release_date` DATETIME(3) NULL,
    MODIFY `score` INTEGER NULL DEFAULT 0,
    MODIFY `summary` TEXT NULL,
    MODIFY `rating` DOUBLE NULL;

-- AlterTable
ALTER TABLE `genres` MODIFY `name` VARCHAR(100) NULL,
    MODIFY `slug` VARCHAR(100) NULL;
