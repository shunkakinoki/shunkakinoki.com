-- CreateTable
CREATE TABLE `Views` (
    `id` VARCHAR(191) NOT NULL,
    `likes` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
